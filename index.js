const express = require('express');
const path = require('path');

const root_dir = (__dirname);

app = express();
app.set("view engine", "ejs");
app.use("/resurse", express.static(path.join(__dirname, "resurse")));

var wrongful_entries = [];

app.get(
    "/", function(req, res) {
        res.render(path.join(root_dir, "/views/pagini/index.ejs"));
    }
);
app.get(
    "/index", function(req, res) {
        // res.sendFile(path.join(root_dir, "/index.html"));
        res.render(path.join(root_dir, "/views/pagini/index.ejs"));
    }
);
app.get(
    "/about", function(req, res) {
        res.sendFile(path.join(root_dir, "/about.html"));
    }
);
app.get(
    "/images", function(req, res) {
        res.sendFile(path.join(root_dir, "/images.html"));
    }
);
app.get(
    "/pagina", function(req, res, next) {
        res.render(path.join(root_dir, "/views/pagini/pagina.ejs"), {a:10, b:20, c:"sir"});
        // console.log("aici");
        // res.send("response");
    }
);

app.get(
    "/test", function(req, res, next) {
        res.render(path.join(root_dir, "/views/pagini/test.ejs"));
    }
);
app.use(
    "/*", (req, res) => {
        let user_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
        current_date = new Date();
        breach_databody = {
            "id": wrongful_entries.length,
            "user_ip" : user_ip,
            "url" : req.url,
            "date" : current_date
        }
        console.log(
            ">>>>> Wrong Path Access Detection!", 
            "\n\tLink: \t\t", req.url,
            "\n\tUser_IP:\t", user_ip,
            "\n\tData body: ", breach_databody
        );
        wrongful_entries.push(breach_databody);
        console.log("Entry added to wrongful_entries list!");
        res.status(400);
        res.render(path.join(root_dir, "/views/pagini/error.ejs"));
    }
);

async function printWrongfulEntries(given_list) {
    while(true) {
        current_date = new Date();
        if (given_list.length === 0) {
            console.log("No wrongful entries to print!", current_date);
        }
        else {
            console.log("----------------------------");
            console.log("Wrongful entries: \n", given_list);
            console.log("----------------------------\n");
        };
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
}

app.listen(8088);
console.log('Listening on port 8088...\n');

printWrongfulEntries(wrongful_entries);