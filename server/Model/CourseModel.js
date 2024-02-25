const mongoose=require("mongoose");

    let Course=new mongoose.Schema(
        {
            name:String,
            instructor:Object,
            subject:String,
            price:Number,
            starttime:Date,
            endtime:Date,
            topics:Array,
            coursevideo:Array
        },
        {
            versionKey:false
        }
    )
    const CourseModel=mongoose.model("CourseCollection",Course);

module.exports= CourseModel;