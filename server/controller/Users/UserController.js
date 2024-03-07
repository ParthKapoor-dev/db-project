const { subgroupModel } = require("../../Model/SubgrpModel");
const {teacherModel}=require("../../Model/TeacherModel");

async function AddSubgroup(req,resp)
{
    const {name,email,subject,subgroup}=req.body;
    try
    {
    const teacher=await teacherModel.create({name:name,email:email,subject:subject,subgroup:subgroup});
    resp.json(teacher);
    }
    catch(err)
    {
        console.log(err);
        resp.json(err)
    }
}

async function AddStudent(req,resp)
{
    const {name,teacher,students}=req.body;
    try
    {
    const subgroup=await subgroupModel.create({name:name,teacher:teacher,students:students});
    resp.json(subgroup);
    }
    catch(err)
    {
        console.log(err);
        resp.json(err)
    }
}

module.exports={AddSubgroup,AddStudent}