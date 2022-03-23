const mongoose=require('mongoose')

const collegeSchema= new mongoose.Schema({

        name : {
            type:String,
            unique:true,
            lowercase:true,
            required:true,
        },
        fullName :{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        logoLink: {
            type:String,
            required:true,
            unique:true,
            trim:true,
           match:[/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/]

        },
        isDeleted : {
            type:Boolean,
            default:false
        }
})

module.exports=mongoose.model("College(gropu-62)" ,collegeSchema)