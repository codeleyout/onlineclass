// import { dateTimeUpdater } from "./date_time.js";
// import { readTimeTable } from "./time_table_reader.js";

// time table file starts here
function timeAsNum(hours, minutes, seconds) {
    return hours * 10000 + minutes * 100 + seconds;
}
const timeTable = {
    "Monday": ["English", "Chemistry", "Physics", "Maths", "Computer"],
    "Tuesday": ["English", "Chemistry", "Physics", "Maths", "Computer"],
    "Wednesday": ["English", "Chemistry", "Physics", "Maths", "Computer"],
    "Thursday": ["English", "Chemistry", "Physics", "Maths", "Computer"],
    "Friday": ["Chemistry", "English", "Physics", "Maths", "Computer"]
};

const classLink = {
    "CTBlock": "https://us04web.zoom.us/j/5556312068?pwd=bHUzSjBZTytoNC9hOEpKUlM0cDNnUT09",
    "English": "https://us04web.zoom.us/j/2642201759?pwd=N2loYnhwWDJTdG5TKzNiUndEQlc0dz09",
    "Physics": "https://us04web.zoom.us/j/5556312068?pwd=bHUzSjBZTytoNC9hOEpKUlM0cDNnUT09",
    "Chemistry": "https://us02web.zoom.us/j/7523800259?pwd=bkxFSS9PRzF4Q1M0VVdvNG9BcG9mQT09",
    "Maths": "https://us04web.zoom.us/j/6224028817?pwd=YnlaYVZYeXgzcU8yQ3poNjJPL0V4Zz09",
    "Computer": "https://us04web.zoom.us/j/5853556094?pwd=i6MWQ9g2m6xaarxCj-4QPwBjuZR6"
};

const blockStartTimings = {
    "start": timeAsNum(7, 30, 0),
    "Block1": timeAsNum(8, 55, 0),
    "Block2": timeAsNum(9, 40, 0),
    "Block3": timeAsNum(10, 30, 0),
    "Block4": timeAsNum(11, 20, 0),
    "Block5": timeAsNum(12, 10, 0),
    "end": timeAsNum(13, 0, 0)
};
// time table file ends here





// time table reader file starts here

function timeAsNum(hours, minutes, seconds) {
    return hours * 10000 + minutes * 100 + seconds;
}

function blockNum() {
    const secondsNow = new Date().getSeconds();
    const minutesNow = new Date().getMinutes();
    const hoursNow = new Date().getHours();

    const currentTime = timeAsNum(hoursNow, minutesNow, secondsNow);

    const start = blockStartTimings.start;
    const Block1 = blockStartTimings.Block1;
    const Block2 = blockStartTimings.Block2;
    const Block3 = blockStartTimings.Block3;
    const Block4 = blockStartTimings.Block4;
    const Block5 = blockStartTimings.Block5;
    const end = blockStartTimings.end;

    if (currentTime >= start && currentTime < Block1) {
        return 10;
    }
    else if (currentTime >= Block1 && currentTime < Block2) {
        return 0;
    }
    else if (currentTime >= Block2 && currentTime < Block3) {
        return 1;
    }
    else if (currentTime >= Block3 && currentTime < Block4) {
        return 2;
    }
    else if (currentTime >= Block4 && currentTime < Block5) {
        return 3;
    }
    else if (currentTime >= Block5 && currentTime < end) {
        return 4;
    }
    else {
        return 10;
    }
}
function className(num) {
    const dayToday = new Date().getDay();
    if (num === 10 || dayToday >= 6) {
        return "CTBlock";
    }
    return timeTable[dayNumToStr(dayToday)][num];

}
let initialClass = className(blockNum());
let checknum = 1;
let checknum2 = 1;

function readTimeTable() {
    const classRN = className(blockNum());
    if (classRN != initialClass) {
        document.getElementById("join-btn-rn").outerHTML = document.getElementById("join-btn-rn").outerHTML;
        initialClass = classRN;
        checknum2 = 1;
    }
    if (checknum === 1) {
        document.getElementById("english-btn").addEventListener('click', () => {
            newTab = window.open(classLink["English"]);
            setTimeout(() => { newTab.close(); }, 10000);

        });
        document.getElementById("physics-btn").addEventListener('click', () => {
            newTab = window.open(classLink["Physics"]);
            setTimeout(() => { newTab.close(); }, 10000);

        });
        document.getElementById("chemistry-btn").addEventListener('click', () => {
            newTab = window.open(classLink["Chemistry"]);
            setTimeout(() => { newTab.close(); }, 10000);

        });
        document.getElementById("maths-btn").addEventListener('click', () => {
            newTab = window.open(classLink["Maths"]);
            setTimeout(() => { newTab.close(); }, 10000);

        });
        document.getElementById("computer-btn").addEventListener('click', () => {
            newTab = window.open(classLink["Computer"]);
            setTimeout(() => { newTab.close(); }, 10000);

        });
        checknum++;
    }

    if (blockNum() >= 0 && blockNum() <= 4 && classRN != "CTBlock") {
        if (checknum2 === 1){
            document.getElementById("join-btn-rn").addEventListener('click', () => {
                newTab = window.open(classLink[classRN]);
                setTimeout(() => { newTab.close(); }, 10000);
            });
            checknum2++;
        }
        
        return classRN;
    }
    else {
        if (checknum2 === 1){
            document.getElementById("join-btn-rn").addEventListener('click', () => {
                newTab = window.open(classLink["CTBlock"]);
                setTimeout(() => { newTab.close(); }, 10000);
            });
            checknum2++;
        }
        return "Class Teacher Block";
    }

};
// time table reader file ends here




// Datetime file starts here

function convertHours(num) {
    if (num <= 12) {
        return num;
    }
    else {
        return num - 12;
    }
}
function convertToZero(num) {
    if (num < 10) {
        return "0" + num;
    }
    else {
        return num;
    }
}
function AMorPM(num) {
    if (num < 12) {
        return "AM";
    }
    else {
        return "PM";
    }
}
function dayNumToStr(num) {
    switch (num) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 0:
            return "Sunday";
    }

}
function monthNumToStr(num) {
    switch (num) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }

}
function superscriptDay(date) {
    switch (date) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}
function dateTimeUpdater() {
    const dateTimeInfo = new Date();
    const day = dateTimeInfo.getDay();
    const date = dateTimeInfo.getDate();
    const month = dateTimeInfo.getMonth();
    const year = dateTimeInfo.getFullYear();
    const hours = dateTimeInfo.getHours();
    const minutes = dateTimeInfo.getMinutes();
    const seconds = dateTimeInfo.getSeconds();

    document.getElementById('day-rn').innerText = dayNumToStr(day);
    document.getElementById('date-rn').innerHTML = monthNumToStr(month + 1) + " " + date + "<sup>" + superscriptDay(date) + "</sup>" + ", " + year;
    document.getElementById('time-rn').innerHTML = convertToZero(convertHours(hours)) + ":" + convertToZero(minutes) + ":" + convertToZero(seconds) + "<a>" + AMorPM(hours) + "</a>";

    setTimeout(() => { dateTimeUpdater(); }, 500);
}
// Datetimefile ends here 













// Main Script.js file starts here

function mainFunction() {
    document.getElementById("join-btn-rn").innerText = readTimeTable();
    setTimeout(() => { mainFunction(); }, 500);
}

dateTimeUpdater();
mainFunction();