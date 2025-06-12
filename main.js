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
        target.addEventListener(eventType, resolve, { once: true });
    });

async function play(userHandId) {
    const reimuHandId = Object.keys(Hand)[Math.floor(Math.random() * 3)];
    await modalHand(reimuHandId);
    await showHand(userHandId, reimuHandId);
    await judge(userHandId, reimuHandId);
}

async function showHand(userHandId, reimuHandId) {
    showArea.style.display = "block";
    showArea.textContent = `${Hand[userHandId]} vs ${Hand[reimuHandId]}`;
}

async function judge(userHandId, reimuHandId) {
    result.style.display = "block";
    panel.style.pointerEvents = "none";

    if (isWin([reimuHandId, userHandId])) {
        result.textContent = "私の勝ち!";
        img.src = "static/reimu_happy.jpg";
    } else if (isWin([userHandId, reimuHandId])) {
        result.textContent = "負けちゃった...";
        img.src = "static/reimu_sad.jpg";
    } else {
        result.textContent = "あいこ";
        img.src = "static/reimu_normal.jpg";
    }

    await forEvent(document, "click");
    result.textContent = "";
    result.style.display = "none";
    showArea.style.display = "none";
    panel.style.pointerEvents = "initial";
    img.src = "static/reimu_normal.jpg";
}

async function modalHand(reimuHand) {
    console.log("modalHand start");
    modal.textContent = Hand[reimuHand];
    modal.style.display = "block";
    document.body.classList.add("modal-open");
    console.log("modal shown, waiting for click...");

    await forEvent(document, "click");

    console.log("modalHand click detected, hiding modal");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
    console.log("modalHand end");
}
