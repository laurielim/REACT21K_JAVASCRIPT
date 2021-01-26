function calculate() {
    let price = Number(document.querySelector("#price").value);
    let money = Number(document.getElementById("money").value);
    let answer = document.getElementById("answer");

    // console.log(price)
    // console.log(money)
    // console.log(money / price);

    answer.textContent = money / price;
    /* 
    If possible do not use innerHTML nor innerText
    answer.innerHTML = money / price;
    answer.innerText = money / price;
    */
}

calculate2 = () => {
    let price = Number(document.querySelector("#price").value);
    let money = Number(document.getElementById("money").value);
    let answer = document.getElementById("answer");
    let liters = Math.floor(money / price);
    answer.textContent = liters;

    liters >= 10 ? message.textContent="Good, you can escape now!" : message.textContent="Ups, you have to stay here.";
}


/* // Say hello to the user
function hello() {
    alert("Hello, my name is Laurie")
    whoareyou();
}

function whoareyou() {
    let yourName = prompt("What is your name?");
    greeting(yourName);
}

function greeting(name) {
    document.write(name);
}

hello();


 */