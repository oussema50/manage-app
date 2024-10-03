const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// @desc     Create A User
// @route    POST /register
// @access   Public

exports.registerUser = asyncHandler(async(req,res,next)=>{
    const {firstName,lastName,email,age,password,role} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({firstName,lastName,email,age,password:hashedPassword,role});
    res.status(200).json({data:user});
})

// @desc     login A User
// @route    POST /login
// @access   Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(req.body)
      const user = await User.findOne({ where: { email:email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT payload
      const payload = { id: user.id, role: user.role };
  
      // Sign token
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ token });
    } catch (err) {
        console.log(err)
      res.status(500).json({ message:err });
    }
}

// @desc     login An Employee
// @route    GET /employee/:id
// @access   Private

exports.getUserById = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const user = await User.findByPk(id, {
        attributes: ['firstname', 'lastname', 'email','age','role'],  
      });
    res.status(200).json({data:user})
})
