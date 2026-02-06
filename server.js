// Import HTTP module to create server
const http = require("http");

// Import File System module with promises so we can use async/await
const fs = require("fs").promises;

// Import path module to manage file paths safely
const path = require("path");

// This function helps in reading any file from current folder
async function getFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  return await fs.readFile(filePath, "utf-8");
}

// Function to attach Nav.html in every HTML page
async function renderPage(pageFile) {
  const nav = await getFile("Nav.html");
  const page = await getFile(pageFile);
  return nav + page;
}

// Simple routing object
// Here we are mapping URL with file and content type
const routes = {
  "/": { file: "404.html", contentType: "text/html" },
  "/home": { file: "home.html", contentType: "text/html" },
  "/about": { file: "about.html", contentType: "text/html" },
  "/contact": { file: "contact.html", contentType: "text/html" },
};

// Creating server
const server = http.createServer(async (req, res) => {
  try {
    // Checking if requested URL exists inside routes
    const route = routes[req.url];

    if (req.url === "/style.css") {
      // default style.css file accessing with getfile
      const css = await getFile("style.css");

      res.writeHead(200, { "Content-Type": "text/css" });
      return res.end(css);
    }
    if (route) {
      // If route exists then load related file use with renderPage
      const fileData = await renderPage(route.file);

      res.writeHead(200, {
        "Content-Type": route.contentType,
      });

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
