const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    //res.send("Hello world!");

    fs.readdir(`./files`, (err, files) => {
        res.render('index', {files: files});
    });
    
});

app.get('/file/:filename', (req, res) => {
    //res.send("Hello world!");

    fs.readFile(`./files/${req.params.filename}`,"utf-8", (err, filedata) => {
        res.render('show', {filename: req.params.filename, filedata: filedata});
    });
    
});

app.get('/edit/:filename', (req, res) => {
    //res.send("Hello world!");

    res.render('edit', {filename: req.params.filename});
    
});

app.post('/edit', (req, res) => {
    // console.log(req.body);

    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err) => {
        res.redirect('/');
    });

});

app.post('/create', (req, res) => {
    //console.log(req.body);

    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details, function(err) {
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log("server listening");
})