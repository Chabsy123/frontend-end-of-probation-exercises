const quizQuestions = [
    {
        question: "What is 2+2?",
        options: ["3", "4", "5"],
        correctAnswer: "4"
    },
    {
        question: "Capital of France?",
        options: ["London", "Paris", "Berlin"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au"],
        correctAnswer: "Au"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Which language has the most native speakers?",
        options: ["English", "Spanish", "Mandarin Chinese"],
        correctAnswer: "Mandarin Chinese"
    },
    {
        question: "What year did World War II end?",
        options: ["1943", "1945", "1947"],
        correctAnswer: "1945"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Oxygen"],
        correctAnswer: "Hydrogen"
    }
];

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const resultsSection = document.getElementById('results-section');
const resultsElement = document.getElementById('results');
const restartBtn = document.getElementById('restart-btn');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);

// Initialize the quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    showQuestion();
    updateProgressBar();
    updateNavigationButtons();
    quizContainer.style.display = 'block';
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    resultsSection.style.display = 'none';
}

// Display the current question
function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('button');
        optionElement.className = 'list-group-item list-group-item-action';
        optionElement.textContent = option;
        
        // Highlight selected answer if exists
        if (userAnswers[currentQuestionIndex] === option) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', () => selectAnswer(option));
        optionsElement.appendChild(optionElement);
    });
}

// Handle answer selection
function selectAnswer(selectedOption) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = selectedOption;
    
    // Update visual feedback
    const options = document.querySelectorAll('.list-group-item');
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
        
        if (option.textContent === selectedOption) {
            option.classList.add('selected');
        }
        if (option.textContent === currentQuestion.correctAnswer) {
            option.classList.add('correct');
        } else if (option.textContent === selectedOption && selectedOption !== currentQuestion.correctAnswer) {
            option.classList.add('incorrect');
        }
    });
    
    // Recalculate score
    score = userAnswers.reduce((total, answer, index) => {
        return total + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
}

// Update navigation buttons state
function updateNavigationButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.textContent = 'Submit Quiz';
    } else {
        nextBtn.textContent = 'Next Question';
    }
}

// Show quiz results
function showResults() {
    const name = prompt("Enter your name (2-20 alphanumeric characters):");
    if (!name || !/^[a-zA-Z0-9]{2,20}$/.test(name)) {
        alert("Invalid name! Please enter 2-20 alphanumeric characters.");
        return;
    }

    quizContainer.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    resultsSection.style.display = 'block';
    
    const result = {
        name,
        score,
        total: quizQuestions.length,
        date: new Date().toLocaleString()
    };
    
    localStorage.setItem('quizResult', JSON.stringify(result));
    
    resultsElement.innerHTML = `
        <h3>${name}'s Score: ${score}/${quizQuestions.length}</h3>
        <p>Completed on: ${result.date}</p>
    `;
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
        updateProgressBar();
        updateNavigationButtons();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
        updateProgressBar();
        updateNavigationButtons();
    } else {
        showResults();
    }
});

restartBtn.addEventListener('click', initQuiz);

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', initQuiz);