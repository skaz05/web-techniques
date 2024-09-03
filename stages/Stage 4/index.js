const express = require('express');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const port = 8080;
const rootPath = __dirname;
const resourcesPath = path.join(rootPath, 'resources');
const viewsPath = path.join(resourcesPath, 'views');
const gallery_path = path.join(resourcesPath, 'images', 'gallery');

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
        sharp(imag.full).resize(dim_big).toFile(imag.big, function(err, info){
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

////////////////////////////////////////////////////////////////
// API end-points

app = express();
app.use("/*resources", express.static(resourcesPath));
app.set("view engine", "ejs"); // set view engine as ejs based on course information
app.set('views', viewsPath); // set views dir cuz default is set to rootDir/views which is nu-uh not good for me

console.log("\nStarted up! \n================================================");
console.log("Main directory: \t", rootPath);
console.log("Resources: \t\t", resourcesPath);
console.log("Views: \t\t\t", viewsPath);



app.get("/test", function(request, response) {
    console.log("Request received on '" + request.url + "'!");
    // console.log(imgObj.images[0].description);
    response.render("pages/test", {images: imgObj.images});
    // response.end();
    // console.log("----------------------------------------------------------------")
    // console.log("in /test -> final object: \n", imgObj);
})

app.get(["/", "/index", "/home"], function(request, response) {
    console.log("Request received on '" + request.url + "'!");
    response.render("pages/index")
    response.end();
})

app.get(["/*.ejs", "*ejs"], function(request, response) {
    console.log("Alert! Status code 403 for IP " + request.ip);
    console.log("Request received on '" + request.url + "'!");
    logPathDate(request.url);
    response.status(403).render("pages" + "/403", {a:10, b:"something", request_ip: request.ip});
});

app.get("/*", function(request, response) {
    console.info("Request came from undefined path!");
    logPathDate(request.url);
    response.render("pages" + request.url, function(err, renderResult){
        if(err) {
            if(err.message.includes("Failed to lookup view")){ // daca eroarea e ca nu gaseste view-ul
                response.status(404).render("pages" + "/404");
            }
            else { // daca e alta eroare -> pagina cu err generala
                response.render(("pages" + "/general_error"))
            };
        }
        else { // daca nu e eroare, atunci
            console.log("renderResult would've appeared!");
            response.send((renderResult));
        }
    })
    response.end();
})


// app.get("/", function(request, response) {
//     console.log("Client accessed path " + request.url + "!");
//     const index_path = path.join(rootPath, 'index.html');
//     response.sendFile(index_path, function(err) {
//         if (err) {
//             console.error("Error sending a response: " + err);
//             response.status(err.status || 500).send('An error occurred while sending the file.');
//         }
//         else {
//             console.log("Successfully sent!");
//         }
//     });
// });

// app.get("/*", function(request, response) {
//     console.log("Client accessed path " + request.url + "!");
//     const index_path = path.join(rootPath, 'index.html');
//     response.sendFile(index_path);
// });


// // // works
// app.get("/", function(request, response) {
//     console.log("Client accessed '/' path!");

//     const filePath = path.join(rootPath, "index.html");
//     console.log("Target HTML file:", filePath);

//     response.sendFile(filePath, function(err) {
//         if (err) {
//             console.error("Error sending file:", err);
//             response.status(err.status || 500).send('An error occurred while sending the file.');
//         } else {
//             console.log("index.html sent successfully.");
//         }
//     });
// });


////////////////////////////////////////////////////////////////
// Server Start

app.listen(port);
console.log("================================================");
console.log("Server is running and listening on port [" + port + "]!\n\n")

////////////////////////////////////////////////////////////////
// Call upon functions

console.log("calling upon createImages function!");
createImages();
