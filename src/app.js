import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const deck = {
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
    suits: ["♥", "♦", "♣", "♠"]
};
//Estado de la aplicación
let originalCards = [];
let sortLog = [];
// 3. Elementos del DOM
const cardCountInput = document.getElementById("cardCount");
const drawBtn = document.getElementById("drawBtn");
const sortBtn = document.getElementById("sortBtn");
const cardContainer = document.getElementById("cardContainer");
const logContainer = document.getElementById("logContainer");

//Generar cartas aleatorias
function generateRandomCards(count) {
    const hand = [];

    for (let i = 0; i < count; i++) {
        const value = deck.values[Math.floor(Math.random() * deck.values.length)];
        const suit = deck.suits[Math.floor(Math.random() * deck.suits.length)];

        hand.push({
            value,
            suit,
            numericValue: deck.values.indexOf(value) + 1
        });
    }

    return hand;
}
//Crear HTML de una carta
function createCardHTML(card) {
    const colorClass =
        card.suit === "♥" || card.suit === "♦" ? "red" : "";

    return `
    <div class="card ${colorClass}">
        <span class="suit-top">${card.suit}</span>
        <span class="value">${card.value}</span>
        <span class="suit-bottom">${card.suit}</span>
    </div>
    `;
}
//Renderizar cartas
function renderCards(cardArray, containerElement) {
    containerElement.innerHTML = "";

    cardArray.forEach(card => {
        containerElement.insertAdjacentHTML(
            "beforeend",
            createCardHTML(card)
        );
    });
}
//Evento Draw
drawBtn.addEventListener("click", () => {
    const count = parseInt(cardCountInput.value);

    if (isNaN(count) || count < 1 || count > 10) {
        alert("Ingresa un número válido entre 1 y 10");
        return;
    }

    originalCards = generateRandomCards(count);
    renderCards(originalCards, cardContainer);
    logContainer.innerHTML = "";
});
//Selection Sort con log
function bubbleSort(cards) {
    const arr = [...cards];
    const log = [];

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {

            if (arr[j].numericValue > arr[j + 1].numericValue) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                log.push([...arr]);
            }

        }
    }

    return log;
}
//Renderizar log del sort
function renderSortLog(log) {
    logContainer.innerHTML = "";

    log.forEach((step, index) => {
        const row = document.createElement("div");
        row.classList.add("log-row");

        const label = document.createElement("span");
        label.textContent = index;
        row.appendChild(label);

        step.forEach(card => {
            row.insertAdjacentHTML("beforeend", createCardHTML(card));
        });

        logContainer.appendChild(row);
    });
}
//Evento Sort
sortBtn.addEventListener("click", () => {
    if (originalCards.length === 0) {
        alert("Primero debes generar las cartas con Draw");
        return;
    }

    sortLog = bubbleSort(originalCards);
    renderSortLog(sortLog);
});