const express = require("express");
const router = express.Router();

const TaskController = require('../controllers/task');

router.post("/create", TaskController.task_create);

router.post("/list", TaskController.task_list);

module.exports = router;
