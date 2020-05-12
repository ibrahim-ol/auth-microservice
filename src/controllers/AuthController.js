const User = require("./../database/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");

class AuthController {
  constructor() {
    console.log("Auth controller constructing");
  }

  async registration(req, res) {
    const { first_name, last_name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ status: false, message: "email already in use" });
    } else {
      try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ first_name, last_name, email, passwordHash });
        await user.save();
        return res
          .status(201)
          .json({ status: true, message: "User Registration successful" });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        const token = jwt.sign(
          {
            sub: user._id,
          },
          config.SECRET,
          config.JWT_OPTION
        );
        return res.json({
          status: true,
          message: "Login successful",
          data: {
            token,
            user: {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            },
          },
        });
      }
    }
    return res
      .status(400)
      .json({ status: false, message: "Invalid login credentials" });
  }

  sendResetEmail() {

  }

  resetPassword() {

  }

  async changePassword(req, res){
    const user = await User.findById(req.user)
    const passwordCheck = await bcrypt.compare(req.validated_value.old_password, user.password);
    if(passwordCheck){
      user.password = await bcrypt.hash(req.validated_value.new_password, 10)
      user.save()
      return res.json({status: true, message: 'Password Updated'})
    }else{
      return res.status(403).send({status: false, message: 'Incorrect password'})
    }
  }

  async getProfile(req, res) {
    const user = await User.findById(req.user);
    if (user) {
      return res.json({ status: true, message: "User retrieved", data: user });
    } else {
      return res.status(404).json({ status: false, message: "User not found" });
    }
  }
}

module.exports = AuthController;
