const mongoose=require("mongoose");

let teacher=new mongoose.Schema(
    {
        name:String,
        subject:String,
        email:String,
        subgroup:Array
    },
    {
        versionKey:false
    }
)

const teacherModel=mongoose.model("teacherCollection",teacher);

module.exports= {teacherModel}