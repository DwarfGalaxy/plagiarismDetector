export default function fileHandler(e) {
    return new Promise((resolve, reject) => {
        const file = e.target.files[0];

        const fileExtension = file.name.split('.').pop();

        if (fileExtension === 'txt') {
            let size = file.size / 1024 / 1024;
            if (size > 1) {
                alert("File size should be less than 1MB");
                return reject();
                
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            }
            reader.readAsText(file);

        }
        else {
            alert("Invalid File Type");
        }
       
    });
}