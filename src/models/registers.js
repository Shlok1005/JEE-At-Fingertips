const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema= new mongoose.Schema({
    name :{
        type :String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true

    },
    tokens:[{
        token:{
            type:String,
        required:true

        }

    }]
})

studentSchema.methods.generateAuthToken = async function(){

    try{
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        //console.log(token);
        return token;

    }
    catch(error){
        res.send("the error part"+error);
        console.log("the error part"+error);
    }
}

studentSchema.pre("save",async function(next){

    if(this.isModified("password")){
    //const passwordHash = await bcrypt.hash(password,10);
    //console.log(`the current password is ${this.password}`);
    this.password =await bcrypt.hash(this.password,10);
    this.confirmpassword =await bcrypt.hash(this.password,10);
    //console.log(`the current password is ${this.password}`);

    //this.confirmpassword = undefined;
    }
    next();
})
//create collection
const Register =  mongoose.model("Registration",studentSchema);
module.exports = Register;