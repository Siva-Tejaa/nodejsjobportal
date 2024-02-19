const {
  customErrorResponse,
  customSuccessResponse,
} = require("../config/globalResponse");

const jobsModel = require("../models/jobsModel");

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

//GET JOBS Controller
module.exports.getAllJobsController = async (req, res) => {
  try {
    const jobs = await jobsModel.find();

    //customSuccessResponse
    customSuccessResponse.data = jobs;
    customSuccessResponse.totalJobs = jobs.length;
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

//UPDATE JOB Controller
module.exports.updateJobController = async (req, res) => {
  try {
    const { id } = req.params;

    //find Job by Id
    const job = await jobsModel.findOne({ _id: 78 });

    if (!job) {
      //customErrorResponse
      customErrorResponse.message = `No Jobs Found with this Id ${id}`;
      customErrorResponse.status = 404;
      customErrorResponse.statusText = "NotFound";

      return res.status(500).send(customErrorResponse);
    }

    //customSuccessResponse
    customSuccessResponse.data = req.params;
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
