// =====================
// TAP MASTER ULTRA
// =====================

let coins = Number(localStorage.getItem("coins")) || 0;
let gems = Number(localStorage.getItem("gems")) || 0;
let level = Number(localStorage.getItem("level")) || 1;
let xp = Number(localStorage.getItem("xp")) || 0;

let tapPower = Number(localStorage.getItem("tapPower")) || 1;
let autoTapper = Number(localStorage.getItem("autoTapper")) || 0;
let rebirths = Number(localStorage.getItem("rebirths")) || 0;

let tapCost = Number(localStorage.getItem("tapCost")) || 50;
let autoCost = Number(localStorage.getItem("autoCost")) || 200;

const coinsEl = document.getElementById("coins");
const gemsEl = document.getElementById("gems");
const levelEl = document.getElementById("level");
const xpBar = document.getElementById("xpBar");
const xpText = document.getElementById("xpText");
const multiplierEl = document.getElementById("multiplier");

const tapButton = document.getElementById("tapButton");
const upgradeTapBtn = document.getElementById("upgradeTap");
const autoTapBtn = document.getElementById("buyAuto");
const gemBtn = document.getElementById("buyGem");
const dailyBtn = document.getElementById("dailyRewardBtn");
const rebirthBtn = document.getElementById("rebirthBtn");

let multiplier = 1;

// =====================
// SAVE GAME
// =====================

function saveGame() {
    localStorage.setItem("coins", coins);
    localStorage.setItem("gems", gems);
    localStorage.setItem("level", level);
    localStorage.setItem("xp", xp);

    localStorage.setItem("tapPower", tapPower);
    localStorage.setItem("autoTapper", autoTapper);
    localStorage.setItem("rebirths", rebirths);

    localStorage.setItem("tapCost", tapCost);
    localStorage.setItem("autoCost", autoCost);
}

// =====================
// UPDATE UI
// =====================

function updateUI() {

    coinsEl.textContent = Math.floor(coins).toLocaleString();
    gemsEl.textContent = gems;
    levelEl.textContent = level;

    const xpNeeded = level * 100;

    xpBar.style.width =
        (xp / xpNeeded) * 100 + "%";

    xpText.textContent =
        `${xp} / ${xpNeeded} XP`;

    multiplierEl.textContent = multiplier;

    upgradeTapBtn.innerHTML =
        `Upgrade Tap<br><span>${tapCost} Coins</span>`;

    autoTapBtn.innerHTML =
        `Buy Auto Tapper<br><span>${autoCost} Coins</span>`;

    saveGame();
}

// =====================
// LEVEL SYSTEM
// =====================

function addXP(amount) {

    xp += amount;

    const xpNeeded = level * 100;

    if (xp >= xpNeeded) {

        xp -= xpNeeded;
        level++;

        alert(`🎉 Level ${level} Reached!`);
    }

    updateUI();
}

// =====================
// FLOATING TEXT
// =====================

function floatingText(text) {

    const div = document.createElement("div");

    div.className = "float-text";
    div.textContent = text;

    div.style.left =
        (window.innerWidth / 2) + "px";

    div.style.top =
        (window.innerHeight / 2) + "px";

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 1000);
}

// =====================
// PARTICLES
// =====================

function createParticles() {

    for (let i = 0; i < 10; i++) {

        const p =
            document.createElement("div");

        p.className = "particle";

        p.style.left =
            (window.innerWidth / 2) + "px";

        p.style.top =
            (window.innerHeight / 2) + "px";

        p.style.setProperty(
            "--x",
            (Math.random() * 200 - 100) + "px"
        );

        p.style.setProperty(
            "--y",
            (Math.random() * 200 - 100) + "px"
        );

        document.body.appendChild(p);

        setTimeout(() => {
            p.remove();
        }, 800);
    }
}

// =====================
// TAP
// =====================

tapButton.addEventListener("click", () => {

    const earned =
        tapPower * multiplier;

    coins += earned;

    addXP(5);

    floatingText("+" + earned);

    createParticles();

    if (Math.random() < 0.10) {
        multiplier++;
    }

    if (multiplier > 10) {
        multiplier = 10;
    }

    updateUI();
});

// =====================
// UPGRADE TAP
// =====================

upgradeTapBtn.addEventListener("click", () => {

    if (coins >= tapCost) {

        coins -= tapCost;

        tapPower++;

        tapCost =
            Math.floor(tapCost * 1.8);

        updateUI();
    }
});

// =====================
// AUTO TAPPER
// =====================

autoTapBtn.addEventListener("click", () => {

    if (coins >= autoCost) {

        coins -= autoCost;

        autoTapper++;

        autoCost =
            Math.floor(autoCost * 2);

        updateUI();
    }
});

setInterval(() => {

    coins += autoTapper;

    updateUI();

}, 1000);

// =====================
// GEMS
// =====================

gemBtn.addEventListener("click", () => {

    if (coins >= 1000) {

        coins -= 1000;

        gems++;

        updateUI();
    }
});

// =====================
// DAILY REWARD
// =====================

dailyBtn.addEventListener("click", () => {

    const lastClaim =
        localStorage.getItem("lastClaim");

    const now = Date.now();

    if (
        !lastClaim ||
        now - Number(lastClaim)
        > 86400000
    ) {

        coins += 500;
        gems += 1;

        localStorage.setItem(
            "lastClaim",
            now
        );

        alert(
            "🎁 Daily Reward Claimed!"
        );

        updateUI();

    } else {

        alert(
            "Come back tomorrow!"
        );
    }
});

// =====================
// ACHIEVEMENTS
// =====================

function checkAchievements() {

    if (
        level >= 5 &&
        !localStorage.getItem("ach1")
    ) {

        localStorage.setItem(
            "ach1",
            "true"
        );

        gems += 5;

        alert(
            "🏆 Achievement: Level 5"
        );
    }

    if (
        coins >= 10000 &&
        !localStorage.getItem("ach2")
    ) {

        localStorage.setItem(
            "ach2",
            "true"
        );

        gems += 10;

        alert(
            "🏆 Achievement: 10,000 Coins"
        );
    }

    if (
        gems >= 10 &&
        !localStorage.getItem("ach3")
    ) {

        localStorage.setItem(
            "ach3",
            "true"
        );

        gems += 10;

        alert(
            "🏆 Achievement: 10 Gems"
        );
    }
}

setInterval(
    checkAchievements,
    2000
);

// =====================
// SKINS
// =====================

document
.querySelectorAll(".skin-btn")
.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            const skin =
                btn.dataset.skin;

            switch (skin) {

                case "blue":
                    tapButton.style.background =
                        "linear-gradient(135deg,#00d4ff,#2563eb)";
                    break;

                case "purple":
                    tapButton.style.background =
                        "linear-gradient(135deg,#9333ea,#7c3aed)";
                    break;

                case "gold":
                    tapButton.style.background =
                        "linear-gradient(135deg,#ffd700,#f59e0b)";
                    break;
            }

            localStorage.setItem(
                "selectedSkin",
                skin
            );
        }
    );
});

// =====================
// LOAD SKIN
// =====================

const savedSkin =
    localStorage.getItem(
        "selectedSkin"
    );

if (savedSkin) {

    const fakeButton =
        document.querySelector(
            `[data-skin="${savedSkin}"]`
        );

    if (fakeButton) {
        fakeButton.click();
    }
}

// =====================
// REBIRTH
// =====================

rebirthBtn.addEventListener(
    "click",
    () => {

        if (coins >= 100000) {

            rebirths++;

            coins = 0;
            level = 1;
            xp = 0;

            tapPower =
                1 + rebirths;

            autoTapper = 0;

            alert(
                `🔄 Rebirth #${rebirths}`
            );

            updateUI();

        } else {

            alert(
                "Need 100,000 coins!"
            );
        }
    }
);

// =====================
// START
// =====================

updateUI();
