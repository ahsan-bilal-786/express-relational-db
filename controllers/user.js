const JWT = require("jsonwebtoken");
const { User } = require("../models");

const signToken = (sub) => {
  return JWT.sign(
    {
      iss: "express-relational-db",
      sub,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    process.env.AUTH_SECRET_KEY
  );
};

const createUser = async (req, res, next) => {
  let user = await User.findOne({ where: { email: req.body.email } });

  if (user !== null)
    return res
      .status(500)
      .send({ message: "A user has already registered with this email." });

  user = await User.create(req.body);

  if (!(user && user.id))
    return res.status(500).send({ message: "Unable to process the request." });

  const token = signToken(user.id);
  res.status(201).json({
    token,
    user,
  });
};

module.exports = {
  createUser,
};
