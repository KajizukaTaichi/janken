let isAfterTake = false;

const Hand = {
    Rock: "✊",
    Paper: "✋",
    Scissor: "✌️",
};

const win_case = [
    ["Rock", "Scissor"],
    ["Scissor", "Paper"],
    ["Paper", "Rock"],
];

const showArea = document.getElementById("show");
const result = document.getElementById("result");
const img = document.getElementById("reimu-img");
const panel = document.getElementById("panel");
const modal = document.getElementById("modal");

const isWin = (target) =>
    win_case.some(
        (sub) =>
            sub.length === target.length &&
            sub.every((val, i) => val === target[i]),
    );

const forEvent = (target, eventType) =>
    new Promise((resolve) => {
        const handler = (e) => {
            target.removeEventListener(eventType, handler);
            resolve(e);
        };
        target.addEventListener(eventType, handler);
    });

async function play(userHandId) {
    changePanelColor();
    if (isAfterTake) {
        afterTakeHandle();
    } else {
        resetGame();
        isAfterTake = true;
        const reimuHandId = Object.keys(Hand)[Math.floor(Math.random() * 3)];
        await modalHand(reimuHandId);
        showHand(userHandId, reimuHandId);
        await judge(userHandId, reimuHandId);
    }
    isAfterTake = false;
}

function changePanelColor(userHandId) {
    const buttons = document.querySelectorAll("button");
    for (i of buttons) {
        i.id = i.textContent == Hand[userHandId] ? "active-button" : "";
    }
}

function resetGame() {
    result.textContent = "";
    result.style.display = "none";
    showArea.style.display = "none";
    img.src = "static/reimu_normal.jpg";
}

function afterTakeHandle() {
    img.src = "static/reimu_angry.jpg";
    result.style.display = "block";
    modal.style.display = "none";
    result.textContent = "後出しズルいよ 💢";
}

function showHand(userHandId, reimuHandId) {
    showArea.style.display = "block";
    showArea.textContent = `${Hand[userHandId]} vs ${Hand[reimuHandId]}`;
}

async function judge(userHandId, reimuHandId) {
    result.style.display = "block";
    if (isWin([reimuHandId, userHandId])) {
        result.textContent = "私の勝ち!";
        img.src = "static/reimu_happy.jpg";
    } else if (isWin([userHandId, reimuHandId])) {
        result.textContent = "負けちゃった...";
        img.src = "static/reimu_sad.jpg";
    } else {
        result.textContent = "あいこ";
        img.src = "static/reimu_scare.jpg";
    }
}

async function modalHand(reimuHand) {
    result.style.display = "none";
    modal.textContent = Hand[reimuHand];
    modal.style.display = "block";
    await forEvent(modal, "click");
    modal.style.display = "none";
}
