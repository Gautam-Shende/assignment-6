// Importing the built-in HTTP module from Node.js
// This module helps us create a web server
const http = require("http");

// Importing the File System (fs) module
// This module allows us to read files like HTML and CSS
const fs = require("fs");

// Importing path module to safely handle file paths
const path = require("path");

// Creating the server using the http module
const server = http.createServer((req, res) => {

  // Serving the CSS file when browser requests /style.css
  if (req.url === "/style.css") {

    // Reading the style.css file from the current directory
    fs.readFile(path.join(__dirname, "style.css"), (err, data) => {

      // If any error occurs while reading the file
      if (err) {
        res.writeHead(500);
        res.end("Error loading CSS file");
        return;
      }

      // Sending successful response with CSS content type
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  }

  // Routing for Home page ("/" or "/home")
  else if (req.url === "/" || req.url === "/home") {

    // Reading home.html file
    fs.readFile(path.join(__dirname, "home.html"), (err, data) => {

      // Handling file read error
      if (err) {
        res.writeHead(500);
        res.end("Error loading Home page");
        return;
      }

      // Sending HTML content to the browser
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  // Routing for About page ("/about")
  else if (req.url === "/about") {

    // Reading about.html file
    fs.readFile(path.join(__dirname, "about.html"), (err, data) => {

      // Handling file read error
      if (err) {
        res.writeHead(500);
        res.end("Error loading About page");
        return;
      }

      // Sending About page HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  // Routing for Contact page ("/contact")
  else if (req.url === "/contact") {

    // Reading contact.html file
    fs.readFile(path.join(__dirname, "contact.html"), (err, data) => {

      // Handling file read error
      if (err) {
        res.writeHead(500);
        res.end("Error loading Contact page");
        return;
      }

      // Sending Contact page HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  // Handling all other routes (404 - Page Not Found)
  else {

    // Reading 404.html file
    fs.readFile(path.join(__dirname, "404.html"), (err, data) => {

      // Sending 404 status code with error page
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(data || "404 Page Not Found");
    });
  }
});

// Making the server listen on port 3000
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
 