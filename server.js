
const express = require("express");
const path = require("path");
const router = require("./router");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.use("/api", router);

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});