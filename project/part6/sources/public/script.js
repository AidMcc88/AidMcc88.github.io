const getSources = async () => {
  try {
    return (await fetch("api/sources/")).json();
  } catch (error) {
    console.log(error);
  }
};

const showSources = async () => {
  let sources = await getSources();
  let sourcesDiv = document.getElementById("source-list");
  sourcesDiv.innerHTML = "";
  sources.forEach((source) => {
    const section = document.createElement("section");
    section.classList.add("source");
    sourcesDiv.append(section);

    const a = document.createElement("a");
    a.href = "#";
    section.append(a);

    const h3 = document.createElement("h3");
    h3.innerHTML = source.name;
    a.append(h3);

    const img = document.createElement("img");
    img.src = source.img;
    section.append(img);

    a.onclick = (e) => {
      e.preventDefault();
      displayDetails(source);
    };
  });
};

const displayDetails = (source) => {
  const sourceDetails = document.getElementById("source-details");
  sourceDetails.innerHTML = "";

  const h3 = document.createElement("h3");
  h3.innerHTML = source.name;
  sourceDetails.append(h3);

  const dLink = document.createElement("a");
  dLink.innerHTML = "	&#x2715;";
  sourceDetails.append(dLink);
  dLink.id = "delete-link";

  const eLink = document.createElement("a");
  eLink.innerHTML = "&#9998;";
  sourceDetails.append(eLink);
  eLink.id = "edit-link";

  const p = document.createElement("p");
  sourceDetails.append(p);
  p.innerHTML = source.link;

  const ul = document.createElement("ul");
  sourceDetails.append(ul);
  console.log(source.citations);
  source.citations.forEach((citation) => {
    const li = document.createElement("li");
    ul.append(li);
    li.innerHTML = citation;
  });

  eLink.onclick = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-title").innerHTML = "Edit Source";
  };

  dLink.onclick = (e) => {
    e.preventDefault();
    deleteSource(source);
  };

  populateEditForm(source);
};

const deleteSource = async (source) => {
  let response = await fetch(`/api/sources/${source._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status != 200) {
    console.log("error deleting");
    return;
  }

  let result = await response.json();
  showSources();
  document.getElementById("source-details").innerHTML = "";
  resetForm();
};

const populateEditForm = (source) => {
  const form = document.getElementById("add-edit-source-form");
  form._id.value = source._id;
  form.name.value = source.name;
  form.link.value = source.link;
  populateCitation(source);
};

const populateCitation = (source) => {
  const section = document.getElementById("citation-boxes");

  source.citations.forEach((citation) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = citation;
    section.append(input);
  });
};

const addEditSource = async (e) => {
  e.preventDefault();
  const form = document.getElementById("add-edit-source-form");
  const formData = new FormData(form);
  let response;
  formData.append("citations", getCitations());

  //trying to add a new source
  if (form._id.value == -1) {
    formData.delete("_id");

    response = await fetch("/api/sources", {
      method: "POST",
      body: formData,
    });
  }
  //edit an existing source
  else {
    console.log(...formData);

    response = await fetch(`/api/sources/${form._id.value}`, {
      method: "PUT",
      body: formData,
    });
  }

  //successfully got data from server
  if (response.status != 200) {
    console.log("Error posting data");
  }

  source = await response.json();

  if (form._id.value != -1) {
    displayDetails(source);
  }

  resetForm();
  document.querySelector(".dialog").classList.add("transparent");
  showSources();
};

const getCitations = () => {
  const inputs = document.querySelectorAll("#citation-boxes input");
  let citations = [];

  inputs.forEach((input) => {
    citations.push(input.value);
  });

  return citations;
};

const resetForm = () => {
  const form = document.getElementById("add-edit-source-form");
  form.reset();
  form._id = "-1";
  document.getElementById("citation-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
  e.preventDefault();
  document.querySelector(".dialog").classList.remove("transparent");
  document.getElementById("add-edit-title").innerHTML = "Add Source";
  resetForm();
};

const addCitation = (e) => {
  e.preventDefault();
  const section = document.getElementById("citation-boxes");
  const input = document.createElement("input");
  input.type = "text";
  section.append(input);
};

const toggleNav = () => {
  document.getElementById("nav-items").classList.toggle("hide-small");
}

window.onload = () => {
  showSources();
  document.getElementById("add-edit-source-form").onsubmit = addEditSource;
  document.getElementById("add-link").onclick = showHideAdd;

  document.querySelector(".close").onclick = () => {
    document.querySelector(".dialog").classList.add("transparent");
  };

  document.getElementById("add-citation").onclick = addCitation;
  document.getElementById("hamburger").onclick = toggleNav;
};