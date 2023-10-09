
const slide = () => {
    const currentQuote = document.querySelector("#slideshow :not(.hidden)");
    currentQuote.classList.add("hidden");

    let nextQuote = currentQuote.nextElementSibling;

    if(nextQuote == null) {
        nextQuote = document.querySelector("#slideshow :first-child");
    }

    nextQuote.classList.remove("hidden");
}

const displayRainbow = () => {
    const rainbow = document.querySelector("#rainbow");
    const gold = document.getElementById("gold");

    let colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    let position = 0;

    const updateRainbow = setInterval(() => {
        
        if(position == colors.length){
            gold.classList.remove("hidden");
            clearInterval(updateRainbow);
        }

        const newColor = document.createElement("p")
        newColor.classList.add("rainbowColors");
        newColor.style.setProperty("background", colors[position]);

        position++;
        rainbow.append(newColor);

    }, 100)
}

window.onload = () => {
    setInterval(slide, 2000);
    document.getElementById("rainbow-button").onclick = displayRainbow;
}