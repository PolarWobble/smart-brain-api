const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: "123",
			name: "john",
			password: "cookies",
			email: "john@gmail.com",
			entries: 0,
			joined: new Date()
		},
		{
			id: "124",
			name: "sally",
			password: "bananas",
			email: "sally@gmail.com",
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: "987",
			hash: "",
			email: "john@gmail.com"
		}
	]
}

app.get("/", (req, res)=>{
	res.send(database.users);
})

app.post("/signin", (req, res)=>{
	if (req.body.email === database.users[0].email &&
			req.body.password === database.users[0].password){
		res.json(database.users[0]);
	} else{
		res.status(400).jason("error loggin in");
	}

	/*// Load hash from your password DB.
	bcrypt.compare("bacon", hash, function(err, res) {
	    // res == true
	});
	bcrypt.compare("veggies", hash, function(err, res) {
	    // res = false
	});
	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
		res.json("success");
	} else{
		res.status(400).json("error loggin in");
	}*/
})

app.post("/register", (req, res)=>{
	const {name, email, password} = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
	   console.log(hash);
	});
	database.users.push({
			id: "125",
			name: name,
			email: email,
			entries: 0,
			joined: new Date()
		})
	res.json(database.users[database.users.length-1]);
})

app.get("/profile/:id", (req, res)=>{
	const {id} = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			return res.json(user);
		} 
	})
	if(!found){
		res.status(400).json("not found");
	}
})

app.put("/image", (req, res)=>{
	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id){
			found = true;
			user.entries++;
			return res.json(user.entries);
		} 
	})
	if(!found){
		res.status(400).json("not found");
	}
})






app.listen(3000, ()=>{
	console.log("app is running on port 3000");
});
