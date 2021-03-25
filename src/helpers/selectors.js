//refer to 'helpers/selectors for tests
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredAppt = state.days.filter((weekday) => weekday.name === day)[0];

  if (filteredAppt === undefined || state.days.length === 0) {
    return [];
  }
  const appt = filteredAppt.appointments;
  const mappedAppt = appt.map((apptNum) => state.appointments[apptNum]);

  return mappedAppt;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const obj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return obj;
}

export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredInterviewers = state.days.filter(
    (weekday) => weekday.name === day
  )[0];

  if (filteredInterviewers === undefined || state.days.length === 0) {
    return [];
  }
  const interviewer = filteredInterviewers.interviewers;

  const mappedInterviewer = interviewer.map(
    (interviewerNum) => state.interviewers[interviewerNum]
  );

  return mappedInterviewer;
}
