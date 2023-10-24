const toggleNav = () => {
    document.getElementById("nav-items").classList.toggle("hide-small");
};

window.onload = () => {
    document.getElementById("hamburger").onclick = toggleNav;
    document.getElementById("nav-toggle").onclick = toggleNav;
    document.getElementById("p1of5").onclick = toggleBio;
    document.getElementById("p2of5").onclick = toggleExp;
    document.getElementById("p3of5").onclick = toggleEdu;
    document.getElementById("p5of5").onclick = toggleCont;
    document.getElementById("button-add").onclick = printProject;
}

const toggleBio = () => {
    document.getElementById("p1of5").classList.toggle("hidden");
    document.getElementById("p2of5").classList.add("hidden");
    document.getElementById("p3of5").classList.add("hidden");
    document.getElementById("p4of5").classList.add("hidden");
    document.getElementById("p5of5").classList.add("hidden");
}

const toggleExp = () => {
    document.getElementById("p2of5").classList.toggle("hidden");
    document.getElementById("p1of5").classList.add("hidden");
    document.getElementById("p3of5").classList.add("hidden");
    document.getElementById("p4of5").classList.add("hidden");
    document.getElementById("p5of5").classList.add("hidden");
}

const toggleEdu = () => {
    document.getElementById("p3of5").classList.toggle("hidden");
    document.getElementById("p1of5").classList.add("hidden");
    document.getElementById("p2of5").classList.add("hidden");
    document.getElementById("p4of5").classList.add("hidden");
    document.getElementById("p5of5").classList.add("hidden");
}

const toggleCont = () => {
    document.getElementById("p5of5").classList.toggle("hidden");
    document.getElementById("p1of5").classList.add("hidden");
    document.getElementById("p2of5").classList.add("hidden");
    document.getElementById("p3of5").classList.add("hidden");
    document.getElementById("p4of5").classList.add("hidden");
}