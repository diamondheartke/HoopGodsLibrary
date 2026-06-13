const skillDatabase = {
    "ball-handling": {
        title: "Ball Handling",
        category: "Offense",
        badgeClass: "offense",
        tape: [
            { title: "Allen Iverson Iconic Crossover on Michael Jordan (1997)", ytId: "2REkZ60b7_c" },
            { title: "Kyrie Irving The Most Creative Handles Collective Tape", ytId: "mYyFfD-S8Cw" }
        ],
        lab: [
            { step: "1. The Low Pound", desc: "Keep your dribble below knee height.", ytId: "5LzN_S78U2k" }, // Tutorials can have videos too!
            { step: "2. The Counter Step", desc: "Shift your weight violently.", ytId: "mYyFfD-S8Cw" }
        ]
    },
    "shot-creation": {
        title: "Shot Creation",
        category: "Offense",
        badgeClass: "offense",
        tape: [
            { title: "Kobe Bryant Masterclass Clutch Fadeaways", ytId: "b7C9I77N_w0" }
        ],
        lab: [
            { step: "1. The Push Off", desc: "Create separation using your lead leg.", ytId: "Z6XNalXG_uU" }
        ]
    }
};

let currentSkill = "";
let ytPlayer = null; // Holds the YouTube API Instance

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    currentSkill = params.get("skill") || "ball-handling"; 
    loadSkillData(currentSkill);
});

function loadSkillData(skillKey) {
    const data = skillDatabase[skillKey];
    if (!data) return;

    document.getElementById("skill-title").innerText = data.title;
    const catBadge = document.getElementById("skill-category");
    catBadge.innerText = data.category;
    catBadge.className = `category-badge ${data.badgeClass}`;

    // Load Tape Cards
    const videoGrid = document.getElementById("archive-video-grid");
    videoGrid.innerHTML = ""; 
    data.tape.forEach(vid => {
        videoGrid.innerHTML += `
            <div class="video-card" onclick="playVideoOnSite('${vid.ytId}')">
                <div class="video-thumbnail-mock"><span class="play-icon">▶</span></div>
                <h4>${vid.title}</h4>
            </div>
        `;
    });

    // Load Lab Cards (With video support built in!)
    const labContainer = document.getElementById("tutorial-steps-container");
    labContainer.innerHTML = ""; 
    data.lab.forEach(stepItem => {
        labContainer.innerHTML += `
            <div class="lab-step-card" onclick="playVideoOnSite('${stepItem.ytId}')" style="cursor:pointer;">
                <h3>${stepItem.step} <span style="font-size:0.8rem; color:#ff6600;">(Watch Drills)</span></h3>
                <p>${stepItem.desc}</p>
            </div>
        `;
    });
}

// Global invocation function for clicking ANY video card inside the Library
function playVideoOnSite(videoId) {
    const container = document.getElementById("global-player-container");
    
    // Reset structural layout classes back to primary full screen focus view
    container.className = "fullscreen-mode";

    if (ytPlayer === null) {
        // If player instance doesn't exist, build it using YouTube API
        ytPlayer = new YT.Player('youtube-iframe-placeholder', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: { 'autoplay': 1, 'modestbranding': 1, 'rel': 0 },
        });
    } else {
        // Safe reuse optimization
        ytPlayer.loadVideoById(videoId);
    }
}

// Triggers your requested back-arrow design loop logic!
function minimizeOrClosePlayer() {
    const container = document.getElementById("global-player-container");

    if (container.classList.contains("fullscreen-mode")) {
        // Clicked back arrow from full screen -> Drop it into the bottom right minimized box!
        container.className = "minimized-mode";
        document.getElementById("close-player-btn").innerHTML = "&times; Close Media";
    } else if (container.classList.contains("minimized-mode")) {
        // Clicked "Close Media" from the bottom right -> Completely terminate and turn it off
        if (ytPlayer) ytPlayer.stopVideo();
        container.className = "hidden-player";
        document.getElementById("close-player-btn").innerHTML = "&#8592; Exit";
    }
}

function switchView(targetView) {
    document.getElementById("btn-tape").classList.remove("active");
    document.getElementById("btn-lab").classList.remove("active");
    document.getElementById("view-tape").classList.remove("active");
    document.getElementById("view-lab").classList.remove("active");

    if (targetView === 'tape') {
        document.getElementById("btn-tape").classList.add("active");
        document.getElementById("view-tape").classList.add("active");
    } else {
        document.getElementById("btn-lab").classList.add("active");
        document.getElementById("view-lab").classList.add("active");
    }
}