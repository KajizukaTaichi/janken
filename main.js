let isAfterTake = false;
let userHandId = null;
let reimuHandId = null;

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

async function play(userHand) {
    userHandId = userHand;
    if (isAfterTake) {
        showHand(userHandId);
        afterTakeHandle();
    } else {
        resetGame();
        isAfterTake = true;
        reimuHandId = Object.keys(Hand)[Math.floor(Math.random() * 3)];
        showHand(userHandId, reimuHandId);
        await modalHand(reimuHandId);
        await judge(userHandId, reimuHandId);
    }
    isAfterTake = false;
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
    result.textContent = "後出しはズルいよ 💢";
}

function showHand() {
    showArea.style.display = "block";
    showArea.textContent = `${Hand[userHandId]} vs ${Hand[reimuHandId]}`;
}

async function judge() {
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

async function modalHand() {
    result.style.display = "none";
    modal.textContent = Hand[reimuHandId];
    modal.style.display = "block";
    await forEvent(modal, "click");
    modal.style.display = "none";
}
