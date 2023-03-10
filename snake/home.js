let inputdir = { x: 0, y: 0 };
let snakearray = [{ x: 13, y: 15}];
let  food={x : Math.round(2+14*Math.random()) , y : Math.round(2+14*Math.random())};
let lasttime = 0;
let score=0;
let highscore=0;
let speed=4;
const eatsound = new Audio('eat.wav');
const lossound = new Audio('loss.wav');
hiscorebox.innerHTML = "HighScore: " + highscore;
scorebox.innerHTML = "Score: " + score;
//  board=document.getElementById("board");
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lasttime) / 1000 < 1 / speed) return;
  else lasttime = ctime;
  //    console.log(ctime);
  gameengine();
}
function iscollision(snake){
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
function gameengine() {
  if(iscollision(snakearray)){
    lossound.play(); 
      inputdir={x:0,y:0};
      snakearray=[{x:13,y:15} ]
      score=0;
        alert("game is over");
      return;
  }
  //updating snake
  if(snakearray[0].x===food.x && snakearray[0].y===food.y){
    eatsound.play(); 
    score+=1;
    if(score%5==0){speed+=2;console.log(speed)}
    if(score>highscore){
        highscore = score;
        localStorage.setItem("hiscore", JSON.stringify(highscore));
        hiscorebox.innerHTML = "HighScore: " + highscore;
    }
    scorebox.innerHTML = "Score: " + score;
    snakearray.unshift({x: snakearray[0].x + inputdir.x, y: snakearray[0].y + inputdir.y});
    let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
  }
  //movingsnake
    for (let i =snakearray.length-2; i>=0; i--) {
       snakearray[i+1]={...snakearray[i]};
    }
  snakearray[0].x+=inputdir.x;
  snakearray[0].y+=inputdir.y;
  //display snake
  board.innerHTML = "";
  snakearray.forEach((e, index) => {
    let snakebody = document.createElement("div");
    snakebody.style.gridRowStart = e.y;
    snakebody.style.gridColumnStart = e.x;
    if (index === 0) snakebody.classList.add("head");
    else snakebody.classList.add("snake");
    board.appendChild(snakebody);
  });
  //display food
  let fooditem = document.createElement("div");
  fooditem.classList.add("food");
  fooditem.style.gridRowStart = food.y;
  fooditem.style.gridColumnStart = food.x;
  board.appendChild(fooditem);
}
window.requestAnimationFrame(main);

document.getElementById("key1").addEventListener("click",()=>{
  inputdir.x = 0;
  inputdir.y = -1;
})
document.getElementById("key2").addEventListener("click",()=>{
  inputdir.x = -1;
  inputdir.y = 0;
})

document.getElementById("key3").addEventListener("click",()=>{
  inputdir.x = 1;
  inputdir.y = 0;
})

document.getElementById("key4").addEventListener("click",()=>{
  inputdir.x = 0;
  inputdir.y = 1;
})

window.addEventListener("keydown", (e) => {
  inputdir = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      inputdir.x = 0;
      inputdir.y = -1;
      break;
    case "ArrowDown":
      inputdir.x = 0;
      inputdir.y = 1;
      break;
    case "ArrowLeft":
      inputdir.x = -1;
      inputdir.y = 0;
      break;
    case "ArrowRight":
      inputdir.x = 1;
      inputdir.y = 0;
      break;
    default :
     break;
  }
});
