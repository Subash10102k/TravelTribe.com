const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt =require("bcryptjs");


require("./db/conn");


const Register = require("./models/registers");

const {json} =require("express");
const { Mongoose } = require("mongoose");


const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});
app.get("/log", (req, res) => {
    res.render("index1")
});

app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/more", (req, res) => {
    res.render("more");
});
app.get("/morenext1", (req, res) => {
    res.render("morenext1")
});
app.get("/morenext2", (req, res) => {
    res.render("morenext2")
});
app.get("/morenext3", (req, res) => {
    res.render("morenext3")
});
app.get("/forgot", (req, res) => {
    res.render("user")
});


app.get("/elloraCaves", (req, res) => {
    res.render("ellora")
});app.get("/padmanabhaswamyTemple", (req, res) => {
    res.render("pad temple")
});app.get("/tajMahal", (req, res) => {
    res.render("taj1")
});app.get("/tsongmoLake", (req, res) => {
    res.render("tsongmoLake")
});
// create a new user in data base
app.post("/register", async (req, res) => {

    try{
        const Password = req.body.Password;
        const cPassword = req.body.ConfirmPassword;
        if(Password === cPassword){
            const registerEmployee = new Register({

                            
                Name : req.body.Name,
                Email : req.body.Email,
                Password : Password,
                ConfirmPassword : cPassword
            })

            const  registered = await registerEmployee.save();
           
            res.status(201).render("login");

        }else{
            res.send(" password!! not are matching");
           
        }
    } catch (error){
        res.status(400).send(error);
    }
});


app.post("/login", async (req, res) => {
   try{
    const email = req.body.email;
    const password = req.body.password;
   
   const useremail = await Register.findOne({Email:email});
   const isMatch = await bcrypt.compare(password, useremail.Password);
   
   
 if(isMatch){
   
    res.status(201).render("index1");

}else{
    res.send("Invalid Login Details");
}
   } catch(error){
    res.status(400).send("invalid!!!!!");
       
   }
});

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})
