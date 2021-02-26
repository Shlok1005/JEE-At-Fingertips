const mongoose = require("mongoose");

//creating a database
mongoose.connect("mongodb://localhost:27017/JEE1",{
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(`no connection`);
})