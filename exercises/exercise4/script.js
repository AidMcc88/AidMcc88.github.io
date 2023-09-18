//helloSpecific("Portia");

/*
const helloFullName = (firstName, lastName) => {
    console.log("Hello " + firstName + " " + lastName);
    console.log("You are awesome!");
};

helloFullName("portia", "plante");

*/

/* Not ok to change a constant
const myName = "Portia";
myName = "Sally"; */

const moveSquare = () => {
    document.getElementById("square").classList.add("move-square");
}

const displayName = () => {
    const firstName = document.getElementById("txt-first-name").value;
    console.log("Hello " + firstName + "!");
}

window.onload = () => {
    document.getElementById("button-click").onclick = moveSquare;
    document.getElementById("button-show-name").onclick = displayName;
}