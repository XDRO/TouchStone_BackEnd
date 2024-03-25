const router = require("express").Router();

const { HttpNotFound } = require("../utils/err/HttpNotFound");

const auth = require("../middlewares/auth");

// come back to later
// add to respective routes
// const {
//   validateUserInfoBody,
//   validateUserLogin,
// } = require("../middlewares/joivalidation");

const { createUser, login, getUser } = require("../controllers/user");

router.post("/signin", login);

router.post("/signup", createUser);

router.get("/users/me", auth, getUser);

// chat items routers

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
