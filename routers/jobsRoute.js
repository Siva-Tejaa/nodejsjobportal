const {
  createJobController,
  getAllJobsController,
  updateJobController,
  deleteJobController,
  jobStatsController,
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

//GET ALL JOBS || GET
router.get("/all-jobs", userAuthentication, getAllJobsController);

//UPDATE JOB || PUT || PATCH
router.put(
  "/update-job/:id",
  userAuthentication,
  createJobMiddleware,
  updateJobController
);

//DELETE JOB || DELETE
router.delete("/delete-job/:id", userAuthentication, deleteJobController);

//JOB STATS FILTER || DELETE
router.get("/job-stats", userAuthentication, jobStatsController);

module.exports = router;
