import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrLinkPrevious } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
import { Button } from 'react-bootstrap';

function Schedule() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [task, setTask] = useState(''); // State to hold task input
  const [time, setTime] = useState(''); // State to hold time input

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  useEffect(() => {
    fetch('http://localhost:5000/json/schedules')
      .then(response => response.json())
      .then(data => setSchedules(data))
      .catch(error => console.error('Error fetching schedules:', error));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object
  
    // Check if the date is valid
    if (isNaN(date)) {
      return 'Invalid Date'; // Return a fallback message if invalid
    }
  
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleAddSchedule = (day) => {
    const newSchedule = {
      day: day,
      task: task, // Get the task from state
      time: time, // Get the time from state
      createdAt: new Date()
    };

    // POST request to add the schedule
    fetch('http://localhost:5000/json/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSchedule),
    })
      .then(response => response.json())
      .then(data => {
        setSchedules([...schedules, data]); // Update state with the new schedule
        setTask(''); // Clear the input after submission
        setTime(''); // Clear the time input
      })
      .catch(error => console.error('Error adding schedule:', error));
  };

  return (
    <div className='page'>
      <GrLinkPrevious onClick={() => navigate(-1)} className="back-button" />
      <h1 className="schedule-header">{formatDate(currentDate)}</h1>

      <div className="schedule-toolbar">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="schedule-row">
        {daysOfWeek.map((days, index) => (
          <div className='col' id={days} key={index}>
            <div className='schedule-row-dayWeek'>{days}</div>

            <ul style={{ padding: 0, margin: '5px 0 0 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {schedules
                .filter(schedule => schedule.day === days)
                .map((schedule, scheduleIndex) => (
                  <div className='task' key={scheduleIndex}>
                  {schedule.task} - {schedule.time}
                  </div>
                ))}
            </ul>

            <Button className="icon-btn" style={{ alignSelf: 'center' }} onClick={() => handleAddSchedule(days)}>
              <GrAdd />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
