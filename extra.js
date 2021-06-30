window.mainObjreset = {
    "timeTable": {
        0: [null],
        1: [null],
        2: [null],
        3: [null],
        4: [null],
        5: [null],
        6: [null],
    },
    "classLink": {
        1: ["Class Teacher Block", "https://classteacher.com"],
    },
    "blockStartTimings": {
        0: 73000,
    },
    "timeToCloseTab": 10000,
    "colorTheme": "theme-1",
}
function checkFirstUser() {
    let url_string = window.location.href
    let url = new URL(url_string);
    let templateAsURL = url.searchParams.get("temp");
    if (templateAsURL === null) {
        if (localStorage.getItem("firstVisit") === null) {
            localStorage.clear();
            location = './getting-started';
            localStorage.setItem("firstVisit", false);
            localStorage.setItem("mainObj", JSON.stringify(mainObjreset));
        }
    }
    else{
        localStorage.setItem("mainObj", JSON.stringify(mainObjreset));
        localStorage.setItem("firstVisit", false);
    }
}
checkFirstUser();
