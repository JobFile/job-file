const initState = {
  // jobRole: '',
  // companyName: '',
  // phone: '',
  // email: '',
  // contactName: '',
  // link: '',
  // status: '';
  jobList: []
}


//Define Actions
const newApplicationReducer = (state = initState, action) => {
  switch (action.type) {
    //Change character name
    case NEW_APPLICATION:
      return {
        ...state,
        jobList: action.payload
      }
    default: 
      return state
  }
}

export default newApplicationReducer;