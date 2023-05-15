function kmpSearch(pattern, text) {
    const patternLength = pattern.length;
    const textLength = text.length;

    // Create a prefix table for the pattern
    const prefixTable = Array(patternLength).fill(0);
    let i = 0;
    let j = 1;

    while (j < patternLength) {
        if (pattern[i] === pattern[j]) {
            prefixTable[j] = i + 1;
            i++;
            j++;
        } else if (i > 0) {
            i = prefixTable[i - 1];
        } else {
            prefixTable[j] = 0;
            j++;
        }
    }

    // Search for the pattern in the text using the prefix table
    i = 0;
    j = 0;
    const result = [];

    while (i < textLength) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        } else if (j > 0) {
            j = prefixTable[j - 1];
        } else {
            i++;
        }

        if (j === patternLength) {
            result.push(i - j);
            j = prefixTable[j - 1];
        }
    }

    return result;
}

function plagiarismRate(sourceDocArr, inputDocArr, wordThreshold) {

    const inputDocPatterns = new Set();



    // Find all the patterns in the input document
    for (let i = 0; i <= inputDocArr.length - wordThreshold; i++) {
        const inputPattern = inputDocArr.slice(i, i + wordThreshold).join(" ");
        inputDocPatterns.add(inputPattern);

    }


    let matches = 0;

    for (let pattern of inputDocPatterns) {
        const found = kmpSearch(pattern, sourceDocArr.join(" "));
        if (found.length > 0) {
            matches++;
        }
    }

    return matches / inputDocPatterns.size * 100;
}


export function calculate(sourceArray, userInputArray, threshold) {
    return plagiarismRate(sourceArray, userInputArray, threshold);
}
