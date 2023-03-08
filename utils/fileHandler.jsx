export default function fileHandler(e) {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];


        const fileExtension = file.name.split('.').pop();

        if (fileExtension === 'txt') {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            }
            reader.readAsText(file);
        }
        else {
            alert("Invalid File Type");
        }
        // else if (fileExtension === 'pdf') {

        //     const PDFDocument = require('pdf-lib').PDFDocument;

        //     const reader = new FileReader();
        //     reader.onload = (event) => {
        //         const pdfData = event.target.result;
        //         let text="";
        //         const pdf = new PDFDocument();
        //         pdf.load(pdfData);        
        //         for (const page of pdf.getPages()) {
        //             text += page.getTextContent().then((text) => {
        //                 return text.items.map((s) => s.str).join(' ');
        //             });
        //         }

        //         resolve(text);



        //     };
        //     reader.readAsArrayBuffer(file);

        // }
    });
}