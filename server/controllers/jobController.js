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
