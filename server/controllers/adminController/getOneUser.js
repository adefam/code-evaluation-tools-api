const { User } = require('../../models');

exports.getOneUser = async(req, res) => {
    try {
      const uuid = req.params.id;
  
      const user = await User.findByPk(uuid);
  
      if(!user){
        return res.status(404).send({
          status: "fail",
          message: "user not found",
        })
      }

      return res.status(200).send({
        status: "success",
        message: "user data sucessfully fetched",
        data: {
          user,
        }
      })

  } catch (error) {
    return res.status(500).send({
      status: 'fail',
      message: 'error in fetching user data',
    });
  }
  };
