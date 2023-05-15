
const BIG_PRIME = 32416190071;
const wordHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
        hash += str.charCodeAt(i) * Math.pow(31, str.length - i - 1) % BIG_PRIME;
    }
    return hash;
};

const giveHashTable = (arr, THRESHOLD_WORD) => {
    let initialHash = 0;
    let hashArray = [];
    for (let i = 0; i < THRESHOLD_WORD; i++) {
        initialHash += wordHash(arr[i]);
    }
    for (let i = 0; i <= arr.length - THRESHOLD_WORD; i++) {
        let oldWordHash = wordHash(arr[i]);
        let newWordHash = wordHash(arr[i + THRESHOLD_WORD]);

        if (initialHash < 0) initialHash += BIG_PRIME;



        let newHash = initialHash - oldWordHash + newWordHash;

        hashArray.push({
            text: arr.slice(i, i + THRESHOLD_WORD).join(' '),
            hash: initialHash
        });

        initialHash = newHash;

    }

    return hashArray;
}

const plagiarismRate = (source, toCheck) => {
    let plagiarismCount = 0;
    let whatMatches = [];

    for (let i = 0; i < toCheck.length; i++) {
        let doesItExist = source.find((item) => item.hash === toCheck[i].hash && item.text === toCheck[i].text);
        if (doesItExist) {
            plagiarismCount++;
            whatMatches.push({
                source: doesItExist.text,
                toCheck: toCheck[i].text
            })
        }

    }
    const plagiarismRate = plagiarismCount / toCheck.length * 100;
    return plagiarismRate;
}


export function calculate(sourceArray, userInputArray, threshold) {
    const sourceHashTable = giveHashTable(sourceArray, threshold);
    const toCheckHashTable = giveHashTable(userInputArray, threshold);

    return plagiarismRate(sourceHashTable, toCheckHashTable);
}

