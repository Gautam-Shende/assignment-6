// Import HTTP module to create server
const http = require("http");

// Import File System module with promises so we can use async/await
const fs = require("fs");

// Import path module to manage file paths safely
const path = require("path");

// This function helps in reading any file from current folder
async function getFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  return await fs.readFile(filePath);
}

// Simple routing object
// Here we are mapping URL with file and content type
const routes = {
  "/": { file: "home.html", contentType: "text/html" },
  "/home": { file: "home.html", contentType: "text/html" },
  "/about": { file: "about.html", contentType: "text/html" },
  "/contact": { file: "contact.html", contentType: "text/html" },
  "/style.css": { file: "style.css", contentType: "text/css" },
};

// Creating server
const server = http.createServer(async (req, res) => {
  try {
    // Checking if requested URL exists inside routes
    const route = routes[req.url];

    if (route) {
      // If route exists then load related file with getFile method
      const fileData = await getFile(route.file);
      // res.writeHead() tell the browser what type of data is being sent in the response
      res.writeHead(200, {
        "Content-Type": route.contentType,
      });
      // end response in web page of requested URL
      res.end(fileData);
    } else {
      // If route not found then load 404 page
      const errorPage = await getFile("404.html");

      res.writeHead(404, {
        "Content-Type": "text/html",
      });

      res.end(errorPage);
    }
  } catch (error) {
    // If something goes wrong (file missing / server issue)
    res.writeHead(500, {
      "Content-Type": "text/plain",
    });
    res.end("Server Error");
  }
});

// Starting server on port 3000
server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
