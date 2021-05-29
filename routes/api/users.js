const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../keys");
const passport = require("passport");

// load user models
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ msg: "users works" }));

router.post("/register", (req, res) => {
  const {
    body: { name, email, password },
  } = req;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg",
        d: "mm",
      });

      const newUser = new User({
        name,
        email,
        avatar,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// todo user login form

router.post("/login", (req, res) => {
  const {
    body: { email, password },
  } = req;
  email,
    password,
    //   find user
    User.findOne({ email }).then((user) => {
      // check user
      if (!user) {
        return res.status(404).json({ email: "user not found " });
      }
      // check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          //   res.json({ msg: "sucess" });
          // user mateched
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer" + token,
              });
            }
          );
        } else {
          return res.status(400).json({ password: "password incorrect " });
        }
      });
    });
});

// current user display
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "sucess" });
  }
);

module.exports = router;
