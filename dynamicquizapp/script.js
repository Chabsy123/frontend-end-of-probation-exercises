//Quiz Data and Init
class Question{
    constructor(text, options, answer){
        this.text = text;
        this.options = options;
        this.answer = answer;

    }
}

class Quiz{
    constructor(questions){
        this.questions = questions.map(q =>new Question(q.question, q.options, q.correctAnswer));
        this.currentIndex= 0;
        this.score=0;
        this.answers = new Array(questions.length).fill(null)  
      }
}

const quizData = [
    {question: "What is 6+34*2", options: ["32","74","544"], correctAnswer: "74"},
    {question: "Capital of US of A", options: ["Texas","Michigan","DC"], correctAnswer: "DC"},
    
];

const quiz = new Quiz(quizData);

//Dynamic question display
function renderQuestion(){
    const question = quiz.questions[quiz.currentIndex];
    document.getElementById('question').textContent = question.text;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML='';

    question.options.forEach(option => {
        const btn =document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(option);
        if(quiz.answers[quiz.currentIndex] === option) btn.classList.add('selected');
        optionsContainer.appendChild(btn);
    });
}

//Navigation and progress
function updateProgress(){
    const progress =((quiz.currentIndex + 1) / quiz.questions.length) * 100;
    document.getElementById('progress-bar').style.width = `$(progress)%`;
}

document.getElementById('next-btn').addEventListener('click', () => {
    if(quiz.currentIndex < quiz.questions.length -1 ){
        quiz.currentIndex++;
        renderQuestion();
        updateProgress();
    }else{
        showResults();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if(quiz.currentIndex > 0  ){
        quiz.currentIndex--;
        renderQuestion();
        updateProgress();
    }
});


//scoring and feedback
function selectAnswer(selected){
    const question = quiz.questions[quiz.currentIndex];
    quiz.answers[quiz.currentIndex] =selected;

    const options = document.querySelectorAll('.option-btn');
    options.forEach(btn => {
        btn.classList.remove('correct', 'incorrect', 'selected');
        if(btn.textContent === selected) btn.classList.add('selected');
        if(btn.textContent === question.answer) btn.classList.add('correct');
        else if(btn.textContent === selected && selected !== question.answer)
            btn.classList.add('incorrect');
    
    })
};
if(selected=== question.answer) quiz.score++;


//form validation with quiz completion

function showResults(){
    const name = prompt("Enter Name:");
    if(!/^[a-zA-Z0-9]{2,20}$/.test(name)){
        alert("Invalid Name!! ");
        return;
    }

    const result = {
        name,
        score:quiz.score,
        date: new Date().toISOString()
    };

    localStorage.setItem('quizResult',JSON.stringify(result));
    document.getElementById('result').innerHTML=`
    <h3>${name} scored ${quiz.score}/${quiz.questions.length}</h3>
    <p>Completed: ${new Date(result.date).toLocaleString()}</p>
    `;
    document.getElementById('results-section').style.display = 'block';
}

//Accessibility
function manageFocus(){
    document.querySelector('.option-btn')?.focus();
}

renderQuestion();
updateProgress();