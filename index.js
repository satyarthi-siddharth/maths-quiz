const num1 = Math.ceil(Math.random()*500);
const num2 = Math.ceil(Math.random()*500);
const operations = ["multiply by","added to","subtracted from","divided by","modulo"];
const option = operations[Math.floor(Math.random()*operations.length)];

const quesEl = document.getElementById("ques");
const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const posEl = document.getElementById("posAns");
const negEl = document.getElementById("negAns");

let score = JSON.parse(localStorage.getItem("score"));
let posAns = JSON.parse(localStorage.getItem("writeAns"));
let negAns = JSON.parse(localStorage.getItem("wrongAns"));

if(!score) score = 0;
if(!posAns) posAns = 0;
if(!negAns) negAns = 0;

scoreEl.innerText = `score: ${score}`;
posEl.innerText = `positive: ${posAns}`;
negEl.innerText = `negative: ${negAns}`;

if(option === "divided by"){
    quesEl.innerText = `What is ${num1} ${option} ${num2}? (upto 2 decimals)`;
}else{
    quesEl.innerText = `What is ${num1} ${option} ${num2}?`;
}


let corrAns = -1000;
if(option==="multiply by"){
    corrAns = num1 * num2;
}else if(option==="added to"){
    corrAns = num1 + num2;
}else if(option==="subtracted from"){
    corrAns = num2 - num1;
}else if(option==="divided by"){
    corrAns = num1 / num2;
    corrAns = Math.round(corrAns*100)/100; //upto 2 decimals
    // console.log(corrAns);
}else if(option==="modulo"){
    corrAns = num1 % num2;
}

formEl.addEventListener("submit",(e)=>{
    // e.preventDefault(); this will stop the random generation as it prevent the default behaviour of a form i.e, refreshing the page after every click of submit button
    let userAns = +inputEl.value //+ for converting input string into number

    if(userAns === corrAns){
        score++;
        posAns++;
        updateLocalStorage();
    }else{
        score--;
        negAns--;
        updateLocalStorage();
    }
})

formEl.addEventListener("reset",()=>{
    score = 0;
    posAns = 0;
    negAns = 0;
    updateLocalStorage();
    scoreEl.innerText = `score: ${score}`;
    posEl.innerText = `positive: ${posAns}`;
    negEl.innerText = `negative: ${negAns}`;
})

function updateLocalStorage(){
    localStorage.setItem("score",JSON.stringify(score));
    localStorage.setItem("writeAns",JSON.stringify(posAns));
    localStorage.setItem("wrongAns",JSON.stringify(negAns));
}