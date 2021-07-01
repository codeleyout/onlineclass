function packer(o) {
    let str = JSON.stringify(o);
    console.log(str);
    return str.replace(/\//g, '_').replace(/\=/g, ',');
}
let url_string = window.location.href
let url = new URL(url_string);
let templateAsURL = url.searchParams.get("temp");
if (templateAsURL != null) {
    let objAsURL = unpacker(templateAsURL);
    objAsURL = objAsURL.replace(/\\/g, "");
    output = JSON.parse(objAsURL);
    if (localStorage.getItem('mainObj') != null) {
        if (compareKeys(output, JSON.parse(localStorage.getItem('mainObj')))) {
            localStorage.setItem('mainObj', JSON.stringify(output));
            location = '.';
        }
    }
}
function unpacker(str) {
    let mess = str.replace(/_/g, '/').replace(/,/g, ',');
    return mess;
}
function compareKeys(a, b) {
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}
function shortenURLWhatsapp(longURL) {
    const userAction = async () => {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${longURL}`);
        const myJson = await response;
        myJson.text().then(function (text) {
            window.open(`//wa.me/?text=Hi!%20I%20am%20using%20Online%20Classes%20App%20To%20Manage%20my%20Online%20Classes.%20It%20is%20easy%20to%20use%20and%20fast.%0ATry%20it%20out.%20Use%20this%20link%20below%20to%20import%20my%20time%20table%20as%20a%20template.%0ALink%20-%20${text}`);
        });
    }
    userAction();
}
function shareWhatsapp() {
    let linkToTemplate = `${location.origin}${location.pathname}?temp=${localStorage.getItem('mainObj')}`;
    shortenURLWhatsapp(linkToTemplate);
}
function shortenURLCopy(longURL) {
    const userAction = async () => {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${longURL}`);
        const myJson = await response;
        myJson.text().then(function (text) {
            navigator.clipboard.writeText(text);
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        });
    }
    userAction();
}
async function copyLink() {
    let linkToTemplate = `${location.origin}${location.pathname}?temp=${localStorage.getItem('mainObj')}`;
    shortenURLCopy(linkToTemplate);
}