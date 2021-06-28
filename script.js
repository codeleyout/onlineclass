function checkFirstUser() {
    if (localStorage.getItem("firstTime") === null) {
        localStorage.clear();
        localStorage.setItem("firstTime",false)
    }
}
checkFirstUser();
function globalDt() {
    return new Date();
}
function mainWorker() {

    window.mainObjreset = {
        "timeTable": {
            "Monday": ["English", "Chemistry", "Physics", "Maths", "Computer"],
            "Tuesday": ["English", "Chemistry", "Physics", "Maths", "Computer"],
            "Wednesday": ["English", "Chemistry", "Physics", "Maths", "Computer"],
            "Thursday": ["English", "Chemistry", "Physics", "Maths", "Computer"],
            "Friday": ["Chemistry", "English", "Physics", "Maths", "Computer"],
            "Saturday": [null, null, null, null, null],
            "Sunday": [null, null, null, null, null],
        },
        "classLink": {
            "CTBlock": "https://us04web.zoom.us/j/5556312068?pwd=bHUzSjBZTytoNC9hOEpKUlM0cDNnUT09",
            "English": "https://us04web.zoom.us/j/2642201759?pwd=N2loYnhwWDJTdG5TKzNiUndEQlc0dz09",
            "Physics": "https://us04web.zoom.us/j/5556312068?pwd=bHUzSjBZTytoNC9hOEpKUlM0cDNnUT09",
            "Chemistry": "https://us02web.zoom.us/j/7523800259?pwd=bkxFSS9PRzF4Q1M0VVdvNG9BcG9mQT09",
            "Maths": "https://us04web.zoom.us/j/6224028817?pwd=YnlaYVZYeXgzcU8yQ3poNjJPL0V4Zz09",
            "Computer": "https://us04web.zoom.us/j/5853556094?pwd=i6MWQ9g2m6xaarxCj-4QPwBjuZR6"
        },
        "blockStartTimings": {
            "start": timeAsNum(7, 30, 0),
            "Block1": timeAsNum(8, 55, 0),
            "Block2": timeAsNum(9, 40, 0),
            "Block3": timeAsNum(10, 30, 0),
            "Block4": timeAsNum(11, 20, 0),
            "Block5": timeAsNum(12, 20, 0),
            "end": timeAsNum(13, 0, 0)
        },
        "timeToCloseTab": 10000,
    }
    let mainObj = localStorage.getItem("mainObj");
    if (mainObj === null) {
        mainObj = mainObjreset;
        localStorage.setItem("mainObj", JSON.stringify(mainObj));
    }
    else {
        mainObj = JSON.parse(mainObj);
    }
    const dayToday = globalDt().getDay();
    for (let subject in mainObj.classLink) {
        let subid;
        if (subject === "CTBlock") {
            subject = "CT Block";
            subid = "CTBlock";
        }
        else {
            subid = subject;
        }
        htmlToAdd = `<li>
        <button class="other-btn" id="${subid}-btn">
            ${subject}
        </button>
        </li>`;
        document.getElementById("other-class-ul").innerHTML += htmlToAdd;

    }
    function timeAsNum(hours, minutes, seconds) {
        return hours * 10000 + minutes * 100 + seconds;
    }




    // time table reader file starts here

    function timeAsNum(hours, minutes, seconds) {
        return hours * 10000 + minutes * 100 + seconds;
    }

    function blockNum() {
        const secondsNow = globalDt().getSeconds();
        const minutesNow = globalDt().getMinutes();
        const hoursNow = globalDt().getHours();

        const currentTime = timeAsNum(hoursNow, minutesNow, secondsNow);
        let blockArr = [];
        const blockObj = mainObj.blockStartTimings;
        for (const key in blockObj) {
            blockArr.push(blockObj[key]);
        }
        for (let i = 0; i < blockArr.length; i++) {
            if ((currentTime > blockArr[0] && currentTime < blockArr[1]) || (currentTime > blockArr[-1])) {
                return 10;
            }
            if (currentTime >= blockArr[i] && currentTime < blockArr[i + 1]) {
                return i - 1;
            }
        }
        return 10;
    }
    function className(num) {
        const dayToday = globalDt().getDay();
        if (num === 10 || mainObj.timeTable[dayNumToStr(dayToday)] === null) {
            return "CTBlock";
        }
        return mainObj.timeTable[dayNumToStr(dayToday)][num];
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
        const dayToday = globalDt().getDay();
        if (checknum === 1) {
            for (let i = 0; i < Object.keys(mainObj.classLink).length; i++) {
                const subject = Object.keys(mainObj.classLink)[i];
                document.getElementById(subject + "-btn").addEventListener('click', () => {
                    newTab = window.open(mainObj.classLink[subject]);
                    setTimeout(() => { newTab.close(); }, mainObj.timeToCloseTab);
                });
            }
            checknum++;
        }
        if (mainObj.timeTable[dayNumToStr(dayToday)] != null) {

            if (blockNum() >= 0 && blockNum() <= mainObj.timeTable[dayNumToStr(dayToday)].length && classRN != "CTBlock") {
                if (checknum2 === 1) {
                    document.getElementById("main-btn").addEventListener('click', () => {
                        newTab = window.open(mainObj.classLink[classRN]);
                        setTimeout(() => { newTab.close(); }, mainObj.timeToCloseTab);
                    });
                    checknum2++;
                }
                return classRN;
            }
            else {
                if (checknum2 === 1) {
                    document.getElementById("main-btn").addEventListener('click', () => {
                        newTab = window.open(mainObj.classLink["CTBlock"]);
                        setTimeout(() => { newTab.close(); }, mainObj.timeToCloseTab);
                    });
                    checknum2++;
                }
                return "Class Teacher Block";
            }
        }
        else {
            if (checknum2 === 1) {
                document.getElementById("main-btn").addEventListener('click', () => {
                    newTab = window.open(mainObj.classLink["CTBlock"]);
                    setTimeout(() => { newTab.close(); }, mainObj.timeToCloseTab);
                });
                checknum2++;
            }
            return "Class Teacher Block";
        }

    };
    // time table reader file ends here




    // Datetime file starts here

    function convertToZero(num) {
        if (num < 10) {
            return "0" + num;
        }
        else {
            return num;
        }
    }
    function convertHours(num) {
        if (num <= 12) {
            return num;
        }
        else {
            return num - 12;
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
        const dateTimeInfo = globalDt();
        const day = dateTimeInfo.getDay();
        const date = dateTimeInfo.getDate();
        const month = dateTimeInfo.getMonth();
        const year = dateTimeInfo.getFullYear();
        const hours = dateTimeInfo.getHours();
        const minutes = dateTimeInfo.getMinutes();
        const seconds = dateTimeInfo.getSeconds();

        document.getElementById('day-rn').innerText = dayNumToStr(day);
        document.getElementById('date-rn').innerHTML = monthNumToStr(month + 1) + " " + date + "<sup>" + superscriptDay(date) + "</sup>" + ", " + year;
        document.getElementById('time-rn').innerHTML = convertToZero(convertHours(hours)) + ":" + convertToZero(minutes) + ":" + convertToZero(seconds) + "<a class='am-pm'>" + AMorPM(hours) + "</a>";

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

}
mainWorker();

function modalFunc() {
    var modal = document.getElementById("settings-modal");

    var btn = document.getElementById("settings");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }
    document.onkeydown = function (event) {
        if (event.keyCode == 27) {
            modal.style.display = "none";
        }
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
modalFunc();

function nameFiller() {
    dict = JSON.parse(localStorage.getItem('mainObj')).timeTable;
    function transpose(matrix) {
        const rows = matrix.length, cols = matrix[0].length;
        const grid = [];
        for (let j = 0; j < cols; j++) {
            grid[j] = Array(rows);
        }
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[j][i] = matrix[i][j];
            }
        }
        return grid;
    }
    sno = 1;
    sno2 = 1;
    tableData = [[], [], [], [], [], [], [], []];
    linkDict = (Object.keys(JSON.parse(localStorage.getItem('mainObj')).blockStartTimings).length - 2);
    for (let i = 0; i < linkDict; i++) {
        tableData[sno - 1].push(`<td >` + sno2 + '</td>');
        sno2++;
    }
    // for (const key in dict) {
    //     const classListArr = dict[key];
    //     if (classListArr != null) {
    //     }
    // }
    sno++
    for (const key in dict) {
        const classListArr = dict[key];
        def_len = classListArr.length;
        for (let i = 0; i < classListArr.length; i++) {
            const className = classListArr[i];
            tempVar = '';
            for (let j = 0; j < classListArr.length; j++) {
                const value = classListArr[j];
                if (value === classListArr[i]) {
                    if (value === null) {
                        linkNameArr = JSON.parse(localStorage.getItem('mainObj')).classLink;
                        tempVar = '';
                        tempVar += `<option selected value="null" style="width:4ch">Null</option>`;
                        // for (const key in linkNameArr) {
                        //     tempVar += `<option value="${key}" style="width:${key.length}ch">${key}</option>`;
                        // }
                    }
                    else {
                        tempVar += `<option selected value="${value}" style="width:${value.length}ch">${value}</option>`;
                        tempVar += `<option value="null" style="width:4ch">Null</option>`;
                    }
                }
            }

            linkNameArr = JSON.parse(localStorage.getItem('mainObj')).classLink;
            for (const key in linkNameArr) {
                if (key != classListArr[i]) {
                    tempVar += `<option value="${key}">${key}</option>`;
                }
            }
            tableData[sno - 1].push(`<td><div class="select-box"><select class="form-control" name="${sno - 1}-${i}" id="${sno - 1}-${i}" onchange="ttConfiguration(this)">
                ${tempVar}
               </select></div></td>`);
        }

        sno++;
    }
    tableData = transpose(tableData);
    for (let i = 0; i < tableData.length; i++) {
        const arr = tableData[i];
        document.getElementById("namebody").innerHTML += '<tr>' + arr.join('') + '</tr>';
    }
}

nameFiller();
function linkFiller() {
    dict = JSON.parse(localStorage.getItem('mainObj')).classLink;
    sno = 1;
    for (const key in dict) {
        tdata = '';
        const value = dict[key];
        // tdata += '<td>' + sno + '</td>' + '<td>' + key + '</td>' + '<td>' + value + '</td>';
        tdata += `<td>${sno}</td><td><input type="text" value="${key}" style="width:${key.length}ch;"></td><td><input type="text" value="${value}" style="width:${value.length}ch"></td>`;
        document.getElementById("linkbody").innerHTML += '<tr>' + tdata + '</tr>';
        sno++;
    }
}
linkFiller();
function timeFiller() {
    function convertHours(num) {
        if (num <= 12) {
            return num * 1;
        }
        else {
            return num - 12;
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
    function formatTime(number) {
        if (number.length === 5) {
            number = '0' + number;
        }
        minutes = number.substring(2, 4);
        hours = number.substring(0, 2);
        return ('<input type="number" value="' + convertHours(hours) + '"</input>:<input type="number" value="' + minutes + '"</input> ' + AMorPM(hours));
    }
    dict = JSON.parse(localStorage.getItem('mainObj')).blockStartTimings;
    sno = 1;
    for (const key in dict) {
        tdata = '';
        const value = dict[key];
        tdata += '<td>' + sno + '</td>' + '<td>' + key + '</td>' + '<td>' + formatTime(value.toString()) + '</td>';
        document.getElementById("timebody").innerHTML += '<tr>' + tdata + '</tr>';
        sno++;
    }
}
timeFiller();
function ttConfiguration(element) {
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
            case 7:
                return "Sunday";
        }

    }
    let mainObj = JSON.parse(localStorage.getItem('mainObj'));
    let dayNo = element.id.split('-')[0];
    let blockNo = element.id.split('-')[1];
    let day = dayNumToStr(parseInt(dayNo));
    let changedObj = mainObj;

    changedObj.timeTable[day][blockNo] = element.value;
    localStorage.setItem('mainObj', JSON.stringify(changedObj));
}
function resetEverything() {
    localStorage.setItem('mainObj', JSON.stringify(window.mainObjreset));
    location = ".";
}
function setTheme(element) {
    document.getElementById('activetheme').removeAttribute('id');
    element.id = "activetheme";
    document.body.classList = [element.classList[1]];
    let colorObj = {
        "selectedTheme": element.classList[1]
    }
    localStorage.setItem('colorTheme', JSON.stringify(colorObj));
}
defColorObj = {
    "selectedTheme": "theme-1"
}
function getTheme() {
    if (localStorage.getItem('colorTheme') === null) {
        localStorage.setItem('colorTheme', JSON.stringify(defColorObj));
    }
    let localColorObj = JSON.parse(localStorage.getItem('colorTheme'));
    let selectedTheme = localColorObj.selectedTheme;
    document.body.classList = [];
    document.body.classList.add(selectedTheme);
    let themeNum = parseInt(selectedTheme.split('-')[1]);
    document.getElementsByClassName('color-theme')[themeNum-1].id = "activetheme";
}
getTheme();