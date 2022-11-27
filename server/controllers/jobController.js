const db = require('../models')
const jobController = {};
//TODO: Check if job middleware works and create jobs router
jobController.getJobsList = async (req, res, next) => {
  const userID = req.params.id;
  const getJobs = `SELECT j.user_id, j.job_role, j.company_name, 
    j.phone, j.email, j.contact_name, j.job_link, j.status 
    FROM jobs j
    WHERE j.user_id = $1`
    const values = [userID];
    // console.log(userID)
  try {
    console.log('inside try')
    const jobsList = await db.query(getJobs, values)
    console.log(jobsList)
    // if(jobsList.rows[0] === undefined) {
    //   return next({
    //     log: 'jobController.getJobsList',
    //     message: { err: 'ERROR: no jobs found in getJobsList' }
    //   })
    // }
    res.locals.jobs = jobsList.rows;
    return next();
  } catch (error) {
    return next({
      log: 'jobTrackerController.getJobsList error',
      message: { err: 'ERROR in jobTrackerController.getJobsList' }
    })
  }
}


jobController.createJob = (req, res, next) => {
  const {job_role, company_name, phone, email, contact_name, job_link, status, user_id} = req.body;
  const newJob = `INSERT INTO jobs (job_role, company_name, phone, email, contact_name, job_link, status, user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
  const values = [job_role, company_name, phone, email, contact_name, job_link, status, user_id];

  db.query(newJob, values)
  .then(data => {
    // console.log(data.rows[0])
    if (data.rows[0] === undefined) {
      return next({
        log: 'createJob',
        message: { err: 'ERROR: Enter job application' }
      })
    }
    res.locals.application = data.rows[0]
    console.log(res.locals.application);
    return next();
  }).catch(() => {next({
    log: 'userController.createJob',
    message: { err: 'error inside create job controller' }
  });
});
  
}

jobController.deleteJob = async (req, res, next) => {
  console.log('inside deleted controller')
  const {id} = req.params;
  const deleteJob = `DELETE FROM jobs WHERE job_id = $1 RETURNING *`;
  const values = [id];

  try {
    const deleted = await db.query(deleteJob, values);
    console.log(deleted)
    res.locals.application = deleted.rows[0];
    return next()
  }catch {
    return next({
      log: 'jobTrackerController.deleteJob error',
      message: { err: 'ERROR in jobTrackerController.deleteJob controller' }
    })
  }

}

jobController.updateJob = async (req, res, next) => {
  console.log('inside update controller')
  const {id} = req.params;
  const {newStatus} = req.body;
  const updateJob = `UPDATE jobs SET status = $1 WHERE job_id = $2 RETURNING *`;
  const values = [newStatus, id];

  try {
    const updated = await db.query(updateJob, values);
    console.log(updated)
    res.locals.application = updated.rows[0];
    return next()
  }catch {
    return next({
      log: 'jobTrackerController.updateJob error',
      message: { err: 'ERROR in jobTrackerController.updateJob controller' }
    })
  }

}




module.exports = jobController