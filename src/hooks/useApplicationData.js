import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appoinments: {},
    interviewers: {},
  });

  const availSpots = function (day, appointments) {
    let count = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++;
      }
    }
    return count;
  };

  const updatedSopts = (days, appointments) => {
    const newArr = days.map((day) => ({
      ...day,
      spots: availSpots(day, appointments),
    }));
    return newArr;
  };
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() =>
        setState({
          ...state,
          appointments,
          days: updatedSopts(state.days, appointments),
        })
      );
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() =>
        setState({
          ...state,
          appointments,
          days: updatedSopts(state.days, appointments),
        })
      );
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
