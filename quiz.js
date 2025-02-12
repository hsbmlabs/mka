const quizData = {
    patterns: [
        {
            question: "What pattern is shown in this chart?",
            image: "https://a.c-dn.net/b/4uXeVy/headline_Head20and20Shoulders.jpg",
            options: [
                "Head and Shoulders",
                "Double Top",
                "Triple Top",
                "Cup and Handle"
            ],
            correct: 0
        },
        {
            question: "Identify this chart pattern:",
            image: "https://a.c-dn.net/b/2JDfaN/Double-Bottom-Pattern_body_Picture_1.png",
            options: [
                "Double Bottom",
                "Triple Bottom",
                "Cup and Handle",
                "Rounding Bottom"
            ],
            correct: 0
        }
    ],
    indicators: [
        {
            question: "What does this RSI reading indicate?",
            image: "https://a.c-dn.net/b/4tKuYp/RSI-Indicator_body_Picture_1.png",
            options: [
                "Overbought",
                "Oversold",
                "Neutral",
                "Trending"
            ],
            correct: 0
        },
        {
            question: "What signal does this MACD show?",
            image: "https://a.c-dn.net/b/1IJlZl/MACD-Indicator_body_Picture_1.png",
            options: [
                "Bullish Crossover",
                "Bearish Crossover",
                "Bullish Divergence",
                "Bearish Divergence"
            ],
            correct: 0
        }
    ],
    analysis: [
        {
            question: "Based on this chart, what would be the best trading action?",
            image: "https://a.c-dn.net/b/2Iry6C/Fibonacci-Retracement_body_Picture_1.png",
            options: [
                "Buy",
                "Sell",
                "Hold",
                "Wait for confirmation"
            ],
            correct: 3
        }
    ]
};

let currentQuiz = null;
let currentQuestion = 0;
let score = 0;

function startQuiz(category) {
    currentQuiz = category;
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const quizContainer = document.getElementById('quiz-container');
    const currentQuizData = quizData[currentQuiz][currentQuestion];

    quizContainer.innerHTML = `
        <div class="question-container">
            <h3>${currentQuizData.question}</h3>
            <img src="${currentQuizData.image}" alt="Quiz Question Image">
            <div class="options">
                ${currentQuizData.options.map((option, index) => `
                    <button onclick="checkAnswer(${index})">${option}</button>
                `).join('')}
            </div>
        </div>
    `;
    quizContainer.classList.remove('hidden');
}

function checkAnswer(answer) {
    const currentQuizData = quizData[currentQuiz][currentQuestion];
    if (answer === currentQuizData.correct) {
        score++;
    }

    currentQuestion++;
    if (currentQuestion < quizData[currentQuiz].length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    const percentage = (score / quizData[currentQuiz].length) * 100;

    quizContainer.innerHTML = `
        <div class="results">
            <h2>Quiz Complete!</h2>
            <p>Your score: ${percentage}%</p>
            <button onclick="location.reload()">Try Again</button>
        </div>
    `;

    // Update statistics
    updateStats(percentage);
}

function updateStats(latestScore) {
    // Get existing stats from localStorage or initialize
    const stats = JSON.parse(localStorage.getItem('quizStats')) || {
        completed: 0,
        averageScore: 0,
        bestCategory: '-'
    };

    // Update stats
    stats.completed++;
    stats.averageScore = ((stats.averageScore * (stats.completed - 1)) + latestScore) / stats.completed;

    // Update display
    document.getElementById('completed-quizzes').textContent = stats.completed;
    document.getElementById('average-score').textContent = `${Math.round(stats.averageScore)}%`;
    document.getElementById('best-category').textContent = currentQuiz;

    // Save to localStorage
    localStorage.setItem('quizStats', JSON.stringify(stats));
}

// Event listeners for quiz buttons
document.querySelectorAll('.start-quiz').forEach(button => {
    button.addEventListener('click', () => {
        startQuiz(button.dataset.category);
    });
}); 