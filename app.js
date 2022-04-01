const guessButton = document.querySelector('.guess');
const tipsSection = document.querySelector('.tips');

let diff = 3;

start(diff);

function start(difficult) {
  const codeInputs = createCounters(difficult);

  const code = generateCode(difficult);

  console.log(code);

  guessFunction = function () {
    let guessTry = [];

    codeInputs.forEach((input) => guessTry.push(input.textContent));

    guessTry = guessTry.join('');

    if (guessTry === code) {
      guessButton.textContent = 'Success';
    } else {
      createTip(code, guessTry, checkAttempt);
    }
  };

  guessButton.addEventListener('click', guessFunction);
}

function randomNumber(min, max) {
  let num = min + Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function randomUniqueNumber(dataArray) {
  let pos = randomNumber(0, dataArray.length - 1);

  return [pos, dataArray[pos]];
}

function generateCode(codeLength) {
  let code = [];
  let availableNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < codeLength; i++) {
    let newUniqueNumber = randomUniqueNumber(availableNumbers);

    code.push(newUniqueNumber[1]);
    availableNumbers.splice(newUniqueNumber[0], 1);
  }

  return code.join('');
}

function createCounters(numberCount) {
  const container = document.querySelector('.code-input');

  for (let i = 1; i <= numberCount; i++) {
    const number = document.createElement('div');
    const incBtn = document.createElement('button');
    const decBtn = document.createElement('button');
    const value = document.createElement('span');

    number.classList.add('code-input__number');
    number.id = i;

    incBtn.classList.add(
      'number__button',
      'number__button--increase',
      'increase'
    );
    incBtn.addEventListener('click', () => {
      if (value.textContent < 9) {
        value.textContent++;
      } else value.textContent = 0;
    });
    decBtn.classList.add(
      'number__button',
      'number__button--decrease',
      'decrease'
    );
    decBtn.addEventListener('click', () => {
      if (value.textContent > 0) {
        value.textContent--;
      } else value.textContent = 9;
    });

    value.classList.add('number__value', 'value');
    value.textContent = randomNumber(0, 9);

    number.append(incBtn, value, decBtn);
    container.append(number);
  }

  return document.querySelectorAll('.number__value');
}

function checkAttempt(code, attempt) {
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

  return `${matches.correct} correct, ${matches.wrongPlace} wrong position`;
}

function createTip(code, attemptCode, checkFunction) {
  const tip = document.createElement('div');
  const codeHeader = document.createElement('h3');
  const tipText = document.createElement('div');

  tip.classList.add('tip');
  codeHeader.classList.add('tip__header');
  tipText.classList.add('tip__text');

  let answer = checkFunction(code, attemptCode);

  codeHeader.textContent = attemptCode;
  tipText.textContent = answer;

  tip.append(codeHeader, tipText);
  tipsSection.append(tip);
}

/* function generateCode(codeLength) {//create code with not unique numbers
  let code = randomNumber(0, '9'.repeat(codeLength));

  code = String(code);
  const len = code.length;

  if (len < codeLength) {
    code = '0'.repeat(codeLength - len) + code;
  }

  return code
} */

/* function testGen(count) {
  for (let i = 0; i < count; i++) {
    console.log(generateCode(diff));
  }
} */
