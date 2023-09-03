const express = require('express');
const path = require('path');

const root_dir = (__dirname);

app = express();

app.use("/resurse", express.static(path.join(__dirname, "resurse")));


app.get(
    "/", function(req, res) {
        res.sendFile(path.join(root_dir, "/index.html"));
    }
);
app.get(
    "/index.html", function(req, res) {
        res.sendFile(path.join(root_dir, "/index.html"));
    }
);
app.get(
    "/about.html", function(req, res) {
        res.sendFile(path.join(root_dir, "/about.html"));
    }
);
app.get(
    "/images.html", function(req, res) {
        res.sendFile(path.join(root_dir, "/images.html"));
    }
);

app.get(
    "/something", function(req, res, next) {
        console.log("aici");
        res.send("response");
    }
);

app.listen(8088);
console.log('Listening on port 8088');