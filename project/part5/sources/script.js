const toggleNav = () => {
    document.getElementById("nav-items").classList.toggle("hide-small");
}

const printProject = () => {
    document.getElementById("boxes").classList.add("comment");

    const newproject = document.getElementById("new");

    const name = document.getElementById("txt-name").value;

    const link = document.getElementById("txt-link").value;
    
    const description1 = document.getElementById("txt-description1").value;
    const description2 = document.getElementById("txt-description2").value;
    const description3 = document.getElementById("txt-description3").value;
    const description4 = document.getElementById("txt-description4").value;

    newproject.innerHTML += `<font size="+2"><h1 id = "soft">${name}</h1><font> <section class = "sec4"> <p><a href><strong>${link}</strong></a></p> <ul><li>${description1}</li><li>${description2}</li><li>${description3}</li><li>${description4}</li></ul></section>`;

    document.getElementById("new").classList.toggle("hidden");
}

const getProjects = async () => {
    const url = "https://aidmcc88.github.io/jsons/projects.json";
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const showProjects = async () => {
    let projects = await getProjects();
    let projectsSection = document.getElementById("main-content");
    projects.forEach((project) =>
      projectsSection.append(getProject(project))
    );
  };
  
  const getProject = (project) => {
    let main = document.getElementById("main-content");

    let section = document.createElement("section");
    section.classList.add("project");
  
    let h1 = document.createElement("h1");
    h1.innerText = project.title;
    main.append(h1);

    let h3 = document.createElement("h3");
    h3.innerText = project.link;
    section.append(h3);

    let details = document.createElement("div");
    details.classList.add("projects-details");
    section.append(details);

    let ul = document.createElement("ul");
    details.append(ul);

    let liA = document.createElement("li");
    liA.innerText = project.descrA;
    ul.append(liA);
    let liB = document.createElement("li");
    liB.innerText = project.descrB;
    ul.append(liB);
    let liC = document.createElement("li");
    liC.innerText = project.descrC;
    ul.append(liC);
    let liD = document.createElement("li");
    liD.innerText = project.descrD;
    ul.append(liD);

    let img = document.createElement("img");
    img.src = "https://aidmcc88.github.io/jsons/" + project.img;
    section.append(img);

    return section;
  };

window.onload = () => {
    document.getElementById("hamburger").onclick = toggleNav;
    document.getElementById("button-add").onclick = printProject;
    showProjects();
}