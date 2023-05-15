import axios from 'axios';

const excludeDomains = [
    'youtube.com',
    'facebook.com',
    'twitter.com',
    'instagram.com',
    'linkedin.com',
    'pinterest.com',
    'download',
    '.pdf',
    'quora.com'
]

export const TIMEOUT = 8000;

const fetchSourcesData = async ( sentences, setText) => {

    let result = [];
    for (let i = 0; i < sentences.length; i++) {
        try {
            setText(`Fetching Source Link(${i + 1}/${sentences.length})...`)
            let response = await axios.get(`/api/search?query=${encodeURIComponent(sentences[i])}`, { timeout: TIMEOUT })
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.data, "text/html");
            let parents = doc.querySelectorAll('.yuRUbf');
            let childLinks = [];
            for (let i = 0; i < parents.length; i++) {
                childLinks.push(parents[i].querySelector('a').href)//.split('?q=')[1].split('&sa=U&ved=')[0]);
            }
            result.push(childLinks);
        }
        catch (e) {
        }
    }
    return result;

}




export const fetchSource = async (text, setText) => {
    let sentences = text.split('.');

    //seperating 10 list
    if (sentences.length > 10) sentences = sentences.slice(0, 10); // slice only 10 sentences \r\n

    // remove \n\r and lowercase
    sentences = sentences.map((sentence) => sentence.replace(/(\r\n|\n|\r)/gm, "").toLowerCase().trim());


    //remove empty sentences
    sentences = sentences.filter((sentence) => sentence.length > 0);

    const links = await fetchSourcesData(sentences, setText); //10 links 


    //    remove duplicates
    let flatLinks = links.flat(); // [1,[2]]=> [1,2]
    let sourceLink = [...new Set(flatLinks)] // [1,2,2] => [1,2]

    //remove excluded domains // [1,2,3]=>  some(x===1)
    sourceLink = sourceLink.filter((link) => !excludeDomains.some((domain) => link.includes(domain)));

    //slice only 5 
    if (sourceLink.length > 7) sourceLink = sourceLink.slice(0, 7);

    setText("Fetching Source Data...")

    if (sourceLink.length === 0) {
        alert("No Source Link Found. Please check your internet connection and try again.")
        return;
    }

    let responses = [];

    let count = 0;
    for (let link of sourceLink) {
        try {
            count++;
            setText("Fetching Source Data(" + count + "/" + sourceLink.length + ")...")
            let response = await axios.get(`/api/source?query=${link}`, { timeout: TIMEOUT });
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.data, "text/html");
            let htmlContent = doc.querySelector('body').textContent.replace(/(\r\n|\n|\r|\t)/gm, "").toLowerCase().trim();
            responses.push({ link: link, content: htmlContent });
        }
        catch (e) {
        }
    }

    if (responses.length === 0) {
        alert("No Source Data Found. Please check your internet connection and try again.")
        return;
    }



    //parsing happens


    return responses;
}

