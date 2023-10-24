const toggleNav = () => {
  document.getElementById("nav-items").classList.toggle("hide-small");
}

const printProject = () => {
  document.getElementById("boxes").classList.add("comment");

  const newproject = document.getElementById("new");

  const name = document.getElementById("txt-name").value;

  const link = document.getElementById("txt-link").value;
  
  const information = document.getElementById("txt-information").value;

  newproject.innerHTML += `<section class = "section3"> <font size="+2"><h2 id = "soft">${name}</h2><font> <p>${information}</p> <h3><a href><strong>${link}</strong></a></h3></section>`;

  document.getElementById("new").classList.toggle("hide-small");
}


window.onload = () => {
  document.getElementById("hamburger").onclick = toggleNav;
  document.getElementById("button-add").onclick = printProject;
}