const base = 256; // base for the rolling hash function
const mod = 101; // prime number for the rolling hash function

function calculateHashAndGiveHashArray(text) {
    let hashArray = [];
    let hash = 0;
    let power = 1;
    for (let i = 0; i < text.length; i++) {
        hash = (hash + text[i].charCodeAt() * power) % mod;
        hashArray.push(hash);
        power = (power * base) % mod;
    }
    return hashArray;
}

function calculateRollingHash(sourceHashArray, patternLength, index) {
    let hash = sourceHashArray[index + patternLength - 1];
    if (index > 0) {
        hash = hash - sourceHashArray[index - 1];
    }
    return hash;
}

export function calculate(sourceArray, userInputArray) {
    let sourceText = sourceArray.join(' ');
    let userInputText = userInputArray.join(' ');
    let patternLength = userInputText.length;
    let sourceLength = sourceText.length;
    let patternHash = calculateHashAndGiveHashArray(userInputText)[patternLength - 1];
    let sourceHashArray = calculateHashAndGiveHashArray(sourceText);
    let count = 0;
    for (let i = 0; i <= sourceLength - patternLength; i++) {
        let textHash = calculateRollingHash(sourceHashArray, patternLength, i);
        if (textHash === patternHash) {
            count++;
        }
    }

    return count / (sourceArray.length + userInputArray.length) * 100;
}