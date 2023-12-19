const subHeaders = [
    "ENGINEERING, DESIGN, R&D",
    "ABOUT MY WORK",
    "VENTURE CAPITAL AND ENTERPRISE",
    "GET IN TOUCH"
];

const items = document.querySelectorAll(".item-1, .item-2, .item-3, .item-4");
const placeholder = document.querySelector(".placeholder");
const subheader = document.querySelector(".subheader");

function changeColors() {
    gsap.to('.container', { backgroundColor: "#000", duration: 0.5 });
    gsap.to('.placeholder, nav, footer, p', {  color: '#fff',duration: 0.5 });
}

function revertColors() {
    gsap.to('.container', { backgroundColor: "#fff", duration: 0.5 });
    gsap.to('.placeholder, nav, footer, p', { color: "#000", duration: 0.5 });
}

items.forEach(item => {
    item.addEventListener("mouseenter", changeColors);
    item.addEventListener("mouseout", revertColors);
});

function animatescale(element, scaleValue) {
    gsap.fromTo(element, { scale: 1 }, { scale: scaleValue, duration: 1, ease: "power1.out" });
}

function wrapLetters(text) {
    placeholder.innerHTML = '';
    text.split('').forEach(letter => {
        const span = document.createElement('span');
        span.style.filter = 'blur(8px)';
        span.textContent = letter;
        placeholder.appendChild(span);
    });
}

function animateBlurEffect() {
    const letters = placeholder.children;
    let index = 0;

    function clearNextLetter() {
        if (index < letters.length) {
            gsap.to(letters[index], { filter: 'blur(0px)', duration: 0.25 });
            index++;
            if (index < letters.length) {
                setTimeout(clearNextLetter, 20);
            }
        }
    }

    setTimeout(clearNextLetter, 0);
}

function shuffleLetters(finalText) {
    wrapLetters(finalText);

    let textArray = finalText.split('');
    let shufflingCounter = 0;
    let intervalHandles = [];

    function shuffle(index) {
        if (shufflingCounter < 30) {
            textArray[index] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
            placeholder.children[index].textContent = textArray[index];
        } else {
            placeholder.children[index].textContent = finalText.charAt(index);
            clearInterval(intervalHandles[index]);
        }
    }

    for (let i = 0; i < finalText.length; i++) {
        intervalHandles[i] = setInterval(shuffle, 80, i);
    }

    setTimeout(() => {
        shufflingCounter = 30;
        for (let i = 0; i < finalText.length; i++) {
            placeholder.children[i].textContent = finalText.charAt(i);
            clearInterval(intervalHandles[i]);
        }
        animateBlurEffect();
    }, 400);
}

function updatePlaceholderText(event) {
    const newText = event.target.textContent.toUpperCase();
    const itemIndex = Array.from(items).indexOf(event.target);
    const newSubHeaderText = subHeaders[itemIndex].toUpperCase();

    subheader.textContent = newSubHeaderText;
    animatescale(placeholder, 1);
    shuffleLetters(newText);
}

function resetPlaceholderText() {
    const defaultSubHeaderText = "LABORATORIES";
    const defaultText = "PARASAR";

    subheader.textContent = defaultSubHeaderText;
    animatescale(placeholder, 1);
    shuffleLetters(defaultText);
}

items.forEach(item => {
    item.addEventListener("mouseenter", updatePlaceholderText);
    item.addEventListener("mouseout", resetPlaceholderText);
});
