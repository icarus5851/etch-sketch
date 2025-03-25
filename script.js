const container = document.querySelector(".container");
const gridContainer = container.querySelector(".grid-container");

let side = 16;
let randomColor = false;

drawGrid(16);

function drawGrid(side) {
    gridContainer.textContent = "";
    const containerWidth = gridContainer.offsetWidth;
    const containerHeight = gridContainer.offsetHeight;
    const boxSize = parseFloat(Math.min(containerWidth, containerHeight) / side);

    for (let i = 0; i < side; i++) {
        for (let j = 0; j < side; j++) {
            const gridBox = document.createElement("div");
            gridBox.classList.add("grid-box");
            gridBox.style.width = `${boxSize}px`;
            gridBox.style.height = `${boxSize}px`;
            gridBox.setAttribute("draggable", "false");
            gridContainer.appendChild(gridBox);
        }
    }
}

let mousedown = false , mouseover = false;
let eraseron = false;

function mouseDraw(box){
    if(mousedown && mouseover){
        if(!randomColor){
            box.style.backgroundColor = "#000000";
        }
        else{
            box.style.backgroundColor = getRandomColor();
        }
    }

}
function mouseErase(box){
    if(mousedown && mouseover){
        box.style.backgroundColor = "#EFE9F4";
    }
}
const menu = container.querySelector(".menu");
const reset = menu.querySelector(".reset");
const eraser = menu.querySelector(".eraser");
const draw = menu.querySelector(".draw");
const size = menu.querySelector(".size");
const random = menu.querySelector(".random");
const black = menu.querySelector(".black");

random.addEventListener("click" , ()=>{
    randomColor=true;
    eraseron = false;
})

black.addEventListener("click",()=>{
    randomColor=false;
    eraseron = false;
})

size.addEventListener("click" , () =>{

    side = prompt("Enter grid Size(1-64):",16);

    if(side>100) side = 64;
    if(side<1 ) side = 1;
    if(side=="") side = 16;

    gridContainer.textContent = "";
    drawGrid(parseInt(side));
    const gridBoxes = gridContainer.querySelectorAll(".grid-box");

    gridBoxes.forEach(box => {
        box.addEventListener("mouseover" , (e)=>{
            mouseover = true;
            if(eraseron)  mouseErase(box);
            else mouseDraw(box);
        });
        box.addEventListener("mousemove" , (e)=>{
            mouseover = true;
            if(eraseron)  mouseErase(box);
            else mouseDraw(box);
        });
        box.addEventListener("mousedown" , (e)=>{
            mousedown = true;
            if(eraseron)  mouseErase(box);
            else mouseDraw(box);
        });
        box.addEventListener("mouseup" , (e)=>{
            mousedown = false;
            mouseover= false;
        });
        box.addEventListener("dragstart" , (e)=>{
            e.preventDefault();
        });
    });

    reset.addEventListener("click" , ()=>{
        gridBoxes.forEach(box=>{
            box.style.backgroundColor = "#EFE9F4";
        })
        eraseron = false;
    });
});


eraser.addEventListener("click",()=>{
    eraseron = true;
})
draw.addEventListener("click",()=>{
    eraseron = false;
})

const gridBoxes = gridContainer.querySelectorAll(".grid-box");

gridBoxes.forEach(box => {
    box.addEventListener("mouseover" , (e)=>{
        mouseover = true;
        if(eraseron)  mouseErase(box);
        else mouseDraw(box);
    });
    box.addEventListener("mousedown" , (e)=>{
        mousedown = true;
        if(eraseron)  mouseErase(box);
        else mouseDraw(box);
    });
    box.addEventListener("mouseup" , (e)=>{
        mousedown = false;
        mouseover= false;
    });
    box.addEventListener("dragstart" , (e)=>{
        e.preventDefault();
    });
});

reset.addEventListener("click" , ()=>{
    gridBoxes.forEach(box=>{
        box.style.backgroundColor = "#EFE9F4";
    })
    eraseron = false;
});

function getRandomColor() {
    const Colors = [
    "#D32F2F", 
    "#E57373", 
    "#FBC02D", 
    "#388E3C", 
    "#1976D2",
    "#512DA8"  
    ];
    return Colors[Math.floor(Math.random() * Colors.length)];
  }