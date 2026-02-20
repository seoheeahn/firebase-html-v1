document.addEventListener('DOMContentLoaded', () => {
    console.log('AlgoBee Messenger Studio loaded! 🐝');

    const chatWindow = document.getElementById('chat-window');
    const chatOptions = document.getElementById('chat-options');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const progressBar = document.getElementById('progress-bar');

    let currentStep = 1;
    let selectedField = '';

    // --- Core Functions ---

    const addMessage = (text, sender = 'bot') => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        
        const avatar = sender === 'bot' 
            ? '<div class="avatar"><i class="fas fa-bee"></i></div>'
            : '<div class="avatar"><i class="fas fa-user"></i></div>';
            
        msgDiv.innerHTML = `
            ${avatar}
            <div class="bubble">${text}</div>
        `;
        
        chatWindow.appendChild(msgDiv);
        
        // Better scrolling: Scroll container with a small smooth delay
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
    };

    const updateProgress = (step) => {
        const percent = (step / 5) * 100;
        progressBar.style.width = `${percent}%`;
    };

    const setOptions = (options) => {
        chatOptions.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chip';
            btn.innerHTML = opt.label;
            btn.onclick = () => opt.action();
            chatOptions.appendChild(btn);
        });
    };

    // --- Chat Flow Steps ---

    const startStep2 = (field) => {
        selectedField = field;
        addMessage(`"${field}" 주제로 차원을 구성해볼게요. 잠시만 기다려주세요...`, 'bot');
        updateProgress(2);
        chatOptions.innerHTML = '';

        setTimeout(() => {
            const dimText = `
                주제에 맞는 4가지 차원을 제안합니다:<br/>
                <div class="inner-card">
                    <h4>1. Atmosphere: Energetic ↔ Calm</h4>
                    <h4>2. Sociality: Solo ↔ Group</h4>
                    <h4>3. Difficulty: Casual ↔ Hardcore</h4>
                    <h4>4. Theme: Fantasy ↔ Modern</h4>
                </div>
                이 구성으로 진행할까요?
            `;
            addMessage(dimText, 'bot');
            setOptions([
                { label: '✅ 진행하기', action: () => startStep3() },
                { label: '🔄 다시 제안받기', action: () => startStep2(field) }
            ]);
        }, 1500);
    };

    const startStep3 = () => {
        addMessage('좋습니다! 이제 각 차원에 맞는 질문들을 생성하고 있습니다...', 'bot');
        updateProgress(3);
        chatOptions.innerHTML = '';

        setTimeout(() => {
            addMessage('차원별 질문 생성이 완료되었습니다. 예시 질문 하나를 보여드릴게요:<br/><br/><i>"활동을 할 때 선호하는 분위기는 무엇인가요?"</i>', 'bot');
            setOptions([
                { label: '👀 미리보기 확인', action: () => startStep4() },
                { label: '✏️ 질문 수정하기', action: () => addMessage('질문 수정 기능은 현재 준비 중입니다.', 'bot') }
            ]);
        }, 1500);
    };

    const startStep4 = () => {
        addMessage('실제 사용자에게 보여질 화면을 시뮬레이션 중입니다. (미리보기 모드)', 'bot');
        updateProgress(4);
        chatOptions.innerHTML = '';

        setTimeout(() => {
            addMessage('미리보기가 마음에 드시나요? 게시를 완료하면 링크가 생성됩니다.', 'bot');
            setOptions([
                { label: '🚀 게시하기', action: () => startStep5() },
                { label: '🔙 이전으로', action: () => startStep3() }
            ]);
        }, 1000);
    };

    const startStep5 = () => {
        addMessage('축하합니다! 질문 세트가 성공적으로 게시되었습니다. 🍯', 'bot');
        updateProgress(5);
        chatOptions.innerHTML = '';

        // Save to localStorage with initial response counts
        const newSet = {
            id: Date.now(),
            field: selectedField,
            createdAt: new Date().toLocaleDateString(),
            questions: [
                "Which environment do you prefer for your activities?",
                "How do you usually approach a new challenge?",
                "What is your ideal pace for progress?",
                "Which aesthetic resonates with you more?"
            ],
            // Track response counts for each question (A vs B)
            stats: [
                { a: 0, b: 0 },
                { a: 0, b: 0 },
                { a: 0, b: 0 },
                { a: 0, b: 0 }
            ]
        };
        const savedSets = JSON.parse(localStorage.getItem('algobee_sets') || '[]');
        savedSets.push(newSet);
        localStorage.setItem('algobee_sets', JSON.stringify(savedSets));

        setTimeout(() => {
            const shareLink = `${window.location.origin}/respond.html?id=${newSet.id}`;
            const shareText = `
                공유 링크: <strong>${shareLink}</strong><br/>
                이제 이 링크를 통해 사람들의 의견을 들어보세요!
            `;
            addMessage(shareText, 'bot');
            setOptions([
                { label: '🏠 홈으로 가기', action: () => window.location.href = '/index.html' },
                { label: '➕ 새로 만들기', action: () => window.location.reload() }
            ]);
        }, 800);
    };

    // --- Home Page Logic (Listing) ---
    const setsContainer = document.getElementById('published-sets');
    if (setsContainer) {
        const savedSets = JSON.parse(localStorage.getItem('algobee_sets') || '[]');
        if (savedSets.length === 0) {
            setsContainer.innerHTML = '<p style="color: #adb5bd;">게시된 질문 세트가 없습니다.</p>';
        } else {
            setsContainer.innerHTML = '';
            savedSets.forEach(set => {
                const totalResponses = set.stats ? set.stats.reduce((acc, curr) => acc + curr.a + curr.b, 0) / 4 : 0;
                const card = document.createElement('a');
                card.href = `/respond.html?id=${set.id}`;
                card.className = 'set-card';
                card.innerHTML = `
                    <div class="set-icon"><i class="fas fa-layer-group"></i></div>
                    <div class="set-info">
                        <h3>${set.field}</h3>
                        <p>${set.createdAt} • ${Math.floor(totalResponses)} Responses</p>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                `;
                setsContainer.appendChild(card);
            });
        }
    }

    // --- Respond Page Logic ---
    const respondContainer = document.getElementById('respond-container');
    if (respondContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const setId = urlParams.get('id');
        const savedSets = JSON.parse(localStorage.getItem('algobee_sets') || '[]');
        let currentSet = savedSets.find(s => s.id == setId);

        if (currentSet) {
            let qIndex = 0;
            const renderQuestion = () => {
                if (qIndex < currentSet.questions.length) {
                    respondContainer.innerHTML = `
                        <div class="step-indicator" style="margin-bottom: 2rem;">
                            <div class="step active">${qIndex + 1}</div>
                        </div>
                        <h2 style="margin-bottom: 2rem;">${currentSet.questions[qIndex]}</h2>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <button class="primary-btn" onclick="submitAnswer('a')">Option A (Axis A)</button>
                            <button class="primary-btn" onclick="submitAnswer('b')">Option B (Axis B)</button>
                        </div>
                    `;
                } else {
                    renderResults();
                }
            };

            const renderResults = () => {
                let resultsHtml = `<h2 style="margin-bottom: 2rem;">Response Distribution</h2>`;
                currentSet.questions.forEach((q, i) => {
                    const stat = currentSet.stats[i];
                    const total = stat.a + stat.b || 1; // Prevent division by zero
                    const percentA = Math.round((stat.a / total) * 100);
                    const percentB = 100 - percentA;

                    resultsHtml += `
                        <div class="result-item" style="margin-bottom: 2rem; text-align: left;">
                            <p style="font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;">Q${i+1}: ${q}</p>
                            <div class="dist-bar">
                                <div class="bar-a" style="width: ${percentA}%">A: ${percentA}%</div>
                                <div class="bar-b" style="width: ${percentB}%">B: ${percentB}%</div>
                            </div>
                        </div>
                    `;
                });
                resultsHtml += `<a href="/index.html" class="primary-btn" style="margin-top: 2rem;">Back to Home</a>`;
                respondContainer.innerHTML = resultsHtml;
            };

            window.submitAnswer = (option) => {
                // Update stats in the data
                if (!currentSet.stats) {
                    currentSet.stats = currentSet.questions.map(() => ({ a: 0, b: 0 }));
                }
                currentSet.stats[qIndex][option]++;
                
                // Save back to localStorage
                const updatedSets = savedSets.map(s => s.id == setId ? currentSet : s);
                localStorage.setItem('algobee_sets', JSON.stringify(updatedSets));

                qIndex++;
                renderQuestion();
            };

            renderQuestion();
        } else {
            respondContainer.innerHTML = '<p>질문 세트를 찾을 수 없습니다.</p>';
        }
    }

    // --- Event Listeners ---

    window.selectField = (field) => {
        addMessage(field, 'user');
        startStep2(field);
    };

    sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (text && currentStep === 1) {
            userInput.value = '';
            addMessage(text, 'user');
            startStep2(text);
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendBtn.click();
    });
});
