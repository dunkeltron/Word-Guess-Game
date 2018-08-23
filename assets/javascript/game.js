
// still need to display word length with "_"
//still need to display letters guessed
//still need to make layout of site
var wordList = ["banana", "apple", "pineapple", "pear", "peach", "watermelon", "orange", "lemon", "lime"];
var listIndex;
var curWord;
var lettersGuessed = [];
var lettersInWord = [];
var curGuess;
var wins = 0;
var losses = 0;
var lettersRevealed = [];
var wrongGuessesRemaining = 5;
resetGame();

displayPartial(lettersRevealed);
displayGuesses(lettersGuessed);
document.onkeyup = (function (event) {
    curGuess = event.key.toLowerCase();
    if (isAlphaOrParen(curGuess)) {
        if (lettersGuessed.indexOf(curGuess) < 0) {
            lettersGuessed.push(curGuess);
            if (guessInWord(curGuess)) {
                lettersRevealed.push(curGuess);
                //console.log(lettersRevealed);
                lettersInWord.splice(lettersInWord.indexOf(curGuess), 1);
                //displayLetters(lettersRevealed);
                //console.log("lIW= " + lettersInWord);
                if (lettersInWord.length == 0) {
                    //display winner
                    console.log("You correctly guessed the word " + curWord + "!");
                    wins++;
                    console.log("Wins: " + wins + " Losses: " + losses);
                    resetGame();
                }
            }
            else {
                wrongGuessesRemaining--;
                console.log(lettersGuessed);
                if (wrongGuessesRemaining < 0) {
                    //display loser
                    console.log("Unlucky! The word was " + curWord + ".");
                    losses++;
                    console.log("Wins: " + wins + " Losses: " + losses);
                    resetGame();
                }
            }

            displayPartial(lettersRevealed);
            //console.log(lettersRevealed);
            displayGuesses(lettersGuessed);
        }
        else {
            console.log("already guessed " + curGuess);
        }
    }
});
function isAlphaOrParen(str) {
    return /^[a-zA-Z]/.test(str);
}
function guessInWord(str1) {
    for (i = 0; i < curWord.length; i++) {
        if (str1 == curWord[i]) {
            console.log(true);
            return true;
        }
    }
    console.log(false);
    return false;
}
function uniqueLetters(str) {
    //console.log(str);
    for (i = 0; i < str.length; i++) {
        if (lettersInWord.indexOf(str[i]) < 0) {
            lettersInWord.push(str[i]);
            // console.log(lettersInWord);
        }
    }
}
function displayGuesses(arr) {
    var str = "";
    for (i = 0; i < arr.length; i++) {
        str = str + arr[i];

    }
    console.log("Letters Guessed: " + str);
}
function displayPartial(arr) {
    var str = "";
    for (i = 0; i < curWord.length; i++) {
        if (arr.indexOf(curWord[i]) >= 0) {
            str = str + curWord[i];
        }
        else {
            str = str + "_";
        }
    }
    console.log(str);
}

function resetGame() {
    console.log("welcome to word-guess-game");
    //console.log(wordList.length);
    listIndex = Math.floor(Math.random() * wordList.length);
    //console.log(listIndex);
    curWord = wordList[listIndex];
    //console.log(curWord);
    uniqueLetters(curWord);
    lettersGuessed = [];
    curGuess = "";
    lettersRevealed = [];
    wrongGuessesRemaining = 5;
}
