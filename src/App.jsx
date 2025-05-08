import { useState } from "react";
import ReactConfetti from "react-confetti";
import Languages from "./components/Languages";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import { wordsList, languagesList, getFarewellText } from "./assets/helpers";

// Get the Random Word
function generateRandomWord() {
  return wordsList[Math.trunc(Math.random() * (wordsList.length - 1))];
}

// Change any string into an array of objects
function generateArrayOfObjects(string) {
  return [...string].map((letter) => ({ value: letter, status: "unset" }));
}

// Initial Variables
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const randomWord = generateRandomWord();
const alphabetsArray = generateArrayOfObjects(alphabets);
const wordArray = generateArrayOfObjects(randomWord);

function App() {
  const [word, setWord] = useState(wordArray);
  const [buttons, setButtons] = useState(alphabetsArray);

  // 🟡 errors count is derived:
  const errors = buttons.filter((btn) => btn.status === false).length;

  // 🟡 isLastClickedBtnWrong is derived:
  const isLastClickedBtnWrong = buttons.some((btn) => btn.lastWrongBtn === true);

  // 🟡 languages is derived:
  const languagesArray = languagesList.map((lang, i) => ({
    ...lang,
    isError: i < errors,
  }));

  // 🟡 maxErrors count is derived:
  const maxErrors = languagesArray.length - 1;

  // 🟡 isLost is derived:
  const isLost = errors >= maxErrors;

  // 🟡 isWon is derived:
  const isWon = word.every((letter) => letter.status === true) && !isLost;

  // 🟡 textBox color is derived:
  const textBoxStyle = {
    backgroundColor: isWon ? "#10A95B" : isLost ? "#BA2A2A" : "#7a5ea7",
    visibility: isLost || isWon || isLastClickedBtnWrong ? "visible" : "hidden",
  };

  // 🟡 If isLost then show all the letters of the word:
  if (isLost && !word.some((letterObj) => letterObj.status === false)) {
    setWord(word.map((obj) => (obj.status === "unset" ? { ...obj, status: false } : obj)));
  }

  function generateStatus(value, array, type) {
    if (array === buttons) {
      // Delete all lastWrongBtn props
      array = array.map((item) => {
        const newItem = { ...item };
        delete newItem["lastWrongBtn"];
        return newItem;
      });
      // Add lastWrongBtn prop to the last wrong button
      if (type === false) {
        array = array.map((item) => (item.value === value ? { ...item, lastWrongBtn: true } : item));
      }
    }
    return array.map((obj) => (obj.value === value ? { ...obj, status: type } : obj));
  }

  function handleNew() {
    setWord(generateArrayOfObjects(generateRandomWord()));
    setButtons(generateArrayOfObjects(alphabets));
  }

  function handleClick(value) {
    const clickedButton = buttons.find((btn) => btn.value === value);
    if (isWon || isLost || clickedButton.status !== "unset") return;
    const isCorrect = word.some((letterObj) => letterObj.value === value);
    const newButtons = generateStatus(value, buttons, isCorrect);
    const newWord = isCorrect ? generateStatus(value, word, true) : word;
    setButtons(newButtons);
    setWord(newWord);
  }

  return (
    <main className="main">
      {isWon && <ReactConfetti />}
      <section className="main__container container">
        <header className="container__header">
          <h1 className="header__title">Assembly: Endgame</h1>
          <p className="header__text">
            Guess the word in under 8 attempts to keep the programming world safe from Assembly!
          </p>
        </header>
        <div className="container__body">
          <div className={`body__msg`} style={textBoxStyle}>
            {!isWon && !isLost && isLastClickedBtnWrong && (
              <strong>{getFarewellText(languagesList[errors - 1]["name"])}</strong>
            )}
            {isWon && (
              <strong>
                <div>You win!</div>
                <div>Well done! 🎉</div>
              </strong>
            )}
            {isLost && (
              <strong>
                <div>Game over!</div>
                <div>You lose! Better start learning Assembly 😭</div>
              </strong>
            )}
          </div>
          <div className="body__languages">
            <Languages languagesArray={languagesArray} />
          </div>
          <div className="body__word">
            <Word word={word} />
          </div>
          <div className="body__keyboard">
            <Keyboard buttons={buttons} handleClick={handleClick} />
          </div>
          {(isWon || isLost) && (
            <button className="body__new" onClick={handleNew}>
              New Game
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
