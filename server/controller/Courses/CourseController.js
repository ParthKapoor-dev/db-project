const {getCourseModel}=require("../../Model/CourseModel");
const Course=getCourseModel();

async function AddCourse(req,resp)
{
    const [user,details]=req.body;
    const {name,instructor,subject,price,starttime,endtime,topics}=details;
    try
    {
        if(!user.isStudent)
    {
        const course=await Course.create({ name: name, instructor: instructor, subject: subject, price: price, starttime: starttime, endtime: endtime, topics: topics});
        resp.json(course);
    }
    else {
        throw Error("Student cannot add courses");
    }
    }
catch(err)
{
    console.log(err);
}
    
}

async function ListCourses(req,resp)
{
    try
    {
        const courses=await Course.find();
        resp.json(courses);
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports={ListCourses,AddCourse};