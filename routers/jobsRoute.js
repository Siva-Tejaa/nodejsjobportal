const {
  createJobController,
  getAllJobsController,
  updateJobController,
} = require("../controllers/jobsController");
const { createJobMiddleware } = require("../middlewares/createJobMiddleware");
const { userAuthentication } = require("../middlewares/userAuthMiddleware");

const router = require("express").Router();

//CREATE JOB ||POST
router.post(
  "/create-job",
  userAuthentication,
  createJobMiddleware,
  createJobController
);

//GET JOBS || GET
router.get("/all-jobs", getAllJobsController);

//UPDATE JOBS || PUT || PATCH
router.put(
  "/update-job/:id",
  userAuthentication,
  createJobMiddleware,
  updateJobController
);

module.exports = router;
