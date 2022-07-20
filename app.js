const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const cookies=require('cookie-parser');


const methodOverride = require("method-override");

const indexRouter = require("./routes/index.routes.js");
const productsRouter = require("./routes/products.routes.js");
const userRouter = require("./routes/user.routes.js");

//settings___________________________________________________
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");

//middlewares________________________________________________
app.use(express.urlencoded({ extended: false}));
app.use(express.json());                               
app.use(methodOverride("_method"));
app.use(session({
    secret:"mensaje secreto",
    resave: false,
    saveUninitialized: true
}));
app.use(cookies());

//routes____________________________________________________
app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/user", userRouter);


//static____________________________________________________
app.use(express.static(path.join(__dirname, "public")));

//server____________________________________________________
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})
