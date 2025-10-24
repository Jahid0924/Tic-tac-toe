let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO


const winPatterns = [
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
];
let wp,wpx;

let w = [];
let botRes = [];
const resultant = [];
const r = [];
let isWinner = false;
//reset game
resetBtn.addEventListener("click", () => {
   window.location.reload();
})
boxes.forEach((box) => {
  const grid = Array.from(boxes);
  // freez the game
   const disableBoxes = () => {
              for (let box of boxes) {
                box.disabled = true;
              }
            };
// Winner check
       const checkWinner = () => {
            for (let pattern of winPatterns) {
              let pos1Val = boxes[pattern[0]].innerText;
              let pos2Val = boxes[pattern[1]].innerText;
              let pos3Val = boxes[pattern[2]].innerText;

              if (pos1Val != "." && pos2Val != "." && pos3Val != ".") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                  boxes[pattern[0]].classList.add("color");
                  boxes[pattern[1]].classList.add("color");
                  boxes[pattern[2]].classList.add("color");
                  if(pos1Val == "O"){
                  showWinner("Bot 🤖");}
                  else{
                    showWinner("You  🎉");
                  }
                  return true;
                }
              }
            }
          }
// showing winner
      const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
      };

      //Random input
  function randPosition(a){
     for(let ran = 0; ran <9; ran++){
              if(a[ran].innerText == "."){
                a[ran].innerText = "O";
                console.log("for random bot chose index "+ ran);
                break;
              }
             }
  }
  box.addEventListener("click",() => {
     
  
  
  //1D into 2D array


  //Start game
  if(turnO){
       
      box.innerText = "X";
      turnO = false;
      
      for(let i=0; i< grid.length; i++){
        if(grid[i].innerText === "X"){
          
          w.push(i)
          console.log("pos of x is "+w)
        }
      }
      if(w.length == 1){
        console.log("length of w is 1");
        const excludeIndex = w[0]; // skip index 
        const choices = grid.filter((_, ex) => ex !== excludeIndex);
        const randomValue = choices[Math.floor(Math.random() * choices.length)];
        // console.log("bot chose index "+ grid.indexOf(randomValue));
        const randomIndex = grid.indexOf(randomValue);
        grid[randomIndex].innerText = "O";
        w = []
        
      }
       else if(w.length == 2){
        // console.log("inputs are at index "+ w);
        console.log("length of w is 2");
        const matchingPatterns = winPatterns.filter(pattern =>
        w.every(p => pattern.includes(p)));

        const extras = matchingPatterns.flatMap(pattern =>
             pattern.filter(p => !w.includes(p))
            );
            //new suggestion
            if(extras.length >0 ){
                extras.forEach(extraIdx =>{
                     if (grid[extraIdx].innerText == ".") { // Check if grid element at the index exists
                  grid[extraIdx].innerText = "O";
                  console.log("for 2 bot chose index "+ extraIdx);
                  return; // Exit the loop after the first valid move
                }
                else{
                  randPosition(grid);
                  return;
                }
                });
              
                // console.log("msatching patterns are "+ matchingPatterns);
                // console.log("The posibility is "+ extras);
                
            }
            else{
            
              randPosition(grid);
              console.log("no matching patterns found");
             
            }
           w = [];
        }

      else if(w.length ==3){
          console.log("length of w is 3");
            for (let i = 0; i < w.length; i++) {
        resultant.push([w[i], w[(i + 1) % w.length]]);
        }

            resultant.forEach(arr => {
              const match = winPatterns.find(pattern => 
                arr.every(num => pattern.includes(num))
              );
              
              if (match) {
                const extraValue = match.find(num => !arr.includes(num));
                // console.log(`Array [${arr}] first extra value to complete win: ${extraValue}`);
                botRes.push(extraValue);   
              } 
              // else {
              //   console.log(`Array [${arr}] has no matching winPattern`);
              // }
            });

            if(botRes.length == 0){
            randPosition(grid);

            }
            else if(botRes.length >0){
            console.log("botRes has value(s) "+ botRes);
            for(let bR = 0; bR <3; bR++){
              if(grid[botRes[bR]].innerText != "X" && grid[botRes[bR]].innerText != "O"){
                k = botRes[bR];
                grid[k].innerText = "O";
                break;
              }
               else{
                randPosition(grid);
                break;
              }
            }
            }
            else{
              console.log("error");
            }
           isWinner = checkWinner();
           console.log("winner status "+ isWinner);
          
            w= [];
            botRes = [];
        

                
        
        

          console.log(resultant);
        }
      else if(w.length >= 4){
        console.log("length of w is "+ w.length);
           for (let i = 0; i < w.length; i++) {
        r.push([w[i], w[(i + 1) % w.length]]);
           }
         r.forEach(arr => {
              const match4 = winPatterns.find(pattern => 
                arr.every(num => pattern.includes(num))
              );
              
              if (match4) {
                const extraValue4 = match4.find(num => !arr.includes(num));
                // console.log(`Array [${arr}] first extra value to complete win: ${extraValue4}`);
                botRes.push(extraValue4);   
              } else {
                // console.log(`Array [${arr}] has no matching winPattern`);
              }
            });
        if(botRes.length == 0){
            randPosition(grid)

            }
            for(let bres =0; bres< botRes.length; bres++){
            if(grid[botRes[bres]].innerText == "."){
              grid[botRes[bres]].innerText = "O";
              break
            }
            else{
              randPosition(grid);
              break;
            }
          }
           isWinner = checkWinner()
          if(w.length == 9 && !isWinner){
            msg.innerText = "🟡 Match Drawn 🟡";
            msgContainer.classList.remove("hide");
          }

           
      }
      else{
        msg.innerText = `Match Drawn`;
        msgContainer.classList.remove("hide");
      }
      
      
      } 

  else{
        turnO = true;
      } 
  

 })

});
   








// boxes.forEach((box) => {
//   box.addEventListener("click", () => {
//     if (turnO) {
//       //playerO
//       box.innerText = "O";
//       turnO = false;
//     } else {
//       //playerX
//       box.innerText = "X";
//       turnO = true;
//     }
//     box.disabled = true;
//     count++;

//     let isWinner = checkWinner();

//     if (count === 9 && !isWinner) {
//       gameDraw();
//     }
//   });
// });

// const gameDraw = () => {
//   msg.innerText = `Game was a Draw.`;
//   msgContainer.classList.remove("hide");
//   disableBoxes();
// };

// const disableBoxes = () => {
//   for (let box of boxes) {
//     box.disabled = true;
//   }
// };

// const enableBoxes = () => {
//   for (let box of boxes) {
//     box.disabled = false;
//     box.innerText = "";
//   }
// };

// const showWinner = (winner) => {
//   msg.innerText = `Congratulations, Winner is ${winner}`;
//   msgContainer.classList.remove("hide");
//   disableBoxes();
// };

// const checkWinner = () => {
//   for (let pattern of winPatterns) {
//     let pos1Val = boxes[pattern[0]].innerText;
//     let pos2Val = boxes[pattern[1]].innerText;
//     let pos3Val = boxes[pattern[2]].innerText;

//     if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
//       if (pos1Val === pos2Val && pos2Val === pos3Val) {
//         showWinner(pos1Val);
//         return true;
//       }
//     }
//   }
// };

// newGameBtn.addEventListener("click", resetGame);
// resetBtn.addEventListener("click", resetGame);