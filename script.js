const body = document.querySelector('body');
const tbody = document.querySelector('.Board');
const table = document.querySelector('.table');
const buttonStart = document.querySelector('.buttonStart');
const buttonReset = document.querySelector('.buttonReset');
const notification = document.querySelector('.Notification');
console.log(notification)
let row = 15;
let column = 60;
let arr2D = new Array(row);
for(let i = 0; i < row;i++){
    arr2D[i] = new Array(column);
}
for (let i = 0; i < row;i++){
    for (let j = 0;j < column;j++){
        arr2D[i][j] = '';
    }
}
function createBoard(){
    function createRow(num) {
        const row = `
                        <td class="${num}-0"></td>
                        <td class="${num}-1"></td>
                        <td class="${num}-2"></td>
                        <td class="${num}-3"></td>
                        <td class="${num}-4"></td>
                        <td class="${num}-5"></td>
                        <td class="${num}-6"></td>
                        <td class="${num}-7"></td>
                        <td class="${num}-8"></td>
                        <td class="${num}-9"></td>
                        <td class="${num}-10"></td>
                        <td class="${num}-11"></td>
                        <td class="${num}-12"></td>
                        <td class="${num}-13"></td>
                        <td class="${num}-14"></td>
                        <td class="${num}-15"></td>
                        <td class="${num}-16"></td>
                        <td class="${num}-17"></td>
                        <td class="${num}-18"></td>
                        <td class="${num}-19"></td>
                        <td class="${num}-20"></td>
                        <td class="${num}-21"></td>
                        <td class="${num}-22"></td>
                        <td class="${num}-23"></td>
                        <td class="${num}-24"></td>
                        <td class="${num}-25"></td>
                        <td class="${num}-26"></td>
                        <td class="${num}-27"></td>
                        <td class="${num}-28"></td>
                        <td class="${num}-29"></td>
                        <td class="${num}-30"></td>
                        <td class="${num}-31"></td>
                        <td class="${num}-32"></td>
                        <td class="${num}-33"></td>
                        <td class="${num}-34"></td>
                        <td class="${num}-35"></td>
                        <td class="${num}-36"></td>
                        <td class="${num}-37"></td>
                        <td class="${num}-38"></td>
                        <td class="${num}-39"></td>
                        <td class="${num}-40"></td>
                        <td class="${num}-41"></td>
                        <td class="${num}-42"></td>
                        <td class="${num}-43"></td>
                        <td class="${num}-44"></td>
                        <td class="${num}-45"></td>
                        <td class="${num}-46"></td>
                        <td class="${num}-47"></td>
                        <td class="${num}-48"></td>
                        <td class="${num}-49"></td>
                        <td class="${num}-50"></td>
                        <td class="${num}-51"></td>
                        <td class="${num}-52"></td>
                        <td class="${num}-53"></td>
                        <td class="${num}-54"></td>
                        <td class="${num}-55"></td>
                        <td class="${num}-56"></td>
                        <td class="${num}-57"></td>
                        <td class="${num}-58"></td>
                        <td class="${num}-59"></td>
                    `
        var table = document.createElement("tr");
        table.classList.add(`row`);
        table.classList.add(`row-${num}`);
        table.innerHTML = row;
        tbody.appendChild(table);
    }
    createRow(0);
    createRow(1);
    createRow(2);
    createRow(3);
    createRow(4);
    createRow(5);
    createRow(6);
    createRow(7);
    createRow(8);
    createRow(9);
    createRow(10);
    createRow(11);
    createRow(12);
    createRow(13);
    createRow(14);
}
createBoard();



const board = document.querySelectorAll('.row');
function eventBoard(){
    for (let i = 0;i < board.length;i++){
        for (let j = 0; j < board[i].children.length;j++){
                if (i == 7 && j == 2){
                    board[i].children[j].classList.add('startPoint');
                    board[i].children[j].innerHTML = `<i class="fas fa-truck-pickup"></i>`;
                    arr2D[i][j] = 'start';
                    continue;
                }else if (i == 7 && j == 57){
                    board[i].children[j].classList.add('endPoint');
                    board[i].children[j].innerHTML = `<i class="fas fa-umbrella-beach"></i>`;
                    arr2D[i][j] = 'end';
                    continue;
                }
                board[i].children[j].addEventListener('mousedown',e=>{
                    if (board[i].children[j].classList.contains('wall') && !board[i].children[j].classList.contains('startPoint') && !board[i].children[j].classList.contains('endPoint')){
                        board[i].children[j].classList.remove('wall');
                        board[i].children[j].innerHTML = '';
                        arr2D[i][j] = '';
                    }else if (!board[i].children[j].classList.contains('wall') && !board[i].children[j].classList.contains('startPoint') && !board[i].children[j].classList.contains('endPoint')){
                        board[i].children[j].classList.add('wall');
                        board[i].children[j].innerHTML = `<i class="fas fa-border-all"></i>`;
                        arr2D[i][j] = 'wall';
                    }
                })      
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*async function paint(x,y){
    await sleep(50);
    if (x < row && y < column && x >= 0 && y >= 0 && arr2D[x][y] == ''){
            board[x].children[y].classList.add('visited');
            arr2D[x][y] = 'visisted';
            console.log(arr2D[x][y]);
            paint(x - 1,y);
            paint(x,y - 1);
            paint(x + 1,y);
            paint(x,y + 1);
    }
    return;
}*/
async function reDraw(){
    for (let i = 0;i < board.length;i++){
        for (let j = 0; j < board[i].children.length;j++){
            if (arr2D[i][j] == 'shortest'){
                board[i].children[j].classList.add('shortest');
            }
        }
    }
}



async function paint(x,y){
    let arr = new Array();
    let prev = {};
    arr.push([x,y]);
    let delay = 50;
    let i = 0;
    let earlyStop = false;
    let point;
    while(arr.length != 0){ 
        point = arr.shift();
        if (point[0] != 0 && arr2D[point[0] - 1][point[1]] != 'visited' && arr2D[point[0] - 1][point[1]] != 'wall' && arr2D[point[0] - 1][point[1]] != 'start'){
            board[point[0] - 1].children[point[1]].classList.add('visited');
            prev[`${point[0] - 1},${point[1]}`] = `${point[0]},${point[1]}`;
            if (arr2D[point[0] - 1][point[1]] == 'end'){
                break;
            }
            arr2D[point[0] - 1][point[1]] = 'visited';
            arr.push([point[0]-1,point[1]]);
        }
        if (point[1] != 0 && arr2D[point[0]][point[1] - 1] != 'visited' && arr2D[point[0]][point[1] - 1] != 'start' && arr2D[point[0]][point[1] - 1] != 'wall'){ 
            board[point[0]].children[point[1] - 1].classList.add('visited');
            prev[`${point[0]},${point[1] - 1}`] = `${point[0]},${point[1]}`;
            if (arr2D[point[0]][point[1] - 1] == 'end'){
                break;
            }
            arr2D[point[0]][point[1] - 1] = 'visited';
            arr.push([point[0],point[1] - 1]);
        }
        if (point[0] != 14 && arr2D[point[0] + 1][point[1]] != 'visited' && arr2D[point[0] + 1][point[1]] != 'start' && arr2D[point[0] + 1][point[1]] != 'wall'){
            board[point[0]+1].children[point[1]].classList.add('visited');
            prev[`${point[0] + 1},${point[1]}`] = `${point[0]},${point[1]}`;
            if (arr2D[point[0] + 1][point[1]] == 'end'){
                break;
            }
            arr2D[point[0] + 1][point[1]] = 'visited';
            arr.push([point[0]+1,point[1]]);
        }
        if (point[1] != 59 && arr2D[point[0]][point[1]+1] != 'visited' && arr2D[point[0]][point[1]+1] != 'start' && arr2D[point[0]][point[1]+1] != 'wall') {    
            board[point[0]].children[point[1] + 1].classList.add('visited');
            prev[`${point[0]},${point[1] + 1}`] = `${point[0]},${point[1]}`;
            if (arr2D[point[0]][point[1] + 1] == 'end'){
                break;
            }
            arr2D[point[0]][point[1] + 1] = 'visited';
            arr.push([point[0],point[1] + 1]);
        }
        delay-=5;
        if (delay <= 0) delay = 1;
        await sleep(delay);
    }

    if (point[0] == 0 &&
        arr2D[point[0]][point[1] + 1] != 'end' &&
        arr2D[point[0] + 1][point[1]] != 'end' &&
        arr2D[point[0]][point[1] - 1] != 'end'){
            earlyStop = true;
            notification.innerHTML = 'No path to the goal!';
            return;
    }
    if (point[0] == 14 &&
        arr2D[point[0]][point[1] + 1] != 'end' &&
        arr2D[point[0]][point[1] - 1] != 'end' &&
        arr2D[point[0] - 1][point[1]] != 'end'){
            earlyStop = true;
            notification.innerHTML = 'No path to the goal!';
            return;
    }
    if (point[1] == 0 &&
        arr2D[point[0]][point[1] + 1] != 'end' &&
        arr2D[point[0] + 1][point[1]] != 'end' &&
        arr2D[point[0] - 1][point[1]] != 'end'){
            earlyStop = true;
            notification.innerHTML = 'No path to the goal!';
            return;
    }
    if (point[1] == 59 &&
        arr2D[point[0] + 1][point[1]] != 'end' &&
        arr2D[point[0]][point[1] - 1] != 'end' &&
        arr2D[point[0] - 1][point[1]] != 'end'){
            earlyStop = true;
            notification.innerHTML = 'No path to the goal!';
            return;
    }

    if (earlyStop == false){
        let path = [];
        let end = '7,57';
        while(prev[end] != '7,2'){
            path.unshift(prev[end]);
            end = prev[end];
        }
        for (let i = 0; i < path.length;i++){
            let index = path[i].split(',');
            arr2D[+index[0]][+index[1]] = 'shortest';
        }
        reDraw();
    }
}
eventBoard();
function start(){
    paint(7,2);
}
function reset(){
    for (let i = 0; i < row;i++){
        for(let j = 0;j < column;j++){
            if (arr2D[i][j] != 'start' && arr2D[i][j] != 'end'){
                arr2D[i][j] = '';
            }
            if (board[i].children[j].classList.contains('shortest')){
                board[i].children[j].classList.remove('shortest');
            }
            if (board[i].children[j].classList.contains('wall')){
                board[i].children[j].innerHTML = '';
                board[i].children[j].classList.remove('wall');
            }
            if (board[i].children[j].classList.contains('visited')){
                board[i].children[j].classList.remove('visited');
            }
        }
    }
    notification.innerHTML = '';
}
buttonStart.addEventListener('click',async (e)=>{
    buttonReset.disabled = true;
    await start();
    await sleep(14000);
    buttonReset.disabled = false;
})
buttonReset.addEventListener('click',async(e)=>{
    await reset();
})
