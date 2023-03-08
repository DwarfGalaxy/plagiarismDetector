export function calculate(pattern, text) {
    let count = 0;
    function KMPSearch(pattern, text) {
        let m = pattern.length;
        let n = text.length;

        // create lps[] that will hold the longest prefix suffix
        // values for pattern
        let lps = new Array(m).fill(0);

        // Preprocess the pattern (calculate lps[] array)
        computeLPSArray(pattern, m, lps);

        let i = 0; // index for txt[]
        let j = 0; // index for pat[]
        while (i < n) {
            if (pattern[j] === text[i]) {
                j++;
                i++;
            }

            if (j === m) {
                j = lps[j - 1];
                count++;
            }

            // mismatch after j matches
            else if (i < n && pattern[j] !== text[i]) {
                // Do not match lps[0..lps[j-1]] characters,
                // they will match anyway
                if (j !== 0) j = lps[j - 1];
                else i = i + 1;
            }
        }
    }

    function computeLPSArray(pattern, m, lps) {
        let len = 0;
        lps[0] = 0; // lps[0] is always 0

        // the loop calculates lps[i] for i = 1 to m-1
        let i = 1;
        while (i < m) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
    }



    KMPSearch(pattern, text);

    return count / text.length;
}

