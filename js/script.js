let workTime = 25;
let breakTime = 5;
let intervalText = "WORK"
let timerId = -55;
let currTime = -22;
let timerStarted = false;

function startTimer() {
	disableButtons();
	if (timerStarted) {
		if (intervalText === "WORK") {
			document.querySelector(".display-text").style.color = "#ffb833";
		}
		else if (intervalText === "BREAK") {
			document.querySelector(".display-text").style.color = "#66b0ff";
		}
		timerId = setInterval(function(){runTimer();}, 1000);
	}
	else {
		timerStarted = true;
		// Don't forget to use an anonymous function so the function isn't executed immediately
		currTime = workTime * 60;
		document.querySelector(".display-text").style.color = "#ffb833";
		timerId = setInterval(function(){runTimer();}, 1000);
	}
}

function runTimer() {	
	let displayMinutes = Math.floor(currTime/60);
	let displaySeconds = currTime%60;
	let displayTime = `${displayMinutes}:${displaySeconds}`;
	if (displayMinutes >= 10) {
		if (displaySeconds < 10) {
			displayTime = `${displayMinutes}:0${displaySeconds}`;
		}
	}
	else if (displayMinutes < 10) {
		if (displaySeconds < 10) {
			displayTime = `0${displayMinutes}:0${displaySeconds}`;
		}
		else {
			displayTime = `0${displayMinutes}:${displaySeconds}`;
		}
	}
	currTime--;
	document.querySelector(".time").innerHTML = displayTime;
	
	if (currTime < 0) {
		switchTimer();
	}
}

function switchTimer() {
	clearInterval(timerId);
	if (intervalText === "WORK") {
		currTime = breakTime * 60;
		intervalText = "BREAK"
		document.querySelector(".display-text").innerHTML = intervalText;
		document.querySelector(".display-text").style.color = "#66b0ff";
		startTimer();
	}
	else if (intervalText === "BREAK") {
		currTime = workTime * 60;
		intervalText = "WORK"
		document.querySelector(".display-text").innerHTML = intervalText;
		document.querySelector(".display-text").style.color = "#ffb833";
		startTimer();
	}
}

function pauseTimer() {
	clearInterval(timerId);
	document.querySelector(".display-text").style.color = "#f9fffe";
	document.querySelector(".start-btn").addEventListener("click", startTimer);	
}

function stopTimer() {
	clearInterval(timerId);
	disableButtons();
	enableButtons();
	timerStarted = false;
	intervalText = "WORK";
	document.querySelector(".display-text").style.color = "#f9fffe";
	document.querySelector(".display-text").innerHTML = intervalText;
	document.querySelector(".time").innerHTML = `${workTime}:00`;
	document.querySelector(".start-btn").addEventListener("click", startTimer);
}

function resetTimer() {
	clearInterval(timerId);
	disableButtons();
	enableButtons();
	timerStarted = false;
	workTime = 25;
	document.querySelector(".display-work").innerHTML = workTime;
	breakTime = 5;
	document.querySelector(".display-break").innerHTML = breakTime;
	intervalText = "WORK";
	document.querySelector(".display-text").style.color = "#f9fffe";
	document.querySelector(".display-text").innerHTML = intervalText;
	document.querySelector(".time").innerHTML = `${workTime}:00`;
	document.querySelector(".start-btn").addEventListener("click", startTimer);
}

function disableButtons() {
	document.querySelector(".start-btn").removeEventListener("click", startTimer);
	document.querySelector(".inc-work").removeEventListener("click", incWork);
	document.querySelector(".dec-work").removeEventListener("click", decWork);
	document.querySelector(".inc-break").removeEventListener("click", incBreak);
	document.querySelector(".dec-break").removeEventListener("click", decBreak);
}

function enableButtons() {
	document.querySelector(".start-btn").addEventListener("click", startTimer);
	document.querySelector(".inc-work").addEventListener("click", incWork);
	document.querySelector(".dec-work").addEventListener("click", decWork);
	document.querySelector(".inc-break").addEventListener("click", incBreak);
	document.querySelector(".dec-break").addEventListener("click", decBreak);
}

function incWork() {
	if (workTime < 720) {
		workTime += 1;
		document.querySelector(".display-work").innerHTML = workTime;
		document.querySelector(".time").innerHTML = `${workTime}:00`;
	}
}

function decWork() {
	if (workTime > 1) {
		workTime -= 1;
		document.querySelector(".display-work").innerHTML = workTime;
		document.querySelector(".time").innerHTML = `${workTime}:00`;
	}
}

function incBreak() {
	if (breakTime < 720) {
		breakTime += 1;
		document.querySelector(".display-break").innerHTML = breakTime;
	}
}

function decBreak() {
	if (breakTime > 1) {
		breakTime -= 1;
		document.querySelector(".display-break").innerHTML = breakTime;
	}
}

window.addEventListener("load", function(event) {
	// Add function button events
	document.querySelector(".start-btn").addEventListener("click", startTimer);
	document.querySelector(".pause-btn").addEventListener("click", pauseTimer);
	document.querySelector(".stop-btn").addEventListener("click", stopTimer);
	document.querySelector(".reset-btn").addEventListener("click", resetTimer);
	// Add timer button events
	document.querySelector(".inc-work").addEventListener("click", incWork);
	document.querySelector(".dec-work").addEventListener("click", decWork);
	document.querySelector(".inc-break").addEventListener("click", incBreak);
	document.querySelector(".dec-break").addEventListener("click", decBreak);
});