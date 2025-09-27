function loadAIPage() {
    const aiPage = document.getElementById('aiPage');
    if (!aiPage) return;

    aiPage.innerHTML = `
        <style>
            .ai-agent-container { max-width: 1100px; margin: 0 auto; }
            .ai-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
            .ai-header h4 { margin: 0; }
            .quick-actions { display: flex; gap: .75rem; flex-wrap: wrap; margin-bottom: 1rem; }
            .quick-action { border: 1px solid var(--border-color); background: var(--card-bg); color: var(--text-color); padding: .6rem .9rem; border-radius: .75rem; font-weight: 600; display: inline-flex; align-items: center; gap: .35rem; transition: transform .15s ease, box-shadow .15s ease; }
            .quick-action:hover { transform: translateY(-1px); }
            .ai-chat { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 1rem; min-height: 220px; box-shadow: 0 2px 10px var(--shadow-color); }
            .msg { display: flex; margin-bottom: .75rem; }
            .msg.from-user { justify-content: flex-end; }
            .msg.from-assistant { justify-content: flex-start; }
            .bubble { max-width: 80%; padding: .6rem .8rem; border-radius: .75rem; }
            .msg.from-user .bubble { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: #fff; border-bottom-right-radius: .3rem; }
            .msg.from-assistant .bubble { background: rgba(4, 0, 222, 0.06); color: var(--text-color); border: 1px solid var(--border-color); border-bottom-left-radius: .3rem; }
            .msg.from-error .bubble { background: #f8d7da; color: #842029; border: 1px solid #f5c2c7; }
            .citations { display: flex; gap: .4rem; flex-wrap: wrap; margin-top: .35rem; }
            .citation-chip { font-size: .8rem; border: 1px solid var(--border-color); color: var(--text-color); background: var(--card-bg); padding: .15rem .45rem; border-radius: 999px; text-decoration: none; }
            .ai-input-row { display: flex; gap: .5rem; margin: .75rem 0 1.25rem; }
            .ai-panels { display: grid; grid-template-columns: 1fr; gap: 1rem; }
            @media(min-width: 992px){ .ai-panels { grid-template-columns: 1fr 1fr; } }
            .ai-panel { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 2px 10px var(--shadow-color); overflow: hidden; }
            .ai-panel .panel-title { font-weight: 700; padding: .9rem 1rem; border-bottom: 1px solid var(--border-color); color: var(--text-color); text-align: center; }
            .ai-panel .panel-body { padding: 1rem; }
            .badge-low { background: #d1e7dd; color: #0f5132; border: 1px solid #badbcc; padding: .2rem .5rem; border-radius: 999px; text-transform: uppercase; font-size: .75rem; font-weight: 700; }
            .badge-medium { background: #fff3cd; color: #664d03; border: 1px solid #ffecb5; padding: .2rem .5rem; border-radius: 999px; text-transform: uppercase; font-size: .75rem; font-weight: 700; }
            .badge-high { background: #f8d7da; color: #842029; border: 1px solid #f5c2c7; padding: .2rem .5rem; border-radius: 999px; text-transform: uppercase; font-size: .75rem; font-weight: 700; }
            .gauge { width: 110px; height: 110px; border-radius: 50%; background: conic-gradient(var(--c, #10b981) calc(var(--p,0)*1%), #e9ecef 0); display: grid; place-items: center; margin: 0 auto; }
            .gauge span { font-size: 1.5rem; font-weight: 800; color: var(--text-color); }
        </style>
        <div class="ai-agent-container">
            <div class="ai-header">
                <h4 class="text-gradient"><i class="fas fa-robot me-2"></i>MINERVA AI Agent</h4>
                <div class="small text-muted">RAG: Auto</div>
            </div>
            <div class="quick-actions" id="quickActions">
                <button class="quick-action" id="qaAnalyze" data-action="analyze" title="Alt+A">
                    <i class="fas fa-chart-line"></i>
                    <span>Analyze Contract</span>
                </button>
                <button class="quick-action" id="qaAtRisk" data-action="atrisk" title="Alt+R">
                    <i class="fas fa-triangle-exclamation"></i>
                    <span>List At-Risk</span>
                </button>
            </div>
            <div class="ai-chat" id="aiChat"></div>

            <div class="ai-input-row">
                <input id="aiInput" class="form-control" placeholder="Tanyakan apa saja tentang kontrak Anda..." />
                <button id="aiSendBtn" class="btn btn-primary"><i class="fas fa-paper-plane me-1"></i>Kirim</button>
                <button id="aiClearBtn" class="btn btn-outline-secondary" title="Hapus percakapan"><i class="fas fa-broom me-1"></i>Bersihkan</button>
            </div>

            <div class="ai-panels">
                <div class="ai-panel" id="analysisPanel">
                    <div class="panel-title"><i class="fas fa-gauge-high me-2"></i>Analysis</div>
                    <div class="panel-body" id="analysisBody">
                        <div class="row g-3">
                            <div class="col-12 col-md-4">
                                <div class="text-center">
                                    <div id="riskGauge" style="font-size: 2.5rem; font-weight: 700;">--</div>
                                    <small class="text-muted">Risk Score</small>
                                </div>
                            </div>
                            <div class="col-12 col-md-8">
                                <div id="analysisSummary" class="mb-2 text-muted">Belum ada ringkasan.</div>
                                <div class="table-responsive">
                                    <table class="table table-sm mb-0">
                                        <thead>
                                            <tr><th>Klausul</th><th>Risiko</th></tr>
                                        </thead>
                                        <tbody id="clausesTbody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ai-panel" id="recoPanel">
                    <div class="panel-title"><i class="fas fa-lightbulb me-2"></i>Recommendations</div>
                    <div class="panel-body" id="recoBody">Belum ada rekomendasi.</div>
                </div>
            </div>
        </div>
    `;

    const sendBtn = document.getElementById('aiSendBtn');
    const inputEl = document.getElementById('aiInput');
    const chatEl = document.getElementById('aiChat');
    let currentContractContext = null; // full object from contracts.js when available

    // Conversation persistence and replay
    const conversation = (() => { try { return JSON.parse(localStorage.getItem('ai_conversation')||'[]'); } catch(e){ return []; } })();
    function saveConversation() {
        try { localStorage.setItem('ai_conversation', JSON.stringify(conversation.slice(-20))); } catch(e) {}
    }
    // Load persisted contract context if any
    (function loadSavedContract(){
        try {
            const saved = localStorage.getItem('ai_current_contract');
            if (saved) currentContractContext = JSON.parse(saved);
        } catch(e) {}
    })();
    // Render past messages without duplicating into conversation
    function renderPastMessage(role, text) {
        const div = document.createElement('div');
        if (role === 'user') div.className = 'msg from-user';
        else if (role === 'assistant') div.className = 'msg from-assistant';
        else div.className = 'msg from-error';
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        if (/<[a-z][\s\S]*>/i.test(text)) { bubble.innerHTML = text; } else { bubble.textContent = text; }
        div.appendChild(bubble);
        chatEl.appendChild(div);
    }
    if (Array.isArray(conversation) && conversation.length) {
        conversation.forEach(m => renderPastMessage(m.role, m.content));
        chatEl.scrollTop = chatEl.scrollHeight;
    }

    function getField(obj, keys) {
        for (const k of keys) {
            if (obj && obj[k] != null && String(obj[k]).trim() !== '') return obj[k];
        }
        return '';
    }
    function getDisplayName(obj) {
        const nomor = getField(obj, ['nomorKontrak','nomor_kontrak','contractNumber','number','id']);
        const nama = getField(obj, ['namaProyek','nama_proyek','title','name']);
        return [nomor, nama].filter(Boolean).join(' — ');
    }
    // Helpers for persona/history
    function stripHtml(input) {
        try { return String(input).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); } catch(e) { return String(input||''); }
    }
    function buildHistoryPlainText(history) {
        try {
            const lines = history.map(m => `${m.role === 'assistant' ? 'A:' : 'Q:'} ${stripHtml(m.content)}`);
            return lines.slice(-12).join('\n');
        } catch(e) { return ''; }
    }
    function buildSystemPrompt() {
        return 'You are MINERVA AI Agent, an Indonesian contract analysis assistant for logistics, storage, stevedoring, and transportation. Always identify yourself as MINERVA, answer concisely in Indonesian when the user uses Indonesian, cite sources when provided by RAG, and use contract context if available.';
    }
    function buildRagQuery(contextPrefix, history) {
        const hist = buildHistoryPlainText(history||[]);
        const persona = 'Peran Anda adalah MINERVA AI Agent. Selalu jawab ringkas, jelas, dan gunakan bahasa Indonesia saat pengguna berbahasa Indonesia. Gunakan konteks kontrak jika diberikan.';
        const blocks = [
            `[INSTRUKSI MINERVA]\n${persona}`,
            currentContractContext ? `[KONTEKS KONTRAK]\n${buildContextDetails(currentContractContext)}` : '',
            hist ? `[PERCAKAPAN TERAKHIR]\n${hist}` : '',
            `[PERTANYAAN]\n${stripHtml(contextPrefix)}`
        ].filter(Boolean);
        return blocks.join('\n\n');
    }
    // Detect whether user is asking about legal/regulatory context
    function wantsLegal(text) {
        try {
            return /\b(legal|hukum|regulasi|peraturan|kepmen|kemenhub|pm\s*\d+|iso|undang[- ]?undang|uu)\b/i.test(text || '');
        } catch(_) { return false; }
    }
    // Detect repetitive/template legal findings to trigger enrichment
    function isTemplateLegal(result) {
        try {
            const findings = JSON.stringify(result||'').toLowerCase();
            const hasIso = findings.includes('iso 20858');
            const hasPm72 = findings.includes('pm 72/2017') || findings.includes('kemenhub pm 72');
            const fewCites = Array.isArray(result?.legal_citations) ? result.legal_citations.length < 2 : true;
            return (hasIso && hasPm72) || fewCites;
        } catch(_) { return true; }
    }
    async function enrichLegalCitations(result, history) {
        try {
            const jenis = currentContractContext?.jenisKontrak || result?.contract_type || 'Logistik';
            const q = `Identifikasi 3-6 peraturan Indonesia dan/atau standar internasional yang relevan untuk kontrak jenis "${jenis}" berdasarkan konteks kontrak. Untuk setiap sumber, berikan ringkasan 1 kalimat dan sertakan citation dengan URL. Balas ringkas.`;
            const ragRes = await fetch('/api/rag/query', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: buildRagQuery(q, history) })
            });
            if (!ragRes.ok) return;
            const data = await ragRes.json();
            const citations = Array.isArray(data?.citations) ? data.citations : [];
            const recoBody = document.getElementById('recoBody');
            if (recoBody) {
                if (citations.length) {
                    recoBody.innerHTML = '<ul class="mb-0">' + citations.map(c => `<li><a href="${c.url||'#'}" target="_blank" rel="noopener noreferrer">${stripHtml(c.title||'Sumber')}</a></li>`).join('') + '</ul>';
                } else if (typeof data?.answer === 'string' && data.answer.trim()) {
                    recoBody.textContent = stripHtml(data.answer);
                }
            }
            if (citations.length) {
                appendMessage('assistant', 'Sumber hukum terkait diperbarui dari pencarian:', citations);
            }
        } catch(_) {}
    }
    // Contracts availability for AI page
    function ensureContractsCache() {
        try {
            const cached = JSON.parse(localStorage.getItem('contracts_list')||'null');
            if (!cached || !cached.length) {
                let source = [];
                if (Array.isArray(window.contracts) && window.contracts.length) source = window.contracts;
                else if (typeof sampleContracts !== 'undefined' && Array.isArray(sampleContracts) && sampleContracts.length) source = sampleContracts;
                if (source.length) {
                    localStorage.setItem('contracts_list', JSON.stringify(source));
                    if (!Array.isArray(window.contracts) || !window.contracts.length) window.contracts = source;
                }
            }
        } catch(_) {}
    }
    function getContractsPool() {
        const cached = (() => { try { return JSON.parse(localStorage.getItem('contracts_list')||'null'); } catch(e){ return null; } })();
        if (cached && cached.length) return cached;
        if (Array.isArray(window.contracts) && window.contracts.length) return window.contracts;
        if (typeof sampleContracts !== 'undefined' && Array.isArray(sampleContracts) && sampleContracts.length) return sampleContracts;
        if (typeof window.sampleContractsGlobal !== 'undefined' && Array.isArray(window.sampleContractsGlobal)) return window.sampleContractsGlobal;
        return [];
    }

    function appendMessage(role, text, citations) {
        const div = document.createElement('div');
        if (role === 'user') div.className = 'msg from-user';
        else if (role === 'assistant') div.className = 'msg from-assistant';
        else div.className = 'msg from-error';
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        // basic HTML support for paragraphs/bullets
        if (/<[a-z][\s\S]*>/i.test(text)) {
            bubble.innerHTML = text;
        } else {
            bubble.textContent = text;
        }
        div.appendChild(bubble);
        if (Array.isArray(citations) && citations.length) {
            const cwrap = document.createElement('div');
            cwrap.className = 'citations';
            citations.forEach(c => {
                const a = document.createElement('a');
                a.className = 'citation-chip';
                a.href = c.url || '#';
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = c.title || 'Sumber';
                cwrap.appendChild(a);
            });
            div.appendChild(cwrap);
        }
        chatEl.appendChild(div);
        // persist to conversation
        conversation.push({ role: role === 'error' ? 'assistant' : role, content: typeof text === 'string' ? text : String(text) });
        saveConversation();
        chatEl.scrollTop = chatEl.scrollHeight;
    }

    async function sendMessage() {
        const text = inputEl.value.trim();
        if (!text) return;
        inputEl.value = '';
        sendBtn.disabled = true;
        const prevHTML = sendBtn.innerHTML;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Kirim';
        appendMessage('user', text);

        const history = conversation.slice(-10).map(m => ({ role: m.role, content: m.content }));
        const contextPrefix = currentContractContext ? `Konteks Kontrak Saat Ini:\n${buildContextDetails(currentContractContext)}\n\nPertanyaan: ${text}` : text;
        const askLegal = wantsLegal(text);

        // Always try RAG first; fallback to chat if unavailable
        try {
            const ragRes = await fetch('/api/rag/query', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: buildRagQuery(contextPrefix, history) })
            });
            if (ragRes.ok) {
                const ragData = await ragRes.json();
                const content = ragData?.answer || '(kosong)';
                const citations = Array.isArray(ragData?.citations) ? ragData.citations : [];
                appendMessage('assistant', content, citations);
                if (askLegal) { await enrichLegalCitations({}, history); }
            } else {
                // Fallback to chat
                const chatRes = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: [
                        { role: 'system', content: buildSystemPrompt() },
                        ...history,
                        { role: 'user', content: contextPrefix }
                    ] })
                });
                const chatData = await chatRes.json();
                const content = chatData?.choices?.[0]?.message?.content || '(kosong)';
                appendMessage('assistant', content);
                if (askLegal) { await enrichLegalCitations({}, history); }
            }
        } catch (_) {
            // Network or RAG error -> fallback to chat
            try {
                const chatRes = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: [
                        { role: 'system', content: buildSystemPrompt() },
                        ...history,
                        { role: 'user', content: contextPrefix }
                    ] })
                });
                const chatData = await chatRes.json();
                const content = chatData?.choices?.[0]?.message?.content || '(kosong)';
                appendMessage('assistant', content);
                if (askLegal) { await enrichLegalCitations({}, history); }
            } catch (e2) {
                appendMessage('assistant', 'RAG dan chat tidak tersedia. Pastikan server berjalan.');
            }
        }

        sendBtn.disabled = false;
        sendBtn.innerHTML = prevHTML;
    }

    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    const qa = document.getElementById('quickActions');
    qa.addEventListener('click', function(e) {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        if (action === 'analyze') {
            openContractPicker();
        } else if (action === 'atrisk') {
            listAtRisk();
        }
    });

    // Clear chat handler
    const clearBtn = document.getElementById('aiClearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            try { localStorage.removeItem('ai_conversation'); } catch(e) {}
            const aiChat = document.getElementById('aiChat');
            if (aiChat) aiChat.innerHTML = '';
            conversation.length = 0;
            appendMessage('assistant', '<small class="text-muted">Percakapan dibersihkan.</small>');
        });
    }

    // Contract selection state
    let selectedContract = null;

    function openContractPicker() {
        const modalEl = document.getElementById('contractPickerModal');
        const modal = new bootstrap.Modal(modalEl);
        const pickerResults = document.getElementById('pickerResults');
        const pickerSearch = document.getElementById('pickerSearch');
        const pickerSearchBtn = document.getElementById('pickerSearchBtn');

        async function doSearch() {
            const q = (pickerSearch.value || '').trim();
            pickerResults.innerHTML = '<div class="list-group-item text-muted">Mencari...</div>';
            // Prefer contracts.js or cached localStorage list
            const cached = (() => { try { return JSON.parse(localStorage.getItem('contracts_list')||'null'); } catch(e){ return null; } })();
            const pool = getContractsPool();
            const hasFrontContracts = pool && pool.length;
            if (hasFrontContracts) {
                const list = pool;
                const items = list.filter(c =>
                    (String(c.nomorKontrak||'').toLowerCase().includes(q.toLowerCase())) ||
                    (String(c.namaProyek||'').toLowerCase().includes(q.toLowerCase()))
                ).slice(0, 50);
                renderPicker(items.map(c => ({ id: c.id, nomor_kontrak: c.nomorKontrak, title: c.namaProyek })));
            } else {
                const r = await fetch(`/api/contracts?search=${encodeURIComponent(q)}`);
                const data = await r.json();
                renderPicker(data.items || []);
            }
        }

        function renderPicker(items) {
            pickerResults.innerHTML = '';
            if (!items.length) {
                pickerResults.innerHTML = '<div class="list-group-item text-muted">Tidak ada hasil</div>';
                return;
            }
            items.forEach(item => {
                const a = document.createElement('a');
                a.href = '#';
                a.className = 'list-group-item list-group-item-action';
                a.textContent = `${item.nomor_kontrak} — ${item.title}`;
                a.addEventListener('click', async function(ev) {
                    ev.preventDefault();
                    const cached = (() => { try { return JSON.parse(localStorage.getItem('contracts_list')||'null'); } catch(e){ return null; } })();
                    const pool = getContractsPool();
                    if (pool && pool.length) {
                        const local = pool.find(c => String(c.id) === String(item.id));
                        currentContractContext = local || null;
                        selectedContract = local ? { id: item.id, nomor_kontrak: local.nomorKontrak || item.nomor_kontrak, title: local.namaProyek || item.title, text: buildTextFromContract(local) } : null;
                    } else {
                        const d = await (await fetch(`/api/contracts/${item.id}`)).json();
                        selectedContract = d;
                        currentContractContext = null;
                    }
                    // persist selected contract context for continuity and consistent naming
                    try { localStorage.setItem('ai_current_contract', JSON.stringify(currentContractContext || selectedContract || {})); } catch(e) {}
                    modal.hide();
                    // show which contract is in context
                    if (currentContractContext) {
                        appendMessage('assistant', `<small class="text-muted">Konteks kontrak diatur: ${getDisplayName(currentContractContext)}</small>`);
                    }
                    runAnalysis();
                });
                pickerResults.appendChild(a);
            });
        }

        pickerSearchBtn.onclick = doSearch;
        pickerSearch.onkeydown = function(e){ if (e.key === 'Enter') { e.preventDefault(); doSearch(); } };
        pickerResults.innerHTML = '';
        pickerSearch.value = '';
        modal.show();
        setTimeout(doSearch, 50);
    }

    function buildTextFromContract(c) {
        return buildContextDetails(c);
    }

    function buildContextDetails(c) {
        if (!c) return '';
        const currency = c.mataUang || 'IDR';
        const lines = [
            `Nomor Kontrak: ${c.nomorKontrak}`,
            `Nama Proyek: ${c.namaProyek}`,
            `Jenis Kontrak: ${c.jenisKontrak}`,
            `Status: ${c.status}`,
            `Nilai Kontrak: ${currency} ${c.nilaiKontrak}`,
            `Tanggal Mulai: ${c.tglMulai}`,
            `Tanggal Selesai: ${c.tglSelesai}`,
            `Nama PIC: ${c.namaPic}`,
            `Kontak Resmi: ${c.kontakResmi}`,
            `NPWP: ${c.npwp}`,
            `Alamat: ${c.alamat}`,
            `Asuransi: ${c.asuransi ? 'Ya' : 'Tidak'}`,
            `Termin Pembayaran: ${c.terminPembayaran}`,
            `Metode Pembayaran: ${c.metodePembayaran}`,
            `PPN: ${c.ppn}%`,
            `Pajak Lainnya: ${currency} ${c.pajakLainnya}`,
            `Penalti Terlambat: ${currency} ${c.penaltiTerlambat}`,
            `Hari Penalti: ${c.hariPenalti} hari`,
            `Dokumen Lampiran: ${c.dokumenLampiran}`,
            `Tanggal Pengajuan: ${c.tglPengajuan}`,
            `Dibuat: ${c.createdAt}`,
            `Diperbarui: ${c.updatedAt}`
        ];
        return lines.filter(Boolean).join('\n');
    }

    function escapeHtml(s) {
        return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    async function runAnalysis() {
        const analyzeBtn = document.getElementById('qaAnalyze');
        const prev = analyzeBtn.innerHTML;
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i><span>Menganalisis...</span>';
        const sampleContract = 'Nomor Kontrak: SAMPLE_001\nNilai: IDR 0\nTermin: -\nPenalti: 0';
        const textToAnalyze = selectedContract?.text || sampleContract;
        const res = await fetch('/api/analysis/run', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ runType: 'risk', contractText: textToAnalyze })
        });
        const { runId } = await res.json();
        appendMessage('user', `Analisis kontrak: ${selectedContract?.nomor_kontrak || selectedContract?.title || 'Sample'}`);
        pollAnalysis(runId, function() { analyzeBtn.disabled = false; analyzeBtn.innerHTML = prev; });
    }

    async function pollAnalysis(runId, done) {
        const poll = setInterval(async () => {
            const r = await fetch(`/api/analysis/run/${runId}`);
            const data = await r.json();
            if (data.status === 'completed') {
                clearInterval(poll);
                updateAnalysisUI(data.result);
                const r = data.result || {};
                const items = (r.clauses||[]).map(c => {
                    const lvl = (c.risk_level||'low').toUpperCase();
                    const why = c.why ? `<br><em>Alasan:</em> ${escapeHtml(c.why)}` : '';
                    const act = c.action ? `<br><em>Mitigasi:</em> ${escapeHtml(c.action)}` : '';
                    return `<li><strong>${escapeHtml(c.type)}</strong> — <span>${lvl}</span>${why}${act}</li>`;
                }).join('');
                const legal = '';
                const findings = '';
                const nextSteps = Array.isArray(r.next_steps) ? r.next_steps : [];
                const stepsList = nextSteps.length ? (`<br><strong>Tindakan Prioritas:</strong><ol>` + nextSteps.map(s => `<li>${escapeHtml(s)}</li>`).join('') + `</ol>`) : '';
                const html = `<strong>Ringkasan:</strong> ${escapeHtml(r.summary||'—')}<br><br><strong>Skor Risiko:</strong> ${r.risk_score ?? '--'}<br><ul>${items}</ul>${legal}${findings}${stepsList}`;
                const cites = Array.isArray(r.legal_citations) ? r.legal_citations : [];
                appendMessage('assistant', html, cites);
                // Update Recommendations panel if available
                const recoBody = document.getElementById('recoBody');
                if (recoBody) {
                    if (nextSteps.length) {
                        recoBody.innerHTML = '<ol class="mb-0">' + nextSteps.map(s => `<li>${escapeHtml(s)}</li>`).join('') + '</ol>';
                    } else {
                        recoBody.textContent = 'Belum ada rekomendasi.';
                    }
                }
                // If legal findings look templated, enrich with dynamic citations via RAG
                if (isTemplateLegal(r)) {
                    const history = conversation.slice(-10).map(m => ({ role: m.role, content: m.content }));
                    enrichLegalCitations(r, history);
                }
                if (typeof done === 'function') done();
            }
        }, 500);
    }

    function updateAnalysisUI(result) {
        const riskGauge = document.getElementById('riskGauge');
        const analysisSummary = document.getElementById('analysisSummary');
        const tbody = document.getElementById('clausesTbody');
        const score = result?.risk_score ?? 0;
        riskGauge.innerHTML = `<div class="gauge" style="--p:${score}; --c:${score>=75?'#ef4444':score>=50?'#f59e0b':'#10b981'}"><span>${score}</span></div>`;
        analysisSummary.textContent = result?.summary || '—';
        tbody.innerHTML = '';
        (result?.clauses || []).forEach(c => {
            const tr = document.createElement('tr');
            const level = (c.risk_level||'low').toLowerCase();
            const badgeClass = level === 'high' ? 'badge-high' : level === 'medium' ? 'badge-medium' : 'badge-low';
            const why = c.why ? ` — <small class="text-muted">${escapeHtml(c.why)}</small>` : '';
            const action = c.action ? `<br><small><em>Mitigasi:</em> ${escapeHtml(c.action)}</small>` : '';
            tr.innerHTML = `<td>${c.type}${why}${action}</td><td><span class="badge ${badgeClass}">${level}</span></td>`;
            tbody.appendChild(tr);
        });
    }

    async function listAtRisk() {
        const atBtn = document.getElementById('qaAtRisk');
        const prev = atBtn.innerHTML;
        atBtn.disabled = true;
        atBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i><span>Memuat...</span>';
        const r = await fetch('/api/analysis/atrisk');
        const data = await r.json();
        const tbody = document.getElementById('clausesTbody');
        const analysisSummary = document.getElementById('analysisSummary');
        analysisSummary.textContent = 'Kontrak berisiko tinggi:';
        tbody.innerHTML = '';
        (data.items || []).forEach(it => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${it.nomor_kontrak} - ${it.title}</td><td><span class="badge bg-secondary">${it.risk_score}</span></td>`;
            tbody.appendChild(tr);
        });
        document.getElementById('riskGauge').textContent = '--';
        atBtn.disabled = false;
        atBtn.innerHTML = prev;
        // show current contract label if any
        if (currentContractContext) {
            appendMessage('assistant', `<small class=\"text-muted\">Konteks kontrak: ${getDisplayName(currentContractContext)}</small>`);
        }
    }

    // RAG is always on; no sendMessage override needed
}

// Hook into page switch to hide top navbar and focus single-column layout
document.addEventListener('click', function(e) {
    const link = e.target.closest('.nav-link');
    if (!link) return;
    if (link.getAttribute('onclick')?.includes("'ai'")) {
        const topbar = document.querySelector('.top-navbar');
        if (topbar) topbar.classList.add('hidden');
        setTimeout(loadAIPage, 0);
    } else {
        const topbar = document.querySelector('.top-navbar');
        if (topbar) topbar.classList.remove('hidden');
    }
});

// Auto-load analysis if ai.html?contractId=123 and contracts list is present
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const cid = params.get('contractId');
    if (cid && typeof window !== 'undefined') {
        setTimeout(() => {
            if (Array.isArray(window.contracts) && window.contracts.length) {
                const c = window.contracts.find(x => String(x.id) === String(cid));
                if (c) {
                    const aiPage = document.getElementById('aiPage');
                    if (!aiPage) return;
                }
            }
        }, 300);
    }
});

