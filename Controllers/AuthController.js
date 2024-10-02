const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // Defining what are available in the request body
    const { email, phone, password, referCode } = req.body;
    console.log(req.body);  
    // Searching user in the Database
    const user = await UserModel.findOne({
      $or: [{ phone: phone }, { email: email }],
    });     
    // if user found shows "User already exists"
    if (user) {
      return res
        .status(400)
        .json({ message: "User's phone or email already exists", sucess: false });
    }

    //   Encrypting the password
    // const encryptedPassword = await bcrypt.hash(password, 10);

    // If not found creates a new user
    await UserModel.create({ email, phone, password, referCode });
    res.status(201).json({ message: "You have been successfully signed up. Now go to login page to log in.", sucess: true });
  } catch (err) {
    //   If error occurs shows "Internal server error"
    res
      .status(500)
      .json({ message: `Internal server error ${err}`, sucess: false });
  }
};

const login = async (req, res) => {
  try {
    // Defining what are available in the request body
    const { phone, password } = req.body; 
    console.log(req.body);
    // Searching user in the Database
    const user = await UserModel.findOne({ phone });
    // if user not found shows "User not found"
    if (!user) {
      return res.status(400).json({ message: "User not found", sucess: false });
    }
    // Comparing the password
    if (password === user.password) {
      const jwtToken = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({
          message: "User logged in",
          jwtToken,
          phone: user.phone,
          email: user.email,  
          sucess: true,
        });
    }
    // if password is wrong shows "Invalid credentials"
    res
      .status(400)
      .json({ message: `Invalid credentials`, sucess: false });
  } catch (err) {
    //   If error occurs shows "Internal server error"
    res
      .status(500)
      .json({ message: `Internal server error ${err}`, sucess: false });
  }
};

module.exports = { register, login };
