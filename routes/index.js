const router = require("express").Router();

const { HttpNotFound } = require("../utils/err/httpnotfound");

const chat = require("./chat");

const auth = require("../middlewares/auth");

const {
  validateNewUserInfo,
  validateUserLogin,
} = require("../middlewares/joivalidation");

const { createUser, login, getUser } = require("../controllers/user");

router.post("/signup", validateNewUserInfo, createUser);

router.post("/signin", validateUserLogin, login);

router.get("/users/me", auth, getUser);

router.use("/", chat);

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
