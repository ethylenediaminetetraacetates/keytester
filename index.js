function clicked(){
    document.querySelector("body > div > button").dispatchEvent(new Event("mousedown"));
    setTimeout(function(){
        document.querySelector("body > div > button").dispatchEvent(new Event("mouseup"));
        document.location = "./keytesting.html";
    },500)
}