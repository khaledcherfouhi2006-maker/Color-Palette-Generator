const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");
const copyBtn = document.querySelector(".copy-btn");


generateBtn.addEventListener("click",generatePalette);

generatePalette();

paletteContainer.addEventListener("click", function(e){

    if(e.target.classList.contains("copy-btn")){
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexValue)
        .then(()=>showCopySuccess(e.target))
        .catch((err)=> console.log(err)); 
    }else if(e.target.classList.contains("color")){
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard.writeText(hexValue)
        .then(()=>showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err)=> console.log(err)); 
    }

});
function showCopySuccess(elment){
    elment.classList.remove("far","fa-copy");
    elment.classList.add("fas","fa-check");
    elment.style.color = "#48bb78"

    setTimeout(()=>{
        elment.classList.remove("fas","fa-check");
        elment.classList.add("far","fa-copy");
        elment.style.color = ""
     },1200);
}

function generatePalette(){
    colors = [];

    for(i = 0 ; i< 5; i++){
        colors.push(generateRandomColor());
    }
    updatePaletteDisplay(colors);
}

function generateRandomColor(){
    const letters = "0123456789ABCDEF";
    let color = "#";
    for(let i = 0 ; i< 6 ;i++){
        color+= letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function updatePaletteDisplay(colors){
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box,index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.background = color;
        hexValue.textContent = color;
    })
}
