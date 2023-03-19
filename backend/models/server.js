const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/config");
const path = require("path");
require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      user: "/api/user",
      feature: "/api/feature",
      auth: "/api/auth",
      note: "/api/note",
      book: "/api/book",
    };

    this.connectDB();

    this.app.use(cors());
    this.app.use(express.json());

    // Serve static files from the "public" folder
    const __dirname = path.resolve();
    // this.app.use(express.static(path.join(__dirname, "frontend", "public")));
    this.app.use(express.static(path.join(__dirname, "build")));

    this.app.use(this.paths.user, require("../routes/user"));
    this.app.use(this.paths.feature, require("../routes/feature"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.note, require("../routes/note"));
    this.app.use(this.paths.book, require("../routes/book"));
  }
  async connectDB() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening in port " + this.port);
    });
  }
}

module.exports = Server;
