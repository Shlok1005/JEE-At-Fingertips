const quizDB = [
    {
        question: "Q1: What does HTML stand for?",
        
           a: "Hyper Tag Markup Language",
           b: "Hyper Text Markup Language",
           c: "Hyperlinks Text Mark Language",
           d: "Hyperlinking Text Marking Language",
        
        ans: "ans4"
    },
    {
        question: "Q2: What does CSS stand for?",
        
           a: "Computing Style Sheet",
           b: "Creative Style System",
           c: "Cascading Style Sheet",
           d: "Creative Styling Sheet",
        
        ans: "ans3"
    },
    {
        question: "Q3:Where should a CSS file be referenced in a HTML file?",
        
           a: "Before any HTML code",
           b: "After all HTML code",
           c: "Inside the head section",
           d: "Inside the body section",
        
        ans: "ans3"
    },
    {
        question:
            "Q4:What is the correct format for aligning written content to the center of the page in CSS?",
        
           a: "Text-align:center;",
           b: "Font-align:center;",
           c: "Text:align-center;",
           d: "Font:align-center;",
        
        ans: "ans1"
    },
    {
        question:
            "Q5:What is the correct format for changing the background colour of a div in CSS?",
        
           a: "Bg-color:red;",
           b: "bg:red;",
           c: "Background-colour:red;",
           d: "Background-color:red;",
        
        ans:"ans4"
    },
    {
        question: "Q6:Choose the correct HTML tag for the largest heading",
        a:"<heading>",b: "<h6>",c: "<head>",d: "<h1>",
        ans: "ans4"
    },
    {
        question: "Q7:Which is the correct CSS syntax?",
        
            a:"Body {color: black}",
            b:"{body;color:black}",
            c:"{body:color=black(body}",
           d: "body:color=black",
        
        ans: "ans1"
    },
    {
        question:
            "Q8:In CSS, what is the correct option to select all the tags on a page?",
        a:"<p> { }",b: ".p { }",c: "#p { }",d: "* { }",
        ans: "ans4"
    },
    {
        question: "Q9:Select the correct HTML tag to make a text italic?",
        a:"Italic",b: "II",c: "IT", d:"I",
        ans: "ans4"
    },
    {
        question: "Q10:Select the correct HTML tag to make a text bold.",
        a:"bo",b: "bb",c: "b", d:"bold",
        ans: "ans3" 
    }
];
 
const startingMinutes =1;
 let time = startingMinutes *60;

 const countdownEl = document.getElementById('countdown');

 setInterval(updateCountdown,1000);
 function updateCountdown()
{
    const minutes =Math.floor(time/60);
    let seconds =time%60;

    seconds = seconds<10?'0' + seconds : seconds;
    countdownEl.innerHTML =`${minutes}:${seconds}`;
    time--;
    if(time==0){
    clearInterval(time);
    alert("Time is up.Press ok to show the result");
    result();
    }
    
    
}
const result=()=>{
    showScore.innerHTML = `

    <h3>You scored ${score}/${quizDB.length} </h3>
    <button class ="btn" onclick="location.reload()">Play Again </button>
    `;

    showScore.classList.remove('scoreArea');
    

}

const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit');

const answers= document.querySelectorAll('.answer');
//const showScore = document.querySelector('#showScore');

let questionCount = 0;
let score =0;
const loadQuestion = () =>{
    const questionList = quizDB[questionCount];
    
    question.innerText = questionList.question;

    option1.innerText = questionList.a;
    option2.innerText = questionList.b;
    option3.innerText = questionList.c;
    option4.innerText = questionList.d;

}

loadQuestion();

const getCheckAnswer = () =>{
    let answer;

    answers.forEach((curAnsElem) => {
        if(curAnsElem.checked){
        answer= curAnsElem.id;
    }
});
return answer;
};


const deselectAll = ()=> {
    answers.forEach((curAnsElem) => curAnsElem.checked = false);
}




	




submit.addEventListener('click',()=> {
    const checkedAnswer = getCheckAnswer ();
    console.log(checkedAnswer);

    if(checkedAnswer === quizDB[questionCount].ans){
        score++;
    };


questionCount++;
deselectAll();
if(questionCount< quizDB.length){
    loadQuestion();
}else{
    showScore.innerHTML = `

    <h3>You scored ${score}/${quizDB.length} </h3>
    <button class ="btn" onclick="location.reload()">Play Again </button>
    `;

    showScore.classList.remove('scoreArea');

}


	
  

});
