const codeInputs = document.querySelectorAll('.code-input__number');
const guessButton = document.querySelector('.guess');
const checkText = document.querySelector('.history__check');
const tips = document.querySelector('.history__tips');

start();

function start() {
  const code = generateCode(3);
  let startNum = generateStart(3);

  console.log(code);

  codeInputs.forEach((input, index) => (input.value = startNum[index]));

  guessFunction = function () {
    let guessTry = [];

    codeInputs.forEach((input) => guessTry.push(input.value));

    guessTry = guessTry.join('');

    if (guessTry === code) {
      checkText.textContent = 'success';
    } else {
      checkText.textContent = 'fail';
      giveTip(code, guessTry);
    }
  };

  guessButton.addEventListener('click', guessFunction);

  //console.log(code);
}

function randomNumber(min, max) {
  let num = min + Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function generateCode(codeLength) {
  let code = randomNumber(0, '9'.repeat(codeLength));

  code = String(code);
  const len = code.length;

  if (len < codeLength) {
    code = '0'.repeat(codeLength - len) + code;
  }

  return code;
}

function generateStart(codeLength) {
  let startNum = randomNumber(0, '9'.repeat(codeLength));

  startNum = String(startNum);
  const len = startNum.length;

  if (len < codeLength) {
    startNum = '0'.repeat(codeLength - len) + startNum;
  }

  return startNum.split('');
}

function testGen(count) {
  for (let i = 0; i < count; i++) {
    console.log(generateCode(3));
  }
}

function giveTip(code, attempt) {
  let matches = {
    correct: 0,
    rightPlace: 0,
    wrongPlace: 0,
  };

  attemptSet = new Set(attempt.split(''));

  attemptSet.forEach((num) => {
    if (code.includes(num)) {
      matches.correct++;
    }
  });

  attempt.split('').forEach((num, index) => {
    if (num === code[index]) {
      matches.rightPlace++;
    }
  });

  matches.wrongPlace = matches.correct - matches.rightPlace;

  let answer = `${matches.correct} numbers are correct, ${matches.wrongPlace} not on the right place`;
  //console.log(code)
  tips.textContent = attempt + ': ' + answer;
}
