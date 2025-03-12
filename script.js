class Question {
    constructor(title, image, answers, correctAnswer) {
        this.title = title;
        this.image = image;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}

const questions = [
    { title: "What is the color of this rose?", image: "images/red.png", answers: ["Red", "Pink", "White"], correctAnswer: "Red" },
    { title: "What is the color of this rose?", image: "images/white.png", answers: ["Yellow", "White", "Purple"], correctAnswer: "White" },
    { title: "What is the color of this rose?", image: "images/yellow.png", answers: ["Orange", "Yellow", "Blue"], correctAnswer: "Yellow" },
    { title: "What is the color of this rose?", image: "images/pink.png", answers: [ "Red", "Green","Pink"], correctAnswer: "Pink" },
    { title: "What is the color of this rose?", image: "images/orange.png", answers: ["Brown","Orange","Black"], correctAnswer: "Orange" },
    { title: "What is the color of this rose?", image: "images/purple.png", answers: ["Purple", "Blue", "White"], correctAnswer: "Purple" },
    { title: "What is the color of this rose?", image: "images/blue.png", answers: ["Gray", "Pink","Blue"], correctAnswer: "Blue" },
    { title: "What is the color of this rose?", image: "images/black.png", answers: ["Black", "Red", "Purple"], correctAnswer: "Black" },
    { title: "What is the color of this rose?", image: "images/green.png", answers: ["Yellow","Green", "White"], correctAnswer: "Green" },
    { title: "What is the color of this rose?", image: "images/rainbow.png", answers: ["Blue","Rainbow","Purple"], correctAnswer: "Rainbow" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;

/*****************  Enter name ***********************/
document.getElementById("startButton").addEventListener("click", () => {
    let studentName = sessionStorage.getItem("studentName");

    if (!studentName) {
        const namePattern = /^[a-zA-Z\u0600-\u06FF]{3,}\s[a-zA-Z\u0600-\u06FF]{3,}$/; 

        while (true) {
            studentName = prompt("Enter your name and father’s name (e.g., Gehad Ahmed):").trim();

            if (!studentName) {
                alert("⚠️ Name is required! Please enter your first and father’s name.");
            } else if (!namePattern.test(studentName)) {
                alert("⚠️ Invalid format! Enter exactly two words, each with at least 3 letters (e.g., Gehad Ahmed).");
            } else {
                sessionStorage.setItem("studentName", studentName); 
                break; 
            }
        }
    }

    startExam();
});

/*****************  Start Exam ***********************/
function startExam() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("examContainer").classList.remove("hidden");
    
    document.getElementById("studentNameDisplay").textContent = `Student: ${sessionStorage.getItem("studentName")}`;

    startTimer();
    loadQuestion();
}

/*****************  Start timer  ***********************/
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) 
            endExam();
    }, 1000);
}

/***************** load and display the current question ***********************/
function loadQuestion() {
    
    const question = questions[currentQuestionIndex];
    document.getElementById("questionTitle").textContent = `Question ${currentQuestionIndex + 1}: ${question.title}`;
    document.getElementById("questionImage").src = question.image;
   
    const answersContainer = document.getElementById("answers"); 
    answersContainer.innerHTML = "";

    question.answers.forEach(answer => {   
        const btn = document.createElement("button");  
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(answer, btn);   
        answersContainer.appendChild(btn);
    });
}

/*****************  Select Answer   ********************/
function selectAnswer(answer, button) {

    document.getElementById("nextButton").disabled = false;
    
    document.querySelectorAll("#answers button").forEach(btn => {
        btn.classList.remove("selected");
    }); 
    
    button.classList.add("selected"); 
    
    if (answer === questions[currentQuestionIndex].correctAnswer) {        
        score++;
    }
}
/********************* */
document.getElementById("nextButton").addEventListener("click", nextQuestion);
/*****************  Next Question  ********************/
/*function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById("nextButton").disabled = true;
    } else {
        endExam();
    }
}*/
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length - 1) {
        loadQuestion();
        document.getElementById("nextButton").disabled = true;
    } else if (currentQuestionIndex === questions.length - 1) {
        loadQuestion();
        document.getElementById("nextButton").textContent = "Submit Exam";
        document.getElementById("nextButton").onclick = endExam;
    }
}


/*****************  Update Progress Circle  ********************/
function updateProgressCircle(percentage) {
    const circle = document.getElementById("progressCircle");
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;
    
    circle.style.strokeDashoffset = offset;
    document.getElementById("percentageText").textContent = `${percentage.toFixed(0)}%`;
}

/*****************  End Exam and show result  ********************/
function endExam() {
    clearInterval(timer);
    document.getElementById("examContainer").classList.add("hidden");
    document.getElementById("resultContainer").classList.remove("hidden");
    let percentage = (score / questions.length) * 100; 
    updateProgressCircle(percentage);
    document.getElementById("scoreText").textContent = `You have ${score} out of ${questions.length} correct answers`;
}

