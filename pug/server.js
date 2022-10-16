// IMPORTS
const express = require("express");
const path = require("path")


//GLOBAL VARIABLES
const APP = express();
const VIEWFOLDER = path.join(__dirname, "views")




const products = [];

APP.use(express.json());
APP.use(express.urlencoded({extended: true}));

APP.set("views", VIEWFOLDER);
APP.set("view engine", "pug")


APP.get("/", (req, res) => {
	res.redirect("products")
})

APP.get("/products", (req, res) => {
	let data = {
		data: {
			productTable: true,
			products: products
		}
	}
	res.render("template", data);
})

APP.get("/form", (req, res) => {
	let data = {
		data: {
			form: true
		}
	}
	res.render("template", data);
})

APP.post("/products", (req, res) => {
	let product = req.body;
	products.push(product);
	console.log(products);
	res.redirect("/products")
})



APP.listen(4000, ()=>{"server listening on port 4000"});
