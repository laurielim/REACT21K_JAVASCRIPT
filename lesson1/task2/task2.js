// Make a calculator using prompt() and variables

// initialize variables
let x, y, z, q;

// Ask numbers from the user and store answers
x = prompt("Insert first number");
y = prompt("Insert second number");

// Convert string answers to 
x = Number(x);
y = Number(y);

// Use conditional statement to check whether to add, substract, multiply or divide;
q = confirm("Add numbers?");
if (q === true) {
    z = x + y;
    alert(z);
    exit;
}

q = confirm("Substract numbers?");
if (q) {
    z = x - y;
    alert(z);
    exit;
}

q = confirm("Multiply numbers?");
if (q) {
    z = x * y;
    alert(z);
    exit;
}

q = confirm("Divide numbers?");
if (q) {
    z = x / y;
    alert(z);
    exit;
}
