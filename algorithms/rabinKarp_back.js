const base = 256; // base for the rolling hash function
const mod = 101; // prime number for the rolling hash function

export function calculate(text1, pattern) {
    let count = 0; // number of matching substrings
    let hash1 = 0; // hash value for text1
    let patternHash = 0; // hash value for pattern
    let pow = 1; // base^(length of substring - 1)

    // calculate the hash values for text1, text2, and pattern
    for (let i = 0; i < pattern.length; i++) {
        patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
        hash1 = (hash1 * base + text1.charCodeAt(i)) % mod;
        pow = (pow * base) % mod;
    }

    // search for pattern in text1
    for (let i = 0; i <= text1.length - pattern.length; i++) {
        if (hash1 === patternHash) {
            // check if the substrings are actually equal
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (text1[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                count++;
            }
        }
        // calculate the hash value for the next substring
        hash1 = (hash1 - pow * text1.charCodeAt(i)) % mod;
        if (hash1 < 0) {
            hash1 += mod;
        }

        hash1 = (hash1 * base + text1.charCodeAt(i + pattern.length)) % mod;
    }


    // calculate the plagiarism rate
    return count / text1.length;
}
