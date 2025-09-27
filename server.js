// Minimal Node server to proxy OpenAI calls using OPENAI_API_KEY from .env
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set in .env');
}

// Ensure fetch is available (Node < 18 fallback)
let fetchFn = typeof fetch === 'function' ? fetch : null;
if (!fetchFn) {
  fetchFn = (...args) => import('node-fetch').then(({ default: f }) => f(...args));
}

// Simple chat endpoint (non-streaming) using OpenAI Chat Completions
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages must be an array' });
    }

    const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).send(errText);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// In-memory stores for demo
const memory = {
  analysisRuns: {},
  scrapeJobs: {},
  orchestrations: {},
};

const ALLOWLIST_DOMAINS = new Set([
  'iso.org', 'www.iso.org',
  'regulasip.id', 'www.regulasip.id',
  'kemenhub.go.id', 'www.kemenhub.go.id', 'dephub.go.id', 'www.dephub.go.id',
  'pelindo.co.id', 'www.pelindo.co.id',
  'ilcs.co.id', 'www.ilcs.co.id'
]);

// Sample contracts dataset (in-memory)
// Expandable sample contracts; in frontend we read from contracts.js, but server keeps a fallback list
const sampleContracts = Array.from({ length: 12 }).map((_, i) => {
  const pad = String(i + 1).padStart(3, '0');
  return {
    id: `C-${pad}`,
    nomor_kontrak: `KONTRAK_01012025_${pad}`,
    title: `Kontrak Contoh ${pad}`,
    text: 'Termin 3x, penalti 1% per hari, klausul force majeure, asuransi diperlukan.'
  };
});

function generateId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

// Basic heuristic risk analysis (uses OpenAI if key present; falls back to heuristic)
async function performRiskAnalysis(text) {
  const lower = (text || '').toLowerCase();
  let score = 50;
  if (lower.includes('penalti') || lower.includes('denda')) score += 10;
  if (lower.includes('asuransi')) score -= 5;
  if (lower.includes('force majeure')) score -= 5;
  if (lower.includes('termin')) score += 5;
  if (lower.includes('keterlambatan')) score += 10;
  score = Math.min(100, Math.max(0, score));

  let summary = 'Ringkasan tidak tersedia.';
  let clauses = [
    { type: 'Pembayaran', risk_level: score > 60 ? 'medium' : 'low', text: 'Ketentuan termin pembayaran' },
    { type: 'Penalti', risk_level: score > 70 ? 'high' : 'medium', text: 'Penalti keterlambatan' },
    { type: 'Force Majeure', risk_level: 'low', text: 'Klausul force majeure' },
  ];

  if (OPENAI_API_KEY && text) {
    try {
      const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.2,
          messages: [
            { role: 'system', content: 'Anda adalah analis kontrak senior. Tugas: jelaskan risiko manusiawi dan saran mitigasi.' },
            { role: 'user', content: `Analisis kontrak berikut. Keluarkan JSON:\n{
  "summary": "1-3 kalimat, bahasa natural",
  "risk_score": 0-100,
  "clauses": [
    { "type": "Termin Pembayaran", "risk_level": "low|medium|high", "why": "mengapa berisiko", "action": "mitigasi praktis" },
    { "type": "Penalti Keterlambatan", "risk_level": "low|medium|high", "why": "...", "action": "..." },
    { "type": "Force Majeure", "risk_level": "low|medium|high", "why": "...", "action": "..." }
  ]
}\n\nTeks kontrak:\n${text}` }
          ]
        })
      });
      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content || '';

        function tryParseJson(text) {
          try {
            return JSON.parse(text);
          } catch (_) {}
          // pull from ```json ... ```
          let m = text.match(/```json([\s\S]*?)```/i);
          if (m && m[1]) {
            try { return JSON.parse(m[1].trim()); } catch (_) {}
          }
          // pull from ``` ... ```
          m = text.match(/```([\s\S]*?)```/);
          if (m && m[1]) {
            try { return JSON.parse(m[1].trim()); } catch (_) {}
          }
          // naive braces slice
          const i = text.indexOf('{');
          const j = text.lastIndexOf('}');
          if (i !== -1 && j !== -1 && j > i) {
            const slice = text.slice(i, j + 1);
            try { return JSON.parse(slice); } catch (_) {}
          }
          return null;
        }

        const parsed = tryParseJson(content);
        if (parsed) {
          summary = parsed.summary || summary;
          clauses = Array.isArray(parsed.clauses) && parsed.clauses.length ? parsed.clauses : clauses;
          if (typeof parsed.risk_score === 'number') score = parsed.risk_score;
        } else {
          // fall back to concise text
          summary = content.replace(/```[\s\S]*?```/g, '').trim() || summary;
        }
      }
    } catch (_) {}
  }

  return { risk_score: Math.round(score), summary, clauses };
}

async function summarizeUrl(url) {
  try {
    const u = new URL(url);
    if (!ALLOWLIST_DOMAINS.has(u.hostname)) {
      return null;
    }
    const resp = await fetchFn(url, { headers: { 'user-agent': 'Mozilla/5.0 MINERVA-Bot' } });
    if (!resp.ok) return null;
    const html = await resp.text();
    const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [,''])[1].trim();
    let text = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 12000);
    let summary = text.slice(0, 260) + '...';
    if (OPENAI_API_KEY) {
      try {
        const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            messages: [
              { role: 'system', content: 'Ringkas konten legal/standar berikut dalam 2-4 kalimat dengan poin utama.' },
              { role: 'user', content: text }
            ]
          })
        });
        if (response.ok) {
          const data = await response.json();
          summary = data?.choices?.[0]?.message?.content || summary;
        }
      } catch (_) {}
    }
    return { title: title || url, url, summary };
  } catch (_) {
    return null;
  }
}

async function enrichWithLegalAndWeb(contractText) {
  const fs = require('fs');
  const briefAPath = path.join(__dirname, '..', 'Minerva AI Agent Feature Brief.md');
  const briefBPath = path.join(__dirname, '..', 'Minerva Brief.md');
  let docA = '', docB = '';
  try { docA = fs.readFileSync(briefAPath, 'utf8'); } catch (_) {}
  try { docB = fs.readFileSync(briefBPath, 'utf8'); } catch (_) {}

  let legal_summary = '';
  let legal_citations = [];
  let legal_findings = [];
  const candidateUrls = [
    'https://www.iso.org/standard/46051.html', // ISO 20858:2007
    'https://www.regulasip.id/book/6352/read'  // Kemenhub PM 72/2017
  ];

  const web = [];
  for (const url of candidateUrls) {
    const sum = await summarizeUrl(url);
    if (sum) {
      web.push(sum);
      legal_citations.push({ title: sum.title, url: sum.url });
    }
  }

  // Build a structured legal analysis using LLM
  if (OPENAI_API_KEY) {
    try {
      const tryParseJson = (text) => {
        try { return JSON.parse(text); } catch(_){}
        let m = text.match(/```json([\s\S]*?)```/i); if (m && m[1]) { try { return JSON.parse(m[1].trim()); } catch(_){} }
        m = text.match(/```([\s\S]*?)```/); if (m && m[1]) { try { return JSON.parse(m[1].trim()); } catch(_){} }
        const i = text.indexOf('{'); const j = text.lastIndexOf('}');
        if (i !== -1 && j !== -1 && j > i) { const slice = text.slice(i, j+1); try { return JSON.parse(slice); } catch(_){} }
        return null;
      };

      const webDigest = web.map(w => `- ${w.title}\n${w.summary}`).join('\n');
      const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.2,
          messages: [
            { role: 'system', content: 'Anda adalah penasihat hukum kontrak untuk sektor logistik/pelabuhan.' },
            { role: 'user', content: `Analisis legal untuk kontrak berikut:\n\n[Kontrak]\n${(contractText||'').slice(0,6000)}\n\n[Brief Internal - AI Agent Feature Brief]\n${docA.slice(0,5000)}\n\n[Brief Internal - Minerva Brief]\n${docB.slice(0,5000)}\n\n[Ringkasan Web (allowlist)]\n${webDigest}\n\nKeluarkan JSON:\n{\n  "legal_summary": "3-6 kalimat ringkas",\n  "legal_findings": [\n    {\n      "source": "ISO 20858:2007|Kemenhub PM 72/2017|Internal Policy|Contract",\n      "applies": true,\n      "why": "mengapa standar/regulasi relevan",\n      "obligations": ["..."],\n      "risks": ["..."],\n      "actions": ["..."],\n      "citation": "https://... (bila ada)"\n    }\n  ]\n}` }
          ]
        })
      });
      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content || '';
        const parsed = tryParseJson(content);
        if (parsed) {
          legal_summary = parsed.legal_summary || legal_summary;
          if (Array.isArray(parsed.legal_findings)) legal_findings = parsed.legal_findings;
        } else {
          legal_summary = content || legal_summary;
        }
      }
    } catch (_) {}
  }

  return { legal_summary, legal_citations, legal_findings, web };
}

// POST /api/analysis/run { runType, contractText? }
app.post('/api/analysis/run', async (req, res) => {
  const { runType = 'risk', contractText = '' } = req.body || {};
  const id = generateId('ar');
  memory.analysisRuns[id] = { id, status: 'queued', runType, result: null };
  res.json({ runId: id, status: 'queued' });
  setTimeout(async () => {
    memory.analysisRuns[id].status = 'running';
    try {
      const result = await performRiskAnalysis(contractText);
      const enrich = await enrichWithLegalAndWeb(contractText);
      memory.analysisRuns[id].result = { ...result, ...enrich };
      memory.analysisRuns[id].status = 'completed';
    } catch (e) {
      memory.analysisRuns[id].status = 'failed';
      memory.analysisRuns[id].error = e?.message || 'analysis failed';
    }
  }, 500);
});

// GET /api/analysis/run/:id
app.get('/api/analysis/run/:id', (req, res) => {
  const run = memory.analysisRuns[req.params.id];
  if (!run) return res.status(404).json({ error: 'not found' });
  res.json(run);
});

// GET /api/analysis/atrisk (mock)
app.get('/api/analysis/atrisk', (req, res) => {
  res.json({
    items: [
      { nomor_kontrak: 'KONTRAK_01012025_001', title: 'Pengiriman Logistik Jakarta', risk_score: 78 },
      { nomor_kontrak: 'KONTRAK_15022025_014', title: 'Penyimpanan Barang Surabaya', risk_score: 69 },
    ]
  });
});

// POST /api/rag/query { query }
app.post('/api/rag/query', async (req, res) => {
  const { query } = req.body || {};
  if (!query) return res.status(400).json({ error: 'query required' });

  let answer = `Tidak ada jawaban untuk: ${query}`;
  const citations = [
    { title: 'Peraturan Kemenhub 2017', url: 'https://www.regulasip.id/book/6352/read' },
    { title: 'ISO 20858:2007', url: 'https://www.iso.org/standard/46051.html' }
  ];

  if (OPENAI_API_KEY) {
    try {
      const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.2,
          messages: [
            { role: 'system', content: 'Jawab ringkas dalam bahasa Indonesia. Jika relevan, gunakan sitasi placeholder [1], [2].' },
            { role: 'user', content: query }
          ]
        })
      });
      if (response.ok) {
        const data = await response.json();
        answer = data?.choices?.[0]?.message?.content || answer;
      }
    } catch (_) {}
  } else {
    answer = `Jawaban (mock) terkait: ${query}. Lihat [1], [2].`;
  }

  res.json({ answer, citations });
});

// POST /api/scrape/jobs { source_url }
app.post('/api/scrape/jobs', (req, res) => {
  const { source_url } = req.body || {};
  if (!source_url) return res.status(400).json({ error: 'source_url required' });
  const id = generateId('job');
  memory.scrapeJobs[id] = { id, source_url, status: 'queued', last_error: null };
  res.json({ id, status: 'queued' });
  setTimeout(() => { memory.scrapeJobs[id].status = 'running'; }, 400);
  setTimeout(() => { memory.scrapeJobs[id].status = 'completed'; }, 1800);
});

// GET /api/scrape/jobs/:id
app.get('/api/scrape/jobs/:id', (req, res) => {
  const job = memory.scrapeJobs[req.params.id];
  if (!job) return res.status(404).json({ error: 'not found' });
  res.json(job);
});

// Simple orchestration demo
app.post('/api/orchestrations', (req, res) => {
  const { kind = 'contract_analysis', payload = {} } = req.body || {};
  const id = generateId('orc');
  const graph = {
    id,
    kind,
    status: 'running',
    nodes: [
      { id: 'router', status: 'completed' },
      { id: 'retrieve', status: 'running' },
      { id: 'analyze', status: 'queued' },
    ],
    payload,
  };
  memory.orchestrations[id] = graph;
  res.json({ id, status: graph.status });
  setTimeout(() => { graph.nodes[1].status = 'completed'; graph.nodes[2].status = 'running'; }, 600);
  setTimeout(() => { graph.nodes[2].status = 'completed'; graph.status = 'completed'; }, 1400);
});

app.get('/api/orchestrations/:id', (req, res) => {
  const g = memory.orchestrations[req.params.id];
  if (!g) return res.status(404).json({ error: 'not found' });
  res.json(g);
});

// Contracts API
app.get('/api/contracts', (req, res) => {
  const search = (req.query.search || '').toString().toLowerCase();
  let items = sampleContracts;
  if (search) {
    items = items.filter(c =>
      c.title.toLowerCase().includes(search) ||
      c.nomor_kontrak.toLowerCase().includes(search)
    );
  }
  res.json({
    items: items.map(({ id, nomor_kontrak, title }) => ({ id, nomor_kontrak, title }))
  });
});

app.get('/api/contracts/:id', (req, res) => {
  const item = sampleContracts.find(c => c.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'not found' });
  res.json(item);
});

// ---- Legal Q&A based on local briefs ----
app.post('/api/legal/qa', async (req, res) => {
  try {
    const { question, contractText } = req.body || {};
    if (!question) return res.status(400).json({ error: 'question required' });
    const fs = require('fs');
    const briefAPath = path.join(__dirname, '..', 'Minerva AI Agent Feature Brief.md');
    const briefBPath = path.join(__dirname, '..', 'Minerva Brief.md');
    let docA = '', docB = '';
    try { docA = fs.readFileSync(briefAPath, 'utf8'); } catch (_) {}
    try { docB = fs.readFileSync(briefBPath, 'utf8'); } catch (_) {}

    let answer = 'Tidak ada jawaban.';
    let citations = [];

    if (OPENAI_API_KEY && (docA || docB || contractText)) {
      const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.2,
          messages: [
            { role: 'system', content: 'Anda adalah analis hukum MINERVA. Jawab ringkas, merujuk standar/regulasi, dan beri kutipan singkat.' },
            { role: 'user', content: `Pertanyaan: ${question}\n\nKonteks Kontrak (opsional):\n${(contractText||'').slice(0,4000)}\n\nDokumen A (AI Agent Feature Brief):\n${docA.slice(0, 8000)}\n\nDokumen B (Minerva Brief):\n${docB.slice(0, 8000)}\n\nFormat keluaran JSON: {"answer":"...","citations":[{"title":"DocA|DocB|Contract","snippet":"..."}]}` }
          ]
        })
      });
      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content || '';
        try {
          const parsed = JSON.parse(content);
          answer = parsed.answer || answer;
          citations = Array.isArray(parsed.citations) ? parsed.citations.map(c => ({ title: c.title || 'Brief', url: '#', snippet: c.snippet })) : [];
        } catch (_) {
          answer = content;
        }
      }
    } else {
      // simple fallback: keyword search
      const hay = (docA + '\n' + docB).toLowerCase();
      const q = question.toLowerCase().split(/\s+/).slice(0, 5);
      const found = q.find(w => hay.includes(w));
      answer = found ? 'Topik ditemukan dalam dokumen. Lihat AI Agent Feature Brief atau Minerva Brief untuk rinciannya.' : 'Tidak ditemukan konteks yang relevan di dokumen lokal.';
      citations = [{ title: 'Local Briefs', url: '#'}];
    }
    res.json({ answer, citations });
  } catch (e) {
    res.status(500).json({ error: 'legal qa failed' });
  }
});

// ---- Scrape + summarize ----
app.post('/api/scrape/summarize', async (req, res) => {
  try {
    const { url } = req.body || {};
    if (!url || !/^https?:\/\//i.test(url)) return res.status(400).json({ error: 'valid url required' });
    // lightweight fetch and parse
    let html = '';
    const resp = await fetchFn(url, { headers: { 'user-agent': 'Mozilla/5.0 MINERVA-Bot' }});
    if (!resp.ok) return res.status(502).json({ error: `fetch failed: ${resp.status}` });
    html = await resp.text();
    let title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [,''])[1].trim();
    let text = html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    text = text.slice(0, 12000);

    let summary = 'Ringkasan tidak tersedia.';
    let bullets = [];
    if (OPENAI_API_KEY) {
      const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.3,
          messages: [
            { role: 'system', content: 'Anda adalah peringkas legal/industri. Buat ringkasan singkat + 3-5 butir utama dan sebutkan isu hukum jika ada.' },
            { role: 'user', content: `Ringkas dan petakan isu dari konten berikut (maks 3-4 kalimat + bullets):\n\n${text}` }
          ]
        })
      });
      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content || '';
        summary = content;
      }
    } else {
      summary = (text || '').slice(0, 280) + '...';
    }
    res.json({ title, summary, citations: [{ title, url }] });
  } catch (e) {
    res.status(500).json({ error: 'scrape summarize failed' });
  }
});

// Serve static files if desired
app.use('/', express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


