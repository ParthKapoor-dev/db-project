const subgroupModel = require("../../Model/SubgrpModel");
const UserModel = require("../../Model/UserModel");

async function AddSubgroup(req,resp)
{
    const {teacherid,grpname}=req.body;
    try
    {
    const newsubgrp=await subgroupModel.create({name:grpname,students:[]});

    const teacher=await UserModel.findOne({_id: teacherid});
    teacher.subgroups.push({
        grpname: grpname,
        subgrpID: newsubgrp._id
    })
    const Teacher=await teacher.save();
    resp.json(Teacher);
    }
    catch(err)
    {
        console.log(err);
        resp.json(err)
    }
}

async function AddStudent(req,resp)
{
    const {grpid,studentDetails}=req.body;
    try
    {
    const subgroup=await subgroupModel.findOne({_id:grpid});
    subgroup.students.push({
        studentDetails
    });
    const SubGrp=await subgroup.save();
    resp.json(SubGrp);
    }
    catch(err)
    {
        console.log(err);
        resp.json(err)
    }
}

module.exports={AddSubgroup,AddStudent}