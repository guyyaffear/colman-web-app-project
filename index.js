const express = require("express");
const bp = require("body-parser");
const view_path = __dirname + "/views";
const app = express();
const PORT = 4666;
var mongoose = require("mongoose");


app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use("/public", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", view_path);

const session = require("express-session");
const sessionMiddleware = session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
});

app.use(sessionMiddleware);

app.use(function (req, res, next) {
    res.locals.email = req.session.email ? req.session.email : null;
    next();
});
app.use("/user", require("./routes/login",{useName:null}));
app.use("/shoes", require("./routes/shoes"));
app.use("/cart", require("./routes/cart"));
app.use("/dashboard", require("./routes/dashboard"));

app.get("/", (req, res) => {
    res.render("login",{userName:null});
  });



const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("user is connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("new product", (product) => {
        socket.emit("new product", product);
    });
});

httpServer.listen(PORT, async () => {
    console.log(`server running on port:${PORT}`);
    mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true})
        .then(() => {
            console.log("connected to db using mongoose");
        })
        .catch((err) => {
            console.log("couldn't connect to db from mongoose");
        });
});
