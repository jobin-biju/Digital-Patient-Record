// const bcrypt = require('bcrypt');
// // const loginModel = require('../model/form.loginModel');
// const loginModel = require('../model/form.loginModel')

// exports.userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await loginModel.findOne({ email });

//     if (!user) {
//       console.log("User not found");
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       console.log("Invalid password");
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     if (user.userType === 0 || user.userType === 1 || user.userType === 2 || user.userType === 3) {
//       // Use proper session handling (corrected typo from sesssion to session)
//       req.session.user = user;
//       return res.status(200).json(user);
//     } else {
//       console.log("Invalid user type");
//       return res.status(403).json({ message: "Invalid user" });
//     }

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



const bcrypt = require('bcrypt');
// const loginModel = require('../model/form.loginModel');
const loginModel = require('../model/form.loginModel')

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginModel.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.userType === 0 || user.userType === 1 || user.userType === 2 || user.userType === 3 || user.userType === 4 || user.userType === 5) {
      // Use proper session handling (corrected typo from sesssion to session)
      req.session.user = user;
      return res.status(200).json(user);
    } else {
      console.log("Invalid user type");
      return res.status(403).json({ message: "Invalid user" });
    }

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};