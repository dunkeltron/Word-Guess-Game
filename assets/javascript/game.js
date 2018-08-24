
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
var imgSrc;
resetGame();

document.onkeyup = (function (event) {
    curGuess = event.key.toLowerCase();
    console.log(curGuess);
    if (isAlphaOrParen(curGuess)&&curGuess.length==1) {
        if (lettersGuessed.indexOf(curGuess) < 0) {
            lettersGuessed.push(curGuess);

            if (guessInWord(curGuess)) {
                lettersRevealed.push(curGuess);
                lettersInWord.splice(lettersInWord.indexOf(curGuess), 1);
                // console.log("lIW= " + lettersInWord);
                if (lettersInWord.length == 0) {
                    //display winner
                     displayText("You correctly guessed the word " + curWord + "!");
                    wins++;
                    imgSrc = "assets/images/" + curWord + ".jpg";
                    //console.log(imgSrc);
                    document.getElementById("photo").src = imgSrc;
                    document.getElementById("photo").alt = "picture of " + curWord;
                   // console.log("Wins: " + wins + " Losses: " + losses);
                    resetGame();
                }
            }
            else {
                wrongGuessesRemaining--;
                //console.log(lettersGuessed);
                document.getElementById("guesses-remaining-text").innerHTML = "";
                document.getElementById("guesses-remaining-text").innerHTML = "Wrong guesses remaining " + wrongGuessesRemaining;
                if (wrongGuessesRemaining <= 0) {
                    //display loser
                    displayText("Unlucky! The word was " + curWord + ".");
                    imgSrc = "assets/images/" + curWord + ".jpg";
                    document.getElementById("photo").src = "assets/images/fruit-stand.jpg";
                    document.getElementById("photo").alt = "Picture of a fruit stand";
                    losses++;
                    resetGame();
                }
            }
            displayPartial(lettersRevealed);
            displayGuesses(lettersGuessed);
        }
        else {
            console.log("already guessed " + curGuess);
        }
    }
});
function displayText(str){
    document.getElementById("top-banner").innerHTML=str;
}
function isAlphaOrParen(str) {
    return /^[a-zA-Z]/.test(str);
}

function guessInWord(str1) {
    for (i = 0; i < curWord.length; i++) {
        if (str1 == curWord[i]) {
            return true;
        }
    }
    return false;
}
function uniqueLetters(str) {
    lettersInWord = [];
    for (i = 0; i < str.length; i++) {
        if (lettersInWord.indexOf(str[i]) < 0) {
            lettersInWord.push(str[i]);;
        }
    }
}
function displayGuesses(arr) {
    var str = "";
    for (i = 0; i < arr.length; i++) {
        str = str + arr[i] + " ";
    }
    //console.log("Letters Guessed: " + str);
    document.getElementById("letters-text").innerHTML = "";
    document.getElementById("letters-text").append(str);
}
function displayPartial(arr) {
    var str = "";
    for (i = 0; i < curWord.length; i++) {
        if (arr.indexOf(curWord[i]) >= 0) {
            str = str + " " + curWord[i] + " ";
        }
        else {
            str = str + " _ ";
        }
    }

    var box = document.getElementById("word-box");


    document.getElementById("word-box-text").innerHTML = "";
    document.getElementById("word-box-text").append(str);
}

function resetGame() {
    // console.log("welcome to word-guess-game");
    //console.log(wordList.length);
    listIndex = Math.floor(Math.random() * wordList.length);
    //console.log(listIndex);
    curWord = wordList[listIndex];
    //console.log(curWord);
    uniqueLetters(curWord);
    lettersGuessed = [];
    curGuess = "";
    lettersRevealed = [];
    wrongGuessesRemaining = 15;
    document.getElementById("word-box-text").innerHTML = "";
    document.getElementById("guesses-remaining-text").innerHTML = "Wrong guesses remaining " + wrongGuessesRemaining;
    document.getElementById("losses-box").innerHTML = "Losses: " + losses;
    document.getElementById("wins-box").innerHTML = "Wins: " + wins;
    displayPartial(lettersRevealed);
    displayGuesses(lettersGuessed);
}
