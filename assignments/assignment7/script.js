const toggleNav = () => {
    document.getElementById("main-nav-items").classList.toggle("hidden");
};

const toggleExercise1 = () => {
    document.getElementById("exercise1").classList.toggle("hidden");
    document.getElementById("exercise2").classList.add("hidden");
};

const toggleExercise2 = () => {
    document.getElementById("exercise2").classList.toggle("hidden");
    document.getElementById("exercise1").classList.add("hidden");
};

const displayAge = () => {
    const name1 = document.getElementById("name1").value;
    const age1 = parseInt(document.getElementById("age1").value);
    const name2 = document.getElementById("name2").value;
    const age2 = parseInt(document.getElementById("age2").value);
    const name3 = document.getElementById("name3").value;
    const age3 = parseInt(document.getElementById("age3").value);

    const error = document.getElementById("error");
    error.classList.add("hidden");

    const output = document.getElementById("output");

    if(isNaN(age1) || isNaN(age2) || isNaN(age3)) {
        error.classList.remove("hidden");
        error.innerHTML = "Not a valid number";
    } else {
        const ages = [age1, age2, age3];
        const names = [name1, name2, name3];

        const sortAges = [...ages].sort((a,b) => b-a);
        const orderNames = sortAges.map((age) => {
            const index = ages.indexOf(age);
            return names[index];
        });

        output.textContent += `Sorted Ages: ${orderNames.join(', ')}`;
    }
}

const displayDonate = () => {
    const donateAmt = parseInt(document.getElementById("txt-donate").value);
    const root = document.querySelector(":root");

    const error = document.getElementById("error2");
    error.classList.add("hidden");

    if(donateAmt < 0) {
        error.classList.remove("hidden");
        error.innerHTML = "Not a valid number";
    }

    if(donateAmt == 0) {
        root.styl.setProperty("--num", "0%");
    } else if(donateAmt <= 4999 && donateAmt > 0) {
        root.style.setProperty("--num", "25%");
    } else if(donateAmt <= 7499 && donateAmt > 0) {
        root.style.setProperty("--num", "50%");
    } else if(donateAmt <= 9999 && donateAmt > 0) {
        root.style.setProperty("--num", "75%");
    } else if(donateAmt <= 10000 && donateAmt > 0) {
        root.style.setProperty("--num", "100%");
    }
}

window.onload = () => {
    document.getElementById("nav-toggle").onclick = toggleNav;
    document.getElementById("ex1").onclick = toggleExercise1;
    document.getElementById("ex2").onclick = toggleExercise2;
    document.getElementById("button-compare-age").onclick = displayAge;
    document.getElementById("donate-button").onclick = displayDonate;
};