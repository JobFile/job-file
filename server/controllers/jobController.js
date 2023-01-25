const { ContextExclusionPlugin } = require('webpack');
const db = require('../models');
const jobController = {};

jobController.getJobsList = async (req, res, next) => {
  const userID = req.params.id;
  const getJobs = `SELECT job_id, user_id, job_role, company_name, 
    phone, email, contact_name, job_link, status 
    FROM jobs 
    WHERE user_id = $1
    ORDER BY status ASC`;
  const values = [userID];

  try {
    const jobsList = await db.query(getJobs, values);
    res.locals.jobs = jobsList.rows;
    return next();
  } catch (error) {
    return next({
      log: 'jobTrackerController.getJobsList error',
      message: { err: 'ERROR in jobTrackerController.getJobsList' },
    });
  }
};

jobController.createJob = (req, res, next) => {
  const {
    job_role,
    company_name,
    phone,
    email,
    contact_name,
    job_link,
    status,
    user_id,
  } = req.body;
  const newJob = `INSERT INTO jobs (job_role, company_name, phone, email, contact_name, job_link, status, user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const values = [
    job_role,
    company_name,
    phone,
    email,
    contact_name,
    job_link,
    status,
    user_id,
  ];

  db.query(newJob, values)
    .then((data) => {
      if (data.rows[0] === undefined) {
        return next({
          log: 'createJob',
          message: { err: 'ERROR: Enter job application' },
        });
      }
      res.locals.createdJob = data.rows[0];
      return next();
    })
    .catch(() => {
      next({
        log: 'userController.createJob',
        message: { err: 'error inside create job controller' },
      });
    });
};

jobController.deleteJob = async (req, res, next) => {
  const { id } = req.params;
  const deleteJob = `DELETE FROM jobs WHERE job_id = $1 RETURNING *`;
  const values = [id];

  try {
    const deleted = await db.query(deleteJob, values);
    res.locals.deletedJob = deleted.rows[0];
    return next();
  } catch {
    return next({
      log: 'jobTrackerController.deleteJob error',
      message: { err: 'ERROR in jobTrackerController.deleteJob controller' },
    });
  }
};

// jobController.updateJob = async (req, res, next) => {
//   const { id } = req.params;
//   const { newStatus } = req.body;
//   console.log('new status is: ', newStatus);
//   const updateJob = `UPDATE jobs SET status = $1 WHERE job_id = $2 RETURNING *`;
//   const values = [newStatus, id];

//   try {
//     const updated = await db.query(updateJob, values);
//     res.locals.updatedJob = updated.rows[0];
//     console.log('response body: ', res.locals.updatedJob);
//     return next();
//   } catch {
//     return next({
//       log: 'jobTrackerController.updateJob error',
//       message: { err: 'ERROR in jobTrackerController.updateJob controller' },
//     });
//   }
// };

jobController.updateJobApp = async (req, res, next) => {
  console.log('WE ARE HERE');
  const { id } = req.params;
  console.log('request body', req.body);
  const {
    job_role,
    company_name,
    email,
    phone,
    contact_name,
    job_link,
    status,
  } = req.body;
  console.log(
    'updates inputs are: ',
    job_role,
    company_name,
    email,
    phone,
    contact_name,
    job_link,
    status
  );
  const updateJobApp = `UPDATE jobs SET job_role = $2, company_name = $3, email = $4, phone = $5, contact_name = $6, job_link = $7, status = $8 WHERE job_id = $1 RETURNING *;`;
  const values = [
    id,
    job_role,
    company_name,
    email,
    phone,
    contact_name,
    job_link,
    status,
  ];

  try {
    const updatedJobApp = await db.query(updateJobApp, values);
    // console.log('updateJobApp: ', updatedJobApp);
    console.log('updated App: ', updatedJobApp.rows[0]);
    res.locals.updatedJobApp = updatedJobApp.rows[0];
    console.log('response body: ', res.locals.updatedJobApp);
    return next();
  } catch {
    return next({
      log: 'jobTrackerController.updateJob error',
      message: { err: 'ERROR in jobTrackerController.updateJob controller' },
    });
  }
};

module.exports = jobController;
