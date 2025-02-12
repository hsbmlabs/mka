const quizData = {
    patterns: [
        {
            question: "What pattern is shown in this chart?",
            image: "https://www.investopedia.com/thmb/4cWSkAIJJxzA9FjfDYYx9MpVEk4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/head_and_shoulders_example-912e93eed49b4cf2b07318948f0f6f11.png",
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
            image: "https://www.investopedia.com/thmb/VX9ypUz9KzxDkUEy8XNLxDHkpZ8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cup_and_handle_chart_pattern-5c7247e746e0fb00013a0d1c.jpg",
            options: [
                "Double Bottom",
                "Triple Bottom",
                "Cup and Handle",
                "Rounding Bottom"
            ],
            correct: 2
        }
    ],
    indicators: [
        {
            question: "What does this RSI reading indicate?",
            image: "https://www.investopedia.com/thmb/qw-QZHs_u9YtLIJhEjEb9_v_O3k=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dotdash_Final_Relative_Strength_Index_RSI_Apr_2020-01-69f353089d044130b38a6ddf6d747b46.jpg",
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
            image: "https://www.investopedia.com/thmb/3_7qwU7QHHxXfWdJ7Qh_mwnVUxE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/MACD-f5bb2f9e8cd24e3d8af95f32c04bc4c5.png",
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
            image: "https://www.investopedia.com/thmb/ml1ZrDownHWgrAmfwWz0nAuHHJY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/support_and_resistance_basics-5c7019e746e0fb0001721fb7.jpg",
            options: [
                "Buy",
                "Sell",
                "Hold",
                "Wait for confirmation"
            ],
            correct: 3
        },
        // Add more analysis questions
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