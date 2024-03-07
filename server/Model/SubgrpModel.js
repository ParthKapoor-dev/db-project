const mongoose=require("mongoose");

let subgroup=new mongoose.Schema(
    {
        name:String,
        teacher:String,
        students:Array
    },
    {
        versionKey:false
    }
)

const subgroupModel=mongoose.model("subgroupCollection",subgroup);

module.exports={subgroupModel} 