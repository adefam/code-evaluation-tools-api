const { User } = require('../../../server/models');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

 
exports.changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ status: 'fail', errors: errors.array() });
  }
    try { 
      //get user
      const user = req.user

    // check if current password is correct
      if (!(await bcryptjs.compare(req.body.oldPassword, user.password))) { 
        return res.status(400).json({
          success: 'fail', 
          message: 'password incorrect',
        });
      }
       
    //if password is correct, allow change password
    user.password = req.body.newPassword;
    await  user.save(); 
     return res.status(200).json({
        status: 'success',
        message: 'password changed successfully',
      });
  
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'An error occurred trying to process your request',
          });
        
    } 
};
