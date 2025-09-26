// Chat Interface untuk halaman komunikasi
class ChatInterface {
    constructor(role = 'client') {
        this.role = role;
        this.messages = [];
        this.isConnected = false;
        this.currentChatUser = null;
        this.isVideoCallActive = false;
        this.localStream = null;
        this.remoteStream = null;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.notes = [];
        this.speechRecognition = null;
        this.isTranscribing = false;
        this.transcriptionText = '';
        this.transcriptionHistory = [];
        this.videoChatMessages = [];
        this.isChatPanelVisible = true;
        this.isScreenSharing = false;
        this.screenStream = null;
        this.init();
    }

    init() {
    // Simulasi koneksi chat
        this.isConnected = true;
        
        if (this.role === 'admin') {
            // Untuk admin, tidak ada pesan awal sampai user dipilih
            this.messages = [];
            this.currentChatUser = null;
            this.availableUsers = [
                {
                    id: "user1",
                    name: "Ahmad Wijaya",
                    company: "PT. Maju Jaya",
                    status: "online",
                    lastMessage: "Terima kasih atas bantuannya",
                    lastMessageTime: new Date(Date.now() - 300000),
                    unreadCount: 2
                },
                {
                    id: "user2", 
                    name: "Siti Nurhaliza",
                    company: "CV. Sukses Mandiri",
                    status: "offline",
                    lastMessage: "Kapan kontrak akan selesai?",
                    lastMessageTime: new Date(Date.now() - 600000),
                    unreadCount: 0
                },
                {
                    id: "user3",
                    name: "Budi Santoso",
                    company: "PT. Berkah Abadi",
                    status: "online",
                    lastMessage: "Baik, saya akan menunggu",
                    lastMessageTime: new Date(Date.now() - 120000),
                    unreadCount: 1
                },
                {
                    id: "user4",
                    name: "Maya Sari",
                    company: "UD. Makmur Sejahtera",
                    status: "online",
                    lastMessage: "Apakah ada update terbaru?",
                    lastMessageTime: new Date(Date.now() - 180000),
                    unreadCount: 3
                }
            ];
        } else {
            // Untuk client, tampilkan pesan awal dengan support team
            this.messages = [
      {
        id: "1",
        senderId: "admin",
        receiverId: "user",
        content: "Selamat datang di Portal Klien PT.ILSC! Ada yang bisa saya bantu?",
        timestamp: new Date(Date.now() - 60000),
        type: "text"
      },
      {
        id: "2",
        senderId: "user",
        receiverId: "admin",
        content: "Halo, saya ingin menanyakan status kontrak saya",
        timestamp: new Date(Date.now() - 30000),
        type: "text"
      },
      {
        id: "3",
        senderId: "admin",
        receiverId: "user",
        content: "Baik, bisa tolong berikan nomor kontrak Anda?",
        timestamp: new Date(),
        type: "text"
      }
            ];
        }
    }

    render() {
        if (this.role === 'admin') {
            return this.renderAdminInterface();
        } else {
            return this.renderClientInterface();
        }
    }

    renderAdminInterface() {
        return `
            <div class="row h-100 m-0">
                <!-- User List Sidebar -->
                <div class="col-md-4 p-0 border-end">
                    <div class="p-3 border-bottom bg-light">
                        <h6 class="mb-0"><i class="fas fa-users me-2"></i>Daftar Klien</h6>
                    </div>
                    <div class="user-list" style="height: calc(100% - 60px); overflow-y: auto;">
                        ${this.availableUsers.map(user => this.renderUserItem(user)).join('')}
                    </div>
                </div>
                
                <!-- Chat Area -->
                <div class="col-md-8 p-0 d-flex flex-column">
                    ${this.currentChatUser ? this.renderChatArea() : this.renderNoChatSelected()}
                </div>
            </div>
        `;
    }

    renderClientInterface() {
        return `
            <div class="card chat-container">
                <!-- Header -->
                <div class="p-4 border-bottom bg-light">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px;">
                                <span class="text-white fw-bold">S</span>
                            </div>
                            <div>
                                <h5 class="mb-0 text-dark">Support Team</h5>
                                <small class="text-muted">PT.ILSC Customer Service</small>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <div class="chat-status">
                                <div class="status-indicator ${this.isConnected ? 'online' : 'offline'}"></div>
                                <small class="text-muted fw-medium">
                                    ${this.isConnected ? 'Online' : 'Offline'}
                                </small>
                            </div>
                            <button id="startVideoCallBtn" class="btn btn-success btn-sm" title="Start Video Call">
                                <i class="fas fa-video"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Video Call Area -->
                <div id="videoCallArea" class="video-call-area" style="display: none;">
                    <div class="video-call-container">
                        <!-- Video and Chat Layout -->
                        <div class="video-chat-layout">
                            <!-- Main Video Area -->
                            <div class="main-video-area">
                                <video id="localVideo" autoplay playsinline muted></video>
                                
                                <!-- Remote Video (Lawan Bicara) - Pojok Kanan Atas -->
                                <div class="remote-video-container">
                                    <video id="remoteVideo" autoplay playsinline></video>
                                    <div class="video-overlay">
                                        <span class="user-name">${this.role === 'admin' ? (this.currentChatUser ? this.currentChatUser.name : 'Support Team') : 'Support Team'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Chat Panel -->
                            <div class="video-chat-panel">
                                <div class="chat-panel-header">
                                    <h6 class="mb-0">
                                        <i class="fas fa-comments me-2"></i>Chat Video Call
                                    </h6>
                                    <button id="toggleChatPanel" class="btn btn-sm btn-outline-secondary">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div class="chat-panel-content">
                                    <div id="videoChatMessages" class="video-chat-messages">
                                        <!-- Chat messages will be added here -->
                                    </div>
                                    <div class="video-chat-input">
                                        <form id="videoChatForm" class="d-flex gap-2">
                                            <input
                                                type="text"
                                                id="videoChatInput"
                                                class="form-control form-control-sm"
                                                placeholder="Ketik pesan untuk peserta..."
                                                required
                                            />
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-sm"
                                                id="sendVideoChatBtn"
                                            >
                                                <i class="fas fa-paper-plane"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Video Controls Panel -->
                        <div class="video-controls-panel">
                            <div class="controls-row">
                                <button id="toggleMuteBtn" class="btn btn-outline-light btn-sm control-btn" title="Mute/Unmute">
                                    <i class="fas fa-microphone"></i>
                                </button>
                                <button id="toggleCameraBtn" class="btn btn-outline-light btn-sm control-btn" title="Camera On/Off">
                                    <i class="fas fa-video"></i>
                                </button>
                                <button id="recordBtn" class="btn btn-outline-light btn-sm control-btn" title="Start/Stop Recording">
                                    <i class="fas fa-circle"></i>
                                </button>
                                <button id="transcribeBtn" class="btn btn-outline-light btn-sm control-btn" title="Start/Stop Speech Transcription">
                                    <i class="fas fa-microphone-alt"></i>
                                </button>
                                <button id="notesBtn" class="btn btn-outline-light btn-sm control-btn" title="Show/Hide Notes">
                                    <i class="fas fa-sticky-note"></i>
                                </button>
                                <button id="chatToggleBtn" class="btn btn-outline-light btn-sm control-btn" title="Toggle Chat Panel">
                                    <i class="fas fa-comments"></i>
                                </button>
                                <button id="shareScreenBtn" class="btn btn-outline-light btn-sm control-btn" title="Share Screen">
                                    <i class="fas fa-share"></i>
                                </button>
                                <button id="endCallBtn" class="btn btn-danger btn-sm control-btn" title="End Call">
                                    <i class="fas fa-phone-slash"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Notes Panel -->
                        <div id="notesPanel" class="notes-panel" style="display: none;">
                            <div class="notes-header">
                                <h6 class="mb-0">Notulensi Video Call</h6>
                                <button id="closeNotesBtn" class="btn btn-sm btn-outline-secondary">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="notes-content">
                                <div id="notesList" class="notes-list">
                                    <!-- Notes will be added here -->
                                </div>
                                <div class="notes-input">
                                    <input type="text" id="noteInput" class="form-control form-control-sm" placeholder="Tambah catatan...">
                                    <button id="addNoteBtn" class="btn btn-primary btn-sm">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Messages -->
                <div class="chat-messages">
                    ${this.messages.map(message => this.renderMessage(message)).join('')}
                    <div id="messagesEnd"></div>
                </div>
                
                <!-- Input -->
                <div class="chat-input">
                    <form id="chatForm" class="d-flex gap-2">
                        <input
                            type="text"
                            id="messageInput"
                            class="form-control"
                            placeholder="Ketik pesan Anda..."
                            required
                        />
                        <button
                            type="submit"
                            class="btn btn-primary"
                            id="sendButton"
                        >
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;
    }

    renderUserItem(user) {
        const isActive = this.currentChatUser && this.currentChatUser.id === user.id;
        return `
            <div class="user-item p-3 border-bottom cursor-pointer ${isActive ? 'bg-primary text-white' : ''}" 
                 onclick="selectUser('${user.id}')" style="cursor: pointer;">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <div class="user-avatar me-3">
                            <div class="bg-secondary rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 40px; height: 40px;">
                                <span class="text-white fw-bold">${user.name.charAt(0)}</span>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-0">${user.name}</h6>
                            <small class="text-muted">${user.company}</small>
                        </div>
                    </div>
                    <div class="text-end">
                        <div class="d-flex align-items-center">
                            <div class="status-indicator ${user.status === 'online' ? 'online' : 'offline'} me-2"></div>
                            ${user.unreadCount > 0 ? `<span class="badge bg-danger">${user.unreadCount}</span>` : ''}
                        </div>
                        <small class="text-muted">${this.formatTime(user.lastMessageTime)}</small>
                    </div>
                </div>
                <div class="mt-2">
                    <small class="text-muted">${user.lastMessage}</small>
                </div>
            </div>
        `;
    }

    renderNoChatSelected() {
        return `
            <div class="d-flex align-items-center justify-content-center h-100 no-chat-selected">
                <div class="text-center">
                    <i class="fas fa-comments fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">Pilih klien untuk memulai percakapan</h5>
                    <p class="text-muted">Klik pada nama klien di sidebar untuk memulai chat</p>
                </div>
            </div>
        `;
    }

    renderChatArea() {
        return `
            <div class="h-100 d-flex flex-column">
                <!-- Chat Header -->
                <div class="p-3 border-bottom bg-light">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-3" 
                                 style="width: 40px; height: 40px;">
                                <span class="text-white fw-bold">${this.currentChatUser.name.charAt(0)}</span>
                            </div>
                            <div>
                                <h6 class="mb-0">${this.currentChatUser.name}</h6>
                                <small class="text-muted">${this.currentChatUser.company}</small>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <div class="chat-status">
                                <div class="status-indicator ${this.currentChatUser.status === 'online' ? 'online' : 'offline'}"></div>
                                <small class="text-muted fw-medium">
                                    ${this.currentChatUser.status === 'online' ? 'Online' : 'Offline'}
                                </small>
                            </div>
                            <button id="startVideoCallBtn" class="btn btn-success btn-sm" title="Start Video Call">
                                <i class="fas fa-video"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Video Call Area -->
                <div id="videoCallArea" class="video-call-area" style="display: none;">
                    <div class="video-call-container">
                        <!-- Video and Chat Layout -->
                        <div class="video-chat-layout">
                            <!-- Main Video Area -->
                            <div class="main-video-area">
                                <video id="localVideo" autoplay playsinline muted></video>
                                
                                <!-- Remote Video (Lawan Bicara) - Pojok Kanan Atas -->
                                <div class="remote-video-container">
                                    <video id="remoteVideo" autoplay playsinline></video>
                                    <div class="video-overlay">
                                        <span class="user-name">${this.currentChatUser.name}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Chat Panel -->
                            <div class="video-chat-panel">
                                <div class="chat-panel-header">
                                    <h6 class="mb-0">
                                        <i class="fas fa-comments me-2"></i>Chat Video Call
                                    </h6>
                                    <button id="toggleChatPanel" class="btn btn-sm btn-outline-secondary">
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div class="chat-panel-content">
                                    <div id="videoChatMessages" class="video-chat-messages">
                                        <!-- Chat messages will be added here -->
                                    </div>
                                    <div class="video-chat-input">
                                        <form id="videoChatForm" class="d-flex gap-2">
                                            <input
                                                type="text"
                                                id="videoChatInput"
                                                class="form-control form-control-sm"
                                                placeholder="Ketik pesan untuk ${this.currentChatUser.name}..."
                                                required
                                            />
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-sm"
                                                id="sendVideoChatBtn"
                                            >
                                                <i class="fas fa-paper-plane"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Video Controls Panel -->
                        <div class="video-controls-panel">
                            <div class="controls-row">
                                <button id="toggleMuteBtn" class="btn btn-outline-light btn-sm control-btn" title="Mute/Unmute">
                                    <i class="fas fa-microphone"></i>
                                </button>
                                <button id="toggleCameraBtn" class="btn btn-outline-light btn-sm control-btn" title="Camera On/Off">
                                    <i class="fas fa-video"></i>
                                </button>
                                <button id="recordBtn" class="btn btn-outline-light btn-sm control-btn" title="Start/Stop Recording">
                                    <i class="fas fa-circle"></i>
                                </button>
                                <button id="transcribeBtn" class="btn btn-outline-light btn-sm control-btn" title="Start/Stop Speech Transcription">
                                    <i class="fas fa-microphone-alt"></i>
                                </button>
                                <button id="notesBtn" class="btn btn-outline-light btn-sm control-btn" title="Show/Hide Notes">
                                    <i class="fas fa-sticky-note"></i>
                                </button>
                                <button id="chatToggleBtn" class="btn btn-outline-light btn-sm control-btn" title="Toggle Chat Panel">
                                    <i class="fas fa-comments"></i>
                                </button>
                                <button id="shareScreenBtn" class="btn btn-outline-light btn-sm control-btn" title="Share Screen">
                                    <i class="fas fa-share"></i>
                                </button>
                                <button id="endCallBtn" class="btn btn-danger btn-sm control-btn" title="End Call">
                                    <i class="fas fa-phone-slash"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Notes Panel -->
                        <div id="notesPanel" class="notes-panel" style="display: none;">
                            <div class="notes-header">
                                <h6 class="mb-0">Notulensi Video Call</h6>
                                <button id="closeNotesBtn" class="btn btn-sm btn-outline-secondary">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="notes-content">
                                <div id="notesList" class="notes-list">
                                    <!-- Notes will be added here -->
                                </div>
                                <div class="notes-input">
                                    <input type="text" id="noteInput" class="form-control form-control-sm" placeholder="Tambah catatan...">
                                    <button id="addNoteBtn" class="btn btn-primary btn-sm">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Messages -->
                <div class="chat-messages flex-grow-1">
                    ${this.messages.map(message => this.renderMessage(message)).join('')}
                    <div id="messagesEnd"></div>
                </div>
                
                <!-- Input -->
                <div class="chat-input">
                    <form id="chatForm" class="d-flex gap-2">
                        <input
                            type="text"
                            id="messageInput"
                            class="form-control"
                            placeholder="Ketik pesan untuk ${this.currentChatUser.name}..."
                            required
                        />
                        <button
                            type="submit"
                            class="btn btn-primary"
                            id="sendButton"
                        >
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        `;
    }

    renderMessage(message) {
        // Untuk admin interface, pesan dari admin ditampilkan di kiri, pesan dari user di kanan
        // Untuk client interface, pesan dari user ditampilkan di kanan, pesan dari admin di kiri
        let isUser;
        if (this.role === 'admin') {
            // Admin interface: admin messages on left, user messages on right
            isUser = message.senderId !== "admin";
        } else {
            // Client interface: user messages on right, admin messages on left
            isUser = message.senderId === "user";
        }
        
        return `
            <div class="chat-message ${isUser ? 'user' : 'admin'}">
                <div class="message-bubble ${isUser ? 'user' : 'admin'}">
                    <p class="mb-1">${message.content}</p>
                    <div class="message-time">
                        ${this.formatTime(message.timestamp)}
                    </div>
                </div>
            </div>
        `;
    }

    formatTime(date) {
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    handleSendMessage(e) {
    e.preventDefault();
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;

        if (this.role === 'admin') {
            if (!this.currentChatUser) return;
            
            const newMessage = {
                id: Date.now().toString(),
                senderId: "admin",
                receiverId: this.currentChatUser.id,
                content: message,
                timestamp: new Date(),
                type: "text"
            };

            this.messages.push(newMessage);
            messageInput.value = "";
            this.updateMessagesDisplay();

            // Simulasi balasan user
            setTimeout(() => {
                const reply = {
                    id: (Date.now() + 1).toString(),
                    senderId: this.currentChatUser.id,
                    receiverId: "admin",
                    content: "Terima kasih atas balasan Anda. Saya akan menunggu informasi lebih lanjut.",
                    timestamp: new Date(),
                    type: "text"
                };
                this.messages.push(reply);
                this.updateMessagesDisplay();
            }, 1500);
        } else {
            const newMessage = {
      id: Date.now().toString(),
      senderId: "user",
      receiverId: "admin",
                content: message,
      timestamp: new Date(),
      type: "text"
    };

            this.messages.push(newMessage);
            messageInput.value = "";
            this.updateMessagesDisplay();

    // Simulasi balasan admin
    setTimeout(() => {
                const reply = {
        id: (Date.now() + 1).toString(),
        senderId: "admin",
        receiverId: "user",
        content: "Terima kasih atas pesan Anda. Tim kami akan segera merespons.",
        timestamp: new Date(),
        type: "text"
      };
                this.messages.push(reply);
                this.updateMessagesDisplay();
    }, 1000);
        }
    }

    selectUser(userId) {
        this.currentChatUser = this.availableUsers.find(user => user.id === userId);
        
        // Simulasi pesan untuk user yang dipilih
        this.messages = [
            {
                id: "1",
                senderId: userId,
                receiverId: "admin",
                content: `Halo, saya ${this.currentChatUser.name} dari ${this.currentChatUser.company}. Ada yang bisa saya bantu?`,
                timestamp: new Date(Date.now() - 300000),
                type: "text"
            },
            {
                id: "2",
                senderId: "admin",
                receiverId: userId,
                content: `Halo ${this.currentChatUser.name}! Selamat datang di layanan support PT.ILSC. Ada yang bisa saya bantu?`,
                timestamp: new Date(Date.now() - 240000),
                type: "text"
            },
            {
                id: "3",
                senderId: userId,
                receiverId: "admin",
                content: this.currentChatUser.lastMessage,
                timestamp: this.currentChatUser.lastMessageTime,
                type: "text"
            }
        ];

        // Reset unread count
        this.currentChatUser.unreadCount = 0;
        
        this.updateDisplay();
    }

    updateMessagesDisplay() {
        const messagesContainer = document.querySelector('.chat-messages');
        if (messagesContainer) {
            const messagesHTML = this.messages.map(message => this.renderMessage(message)).join('');
            messagesContainer.innerHTML = messagesHTML + '<div id="messagesEnd"></div>';
            this.scrollToBottom();
        }
    }

    updateDisplay() {
        if (this.role === 'admin') {
            // Update user list
            const userList = document.querySelector('.user-list');
            if (userList) {
                userList.innerHTML = this.availableUsers.map(user => this.renderUserItem(user)).join('');
            }
            
            // Update chat area
            const chatArea = document.querySelector('.col-md-8.d-flex.flex-column');
            if (chatArea) {
                chatArea.innerHTML = this.currentChatUser ? this.renderChatArea() : this.renderNoChatSelected();
            }
        }
        
        // Re-attach event listeners
        setTimeout(() => {
            this.attachEventListeners();
        }, 100);
    }

    scrollToBottom() {
        const messagesEnd = document.getElementById('messagesEnd');
        if (messagesEnd) {
            messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }

    attachEventListeners() {
        const chatForm = document.getElementById('chatForm');
        if (chatForm) {
            chatForm.addEventListener('submit', (e) => this.handleSendMessage(e));
        }

        // Video call controls event listeners
        const startVideoCallBtn = document.getElementById('startVideoCallBtn');
        const endCallBtn = document.getElementById('endCallBtn');
        const toggleMuteBtn = document.getElementById('toggleMuteBtn');
        const toggleCameraBtn = document.getElementById('toggleCameraBtn');
        const recordBtn = document.getElementById('recordBtn');
        const transcribeBtn = document.getElementById('transcribeBtn');
        const notesBtn = document.getElementById('notesBtn');
        const closeNotesBtn = document.getElementById('closeNotesBtn');
        const addNoteBtn = document.getElementById('addNoteBtn');
        const noteInput = document.getElementById('noteInput');
        const toggleChatPanelBtn = document.getElementById('toggleChatPanel');
        const chatToggleBtn = document.getElementById('chatToggleBtn');
        const shareScreenBtn = document.getElementById('shareScreenBtn');
        const videoChatForm = document.getElementById('videoChatForm');
        const videoChatInput = document.getElementById('videoChatInput');

        // Debug: Log available buttons
        console.log('Video call buttons found:', {
            startVideoCallBtn: !!startVideoCallBtn,
            endCallBtn: !!endCallBtn,
            toggleMuteBtn: !!toggleMuteBtn,
            toggleCameraBtn: !!toggleCameraBtn,
            recordBtn: !!recordBtn,
            transcribeBtn: !!transcribeBtn,
            notesBtn: !!notesBtn
        });

        if (startVideoCallBtn) {
            startVideoCallBtn.addEventListener('click', () => this.startVideoCall());
        }
        if (endCallBtn) {
            endCallBtn.addEventListener('click', () => this.endVideoCall());
        }
        if (toggleMuteBtn) {
            toggleMuteBtn.addEventListener('click', () => this.toggleMute());
        }
        if (toggleCameraBtn) {
            toggleCameraBtn.addEventListener('click', () => this.toggleCamera());
        }
        if (recordBtn) {
            recordBtn.addEventListener('click', () => this.toggleRecording());
        }
        if (transcribeBtn) {
            transcribeBtn.addEventListener('click', () => this.toggleTranscription());
        }
        if (notesBtn) {
            notesBtn.addEventListener('click', () => this.toggleNotesPanel());
        }
        if (closeNotesBtn) {
            closeNotesBtn.addEventListener('click', () => this.toggleNotesPanel());
        }
        if (addNoteBtn) {
            addNoteBtn.addEventListener('click', () => this.addNote());
        }
        if (noteInput) {
            noteInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addNote();
                }
            });
        }
        if (toggleChatPanelBtn) {
            toggleChatPanelBtn.addEventListener('click', () => this.toggleChatPanel());
        }
        if (chatToggleBtn) {
            chatToggleBtn.addEventListener('click', () => this.toggleChatPanel());
        }
        if (shareScreenBtn) {
            shareScreenBtn.addEventListener('click', () => this.toggleScreenShare());
        }
        if (videoChatForm) {
            videoChatForm.addEventListener('submit', (e) => this.handleVideoChatMessage(e));
        }
        if (videoChatInput) {
            videoChatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleVideoChatMessage(e);
                }
            });
        }
    }

    // Video call functionality
    async startVideoCall() {
        try {
            // Request camera and microphone access
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            // Display local video
            const localVideo = document.getElementById('localVideo');
            if (localVideo) {
                localVideo.srcObject = this.localStream;
            }

            // Simulate remote video (using same camera for demo)
            const remoteVideo = document.getElementById('remoteVideo');
            if (remoteVideo) {
                // For demo purposes, use the same stream for remote video
                // In real implementation, this would come from WebRTC
                remoteVideo.srcObject = this.localStream;
            }

            // Show video call area
            const videoCallArea = document.getElementById('videoCallArea');
            if (videoCallArea) {
                videoCallArea.style.display = 'block';
                console.log('Video call area displayed');
            }

            // Hide chat messages during video call
            const chatMessages = document.querySelector('.chat-messages');
            if (chatMessages) {
                chatMessages.style.display = 'none';
            }

            // Ensure controls panel is visible
            const controlsPanel = document.querySelector('.video-controls-panel');
            if (controlsPanel) {
                controlsPanel.style.display = 'flex';
                controlsPanel.style.visibility = 'visible';
                controlsPanel.style.opacity = '1';
                controlsPanel.style.zIndex = '1000';
                controlsPanel.style.background = 'rgba(0, 0, 0, 0.95)';
                controlsPanel.style.minHeight = '80px';
                controlsPanel.style.position = 'relative';
                controlsPanel.style.order = '999';
                console.log('Controls panel displayed', controlsPanel);
            } else {
                console.error('Controls panel not found!');
            }

            // Ensure video-chat-layout is properly structured
            const videoChatLayout = document.querySelector('.video-chat-layout');
            if (videoChatLayout) {
                console.log('Video chat layout found', videoChatLayout);
            } else {
                console.error('Video chat layout not found!');
            }

            // Debug: Check all buttons
            const buttons = ['toggleMuteBtn', 'toggleCameraBtn', 'recordBtn', 'transcribeBtn', 'notesBtn', 'endCallBtn'];
            buttons.forEach(buttonId => {
                const button = document.getElementById(buttonId);
                console.log(`${buttonId}:`, button ? 'Found' : 'Missing');
            });

            this.isVideoCallActive = true;
            this.callStartTime = new Date();

            // Initialize video chat
            this.initializeVideoChat();

            // Force controls panel to be visible after a short delay
            setTimeout(() => {
                this.ensureControlsVisible();
                this.reattachEventListeners();
            }, 500);

            // Show notification
            this.showNotification('Video call started', 'success');

        } catch (error) {
            console.error('Error accessing camera/microphone:', error);
            this.showNotification('Unable to access camera/microphone', 'error');
        }
    }

    endVideoCall() {
        // Stop recording if active
        if (this.isRecording) {
            this.stopRecording();
        }

        // Stop transcription if active
        if (this.isTranscribing) {
            this.stopTranscription();
        }

        // Stop screen sharing if active
        if (this.isScreenSharing) {
            this.stopScreenShare();
        }

        // Stop local stream
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }

        // Hide video call area
        const videoCallArea = document.getElementById('videoCallArea');
        if (videoCallArea) {
            videoCallArea.style.display = 'none';
        }

        // Show chat messages again
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
            chatMessages.style.display = 'block';
        }

        this.isVideoCallActive = false;
        
        // Generate automatic meeting notes
        this.generateMeetingNotes();
        
        this.showNotification('Video call ended', 'info');
    }

    toggleMute() {
        if (this.localStream) {
            const audioTrack = this.localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                const muteBtn = document.getElementById('toggleMuteBtn');
                if (muteBtn) {
                    const icon = muteBtn.querySelector('i');
                    if (icon) {
                        icon.className = audioTrack.enabled ? 'fas fa-microphone' : 'fas fa-microphone-slash';
                    }
                }
            }
        }
    }

    toggleCamera() {
        if (this.localStream) {
            const videoTrack = this.localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                const cameraBtn = document.getElementById('toggleCameraBtn');
                if (cameraBtn) {
                    const icon = cameraBtn.querySelector('i');
                    if (icon) {
                        icon.className = videoTrack.enabled ? 'fas fa-video' : 'fas fa-video-slash';
                    }
                }
            }
        }
    }

    // Recording functionality
    toggleRecording() {
        if (!this.isRecording) {
            this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    startRecording() {
        if (this.localStream) {
            try {
                this.mediaRecorder = new MediaRecorder(this.localStream);
                this.recordedChunks = [];

                this.mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        this.recordedChunks.push(event.data);
                    }
                };

                this.mediaRecorder.onstop = () => {
                    const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
                    this.downloadRecording(blob);
                };

                this.mediaRecorder.start();
                this.isRecording = true;

                // Update record button
                const recordBtn = document.getElementById('recordBtn');
                if (recordBtn) {
                    const icon = recordBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-stop';
                    }
                    recordBtn.classList.add('recording');
                }

                this.showNotification('Recording started', 'info');
            } catch (error) {
                console.error('Error starting recording:', error);
                this.showNotification('Unable to start recording', 'error');
            }
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;

            // Update record button
            const recordBtn = document.getElementById('recordBtn');
            if (recordBtn) {
                const icon = recordBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-circle';
                }
                recordBtn.classList.remove('recording');
            }

            this.showNotification('Recording stopped', 'info');
        }
    }

    downloadRecording(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `video-call-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Speech Transcription functionality
    toggleTranscription() {
        if (!this.isTranscribing) {
            this.startTranscription();
        } else {
            this.stopTranscription();
        }
    }

    startTranscription() {
        console.log('Starting transcription...');
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            try {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                this.speechRecognition = new SpeechRecognition();
                
                this.speechRecognition.continuous = true;
                this.speechRecognition.interimResults = true;
                this.speechRecognition.lang = 'id-ID'; // Indonesian language
                this.speechRecognition.maxAlternatives = 1;
            
            this.speechRecognition.onstart = () => {
                this.isTranscribing = true;
                this.updateTranscribeButton();
                this.showNotification('Speech transcription started', 'info');
                console.log('Speech recognition started successfully');
            };
            
            this.speechRecognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }
                
                console.log('Speech recognition result:', {
                    interim: interimTranscript,
                    final: finalTranscript,
                    confidence: event.results[event.results.length - 1][0].confidence
                });
                
                if (finalTranscript) {
                    this.transcriptionText += finalTranscript + ' ';
                    this.transcriptionHistory.push({
                        text: finalTranscript.trim(),
                        timestamp: new Date(),
                        type: 'speech'
                    });
                    this.updateTranscriptionDisplay();
                }
            };
            
            this.speechRecognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.showNotification('Speech recognition error: ' + event.error, 'error');
                this.stopTranscription();
            };
            
            this.speechRecognition.onend = () => {
                if (this.isTranscribing) {
                    // Restart recognition if it ended unexpectedly
                    setTimeout(() => {
                        if (this.isTranscribing) {
                            this.speechRecognition.start();
                        }
                    }, 100);
                }
            };
            
                this.speechRecognition.start();
                console.log('Speech recognition start() called');
            } catch (error) {
                console.error('Error initializing speech recognition:', error);
                this.showNotification('Error starting speech recognition: ' + error.message, 'error');
            }
        } else {
            console.log('Speech recognition not supported in this browser');
            this.showNotification('Speech recognition not supported in this browser', 'error');
        }
    }

    stopTranscription() {
        console.log('Stopping transcription...');
        if (this.speechRecognition) {
            this.speechRecognition.stop();
            this.speechRecognition = null;
        }
        this.isTranscribing = false;
        this.updateTranscribeButton();
        this.showNotification('Speech transcription stopped', 'info');
        console.log('Transcription stopped. Total transcriptions:', this.transcriptionHistory.length);
    }

    updateTranscribeButton() {
        const transcribeBtn = document.getElementById('transcribeBtn');
        if (transcribeBtn) {
            const icon = transcribeBtn.querySelector('i');
            if (icon) {
                icon.className = this.isTranscribing ? 'fas fa-microphone-slash' : 'fas fa-microphone-alt';
            }
            transcribeBtn.classList.toggle('transcribing', this.isTranscribing);
        }
    }

    updateTranscriptionDisplay() {
        // Add transcription as notes
        if (this.transcriptionHistory.length > 0) {
            const latestTranscription = this.transcriptionHistory[this.transcriptionHistory.length - 1];
            if (latestTranscription && !this.notes.some(note => note.text === latestTranscription.text)) {
                this.notes.push({
                    id: Date.now(),
                    text: `[Transkripsi] ${latestTranscription.text}`,
                    timestamp: latestTranscription.timestamp,
                    type: 'transcription'
                });
                
                // Update notes display if panel is visible
                const notesList = document.getElementById('notesList');
                if (notesList) {
                    this.updateNotesDisplay();
                }
                
                // Show notification
                this.showNotification('Transkripsi ditambahkan ke notes', 'success');
            }
        }
    }

    // Video Chat functionality
    initializeVideoChat() {
        // Add welcome message
        const welcomeMessage = {
            id: 'welcome',
            sender: 'System',
            content: 'Video call dimulai. Anda dapat menggunakan chat untuk berkomunikasi dengan peserta lain.',
            timestamp: new Date(),
            type: 'system'
        };
        
        this.videoChatMessages = [welcomeMessage];
        this.updateVideoChatDisplay();
    }

    ensureControlsVisible() {
        console.log('Ensuring controls are visible...');
        
        // Find and force display of controls panel
        const controlsPanel = document.querySelector('.video-controls-panel');
        if (controlsPanel) {
            // Force all styles
            const styles = {
                display: 'flex',
                visibility: 'visible',
                opacity: '1',
                zIndex: '1000',
                background: 'rgba(0, 0, 0, 0.95)',
                minHeight: '80px',
                position: 'relative',
                width: '100%',
                padding: '1rem',
                borderTop: '1px solid #333',
                flexShrink: '0',
                alignItems: 'center',
                justifyContent: 'center'
            };
            
            Object.assign(controlsPanel.style, styles);
            console.log('Controls panel forced visible:', controlsPanel);
        }
        
        // Force display of controls row
        const controlsRow = document.querySelector('.controls-row');
        if (controlsRow) {
            Object.assign(controlsRow.style, {
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                alignItems: 'center',
                width: '100%',
                maxWidth: '600px'
            });
            console.log('Controls row forced visible:', controlsRow);
        }
        
        // Force display of all control buttons
        const buttons = ['toggleMuteBtn', 'toggleCameraBtn', 'recordBtn', 'transcribeBtn', 'notesBtn', 'chatToggleBtn', 'shareScreenBtn', 'endCallBtn'];
        buttons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                if (buttonId === 'chatToggleBtn' || buttonId === 'shareScreenBtn') {
                    // Special styling for chat and share buttons
                    Object.assign(button.style, {
                        display: 'flex',
                        visibility: 'visible',
                        opacity: '1',
                        minWidth: '45px',
                        height: '45px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px',
                        zIndex: '1001'
                    });
                } else {
                    // Standard control button styling
                    Object.assign(button.style, {
                        display: 'flex',
                        visibility: 'visible',
                        opacity: '1',
                        minWidth: '45px',
                        height: '45px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px',
                        zIndex: '1001'
                    });
                }
                console.log(`${buttonId} forced visible`);
            } else {
                console.error(`${buttonId} not found!`);
            }
        });
    }

    reattachEventListeners() {
        console.log('Re-attaching event listeners...');
        
        // Re-attach all video call event listeners
        const startVideoCallBtn = document.getElementById('startVideoCallBtn');
        const endCallBtn = document.getElementById('endCallBtn');
        const toggleMuteBtn = document.getElementById('toggleMuteBtn');
        const toggleCameraBtn = document.getElementById('toggleCameraBtn');
        const recordBtn = document.getElementById('recordBtn');
        const transcribeBtn = document.getElementById('transcribeBtn');
        const notesBtn = document.getElementById('notesBtn');
        
        // Remove existing listeners first (if any)
        const buttons = [
            { element: endCallBtn, handler: () => this.endVideoCall() },
            { element: toggleMuteBtn, handler: () => this.toggleMute() },
            { element: toggleCameraBtn, handler: () => this.toggleCamera() },
            { element: recordBtn, handler: () => this.toggleRecording() },
            { element: transcribeBtn, handler: () => this.toggleTranscription() },
            { element: notesBtn, handler: () => this.toggleNotesPanel() },
            { element: document.getElementById('chatToggleBtn'), handler: () => this.toggleChatPanel() },
            { element: document.getElementById('shareScreenBtn'), handler: () => this.toggleScreenShare() }
        ];
        
        buttons.forEach(({ element, handler }) => {
            if (element) {
                // Remove existing listeners by cloning the element
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
                
                // Add new listener
                newElement.addEventListener('click', handler);
                console.log(`Event listener re-attached for ${newElement.id}`);
            }
        });
    }

    toggleChatPanel() {
        const chatPanel = document.querySelector('.video-chat-panel');
        const toggleBtn = document.getElementById('toggleChatPanel');
        const chatToggleBtn = document.getElementById('chatToggleBtn');
        
        if (chatPanel) {
            this.isChatPanelVisible = !this.isChatPanelVisible;
            
            if (this.isChatPanelVisible) {
                chatPanel.style.display = 'block';
                if (toggleBtn) {
                    toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
                }
                if (chatToggleBtn) {
                    const icon = chatToggleBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-comments-slash';
                    chatToggleBtn.title = 'Tutup Chat Panel';
                    chatToggleBtn.classList.add('active');
                }
            } else {
                chatPanel.style.display = 'none';
                if (toggleBtn) {
                    toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
                }
                if (chatToggleBtn) {
                    const icon = chatToggleBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-comments';
                    chatToggleBtn.title = 'Buka Chat Panel';
                    chatToggleBtn.classList.remove('active');
                }
            }
        }
    }

    // Screen Sharing functionality
    async toggleScreenShare() {
        if (!this.isScreenSharing) {
            await this.startScreenShare();
        } else {
            this.stopScreenShare();
        }
    }

    async startScreenShare() {
        try {
            // Request screen sharing
            this.screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });

            // Replace local video with screen share
            const localVideo = document.getElementById('localVideo');
            if (localVideo) {
                localVideo.srcObject = this.screenStream;
            }

            this.isScreenSharing = true;
            this.updateShareButton();

            // Add notification to chat
            const shareMessage = {
                id: 'share-start',
                sender: 'System',
                content: `${this.role === 'admin' ? 'Admin' : 'User'} mulai berbagi layar`,
                timestamp: new Date(),
                type: 'system'
            };
            this.videoChatMessages.push(shareMessage);
            this.updateVideoChatDisplay();

            this.showNotification('Screen sharing started', 'success');

            // Handle screen share end
            this.screenStream.getVideoTracks()[0].onended = () => {
                this.stopScreenShare();
            };

        } catch (error) {
            console.error('Error starting screen share:', error);
            this.showNotification('Unable to start screen sharing', 'error');
        }
    }

    stopScreenShare() {
        if (this.screenStream) {
            this.screenStream.getTracks().forEach(track => track.stop());
            this.screenStream = null;
        }

        // Restore local video
        const localVideo = document.getElementById('localVideo');
        if (localVideo && this.localStream) {
            localVideo.srcObject = this.localStream;
        }

        this.isScreenSharing = false;
        this.updateShareButton();

        // Add notification to chat
        const shareMessage = {
            id: 'share-stop',
            sender: 'System',
            content: `${this.role === 'admin' ? 'Admin' : 'User'} berhenti berbagi layar`,
            timestamp: new Date(),
            type: 'system'
        };
        this.videoChatMessages.push(shareMessage);
        this.updateVideoChatDisplay();

        this.showNotification('Screen sharing stopped', 'info');
    }

    updateShareButton() {
        const shareBtn = document.getElementById('shareScreenBtn');
        if (shareBtn) {
            const icon = shareBtn.querySelector('i');
            if (icon) {
                if (this.isScreenSharing) {
                    icon.className = 'fas fa-stop';
                    shareBtn.title = 'Stop Screen Sharing';
                    shareBtn.classList.add('sharing');
                } else {
                    icon.className = 'fas fa-share';
                    shareBtn.title = 'Share Screen';
                    shareBtn.classList.remove('sharing');
                }
            }
        }
    }

    handleVideoChatMessage(e) {
        e.preventDefault();
        const videoChatInput = document.getElementById('videoChatInput');
        const message = videoChatInput.value.trim();
        
        if (!message) return;

        const senderName = this.role === 'admin' ? 'Admin' : 'Anda';
        const newMessage = {
            id: Date.now().toString(),
            sender: senderName,
            content: message,
            timestamp: new Date(),
            type: 'video-chat'
        };

        this.videoChatMessages.push(newMessage);
        videoChatInput.value = '';
        this.updateVideoChatDisplay();

        // Simulate reply from other participant
        setTimeout(() => {
            const otherParticipant = this.role === 'admin' ? 
                (this.currentChatUser ? this.currentChatUser.name : 'Support Team') : 
                'Support Team';
            
            const reply = {
                id: (Date.now() + 1).toString(),
                sender: otherParticipant,
                content: "Terima kasih atas pesannya!",
                timestamp: new Date(),
                type: 'video-chat'
            };
            this.videoChatMessages.push(reply);
            this.updateVideoChatDisplay();
    }, 1000);
    }

    updateVideoChatDisplay() {
        const videoChatMessages = document.getElementById('videoChatMessages');
        if (videoChatMessages) {
            const messagesHTML = this.videoChatMessages.map(message => this.renderVideoChatMessage(message)).join('');
            videoChatMessages.innerHTML = messagesHTML;
            this.scrollVideoChatToBottom();
        }
    }

    renderVideoChatMessage(message) {
        if (message.type === 'system') {
            return `
                <div class="video-chat-message system">
                    <div class="message-content">
                        <div class="message-text text-center text-muted" style="font-size: 0.8rem; font-style: italic;">
                            ${message.content}
            </div>
            </div>
          </div>
            `;
        }
        
        const isOwnMessage = message.sender === (this.role === 'admin' ? 'Admin' : 'Anda');
        return `
            <div class="video-chat-message ${isOwnMessage ? 'own' : 'other'}">
                <div class="message-content">
                    <div class="message-header">
                        <span class="sender-name">${message.sender}</span>
                        <span class="message-time">${this.formatTime(message.timestamp)}</span>
          </div>
                    <div class="message-text">${message.content}</div>
        </div>
      </div>
        `;
    }

    scrollVideoChatToBottom() {
        const videoChatMessages = document.getElementById('videoChatMessages');
        if (videoChatMessages) {
            videoChatMessages.scrollTop = videoChatMessages.scrollHeight;
        }
    }

    // Notes functionality
    toggleNotesPanel() {
        const notesPanel = document.getElementById('notesPanel');
        if (notesPanel) {
            const isVisible = notesPanel.style.display !== 'none';
            notesPanel.style.display = isVisible ? 'none' : 'block';
        }
    }

    addNote() {
        const noteInput = document.getElementById('noteInput');
        const notesList = document.getElementById('notesList');
        
        if (noteInput && noteInput.value.trim() && notesList) {
            const note = {
                id: Date.now(),
                text: noteInput.value.trim(),
                timestamp: new Date()
            };
            
            this.notes.push(note);
            
            // Add note to UI
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item';
            noteElement.innerHTML = `
                <div class="note-content">
                    <p class="mb-1">${note.text}</p>
                    <small class="text-muted">${note.timestamp.toLocaleTimeString('id-ID')}</small>
          </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeNote(${note.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            notesList.appendChild(noteElement);
            noteInput.value = '';
            
            this.showNotification('Note added', 'success');
        }
    }

    removeNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
        this.updateNotesDisplay();
    }

    updateNotesDisplay() {
        const notesList = document.getElementById('notesList');
        if (notesList) {
            notesList.innerHTML = '';
            this.notes.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.className = 'note-item';
                const noteType = note.type === 'transcription' ? 'transcription' : 'manual';
                const typeIcon = note.type === 'transcription' ? 'fas fa-microphone-alt' : 'fas fa-edit';
                noteElement.innerHTML = `
                    <div class="note-content">
                        <p class="mb-1">
                            <i class="${typeIcon} me-1" style="font-size: 0.8rem;"></i>
                            ${note.text}
                        </p>
                        <small class="text-muted">${note.timestamp.toLocaleTimeString('id-ID')}</small>
            </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeNote(${note.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                notesList.appendChild(noteElement);
            });
        }
    }

    generateMeetingNotes() {
        const callEndTime = new Date();
        const callDuration = this.callStartTime ? 
            Math.round((callEndTime - this.callStartTime) / 1000 / 60) : 0; // in minutes
        
        const participantName = this.role === 'admin' ? 
            (this.currentChatUser ? this.currentChatUser.name : 'Support Team') : 
            'Support Team';
        
        const meetingNotes = {
            title: `Notulensi Video Call - ${participantName}`,
            date: callEndTime.toLocaleDateString('id-ID'),
            time: `${this.callStartTime ? this.callStartTime.toLocaleTimeString('id-ID') : 'N/A'} - ${callEndTime.toLocaleTimeString('id-ID')}`,
            duration: `${callDuration} menit`,
            participants: [
                this.role === 'admin' ? 'Admin' : 'Client',
                participantName
            ],
            notes: this.notes,
            summary: this.generateMeetingSummary(),
            actionItems: this.extractActionItems()
        };
        
        // Show meeting notes modal
        this.showMeetingNotesModal(meetingNotes);
        
        // Download meeting notes as JSON
        this.downloadMeetingNotes(meetingNotes);
    }

    generateMeetingSummary() {
        const transcriptionNotes = this.notes.filter(note => note.type === 'transcription');
        const manualNotes = this.notes.filter(note => note.type !== 'transcription');
        
        if (this.notes.length === 0) {
            return "Tidak ada catatan khusus yang dibuat selama video call.";
        }
        
        const noteTexts = this.notes.map(note => note.text).join(' ');
        
        // Simple summary generation (in real app, this could use AI)
        const summary = `
            Video call berlangsung dengan ${this.role === 'admin' ? 'klien' : 'support team'}.
            ${transcriptionNotes.length > 0 ? `Selama call, berhasil ditranskripsi ${transcriptionNotes.length} pembicaraan.` : ''}
            ${manualNotes.length > 0 ? `Dibuat ${manualNotes.length} catatan manual.` : ''}
            ${noteTexts.length > 0 ? `Topik utama yang dibahas: ${noteTexts.substring(0, 150)}${noteTexts.length > 150 ? '...' : ''}` : ''}
        `;
        
        return summary.trim();
    }

    extractActionItems() {
        // Extract action items from notes (simple keyword detection)
        const actionKeywords = ['tindak lanjut', 'follow up', 'selesai', 'siapkan', 'kirim', 'cek', 'update'];
        const actionItems = [];
        
        this.notes.forEach(note => {
            const text = note.text.toLowerCase();
            actionKeywords.forEach(keyword => {
                if (text.includes(keyword)) {
                    actionItems.push({
                        text: note.text,
                        timestamp: note.timestamp,
                        assigned: this.role === 'admin' ? 'Admin' : 'Client'
                    });
                }
            });
        });
        
        return actionItems;
    }

    showMeetingNotesModal(meetingNotes) {
        const modal = document.createElement('div');
        modal.className = 'modal fade show';
        modal.style.display = 'block';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-file-alt me-2"></i>Notulensi Rapat Otomatis
                        </h5>
                        <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
          </div>
                    <div class="modal-body">
                        <div class="meeting-info mb-4">
                            <h6>${meetingNotes.title}</h6>
                            <p class="text-muted mb-1">Tanggal: ${meetingNotes.date}</p>
                            <p class="text-muted mb-1">Waktu: ${meetingNotes.time}</p>
                            <p class="text-muted mb-1">Durasi: ${meetingNotes.duration}</p>
                            <p class="text-muted">Peserta: ${meetingNotes.participants.join(', ')}</p>
      </div>
      
                        <div class="meeting-summary mb-4">
                            <h6>Ringkasan Rapat</h6>
                            <p class="text-muted">${meetingNotes.summary}</p>
            </div>
                        
                        ${meetingNotes.notes.length > 0 ? `
                        <div class="meeting-notes mb-4">
                            <h6>Catatan Selama Rapat</h6>
                            <div class="notes-list">
                                ${meetingNotes.notes.map(note => `
                                    <div class="note-item mb-2 p-2 bg-light rounded">
                                        <p class="mb-1">${note.text}</p>
                                        <small class="text-muted">${note.timestamp.toLocaleTimeString('id-ID')}</small>
          </div>
                                `).join('')}
      </div>
                        </div>
                        ` : ''}
                        
                        ${meetingNotes.actionItems.length > 0 ? `
                        <div class="action-items">
                            <h6>Tindak Lanjut</h6>
                            <div class="action-list">
                                ${meetingNotes.actionItems.map(item => `
                                    <div class="action-item mb-2 p-2 border-start border-primary border-3 bg-light">
                                        <p class="mb-1">${item.text}</p>
                                        <small class="text-muted">
                                            ${item.timestamp.toLocaleTimeString('id-ID')} - ${item.assigned}
                                        </small>
            </div>
                                `).join('')}
            </div>
          </div>
                        ` : ''}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Tutup</button>
                        <button type="button" class="btn btn-primary" onclick="downloadMeetingNotesAsText()">
                            <i class="fas fa-download me-2"></i>Download Notulensi
          </button>
      </div>
    </div>
      </div>
        `;
        
        document.body.appendChild(modal);
        
        // Store meeting notes globally for download
        window.currentMeetingNotes = meetingNotes;
    }

    downloadMeetingNotes(meetingNotes) {
        const dataStr = JSON.stringify(meetingNotes, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `meeting-notes-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// Fungsi untuk memuat halaman komunikasi
function loadCommunicationPage() {
    const communicationPage = document.getElementById('communicationPage');
    if (communicationPage) {
        // Deteksi role user dari global variable
        const userRole = currentRole || 'client';
        const chatInterface = new ChatInterface(userRole);
        
        // Simpan instance ke global variable untuk akses dari selectUser
        window.currentChatInterface = chatInterface;
        
        if (userRole === 'admin') {
            communicationPage.innerHTML = `
                <div class="page-header mb-4">
                    <h3><i class="fas fa-comments me-2"></i>Komunikasi Admin</h3>
                    <p>Kelola komunikasi dengan klien PT.ILSC</p>
            </div>
                <div class="admin-chat-container">
                    ${chatInterface.render()}
          </div>
            `;
        } else {
            communicationPage.innerHTML = `
                <div class="page-header mb-4">
                    <h3><i class="fas fa-comments me-2"></i>Komunikasi</h3>
                    <p>Chat dengan tim support PT.ILSC</p>
      </div>
                <div class="row justify-content-center">
                    <div class="col-lg-10 col-xl-8">
                        ${chatInterface.render()}
      </div>
    </div>
            `;
        }
        
        // Attach event listeners setelah DOM diupdate
        setTimeout(() => {
            chatInterface.attachEventListeners();
        }, 100);
    }
}

// Fungsi global untuk selectUser (dipanggil dari onclick)
function selectUser(userId) {
    // Cari instance ChatInterface yang aktif
    if (window.currentChatInterface) {
        window.currentChatInterface.selectUser(userId);
    }
}

// Fungsi global untuk removeNote (dipanggil dari onclick)
function removeNote(noteId) {
    if (window.currentChatInterface) {
        window.currentChatInterface.removeNote(noteId);
    }
}

// Fungsi global untuk download meeting notes as text
function downloadMeetingNotesAsText() {
    if (window.currentMeetingNotes) {
        const notes = window.currentMeetingNotes;
        const textContent = `
NOTULENSI RAPAT VIDEO CALL
========================

Judul: ${notes.title}
Tanggal: ${notes.date}
Waktu: ${notes.time}
Durasi: ${notes.duration}
Peserta: ${notes.participants.join(', ')}

RINGKASAN RAPAT
===============
${notes.summary}

CATATAN SELAMA RAPAT
===================
${notes.notes.length > 0 ? 
    notes.notes.map(note => `- ${note.text} (${note.timestamp.toLocaleTimeString('id-ID')})`).join('\n') : 
    'Tidak ada catatan khusus yang dibuat selama rapat.'}

TINDAK LANJUT
=============
${notes.actionItems.length > 0 ? 
    notes.actionItems.map(item => `- ${item.text} (${item.assigned} - ${item.timestamp.toLocaleTimeString('id-ID')})`).join('\n') : 
    'Tidak ada tindak lanjut yang diidentifikasi.'}

---
Dibuat otomatis pada: ${new Date().toLocaleString('id-ID')}
        `;
        
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `notulensi-rapat-${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}