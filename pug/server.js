// IMPORTS
const express = require("express");
const path = require("path")


//GLOBAL VARIABLES
const APP = express();
const VIEWFOLDER = path.join(__dirname, "views")




const products = [];

APP.use(express.json());
APP.use(express.urlencoded({extended: true}));

/*
APP.engine("handlebars", HANDLEBARS.engine())


APP.set("views", VIEWFOLDER)

APP.set("view engine", "handlebars")
*/


APP.get("/", (req, res) => {
	res.redirect("products")
})

APP.get("/products", (req, res) => {
	/*
	res.render("products", {
		products: products
	});
	*/
})

APP.get("/form", (req, res) => {
	/*
	res.render("form");
	*/
})

APP.post("/products", (req, res) => {
	let product = req.body;
	products.push(product);
	console.log(products);
	res.redirect("/products")
})



APP.listen(4000, ()=>{"server listening on port 4000"});
