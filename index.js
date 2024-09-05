////////////////////////////////////////////////////////////////
// Variables <- could maybe source from .ini file in the future?
const express = require('express');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const ejs = require('ejs');
const sass = require('sass');
const {Client} = require('pg');

    //--------------- 
    // node and site paths
const port = 8080;
const rootPath = __dirname;
    // dif. dintre __dirname si process.cwd() e urmatoarea:
    // __dirname returneaza directorul script-ului ce ruleaza comanda
    // process.cwd() returneaza directorul din care ruleaza node.js
const resourcesPath = path.join(rootPath, 'resources');
const faviconPath = path.join(resourcesPath, 'images', 'favicon', 'favicon.ico');
const viewsPath = path.join(resourcesPath, 'views');
const gallery_path = path.join(resourcesPath, 'images', 'gallery');
const scriptsPath = path.join(resourcesPath, 'scripts');
const tempPath = path.join(resourcesPath, 'temp');

    //---------------
    // database parameters | maybe source from file in the future
connection_string = {
    user: "website", 
    password: "test123", 
    host: "localhost", 
    port: "5432", 
    database: "website"
};
var client = new Client(connection_string);
    // functie try/catch pt situatia cand e picat/stopped serviciul de database -> nu crapa node instant si avem celelalte pagini
    // minus cea de produse :)
client.connect((err) => {
        if (err) {
            if (err instanceof AggregateError) {
                console.error("Errors found when connecting to the db service!");
                err.errors.forEach((individualError, index) => {
                    console.error(`Error ${index + 1}: \n`, individualError);
                });
            } else {
                console.error('Failed to connect to the database.\nError message: ' + err);
            }
            return;
        };
    console.log('Database connection established');
});

    //---------------
    // misc params?
color_statistic = {
    "red": 0,
    "green": 0,
    "blue": 0,
    "black": 0,
    "orange": 0,
    "magenta": 0,
};


////////////////////////////////////////////////////////////////
// Functions

function getCurrentDate() { // return current date formatted properly for us to parse further
    const currentDate = new Date().toISOString().slice(0, 19);
    return currentDate;
}
function logPathDate(url) { // console.log("[" + currentDate + "]", "accessed the following URL: " + url);
    currentDate = getCurrentDate();
    console.log("[" + currentDate + "]", "accessed the following URL: " + "'" + url + "'");
}

// citesc json-ul gallery.json si initializez obiect global (deoarece nu are var sau let) numit imgObj
// apoi il parsez, ii adaugam path-uri pt big/med/small in fiecare item din lista images
// to do: automatic creation of resized/optimized images pt tot ce e in root dir in imagini
function createImages() {
    imgObj = JSON.parse(fs.readFileSync(path.join(gallery_path, "gallery.json")).toString("utf-8"));
    // console.log(imgObj);
    for (let imag of imgObj.images) {
        // console.log("--------------------------------");

        [file_name, file_extension] = imag.filename.split(".");

        imag.full = path.join(imgObj.gallery_path, `${file_name}.${file_extension}`)
        
        let dim_big = 400;
        let dim_medium = 200;
        let dim_small = 150;

        // definim path-urile pt dimens. reduse, dar folderele le-am facut eu manual :(
        imag.big = path.join(imgObj.gallery_path, "big", `${file_name}-${dim_big}.${file_extension}`)
        imag.medium = path.join(imgObj.gallery_path, "medium", `${file_name}-${dim_medium}.${file_extension}`)
        imag.small = path.join(imgObj.gallery_path, "small", `${file_name}-${dim_small}.webp`)

        // folosim libraria sharp pt a face img cu dimens. mai mici
        sharp(imag.full).rotate().resize(dim_big).toFile(imag.big, function(err, info){
            if (err) {
                console.log("Sharp error: ", err);
            }
        });
        sharp(imag.full).resize(dim_medium).toFile(imag.medium, function(err, info){
            if (err) {
                console.log("Sharp error: ", err);
            }
        });
        sharp(imag.full).resize(dim_small).toFile(imag.small, function(err, info){
            if (err) {
                console.log("Sharp error: ", err);
            }
        });
        // console.log(imag);
    }
}

function createError() {
    errObj = JSON.parse(fs.readFileSync(path.join(scriptsPath, 'json', 'errors.json')));
}
function renderError(code, response) {
    var error_title = errObj[code].title;
    var error_text = errObj[code].text;
    var error_image_path = path.join(errObj.errors_images_path, errObj[code].image);
    console.error("Warning - Error " + code);
    response.status(code).render("pages" + "/general-error", {error_title: error_title, error_text: error_text, error_image: error_image_path});
}

function colorStatistics(randomColor) {
    color_statistic[randomColor] = color_statistic[randomColor]+1;
    // console.log(color_statistic);
    let total_sum = 0;
    for (const [k,v] of Object.entries(color_statistic)) {
        total_sum += v;
    };
    let percentages_colors = {
        "total": total_sum,
        "red": (color_statistic["red"] / total_sum * 100).toFixed(3) + "%",
        "green": (color_statistic["green"] / total_sum * 100).toFixed(3) + "%",
        "blue": (color_statistic["blue"] / total_sum * 100).toFixed(3) + "%",
        "black": (color_statistic["black"] / total_sum * 100).toFixed(3) + "%",
        "orange": (color_statistic["orange"] / total_sum * 100).toFixed(3) + "%",
        "magenta": (color_statistic["magenta"] / total_sum * 100).toFixed(3) + "%"
    };
    console.log(percentages_colors);
    return percentages_colors
}

function sendBreachToDB(breach_body) {
    breach_url = breach_body["breach_url"];
    breach_date = getCurrentDate();
    user_ip = breach_body["user_ip"];
    console.log("inserting into breach table!");
    query = `INSERT INTO breach (url, date, user_ip) VALUES ('${breach_url}', CAST('${breach_date}' AS TIMESTAMPTZ), '${user_ip})';`;
    console.log(query);
    client.query(query, function(err, queryResult){
        console.log(queryResult);
    });
}

////////////////////////////////////////////////////////////////
// Some API Requirements

app = express();
app.use("/*resources", express.static(resourcesPath));
app.set("view engine", "ejs"); // set view engine as ejs based on course information
app.set('views', viewsPath); // set views dir cuz default is set to rootDir/views which is nu-uh not good for me

console.log("\nStarted up!");


////////////////////////////////////////////////////////////////
// API end-points

app.get("/test", function(request, response) {
    console.log("Request received on '" + request.url + "'!");
    // console.log(imgObj.images[0].description);
    client.query("SELECT * FROM products", function(err, queryResult){
        console.log(queryResult.rows);
    });
    response.render("pages/test");
    // response.end();
    // console.log("----------------------------------------------------------------")
    // console.log("in /test -> final object: \n", imgObj);
})

app.get("/*favicon.ico", function(request, response) {
    response.sendFile(faviconPath);
});

app.get("/products", function(request, response) {
    console.log("Request received on '" + request.url + "'!");
    // console.log(imgObj.images[0].description);
    product_image_path = path.join(resourcesPath, "images", "products");
    client.query("SELECT * FROM products", function(err, queryResult){
        // console.log(queryResult.rows);
        products_list = queryResult.rows;
        // for (let product of products_list) {
        //     console.log(`${product.name} - ${product.price} - ${product['description']}`);
        // }
        response.render("pages/products", {products: products_list, product_image_path: product_image_path});
    });
    // response.end();
    // console.log("----------------------------------------------------------------")
    // console.log("in /test -> final object: \n", imgObj);
})

app.get("/gallery", function(request, response) {
    console.log("Request received on '" + request.url + "'!");
    console.log("Initializing gallery...");
    createImages();
    // console.log(imgObj.images[0].description);
    response.render("pages/gallery", {images: imgObj.images});
    // response.end();
    // console.log("----------------------------------------------------------------")
    // console.log("in /test -> final object: \n", imgObj);
})

app.get("*/animated_gallery.css", function(request, response) {
    var colors = ["red", "green", "blue", "black", "orange", "magenta"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    var scssContent = fs.readFileSync((path.join(scriptsPath, 'scss', 'animated_gallery.scss'))).toString("utf8");

    compiled_ejs = ejs.render(scssContent, {color: randomColor});
    // console.log(compiled_ejs);
    var scssPath = path.join(tempPath, 'animated_gallery.scss');
    fs.writeFileSync(scssPath, compiled_ejs);
    var compileResult = sass.compile(scssPath, {sourceMap: true});
    // console.log(compileResult);

    response.setHeader('Content-Type', 'text/css');
    response.send(compileResult.css);
    
    // custom function to create statistics for the colors :) maybe a graph and a distribution page on an admin panel?
    colorStatistic = colorStatistics(randomColor);
    // console.log(colorStatistic);
})


app.get("/animated-gallery", function(request, response) {
    createImages();
    response.render("pages" + "/animated-gallery", {images: imgObj.images});
});

app.get(["/", "/index", "/home"], function(request, response) {
    console.log("Request received on '" + request.url + "'!");
    response.render("pages/index")
    response.end();
})


app.get(["/*.ejs", "*ejs", "/admin"], function(request, response) {
    console.log("Alert! Status code 400 for IP " + request.ip);
    console.log("Request received on '" + request.url + "'!");
    logPathDate(request.url);
    err_code = 400;
    renderError(err_code, response);
    // let user_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    // breach_body = {"breach_url": request.url, "user_ip": request.ip}
    // sendBreachToDB(breach_body);
});
app.get("/*resources", function(request, response) {
    console.log("Alert! Status code 403 for IP " + request.ip);
    console.log("Request received on '" + request.url + "'!");
    logPathDate(request.url);
    err_code = 403;
    renderError(err_code, response);
});

app.get("/*", function(request, response) {
    console.info("Request came from undefined path!");
    logPathDate(request.url);
    response.render("pages" + request.url, function(err, renderResult){
            if(err) {
                if(err.message.includes("Failed to lookup view")){ // daca eroarea e ca nu gaseste view-ul
                    err_code = 404;
                    renderError(err_code, response);
                }
                else { // daca e alta eroare -> pagina cu err generala
                    err_code = 404;
                    renderError(err_code, response);
                };
            }
            else { // daca nu e eroare, atunci
                console.log("/* found a page and rendered it!");
                response.send((renderResult)); // face render in pagina cu view-ul cu numele din url... how to fix this?
            }
        }
    )
    response.end();
})


////////////////////////////////////////////////////////////////
// Server Start

app.listen(port);
console.log("================================================");
console.log("Server is running and listening on port [" + port + "]!\n\n")
////////////////////////////////////////////////////////////////
// Call upon functions

// console.log("Calling upon functions post-initialization!");
createError();