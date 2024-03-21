const {
  customErrorResponse,
  customSuccessResponse,
} = require("../config/globalResponse");

const jobsModel = require("../models/jobsModel");

const mongoose = require("mongoose");

module.exports.createJobController = async (req, res) => {
  try {
    const { company, position } = req.body;

    const job = await jobsModel.create(req.body);

    //customSuccessResponse
    customSuccessResponse.data = job;
    customSuccessResponse.message = "Your Job has been successfully created";
    customSuccessResponse.status = 201;
    customSuccessResponse.statusText = "Created";

    return res.status(201).send(customSuccessResponse);
  } catch (error) {
    //customErrorResponse
    customErrorResponse.error = error;
    customErrorResponse.message = "Something Went Wrong";
    customErrorResponse.status = 500;
    customErrorResponse.statusText = "Internal Server Error";

    return res.status(500).send(customErrorResponse);
  }
};

//GET ALL JOBS Controller
module.exports.getAllJobsController = async (req, res) => {
  try {
    // const jobs = await jobsModel.find({ createdBy: req.user.userId });

    const { status, workType, search, sort } = req.query;
    //Conditions for searching
    const queryObject = {
      // createdBy: req.user.userId,
    };

    //Filters Logic
    if (status && status !== "all") {
      queryObject.status = status;
    }

    if (workType && workType !== "all") {
      queryObject.workType = workType;
    }

    if (search) {
      queryObject.position = { $regex: search, $options: "i" };
    }

    let queryResult = jobsModel.find(queryObject);

    //Sorting
    if (sort === "latest") {
      queryResult = queryResult.sort("-createdAt");
    }

    if (sort === "oldest") {
      queryResult = queryResult.sort("createdAt");
    }

    if (sort === "a-z") {
      queryResult = queryResult.sort("position");
    }

    if (sort === "z-a") {
      queryResult = queryResult.sort("-position");
    }

    //Pagination

    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    // queryResult = queryResult.skip(skip).limit(limit);

    //Jobs Count
    const totalJobs = await jobsModel.countDocuments(queryResult);
    // const numOfPage = Math.ceil(totalJobs / limit);

    const job = await queryResult;

    //customSuccessResponse
    customSuccessResponse.data = { totalJobs, job };
    customSuccessResponse.totalJobs = job.length;
    customSuccessResponse.message = "All Jobs fetched Successfully";
    customSuccessResponse.status = 200;
    customSuccessResponse.statusText = "OK";

    return res.status(201).send(customSuccessResponse);
  } catch (error) {
    //customErrorResponse
    customErrorResponse.error = error;
    customErrorResponse.message = "Something Went Wrong";
    customErrorResponse.status = 500;
    customErrorResponse.statusText = "Internal Server Error";

    return res.status(500).send(customErrorResponse);
  }
};

//GET USER JOBS Controller
module.exports.getUserJobsController = async (req, res) => {
  try {
    const queryObject = {
      createdBy: req.user.userId,
    };

    let queryResult = jobsModel.find(queryObject);

    const totalJobs = await jobsModel.countDocuments(queryResult);
    // const numOfPage = Math.ceil(totalJobs / limit);

    const job = await queryResult;

    //customSuccessResponse
    customSuccessResponse.data = { totalJobs, job };
    customSuccessResponse.totalJobs = job.length;
    customSuccessResponse.message = "User Jobs fetched Successfully";
    customSuccessResponse.status = 200;
    customSuccessResponse.statusText = "OK";

    return res.status(201).send(customSuccessResponse);
  } catch (error) {
    //customErrorResponse
    customErrorResponse.error = error;
    customErrorResponse.message = "Something Went Wrong";
    customErrorResponse.status = 500;
    customErrorResponse.statusText = "Internal Server Error";

    return res.status(500).send(customErrorResponse);
  }
  console.log(req.user.userId);
  res.send("Success");
};

//UPDATE JOB Controller
module.exports.updateJobController = async (req, res) => {
  try {
    const { id } = req.params;

    //find Job by Id
    const job = await jobsModel.findOne({ _id: id });

    if (!job) {
      //customErrorResponse
      customErrorResponse.message = `No Jobs Found with this Id ${id}`;
      customErrorResponse.status = 404;
      customErrorResponse.statusText = "NotFound";

      return res.status(500).send(customErrorResponse);
    }

    if (!(req.user.userId === job.createdBy.toString())) {
      //customErrorResponse
      customErrorResponse.message = `You are not authorized to modify this job`;
      customErrorResponse.status = 400;
      customErrorResponse.statusText = "Bad Request";

      return res.status(500).send(customErrorResponse);
    }

    //Changing and Saving Data

    const updatedJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    //customSuccessResponse
    customSuccessResponse.data = updatedJob;
    customSuccessResponse.message = "Job is updated";
    customSuccessResponse.status = 200;
    customSuccessResponse.statusText = "OK";

    return res.status(201).send(customSuccessResponse);
  } catch (error) {
    //customErrorResponse
    customErrorResponse.error = error;
    customErrorResponse.message = "Something Went Wrong";
    customErrorResponse.status = 500;
    customErrorResponse.statusText = "Internal Server Error";

    return res.status(500).send(customErrorResponse);
  }
};

//---------- DELETE JOB Controller ----------

module.exports.deleteJobController = async (req, res) => {
  try {
    const { id } = req.params;

    //find Job by Id
    const job = await jobsModel.findOne({ _id: id });

    if (!job) {
      //customErrorResponse
      customErrorResponse.message = `No Job Found with this Id ${id}`;
      customErrorResponse.status = 404;
      customErrorResponse.statusText = "NotFound";

      return res.status(500).send(customErrorResponse);
    }

    if (!(req.user.userId === job.createdBy.toString())) {
      //customErrorResponse
      customErrorResponse.message = `You are not authorized to delete this job`;
      customErrorResponse.status = 400;
      customErrorResponse.statusText = "Bad Request";

      return res.status(500).send(customErrorResponse);
    }

    await job.deleteOne();

    //customSuccessResponse
    customSuccessResponse.data = job;
    customSuccessResponse.message = "Job Deleted Successfully";
    customSuccessResponse.status = 200;
    customSuccessResponse.statusText = "OK";

    return res.status(201).send(customSuccessResponse);
  } catch (error) {
    //customErrorResponse
    customErrorResponse.error = error;
    customErrorResponse.message =
      "Something went wrong...Error deleting the Job";
    customErrorResponse.status = 500;
    customErrorResponse.statusText = "Internal Server Error";

    return res.status(500).send(customErrorResponse);
  }
};

//JOB STATS AND FILTER Controller
module.exports.jobStatsController = async (req, res) => {
  try {
    const stats = await jobsModel.aggregate([
      //Search by user job
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const responseData = {
      Interview: stats[0].count || 0,
      Pending: stats[1].count || 0,
      Reject: stats[2].count || 0,
    };

    //Monthly Year Status
    let monthlyApplication = await jobsModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    //customSuccessResponse
    customSuccessResponse.data = { responseData, monthlyApplication };
    customSuccessResponse.message = "Filtered Job Data";
    customSuccessResponse.totalJobs = stats.length;
    customSuccessResponse.status = 200;
    customSuccessResponse.statusText = "OK";

    return res.status(201).send(customSuccessResponse);
  } catch (error) {
    //customErrorResponse
    customErrorResponse.error = error;
    customErrorResponse.message = "Something Went Wrong";
    customErrorResponse.status = 500;
    customErrorResponse.statusText = "Internal Server Error";

    return res.status(500).send(customErrorResponse);
  }
};
