const mongoose = require('mongoose');
const userSchema  = new mongoose.Schema(
    {
        username  :{
            type:String,
            required:[true, "username is required"],
        },
        email:{
            type:String,
            require:[true, "email iis required"],
        },
        password:{
            type:String,
             required:[true,"password is required"],
        },      
    },
        {timestamps:true}
);
const userModel = mongoose.model('User',userSchema);
module.exports = userModel;