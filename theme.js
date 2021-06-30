function setTheme(element) {
    document.getElementById('activetheme').removeAttribute('id');
    element.id = "activetheme";
    document.body.classList = [element.classList[1]];

    let changedMainObj = mainObj;
    changedMainObj.colorTheme = element.classList[1];
    localStorage.setItem('mainObj', JSON.stringify(changedMainObj));
}

function getTheme() {
    let localColorObj = JSON.parse(localStorage.getItem('mainObj')).colorTheme;
    let selectedTheme = localColorObj;
    document.body.classList = [];
    document.body.classList.add(selectedTheme);
    let themeNum = parseInt(selectedTheme.split('-')[1]);
    if (document.getElementsByClassName('color-theme')[themeNum - 1] != undefined) {
        document.getElementsByClassName('color-theme')[themeNum - 1].id = "activetheme";
    }
}
getTheme();