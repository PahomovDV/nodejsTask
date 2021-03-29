import StreamZip from 'node-stream-zip';

export function extract(filePath) {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line more/no-then
        open(filePath).then((res, err) => {
            if (err) {
                reject(err);
            }

            let body = '';

            const components = res.toString().split('<w:t');

            components.forEach((value, index) => {
                const tags = components[index].split('>');
                const content = tags[1].replace(/<.*$/, '');

                body += `${content  } `;
            });

            resolve(body);
        });
    });
}

function open(filePath) {
    return new Promise((resolve, reject) => {
        const zip = new StreamZip({
            file         : filePath,
            storeEntries : true
        });

        zip.on('ready', () => {
            const chunks = [];

            let content = '';

            zip.stream('word/document.xml', (err, stream) => {
                if (err) {
                    reject(err);
                }

                stream.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                stream.on('end', () => {
                    content = Buffer.concat(chunks);
                    zip.close();
                    resolve(content.toString());
                });
            });
        });
    });
}

export function getFileExtension(filename) {
    if (filename.length === 0) return '';
    const dot = filename.lastIndexOf('.');

    if (dot === -1) return '';
    const extension = filename.substr(dot, filename.length);


    return extension;
}
