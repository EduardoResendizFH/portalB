const { strict } = require('assert');

 const mongoose = require('mongoose'),
       Schema = mongoose.Schema,
       bcrypt = require('bcryptjs'); 
       
    const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true
        },
        email:{
            type: String,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        role:{
                type:String,
                required: true
            }
        
    },{
        timestamps: true,
        versionKey: false
    });

    userSchema.statics.encryptPassword = async (password) =>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };

    userSchema.statics.comparePassword = async (password, receivePassword) =>{
        return await bcrypt.compare(password, receivePassword);
    };
    
    module.exports = mongoose.model('User', userSchema);