import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createApplicationCreator } from '../actions/actions'
import newApplicationReducer from '../reducers/newApplicationReducer'

const NewApplicationCreator = (props) => {
  // Get newApplication from newApplReducer
  const jobList = useSelector(state => state.jobs.jobList)
  // Use for all the dispatch actions

  const dispatch = useDispatch()

  const useInput = init => {
    const [value, setValue] = useState(init)
    const onChange = e => {
      setValue(e.target.value)
    }
    // return the value with the onChange function instead of setValue function
    return [value, onChange]
  }

  const [jobRole, jobRoleOnChange] = useInput('')
  const [companyName, companyNameOnChange] = useInput('')
  const [email, emailOnChange] = useInput('')
  const [phoneNumber, phoneNumberOnChange] = useInput('')
  const [contactName, contactNameOnChange] = useInput('')
  const [link, linkOnChange] = useInput('')
  const [status, statusOnChange] = useInput('')

  const createApp = () => {
    const myfunc = () => {
      const jobApp = {
        jobRole,
        companyName,
        email,
        phoneNumber,
        contactName,
        link,
        status
      }
      console.log('entering fetch', jobApp)
      fetch('/dashboard/', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(jobApp)
      })
        .then(response => {
          console.log('my response from posting  new jobApp ', response)
        })
        .catch(err => {
          console.log('An error occurred posting to database')
        })
    }
    return myfunc();
  }
  return (
    <div className="newApplication">Please enter job application desription below:
      <form>
        <input type="text" id="jobRole" name="jobRole" placeholder="Job Role" value={jobRole} onChange={jobRoleOnChange}/>
        <input type="text" id="companyName" name="companyName" placeholder="Company Name" value={companyName} onChange={companyNameOnChange}/>
        <input type="text" id="email" name="email" placeholder="jane.doe@google.com" value={email} onChange={emailOnChange}/>
        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="xxx-xxx-xxxx" value={phoneNumber} onChange={phoneNumberOnChange}/>
        <input type="text" id="contactName" name="contactName" placeholder="Contact Name" value={contactName} onChange={contactNameOnChange}/>
        <input type="text" id="link" name="link" placeholder="Job Posting URL" value={link} onChange={linkOnChange}/>
        <input type="text" id="status" name="status" placeholder="Current Status" value={status} onChange={statusOnChange}/>;
        <button id="createApp" type="submit" onClick={createApp}>Create Application</button>
      </form>
  </div>
  )
}
