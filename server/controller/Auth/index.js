const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../../Model/UserModel");

function createToken(id) {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' })
}

async function SignUp(req, resp) {
  const { name, email, password, isStudent } = req.body;
  try {
    if (!email || !password)
      throw Error('All fields are required');
    if (!validator.isEmail(email))
      throw Error("Please enter a valid email");

    const userExists = await User.findOne({ email });
    if (userExists) throw Error("User already exists , try loging In");

    if (!validator.isStrongPassword(password))
      throw Error("Please enter a strong password");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name: name, email: email, password: hash, isStudent: isStudent });

    const token = createToken(user._id);

    const data = { user, token }

    resp.json(data);
  }
  catch (err) {
    console.log(err);
  }

}
async function Login(req, resp) {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      throw Error("All fields are required");

    const user = await User.findOne({ email })
    if (!user) throw Error("Incorrect Email for login");

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      throw Error("Incorrect Password");
    }

    const token = createToken(user._id);

    const data = { user, token }

    resp.json(data);
  }
  catch (err) {
    console.log(err);
  }
}
module.exports = {
  Login,
  SignUp
}


