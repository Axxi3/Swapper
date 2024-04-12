import User from "../Data Models/Users.js"
import bcryptjs from "bcryptjs"

export const signup = async (req, res, next) => {
  const passregrex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{6,}$/
  console.log(req.body)
  const { Name, email, password } = req.body
  const hashPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ Name, email, password: hashPassword })

  try {
    if (Name === "" || email === "" || password === "") {
      res.status(500).json("All fields are required")
    } else if (!passregrex.test(password)) {
      res.status(500).json({ success: false, message: "Password should contain 6 letters including uppercase, lowercase, and one special character" })
    } else {
      const result = await User.find({ email })
      if (result.length) {
        res.status(500).json({ success: false, message: "Email Already Exists, Try to log in" })
      } else {
        const savedUser = await newUser.save()
        res.status(201).json({ message: "User Created Successfully", success: true, userId: savedUser._id })
      }
    }
  } catch (error) {
    next(error)
  }
}
