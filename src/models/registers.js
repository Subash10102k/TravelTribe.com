const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const employeeSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },


    Email:{
        type:String,
        required:true,
        unique:true
    },


    Password:{
        type:String,
        required:true
    },

    ConfirmPassword:{
        type:String,
        required:true
   
    },
    resetLink:{
        data:String,
        default:'' 
    },
})

employeeSchema.pre("save", async function(next){
    if(this.isModified("Password")){

        console.log(`the current Password is ${this.Password}`);
        this.Password = await bcrypt.hash(this.Password,10);
        console.log(`the current Password is ${this.Password}`);
        this.ConfirmPassword = undefined;
    }
    next();
})

const Register = new mongoose.model("Register" , employeeSchema);
module.exports = Register;