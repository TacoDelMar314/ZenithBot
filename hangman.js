var word = "thingy"; //Keeps track of the current word to guesses
var guesses = 6; //Keeps track of the amount of guesses left
var guessedWord = [".",".",".",".",".","."]; //Keeps track of the parts of the word that has been guessed
var guessedLetters = ""; //Keeps track of the letters that has been guessed



/*
Words to use:
-- WIN 99.99% --
Banana
Excess
Giggit
Voodoo
Pullup
Myrrhy
-- Game 2 --
Dad
Pep
Gig
Lol
Sus
Gym

-- Word Bank --
Jazz,Internationalization, Chthonic
      */
var setup = function(newWord) {
  if (newWord == undefined||newWord == "random") {
    let o = Math.floor(Math.random() * 8);
    switch(floor(o)){
      case 0:
        word = "Jazz";
        break;
      case 1:
        word = "Internationalization";
        break;
      case 2:
        word = "Chthonic";
      default:
        break;
    }


    

    return;
  }
  word = newWord;
  guessedWord = newWord.split('');

  for (var i = 0; i < guessedWord.length; i++) {
    guessedWord[i] = '.';
  }
  guesses = 6;
};

var command = function (args0, args1){
  let msg = "";
  if (args[0] == "new") {
    setup(args[1]);
    message.channel.send(`Word set to ||${word}||`);
    break;
  }
  else {
    args[0].split();
    for(var i=0;i<args[0].length;i++){
      if(guesses>0){ //Checks if you're allowed to guess
        if(guessedLetters.includes(args[0][i])){
          message.channel.send(`You already guessed '${args[0][i]}'...`);
        }
        else if(word.includes(args[0][i])){//Checks if it's a correct guess
          for(j=0;j<word.length;j++){
            if(word[j]==args[0][i]){guessedWord[j]=word[j];}
          }
          guessedLetters+=args[0][i];
        }
        else { //Incorrect guess
          guesses-=1; 
          guessedLetters+=args[0][i];
        }
      }
    }
  }

  let text = "";
  let complete = true;
  for (var i = 0; i < guessedWord.length; i++) {
    text += guessedWord[i];
    if(guessedWord[i]=='.'){
      complete = false;
    }
  }

  if(complete == false){
    message.channel.send(`${text}\nYou have ${guesses} guesses remaining`);
    console.log(`${text}`);
  }
  if(complete == true){
    message.channel.send(`You have guessed the word!`);
  }
};

module.exports = command;