const toggleNav = () => {
    document.getElementById("nav-items").classList.toggle("hide-small");
}

const logSubmit = () => {
    const name = document.getElementById("namebox").value;
    const email = document.getElementById("emailbox").value;
    const subject = document.getElementById("subjectbox").value;
    const message = document.getElementById("messagebox").value;

    console.log(name); 
    console.log(email); 
    console.log(subject); 
    console.log(message); 
}

window.onload = () => {
    document.getElementById("hamburger").onclick = toggleNav;
    document.getElementById("submit").onclick = logSubmit;
}