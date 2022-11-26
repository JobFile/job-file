const db = require('../models')
const jobController = {}

jobController.getJobsList = async (req, res, next) => {
  const getJobsList = `SELECT j.job_posting, j.company_name, j.email, 
    j.phone_number, j.contact, s.description
    FROM jobs j 
    INNER JOIN status s ON j.fk_status = s.status_pk`
  // console.log('this is inside getJobsList');
  
  try {
    const jobsList = await db.query(getJobsList)
    // res.locals.jobs = data.rows;
    res.locals.jobs = jobsList.rows

    // console.log('this is res.locals.jobs ', res.locals.jobs);
    return next()
  } catch (error) {
    return next({
      log: 'jobTrackerController.getJobsList error',
      message: { err: 'ERROR in jobTrackerController.getJobsList' }
    })
  }
}

module.exports = jobController
const db = require('../models')
const jobController = {}

jobController.getJobsList = async (req, res, next) => {
  const userID = req.params.id
  const getJobsList = `SELECT j.user_id, j.job_role, j.company_name, 
    j.phone, j.email, j.contact_name, j.job_list j.status, 
    FROM jobs j
    WHERE user_id = $1`
    const values = [userID]
  // console.log('this is inside getJobsList');
  
  try {
    const jobsList = await db.query(getJobsList, values)
    // res.locals.jobs = data.rows;
    res.locals.jobs = jobsList.rows

    // console.log('this is res.locals.jobs ', res.locals.jobs);
    return next()
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
  values = [job_role, company_name, phone, email, contact_name, job_link, status, user_id];

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
    console.log(res.locals.application)
    return next()
  }).catch(() => {next({
    log: 'userController.createJob',
    message: { err: 'error inside create job controller' }
  });
});
  
}

module.exports = jobController