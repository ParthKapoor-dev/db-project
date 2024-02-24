const mongoose=require("mongoose");

function getCourseModel()
{
    let Course=new mongoose.Schema(
        {
            name:String,
            instructor:Object,
            subject:String,
            price:Number,
            starttime:Date,
            endtime:Date,
            topics:Array
        },
        {
            versionKey:false
        }
    )
    const CourseModel=mongoose.model("CourseCollection",Course);
    return CourseModel;
}

module.exports={getCourseModel};