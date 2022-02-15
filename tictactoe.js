var board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //Keeps track of the board
var win = false; //Variable used to lock the game when it is over, and to keep track of how it ended

var displayBoard = function() {
  let msg = "";
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      switch (board[j + (i * 3)]) {
        case 0:
          msg += "<:gry:865610680974180415>";
          break;
        case 1:
          msg += "❌";
          break;
        case 4:
          msg += "⭕";
          break;
        default:
          msg += "<:doofward:843200758392553563>";
          break;
      }
      if (j != 2) { msg += " | "; }
    }
    if (i != 2) { msg += "\n⎯⎯⎯⎯⎯⎯⎯⎯\n"; }
  }
  console.log(board);
  return msg+"\n"+checkWin();
};

var checkWin = function() {
  win = false;
  for (var j = 3; j < 13; j += 9) {
    for (var i = 0; i < 3; i++) {
      if (board[i * 3] + board[i * 3 + 1] + board[i * 3 + 2] == j) {
        win = true;
      }
      else if (board[i] + board[3 + i] + board[6 + i] == j) {
        win = true;
      }
    }
    if (board[0] + board[4] + board[8] == j) {
      win = true;
    }
    else if (board[2] + board[4] + board[6] == j) {
      win = true;
    }
    if (win == true) {
      if (j == 3) { win = 'x'; return "X has won the game\nType '!tic-tac-toe clear' to clear the board";}
      else { win = 'o'; return "O has won the game\nType '!tic-tac-toe clear' to clear the board";}
    }
  }
  var product = 1;
  for (var i = 0; i < 9; i++) {
    product = product * board[i];
  } // Product will be 0 if there is an open space
  if (product != 0) {
    win = 't';
    return "There has been a tie\nType '!tic-tac-toe clear' to clear the board";
  }
  else win = false; return "";
};

var oPlace = function() {
  checkWin();
  if (win != 0) { return; }
  for (var l = 8; l > 0; l-=6){ 
//l will be 8 then 2, checking for two O's to complete, then two X's to block.
    for (var i = 0; i < 3; i ++) {
      if (board[3*i] + board[3*i + 1] + board[3*i + 2] == l) {
        for (var j = 0; j < 3; j++) {
          if (board[i + j] == 0) {
            board[i + j] = 4; return;
          }
        }
      }
      if (board[i] + board[3 + i] + board[6 + i] == l) {
        for (var j = 0; j < 3; j++) {
          if (board[i + j * 3] == 0) {
            board[i + j * 3] = 4; return;
          }
        }
      }
    }

    if (board[0] + board[4] + board[8] == l) {
      for (var i = 0; i < 3; i++) {
        if (board[i * 4] == 0) {
          board[i * 4] = 4; return;
        }
      }
    }
    if (board[2] + board[4] + board[6] == l) {
      for (var i = 0; i < 3; i++) {
        if (board[2 * (i + 1)] == 0) {
          board[2 * (i + 1)] = 4; return;
        }
      }
    }
  }
  while (true) { //loops until the return statement is hit
    let o = Math.floor(Math.random() * 8);
    if (board[o] == 0) {
      board[o] = 4;
      return;
    }
  }
};

var command = function(args0,args1) {
  switch(args0){
    default:
      if (win != false){return "This board has already been won. Type !ttt clear to clear the board";}
      if (Number(args0)>0 && Number(args0)<10) {
        if(board[Number(args0) - 1] != 0){return "That space has already been filled. Please try again";}
        else board[Number(args0) - 1] = 1; oPlace();
      }
      else return "Sorry, I don't recognize that command. Please type '!help ttt' for a list of commands";
      break;
    case "s":
    case "skip":
      oPlace();
      break;
    case "h":
    case "help":
      return "-help ttt";
    case "clear":
      board = [0,0,0,0,0,0,0,0,0];
      win=false;
      switch (args1) {
        case 'o':
        case '0':
        case '⭕':
          oPlace();
          break;
      }
      break;
    case "display":
      return displayBoard();
  }
  return displayBoard();
};

module.exports.command = command;
module.exports.board = board;
















