let localStorage = window.localStorage;
let encryptLocalStorage = (data) => {
    let utf8Encode = new TextEncoder();
    return utf8Encode.encode(data).toString();
}
let decryptLocalStorage = (data) => {
    let utf8Decoder = new TextDecoder();
    data = data.split(',');
    let buffer = new Uint8Array(data);
    return utf8Decoder.decode(buffer);
}
function setLocalStorage(name,data){
    let encryptedData = encryptLocalStorage(data);
    localStorage.setItem(name,encryptedData);
}
function getLocalStorage(name){
    let data = localStorage.getItem(name);
    if(!data)
        return;
    return JSON.parse(decryptLocalStorage(data));
}