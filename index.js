const express = require('express');
const app = express();
const upload = require('./multer');
const bucket = require('./firebase');



app.post('/upload', upload.single('image'), (req, res) => {
    const file = req.file;

    const maxSize = 15 * 1024 * 1024;

    if (!file) {
        return res.status(400).send('Nenhuma imagem foi selecionada :(');
    }

    if (file.size > maxSize) {
        return res.status(400).send('A imagem selecionada é muito grande. O tamanho máximo permitido é 5mb');
    }



    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    });



    blobStream.on('error', err => {
        console.log(err);
        res.status(500).send('Error uploading image');
    });



    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        res.status(200).send(publicUrl);
    });



    blobStream.end(file.buffer);
});



app.listen(3000, () => console.log('Server started on port 3000'));