const exp = require("constants");
const express = require("express");
const server = express();
const path = require("path");
const cookieParser = require("cookie-parser");
server.use(express.json());

server.use(cookieParser());

server.set("view engine", "ejs");
server.set("views", [
    path.join(__dirname, "/views/Mahasiswa"),
    path.join(__dirname, "/views/Dashboard"),
    path.join(__dirname, "/views/Dosen"),
    path.join(__dirname, "/views"),
]);
server.use(express.static(path.join(__dirname, "/assets")));
server.use(express.static(path.join(__dirname, "/node_modules/preline/dist")));
server.use(express.urlencoded({ extended: true }));

const auth = require("./routes/auth.route");
const mahasiswa = require("./routes/mahasiswa.route");
const dosen = require("./routes/dosen.route");
const admin = require("./routes/admin.route");

server.use("/auth", auth);
server.use("/", mahasiswa);
server.use("/dosen", dosen);
server.use("/admin", admin);


server.get("*", (req, res) => {
    res.render("notfound");
});

server.listen(5000, function () {
    console.log("listening on http://localhost:" + this.address().port);
});


