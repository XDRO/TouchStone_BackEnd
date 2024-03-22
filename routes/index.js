const router = require("express").Router();

const { HttpNotFound } = require("../utils/err/HttpNotFound");

const { createUser, login } = require("../controllers/user");

router.post("/signin", login);

router.post("/signup", createUser);

router.use((req, res, next) => next(new HttpNotFound("Router not found")));

module.exports = router;
