const toggleNav = () => {
  document.getElementById("nav-items").classList.toggle("hidden");
}

const submit = (e) => {
  e.preventDefault();
  const form = document.getElementById("form");
  const name = form.elements["name"].value;
  const date = form.elements["date"].value;
  const description = form.elements["description"].value;
  const link = form.elements["fileInput"].value;

  
  const successMessage = `
      <h2>${name}</h2>
      <p><span class="bold">Publish Date:</span> ${date}</p>
      <p><span class="bold">Description:</span> ${description}</p>
      <p><span class="bold">Article Link:</span> ${link}</p>
  `;

  document.getElementById("form").classList.add("hidden");
  const successMessageDiv = document.getElementById("success-message");
  successMessageDiv.innerHTML = successMessage;
  successMessageDiv.classList.remove("hidden");
};

window.onload = () => {
  document.getElementById("form").onsubmit = submit;
  document.getElementById("hamburger").onclick = toggleNav;
};
