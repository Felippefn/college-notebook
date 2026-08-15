import React from 'react';
import { GrAdd } from "react-icons/gr";
import { GrSchedules } from "react-icons/gr";
import { GrCalendar } from "react-icons/gr";
import { GrList } from "react-icons/gr";

function Hello(){
  const a = "Hello World!"
  
  return a
}

function Home() {
  return (
    <div>
      <div className="page">
        <h1 className='title-page'>Welcome!</h1>
        <div className="d-flex justify-content-center mb-5 mt-3">
          <div className="alert welcome-banner text-center" role="alert">
            <strong>{Hello()}</strong> Welcome to the first version of Basis, enjoy!
          </div>
        </div>
        <div className="icons-home">
          <div className="row">
            <a href='/manage-notes' className="tagHome">
              <GrAdd fontSize={"64px"} />
              <p>Manage Notes</p>
            </a>
            <a href='/schedule' className="tagHome">
              <GrSchedules fontSize={"64px"} />
              <p>Check Schedule</p>
            </a>
            <a href='/todo-list' className="tagHome">
              <GrList fontSize={"64px"} />
              <p>To-Do List</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
