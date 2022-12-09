const http = require("http");
const fs = require("fs")
const port = 3000;
const ip = "127.0.0.1";

const sendReponse = (filename, statusCode, response) => {
    fs.readFile(`./html/${filename}`, (error, data) =>{
        if (error) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain")
            response.end("Sorry");
        }
        else  {
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html")
            response.end(data);
        }
        })
}

const server = http.createServer((request, response) => {
    method = request.method
    let url = request.url
    console.log(url)
    if (method === "GET") {
        const requestUrl = new URL(url, `http://${ip}:${port}`);
        console.log(requestUrl);
        console.log(requestUrl.searchParams.get("lang"));
        url = requestUrl.pathname;
        const lang = requestUrl.searchParams.get("lang")
        let selector;

        if (lang === null || lang ==="en") {
            selector = "";
        }
        else if (lang === "zh") {
            selector = "-zh";
        }
        else{
            selector = "";
        }

        if (url === "/") {
            sendReponse(`index${selector}.html`, 200, response)
        }
        else if (url === "/about.html") {
            sendReponse(`about${selector}.html`, 200, response)
        }
        else {
            sendReponse(`404${selector}.html`, 404, response)
        }
    }
});



server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);
});

