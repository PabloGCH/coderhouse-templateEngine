// IMPORTS
const express = require("express");
const path = require("path")
const Container = require("../container.js")

//GLOBAL VARIABLES
const APP = express();
const VIEWFOLDER = path.join(__dirname, "views")

const container = new Container("../products.json")



let products = [];

APP.use(express.json());
APP.use(express.urlencoded({extended: true}));
APP.use(express.static(path.join(__dirname, 'public')));
APP.set("views", VIEWFOLDER);
APP.set("view engine", "pug")


APP.get("/", (req, res) => {
	res.redirect("products")
})

APP.get("/products", (req, res) => {
	products = [];
	container.getAll().then(p => {
		let data = {
			data: {
				productTable: true,
				products: p ? p : []
			}
		}
		res.render("template", data);
	})

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
	Object.assign(product, {price: parseInt(product.price)})
	container.save(product).then(ret => {
		console.log(ret);
	})
	res.redirect("/products");
})



APP.listen(4000, ()=>{"server listening on port 4000"});
