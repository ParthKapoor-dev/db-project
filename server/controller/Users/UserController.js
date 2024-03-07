const { subgroupModel } = require("../../Model/SubgrpModel");
const UserModel = require("../../Model/UserModel");

async function AddSubgroup(req, resp) {
    const { subgroupName, teacherId } = req.body;
    try {
        const subgroup = await subgroupModel.create({
            name: subgroupName,
            students: [],
        });

        const teacher = await UserModel.findOne({ _id: teacherId });
        console.log(teacher);
        teacher.subgroups.push({
            grpid: subgroup._id,
            grpname: subgroupName
        });
        await teacher.save();
        resp.json(teacher);

    }
    catch (err) {
        console.log(err);
        resp.json(err)
    }
}

async function AddStudent(req, resp) {
    const { subgroupId, studentDetails } = req.body;
    try {
        const subgroup = await subgroupModel.findOne({ _id: subgroupId });
        subgroup.students.push(studentDetails);
        await subgroup.save();

        resp.json(subgroup);
    }
    catch (err) {
        console.log(err);
        resp.json(err)
    }
}

module.exports = { AddSubgroup, AddStudent }