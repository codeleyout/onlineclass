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
        if (compareKeys(output,JSON.parse(localStorage.getItem('mainObj')))) {
            localStorage.setItem('mainObj',JSON.stringify(output));
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