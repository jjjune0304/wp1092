let imagearray = ["https://imgur.com/a5wCr9L.gif",
                  "https://imgur.com/lZO8E6u.jpg",
                  "https://imgur.com/CyIVCh4.jpg",
                  "https://imgur.com/ELmDcUo.jpg"]

let currentimage = 2

document.querySelector("#back").onclick = function(){
    currentimage -= 1
    if (currentimage <= 1){
        currentimage = 1
    }
    document.querySelector("#display").src = imagearray[currentimage]
    document.querySelector("a").href = imagearray[currentimage]
    if (currentimage == 1){
        console.log("123")
        document.querySelector("#back").style.visibility = "hidden";
    }
    if (currentimage <= 3){
        document.querySelector("#next").style.visibility = "visible";
    }
}

document.querySelector("#next").onclick = function(){
    currentimage += 1
    if (currentimage >= 3){
        currentimage = 3
    }
    document.querySelector("#display").src = imagearray[currentimage]
    document.querySelector("a").href = imagearray[currentimage]
    if (currentimage == 3){
        document.querySelector("#next").style.visibility = "hidden";
    }
    if (currentimage >= 1){
        document.querySelector("#back").style.visibility = "visible";
    }
}

document.onreadystatechange = function() { 
    if (document.readyState == "loading") { 
        document.querySelector("body").style.display = "none"; 
        document.querySelector("#loader").style.display = "block"; 
    } else { 
        document.querySelector("#loader").style.display = "none"; 
        document.querySelector("body").style.display = "block"; 
    } 
}
