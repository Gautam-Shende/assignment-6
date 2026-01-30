// importing and accesing crating http Node.js Module
const http = require("http");
// importing File system modlue of Node.js
const fs = require("fs");

// First creating the server using http module
const server = http.createServer((req, res) => {
  // this code for using the style.css code in html file to the browser
  if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      res.end();
    });
  }

  // Route the Home route entering "/" or "/home" at res.url
  else if (req.url === "/" || req.url === "/home") {
    fs.readFile("home.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }

  // Route the about route entering "/about" at res.url
  else if (req.url === "/about") {
    fs.readFile("about.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }

  // Route the Contact route entering "/contact" at res.url
  else if (req.url === "/contact") {
    fs.readFile("contact.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }

  // Route and show the 404.html file for any error occured
  else {
    fs.readFile("404.html", (err, data) => {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
});

// Server listens on port 3000
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
