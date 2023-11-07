console.log("Easwar");
var socket=io();
let roomUniqueId=null;
let player1 = false;

function createGame(){ 
    player1 = true;
    socket.emit('createGame');
}

function joinGame(){
    let roomUniqueId=document.getElementById("roomUniqueId").value;
    socket.emit('joinGame',{roomUniqueId:roomUniqueId});
}

socket.on("newGame",(data)=>{
    roomUniqueId=data.roomUniqueId;
    document.getElementById('initial').style.display="none";
    document.getElementById('gamePlay').style.display="block";
    let copyButton = document.createElement('button');
    copyButton.innerText = 'Copy Code';
    copyButton.style.display = 'block';
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(roomUniqueId).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    });
    document.getElementById('waitingArea').innerHTML=`Waiting for opponent share ${roomUniqueId} code`;
    document.getElementById('waitingArea').appendChild(copyButton);
});


socket.on("playersConnected",()=>{
    document.getElementById('initial').style.display = 'none';
    document.getElementById('waitingArea').style.display = 'none';
    document.getElementById('gameArea').style.display = 'flex';
});

function sendChoice(rpsValue) {
    const choiceEvent= player1 ? "p1Choice" : "p2Choice";
    socket.emit(choiceEvent,{
        rpsValue: rpsValue,
        roomUniqueId: roomUniqueId
    });
    let playerChoiceButton = document.createElement('button');
    playerChoiceButton.style.display = 'block';
    // playerChoiceButton.classList.add(rpsValue.toString().toLowerCase());
    playerChoiceButton.innerText = rpsValue;
    document.getElementById('player1Choice').innerHTML = "";
    document.getElementById('player1Choice').appendChild(playerChoiceButton);
}