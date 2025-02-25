class Question {
    constructor(title, image, answers, correctAnswer) {
        this.title = title;
        this.image = image;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}

const questions = [
    { title: "What is the name of this animal?", image: "images/dog.jpg", answers: ["Cat", "Dog", "Fox"], correctAnswer: "Dog" },
    { title: "What is the name of this animal?", image: "images/elephant.jpg", answers: ["Rhino", "Elephant", "Hippo"], correctAnswer: "Elephant" },
    { title: "What is the name of this animal?", image: "images/gira.jpg", answers: ["Deer", "Giraffe", "Camel"], correctAnswer: "Giraffe" },
    { title: "What is the name of this animal?", image: "images/zebra.jpg", answers: ["Horse", "Donkey", "Zebra"], correctAnswer: "Zebra" },
    { title: "What is the name of this animal?", image: "images/kangaroo.jpg", answers: ["Kangaroo", "Rabbit", "Squirrel"], correctAnswer: "Kangaroo" },
    { title: "What is the name of this animal?", image: "images/lion.jpg", answers: ["Lion", "Tiger", "Leopard"], correctAnswer: "Lion" },
    { title: "What is the name of this animal?", image: "images/panda.jpg", answers: ["Bear", "Panda", "Koala"], correctAnswer: "Panda" },
    { title: "What is the name of this animal?", image: "images/fox.jpg", answers: ["Wolf", "Fox", "Coyote"], correctAnswer: "Fox" },
    { title: "What is the name of this animal?", image: "images/dolphin.jpg", answers: ["Shark", "Whale", "Dolphin"], correctAnswer: "Dolphin" },
    { title: "What is the name of this animal?", image: "images/parrot.jpg", answers: ["Owl", "Parrot", "Pigeon"], correctAnswer: "Parrot" }
];


let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;
let studentName = "";

document.getElementById("startButton").addEventListener("click", () => {
    studentName = prompt("Enter your name:");
    while (!studentName) {
        studentName = prompt("Name is required! Please enter your name:");
    }
    startExam();
});

document.getElementById("nextButton").addEventListener("click", nextQuestion);

function startExam() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("examContainer").classList.remove("hidden");
    startTimer();
    loadQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) endExam();
    }, 1000);
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("questionTitle").textContent = question.title;
    document.getElementById("questionImage").src = question.image;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => selectAnswer(answer, button); 
        answersContainer.appendChild(button);
    });
}

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


function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        document.getElementById("nextButton").disabled = true;
    } else {
        endExam();
    }
}
function drawProgressCircle(percentage) {
    const canvas = document.getElementById("progressCanvas");
    const ctx = canvas.getContext("2d");
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;
    const startAngle = -0.5 * Math.PI; 
    const endAngle = startAngle + (percentage / 100) * (2 * Math.PI);

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${percentage.toFixed(0)}%`, centerX, centerY);
}

function endExam() {
    clearInterval(timer);
    document.getElementById("examContainer").classList.add("hidden");
    document.getElementById("resultContainer").classList.remove("hidden");

    let percentage = (score / questions.length) * 100;

    
    drawProgressCircle(percentage);

    
    document.getElementById("scoreText").textContent = `You have ${score} out of ${questions.length} correct answers`;
}