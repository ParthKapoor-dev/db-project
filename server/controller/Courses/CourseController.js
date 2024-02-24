const { getCourseModel } = require("../../Model/CourseModel");
const UserModel = require("../../Model/UserModel");
const Course = getCourseModel();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dyzhzkwwn',
    api_key: '817382288137877',
    api_secret: 'ZXA8DlBRcM_8eLSlaYvcfEGBiQU'
});

async function AddCourse(req, resp) {
    console.log(req.body);
    const { user, details } = req.body;
    const { name, instructor, subject, price, starttime, endtime, topics } = details;
    try {
        if (!user.isStudent) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'video',
                folder: 'videos'
            });
            console.log("file uploaded successfully", result.url);

            const course = await Course.create({ name: name, instructor: instructor, subject: subject, price: price, starttime: starttime, endtime: endtime, topics: topics });
            resp.json(course);
        }
        else {
            throw Error("Student cannot add courses");
        }
    }
    catch (err) {
        console.log(err);
    }

}

async function ListCourses(req, resp) {
    try {
        const courses = await Course.find();
        resp.json(courses);
    }
    catch (err) {
        console.log(err);
    }
}


async function DisplayCourse(req, resp) {
    try {
        const _id = req.query.id;
        const coursedetails = await Course.findOne({ _id });
        if (coursedetails != null)
            resp.json(coursedetails);
        else throw Error("Course not available");
    }
    catch (err) {
        console.log(err);
    }

}


async function getUserCourses(req, res) {
    const _id = req.user._id;

    try {
        const courses = await Course.find({ 'instructor.id': _id.toString() });
        res.json(courses)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

module.exports = { ListCourses, AddCourse, DisplayCourse, getUserCourses };