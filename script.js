// window.mainObjreset = {
//     "timeTable": {
//         0: [null, null, null, null, null, null],
//         1: [1,2, 4, 3, 5, 6],
//         2: [1,2, 4, 3, 5, 6],
//         3: [1,2, 4, 3, 5, 6],
//         4: [1,2, 4, 3, 5, 6],
//         5: [1,4, 2, 3, 5, 6],
//         6: [null, null, null, null, null, null],
//     },
//     "classLink": {
//         1: ["CTBlock", "https://us04web.zoom.us/j/5556312068?pwd=bHUzSjBZTytoNC9hOEpKUlM0cDNnUT09"],
//         2: ["English", "https://us04web.zoom.us/j/2642201759?pwd=N2loYnhwWDJTdG5TKzNiUndEQlc0dz09"],
//         3: ["Physics", "https://us04web.zoom.us/j/5556312068?pwd=bHUzSjBZTytoNC9hOEpKUlM0cDNnUT09"],
//         4: ["Chemistry", "https://us02web.zoom.us/j/7523800259?pwd=bkxFSS9PRzF4Q1M0VVdvNG9BcG9mQT09"],
//         5: ["Maths", "https://us04web.zoom.us/j/6224028817?pwd=YnlaYVZYeXgzcU8yQ3poNjJPL0V4Zz09"],
//         6: ["Computer", "https://us04web.zoom.us/j/5853556094?pwd=i6MWQ9g2m6xaarxCj-4QPwBjuZR6"]
//     },
//     "blockStartTimings": {
//         0: 73000,
//         1: 85500,
//         2: 94000,
//         3: 103000,
//         4: 112000,
//         5: 122000,
//     },
//     "timeToCloseTab": 10000,
//     "colorTheme":"theme-1",
// }
// window.mainObjreset = {
//     "timeTable": {
//         0: [null],
//         1: [null],
//         2: [null],
//         3: [null],
//         4: [null],
//         5: [null],
//         6: [null],
//     },
//     "classLink": {
//         1: ["CTBlock", "https://us04web.zoom.us/j/5556312068?pwd=bHUzSjBZTytoNC9hOEpKUlM0cDNnUT09"],
//     },
//     "blockStartTimings": {
//         0: 73000,
//     },
//     "timeToCloseTab": 10000,
//     "colorTheme":"theme-1",
// }
function globalDt() {
    return new Date();
}
function checkMainObj() {
    window.mainObj = JSON.parse(localStorage.getItem("mainObj"));
    if (mainObj === null) {
        window.mainObj = mainObjreset;
        localStorage.setItem("mainObj", JSON.stringify(mainObj));
    }
}
checkMainObj();
function mainWorker() {

    let mainObj = JSON.parse(localStorage.getItem('mainObj'));

    function otherClassBtn() {
        let mainObj = JSON.parse(localStorage.getItem('mainObj'));
        document.getElementById("other-class-ul").innerHTML = '';
        for (let sub in mainObj.classLink) {
            let subject = mainObj.classLink[sub][0];
            let subid = subject;
            htmlToAdd = `<li>
            <button class="other-btn" id="${subid}-btn">
            ${subject}
            </button>
        </li>`;
            document.getElementById("other-class-ul").innerHTML += htmlToAdd;

        }
    }
    otherClassBtn();
    function timeAsNum(hours, minutes, seconds) {
        return hours * 10000 + minutes * 100 + seconds;
    }

    function blockNum() {
        let mainObj = JSON.parse(localStorage.getItem('mainObj'));
        const secondsNow = globalDt().getSeconds();
        const minutesNow = globalDt().getMinutes();
        const hoursNow = globalDt().getHours();

        const currentTime = timeAsNum(hoursNow, minutesNow, secondsNow);
        let blockArr = [];
        const blockObj = mainObj.blockStartTimings;
        for (const key in blockObj) {
            blockArr.push(blockObj[key]);
        }
        let endBlockTime = mainObj.endTiming;
        blockArr.push(parseInt(endBlockTime));

        for (let i = 0; i < blockArr.length; i++) {
            if (currentTime >= blockArr[i] && currentTime < blockArr[i + 1]) {
                return i;
            }
        }
        return -1;
    }
    function className(num) {
        let mainObj = JSON.parse(localStorage.getItem('mainObj'));
        const dayToday = globalDt().getDay();
        if (num === -1 || mainObj.timeTable[dayToday][num] === null|| mainObj.timeTable[dayToday][num] === "null") {
            return "No Class Right Now";
        }
        let nameOfClass = mainObj.classLink[mainObj.timeTable[dayToday][num]][0];
        return nameOfClass;
    }
    let initialClass = className(blockNum());
    let checknum = 1;
    let checknum2 = 1;

    function readTimeTable() {
        let mainObj = JSON.parse(localStorage.getItem('mainObj'));
        const classRN = className(blockNum());
        if (classRN != initialClass) {
            document.getElementById("main-btn").outerHTML = document.getElementById("main-btn").outerHTML;
            initialClass = classRN;
            checknum2 = 1;
        }
        const dayToday = globalDt().getDay();
        if (checknum === 1) {
            for (const key in mainObj.classLink) {
                const subObj = mainObj.classLink[key];
                const subject = subObj[0];
                document.getElementById(`${subject}-btn`).addEventListener('click', () => {
                    newTab = window.open(subObj[1]);
                    setTimeout(() => { newTab.close(); }, mainObj.timeToCloseTab);
                });
            }
            checknum++;
        }
        if (checknum2 === 1) {
            const dayToday = globalDt().getDay();
            let linkOfClass;
            if (blockNum() != -1) {
                if (mainObj.timeTable[dayToday][blockNum()] != null && mainObj.timeTable[dayToday][blockNum()] != "null") {
                    document.getElementById("main-btn").outerHTML = document.getElementById("main-btn").outerHTML;
                    linkOfClass = mainObj.classLink[mainObj.timeTable[dayToday][blockNum()]][1];
                    document.getElementById("main-btn").addEventListener('click', () => {
                        newTab = window.open(linkOfClass);
                        setTimeout(() => { newTab.close(); }, mainObj.timeToCloseTab);
                    });
                }
            }
            checknum2++;
        }
        return classRN;
    };
    // time table reader file ends here

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
        let dateObj = new Date();

        const day = dateObj.toLocaleString('default', { weekday: 'long' });
        const date = dateObj.toLocaleString('default', { day: 'numeric' });
        const month = dateObj.toLocaleString('default', { month: 'long' });
        const year = dateObj.toLocaleString('default', { year: 'numeric' });
        let timeStr = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        let am_pm = timeStr.substring(timeStr.length - 2, timeStr.length);
        timeStr = timeStr.substring(0, timeStr.length - 3);
        if (timeStr.length === 7) {
            timeStr = `0${timeStr}`;
        }


        document.getElementById('day-rn').innerText = day;
        document.getElementById('date-rn').innerHTML = `${month} ${date}<sup>${superscriptDay(date)}</sup>,${year}`;
        document.getElementById('time-rn').innerHTML = `${timeStr}<a class='am-pm'>${am_pm}</a>`;
        setTimeout(() => { dateTimeUpdater(); }, mainObj.timeToWaitBeforeUpdating);
    }
    function mainFunction() {
        document.getElementById("join-btn-rn").innerText = readTimeTable();
        setTimeout(() => { mainFunction(); }, mainObj.timeToWaitBeforeUpdating);
    }

    dateTimeUpdater();
    mainFunction();


}
mainWorker();

function modalFunc() {
    var settingsModal = document.getElementById("settings-modal");

    var settingsBtn = document.getElementById("settings");
    var span = document.getElementsByClassName("close")[0];

    settingsBtn.onclick = function () {
        settingsModal.style.display = "block";
    }

    span.onclick = function () {
        settingsModal.style.display = "none";
    }
    document.onkeydown = function (event) {
        if (event.keyCode == 27) {
            settingsModal.style.display = "none";
        }
    }
    window.onclick = function (event) {
        if (event.target == settingsModal) {
            settingsModal.style.display = "none";
        }
    }
}
modalFunc();

function nameFiller() {
    document.getElementById("namebody").innerHTML = '';
    let mainObj = JSON.parse(localStorage.getItem('mainObj'));
    dict = mainObj.timeTable;
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
    linkDict = (Object.keys(JSON.parse(localStorage.getItem('mainObj')).blockStartTimings).length);
    for (let i = 0; i < linkDict; i++) {
        tableData[sno - 1].push(`<td >` + sno2 + '</td>');
        sno2++;
    }
    sno++
    for (const key in dict) {
        const classListArr = dict[key];
        for (let i = 0; i < classListArr.length; i++) {
            tempVar = '';
            value = classListArr[i];
            nameValue = String(value);
            if (nameValue != "null") {
                nameValue = mainObj.classLink[value][0];
            }
            tempVar += `<option selected value="${value}" style="width:${nameValue.length}ch">${nameValue}</option>`;
            tableData[sno - 1].push(`<td><div class="select-box"><select class="form-control target-select" name="${sno - 1}-${i}" id="${sno - 1}-${i}" onchange="ttConfiguration(this)">
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
    let targetElements = document.getElementsByClassName('target-select');
    for (let i = 0; i < targetElements.length; i++) {
        const currentTargetElement = targetElements[i];
        for (const key in mainObj.classLink) {
            if (key != currentTargetElement.value) {
                nameOfSub = mainObj.classLink[key][0];
                currentTargetElement.innerHTML += `<option value="${key}">${nameOfSub}</option>`;
            }
            else {
                if (currentTargetElement.value != "null") {
                    currentTargetElement.innerHTML += `<option value="null">null</option>`;
                }
            }
        }
    }
    if ((sno2 - 1) != mainObj.timeTable["0"].length) {
        for (const key in mainObj.timeTable) {
            mainObj.timeTable[key].push(null);
        }
        localStorage.setItem('mainObj', JSON.stringify(mainObj));
        nameFiller();
    }
    mainWorker();
}

nameFiller();
function timeFiller() {
    function formatTime(number, key) {
        if (number.length === 5) {
            number = '0' + number;
        }
        seconds = number.substring(4, 6);
        minutes = number.substring(2, 4);
        hours = number.substring(0, 2);
        return (`<input type="time" value="${hours}:${minutes}:${seconds}" oninput="changeTimings(this);" step=1 id="timings-id-${key}">`);
    }
    function formatLastTime(number, key) {
        if (number.length === 5) {
            number = '0' + number;
        }
        seconds = number.substring(4, 6);
        minutes = number.substring(2, 4);
        hours = number.substring(0, 2);
        let increasedHours = (parseInt(hours)+1).toString();
        if (increasedHours.length === 1) {
            increasedHours = '0' + increasedHours;
        }
        return (`${increasedHours}:${minutes}:${seconds}`);
    }
    document.getElementById("timebody").innerHTML = '';
    dict = JSON.parse(localStorage.getItem('mainObj')).blockStartTimings;
    let lastTime;
    for (const key in dict) {
        let tdata = '';
        const value = dict[key];
        tdata += `<td>Block ${parseInt(key) + 1}</td><td>${formatTime(value.toString(), key)}</td>`;
        document.getElementById("timebody").innerHTML += `<tr>${tdata}</tr>`;
        lastTime = formatLastTime(value.toString(), key);
    }
    tdata = `<td>End Time</td><td><input type="time" value="${lastTime}" oninput="changeEndTime(this);" step=1 id="end-time")</td>`;
    document.getElementById("timebody").innerHTML += `<tr>${tdata}</tr>`;
}
timeFiller();
function linkFiller() {
    document.getElementById("linkbody").innerHTML = '';
    mainObj = JSON.parse(localStorage.getItem('mainObj'));
    dict = mainObj.classLink;
    sno = 1;
    for (const key in dict) {
        tdata = '';
        const value = dict[key];
        let subNameFromKey = mainObj.classLink[key][0];
        let linkNameFromKey = mainObj.classLink[key][1];
        tdata += `<td>${sno}</td><td><input type="text" value="${subNameFromKey}" style="width:${subNameFromKey.length + 2}ch;min-width:60px;" id="subname-id-${key}" oninput="changeSubName(this);"></td><td><input type="text" value="${linkNameFromKey}" style="width:${linkNameFromKey.length + 2}ch;min-width:400px;" id="links-id-${key}" oninput="changeLinks(this);"></td>`;
        document.getElementById("linkbody").innerHTML += `<tr>${tdata}</tr>`;
        sno++;
    }
}
linkFiller();
function ttConfiguration(element) {
    let mainObj = JSON.parse(localStorage.getItem('mainObj'));
    let dayNo = element.id.split('-')[0];
    let blockNo = element.id.split('-')[1];
    let changedObj = mainObj;

    changedObj.timeTable[dayNo - 1][blockNo] = element.value;
    localStorage.setItem('mainObj', JSON.stringify(changedObj));
}
function resetEverything() {
    localStorage.clear();
    location = ".";
}

function changeTimings(element) {
    let newTimeObj = JSON.parse(localStorage.getItem('mainObj'));
    let blockKey = element.id.split('-')[2];
    let tempInputTime = element.value;
    let inputTimeArr = tempInputTime.split(':');
    let inputTime = inputTimeArr.join('');
    if (inputTime.length === 4) {
        inputTime += '00';
    }
    newTimeObj.blockStartTimings[blockKey] = inputTime;
    localStorage.setItem('mainObj', JSON.stringify(newTimeObj));
    nameFiller();
}
function changeLinks(element) {
    element.style.width = `${element.value.length + 2}ch`;
    let newLinksObj = JSON.parse(localStorage.getItem('mainObj'));
    let subjectKey = element.id.split('-')[2];
    let SubjectLink = element.value;
    if (!(subjectKey in newLinksObj.classLink)) {
        newLinksObj.classLink[subjectKey] = ["", ""]
    }
    newLinksObj.classLink[subjectKey] = [newLinksObj.classLink[subjectKey][0], SubjectLink];
    localStorage.setItem('mainObj', JSON.stringify(newLinksObj));
    nameFiller();
}
function changeSubName(element) {
    element.style.width = `${element.value.length + 2}ch`;
    let newSubNameObj = JSON.parse(localStorage.getItem('mainObj'));
    let subjectOldKey = element.id.split('-')[2];
    if (subjectOldKey in newSubNameObj.classLink) {
        newSubNameObj.classLink[subjectOldKey][0] = element.value;
    }
    else {
        newSubNameObj.classLink[subjectOldKey] = [element.value, ""];
    }
    localStorage.setItem('mainObj', JSON.stringify(newSubNameObj));
    nameFiller();
}
// document.getElementById('custom-color-1-span').addEventListener('click', () => {
//     document.getElementById('custom-color-1').click();
// })
// document.getElementById('custom-color-2-span').addEventListener('click', () => {
//     document.getElementById('custom-color-2').click();
// })
// function colorChanged(element) {
//     document.getElementById(`${element.id}-span`).style.backgroundColor = element.value;
//     document.getElementsByClassName('color-theme')[3].after.style.backgroundColor = element.value;
// }
function addLinkRecordBtn(element) {
    linkFiller();
    mainObj = JSON.parse(localStorage.getItem('mainObj'));
    sno = Object.keys(mainObj.classLink).length + 1;
    // if (document.getElementById(`links-id-${sno}`) === null) {
    console.log(mainObj.classLink[sno - 1]);
    if (mainObj.classLink[sno] === undefined && document.getElementById(`links-id-${sno}`) === null) {
        let tdata = `<td>${sno}</td><td><input type="text" style="min-width:60px;" id="subname-id-${sno}" oninput="changeSubName(this);"></td><td><input type="text" style="min-width:400px;" id="links-id-${sno}" oninput="changeLinks(this);"></td>`;
        document.getElementById("linkbody").innerHTML += `<tr>${tdata}</tr>`;
    }
}
function addTimeRecordBtn(element) {
    timeFiller();
    mainObj = JSON.parse(localStorage.getItem('mainObj'));
    sno = Object.keys(mainObj.blockStartTimings).length;

    if (document.getElementById(`timings-id-${sno}`) === null) {
        let tdata = `<td>Block ${parseInt(sno) + 1}</td><td><input type="time" value="${document.getElementById(`timings-id-${sno - 1}`).value}" oninput="changeTimings(this);" step=1 id="timings-id-${sno}"></td>`;
        document.getElementById("timebody").innerHTML += `<tr>${tdata}</tr>`;
    }
    let lastTime = document.getElementById('end-time').value;
    document.getElementById('end-time').parentElement.parentElement.remove();
    let tdata = `<td>End Time</td><td><input type="time" value="${lastTime}" oninput="changeEndTime(this);" step=1 id="end-time")</td>`;
    document.getElementById("timebody").innerHTML += `<tr>${tdata}</tr>`;
}
function changeEndTime(element) {
    let newTimeObj = JSON.parse(localStorage.getItem('mainObj'));
    // let blockKey = element.id.split('-')[2];
    let tempInputTime = element.value;
    let inputTimeArr = tempInputTime.split(':');
    let inputTime = inputTimeArr.join('');
    if (inputTime.length === 4) {
        inputTime += '00';
    }
    newTimeObj.endTiming = inputTime;
    localStorage.setItem('mainObj', JSON.stringify(newTimeObj));
    nameFiller();
}