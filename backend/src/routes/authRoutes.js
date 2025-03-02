const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuthenticated } = require("../middleware/auth");


router.get("/check", ensureAuthenticated, (req, res) => res.json(req.user));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => res.redirect(process.env.CLIENT_URL)
);

router.get("/logout", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
    });
    return res.status(200).send('Logged Out Successfully!!!');
  } catch (err) {
    return res.status(500).send({ message: err });
  }
});

module.exports = router;
