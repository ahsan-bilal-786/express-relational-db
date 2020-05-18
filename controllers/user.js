var { User } = require("../models");

const createUser = (req, res, next) => {
  return User.create(req.body)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Session.",
      });
    });
};

module.exports = {
  createUser,
};
