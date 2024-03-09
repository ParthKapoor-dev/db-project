const subgroupModel = require("../../Model/SubgrpModel");
const UserModel = require("../../Model/UserModel");

async function AddSubgroup(req, resp) {
    const { subgroupName, teacherId } = req.body;
    try {

        if (!subgroupName)
            throw Error("Invalid SubGroup Name");

        const subgroup = await subgroupModel.create({
            name: subgroupName,
            students: [],
        });

        const teacher = await UserModel.findOne({ _id: teacherId });
        console.log(teacherId)
        console.log(teacher);
        teacher.subgroups = [...teacher.subgroups, {
            grpid: subgroup._id,
            grpname: subgroupName
        }];
        const Teacher = await teacher.save();
        resp.json(Teacher);
    }
    catch (err) {
        console.log(err);
        resp.status(404).json({
            error: err.message
        })
    }
}

async function AddStudent(req, resp) {
    const { subgroupId, studentDetails } = req.body;
    const { name, email, roll_no, os_marks, cp_marks, elec_marks } = studentDetails;
    console.log(studentDetails);
    console.log((subgroupId))
    try {
        if (!(name && email && roll_no))
            throw Error("All Fields are required");
        const subgroup = await subgroupModel.findOne({ _id: subgroupId });
        console.log(subgroup);
        subgroup.students.push(studentDetails);
        await subgroup.save();

        resp.json(subgroup);
    }
    catch (err) {
        console.log(err);
        resp.status(404).json({ message: err.message })
    }
}
async function FetchSubgrp(req, resp) {

    const { _id } = req.query;
    try {
        const grpdetails = await subgroupModel.findOne({ _id });

        resp.json(grpdetails);
    }
    catch (err) {
        console.log(err);
        resp.status(404).json(err);
    }
}

module.exports = { AddSubgroup, AddStudent, FetchSubgrp }