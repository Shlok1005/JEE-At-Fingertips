require('dotenv').config();
const express = require("express");
const path= require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
require("./db/conn");
//const Qs= require("./questionjs/qs");
const Register=require("./models/registers");
const hbs=require("hbs");
const app = express();
const port = process.env.PORT || 8000;

//setting the path
const staticpath=path.join(__dirname, "../public");
const templatepath=path.join(__dirname, "../templates/views");
const partialpath=path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
//middleware
//app.use(express.static(staticpath))
app.use('/css',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname, "../node_modules/jquey/dist")));
app.use(express.static(staticpath))
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);


console.log(process.env.SECRET_KEY);


app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/register",(req,res)=>{
    res.render("register");
})

app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/physics",auth,(req,res)=>{
    res.render("physics");
})
app.get("/chemistry",auth,(req,res)=>{
    res.render("chemistry");
})
app.get("/maths",auth,(req,res)=>{
    res.render("maths");
})
app.get("/rect",(req,res)=>{
    res.render("rect");
})
app.get("/in",(req,res)=>{
    res.render("in");
})
app.get("/quest",(req,res)=>{
    
    res.render("quest");
})
app.get("/jeemain",auth,(req,res)=>{
    res.render("jeemain");
})
app.get("/jeeadvanced",auth,(req,res)=>{
    res.render("jeeadvanced");
})
app.get("/logout",auth,async(req,res)=>{
    try {

        req.user.tokens = req.user.tokens.filter((currElement)=>{
            return currElement.token !== req.token
        })
        res.clearCookie("jwt");
        console.log("logout successfully")
        await req.user.save();
        res.render("login");
        
    } catch (error) {
        res.status(500).send(error);
        
    }
})

console.log("error v");
app.post("/register",async(req,res)=>{
    try{
        console.log("error u");
        const Password = req.body.password;
        console.log("big error");
        const Cpassword= req.body.confirmpassword;
        console.log("error1");
        if(Password===Cpassword){
            console.log("error4");
            const registerStudent=new Register({
                
                
                name : req.body.name,
                email : req.body.email,
                password :req.body.password,
                confirmpassword :req.body.confirmpassword,
                


            })

            console.log("the succsess part"+registerStudent);

            const token = await registerStudent.generateAuthToken();
            console.log("the token part"+token);

            res.cookie("jwt",token, {
                expires:new Date(Date.now()+ 30000),
                httpOnly:true
            });
          //  console.log(cookie);

            const registered = await registerStudent.save();
            console.log("saving in database");
            res.status(201).render("index");
            console.log("send succesfull");




        }else{
            res.send("password are not matching")
        }
        } catch (error){
            res.status(400).send(error);
            console.log("error detected");
        }
    })
 app.post("/login",async(req,res)=>{
     try {
         const email = req.body.email;
         const password = req.body.password;
       //  console.log(`${email}and password is ${password}`)
         const useremail = await Register.findOne({email:email});

         const isMatch =await bcrypt.compare(password,useremail.password);
        // res.send(useremail);
        // console.log(useremail);
          const token = await useremail.generateAuthToken();
          console.log("the token part" + token);
          res.cookie("jwt",token, {
            expires:new Date(Date.now()+ 50000),
            httpOnly:true
        });
      console.log(`this is cookie awsome ${req.cookies.jwt}`);
        if(isMatch){
        res.status(201).render("index");
        }else{
            res.send("password not matching");
        }

     } catch (error) {
         res.status(400).send("invalid Email")
     }

 })


app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})