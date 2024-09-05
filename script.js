// List of physical exercises
const exercises = ['10 Pompes', '10 Shoulder Tap', '10 Squats',  '10 Burpees'];
let intervals = [];
let currentIntervalIndex = 0;
let intervalTimer;
let timeRemaining;
let isPaused = false;

document.getElementById('compute-session').addEventListener('click', computeSession);
document.getElementById('start').addEventListener('click', startSession);
document.getElementById('pause').addEventListener('click', pauseSession);
document.getElementById('resume').addEventListener('click', resumeSession);

function computeSession() {
    const sessionTime = parseInt(document.getElementById('session-time').value) * 60; // Convert minutes to seconds
    const intervalCount = Math.floor(sessionTime / 70); // Each interval is 70 seconds (30s jump, 30s exercise, 10s rest)
    
    intervals = [];
    for (let i = 0; i < intervalCount; i++) {
        const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
        intervals.push({title: 'Jump Rope', is_jump: true, time: 30});
        intervals.push({title: randomExercise , is_jump: false, time: 30});
        intervals.push({title: 'Rest' , is_jump: false, time: 10});
    }

    displayIntervals();
}

function displayIntervals() {
    const tbody = document.getElementById('intervals-body');
    tbody.innerHTML = ''; // Clear existing intervals

    intervals.forEach((interval, index) => {
    if (!interval.is_jump && interval.title != "Rest"){
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${interval.title}</td>
                <td>30s</td>
            </tr>
        `;
    }
        // tbody.innerHTML += `
        //     <tr>
        //         <td>${index + 1}</td>
        //         <td>Jump Rope</td>
        //         <td>30s</td>
        //     </tr>
        //     <tr>
        //         <td>${index + 1}</td>
        //         <td>${interval.exercise}</td>
        //         <td>30s</td>
        //     </tr>
        //     <tr>
        //         <td>${index + 1}</td>
        //         <td>Rest</td>
        //         <td>10s</td>
        //     </tr>
        // `;
    
    });
}

function startSession() {
    currentIntervalIndex = 0;
    isPaused = false;
    document.getElementById('start').disabled = true;
    document.getElementById('pause').disabled = false;
    runInterval();
}

function runInterval() {
    if (currentIntervalIndex >= intervals.length) {
        alert('Session Complete!');
        return;
    }

    const currentInterval = intervals[currentIntervalIndex];
    const nextInterval = intervals[currentIntervalIndex+1];
    document.getElementById('current-exercise').textContent = currentInterval.title;
    document.getElementById('progress').textContent = "" + (currentIntervalIndex + 1) + "/" + intervals.length;
    document.getElementById('next-exercise').textContent = nextInterval.title;
    
    timeRemaining = currentInterval.time; // Jump rope 30s + exercice + rest
    intervalTimer = setInterval(updateTimer, 1000);
}

// Sound for interval alerts
const alertSound = new Audio('five.mp3');


function updateTimer() {
    timeRemaining--;
    document.getElementById('remaining-time').textContent = formatTime(timeRemaining);

    if (timeRemaining === 5) {
        alertSound.play();
    } else if (timeRemaining === 0) {
        clearInterval(intervalTimer);
        currentIntervalIndex++;
        runInterval();
    }
}

function pauseSession() {
    clearInterval(intervalTimer);
    isPaused = true;
    document.getElementById('pause').disabled = true;
    document.getElementById('resume').disabled = false;
}

function resumeSession() {
    isPaused = false;
    document.getElementById('resume').disabled = true;
    document.getElementById('pause').disabled = false;
    runInterval();
}

function formatTime(seconds) {
    return seconds;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

