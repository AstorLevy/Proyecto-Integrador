const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

let userlist = require("../database/users.json");

const userController = {

    login: (req, res) => {
        res.render("login");
    },

    processLogin: (req, res) => {
        //validacion de los campos del formulario
        const errors = validationResult(req);
        //validacion sin errores
        if (errors.isEmpty()) {
            //identificacion del usuario a loguear
            let user = userlist.filter(el => el.email == req.body.user);
            //usuario existe
            if (user != undefined) {
                let authPass = bcrypt.compareSync(req.body.password, user.password);
                if (authPass) {     //contraseña correcta
                    req.session.userLogged = user;
                    res.render("/");
                } else {        //contraseña incorrecta
                    let msg = "Contraseña incorrecta";
                    res.render("login", { message : msg });
                }
            } else {    //usuario no existe
                let msg = "El usuario no existe";
                res.render("login", { message : msg });
            }
        }else {     //validacion con errores
            res.render("login", { errors : errors.errors });
        }
    },

    signin: (req, res) => {
        res.render("signin");
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let newId = userlist[(userlist.length - 1)].id + 1
            let file = req.file;
            let newuser = {
                id: newId,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                avatar: `img/${file.filename}`
            };

            userlist.push(newuser);

            fs.writeFileSync(
                path.join(__dirname, "../database/users.json"),
                JSON.stringify(userlist, null, 4),
                {
                    encoding: "utf-8"
                }
            );
            res.redirect("/")

        } else {

            res.render("signin", { errors: errors.array(), old: req.body })

        }
    }
}

module.exports = userController;