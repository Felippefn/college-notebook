import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ManageNotes() {
  const [topics, setTopics] = useState([]);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [topicName, setTopicName] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch subjects from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/topics')
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddTopic = () => {
    setShowAddTopic(true); // Show the form
  };

  const handleCancelAddTopic = () => {
    setShowAddTopic(false); // Hide the form
  };

  const handleConfirmAddTopic = () => {
    axios.post('http://localhost:5000/api/add/topics', { name: topicName })
      .then(res => {
        setTopics([...topics, res.data]); // Update the list with the new topic
        setTopicName(''); // Clear the input field after adding
      })
      .catch(err => console.error(err));
    setShowAddTopic(false); // Hide the form after adding
  };

  return (
    <div className='page'>
      <GrLinkPrevious onClick={() => navigate(-1)} className="back-button" />

      <div className="page-header">
        <h1>Your Topics</h1>
        <Button onClick={handleAddTopic} variant="primary">Add Topic</Button>
      </div>

      {topics.length > 0 ? topics.map(topic => (
        <div className="topic-card" key={topic._id}>
          <a href={`/topics/${topic._id}/notes`}>
            <FaEye /> {topic.name}
          </a>
          <span className="topic-count">{topic.notes.length}</span>
        </div>
      )) : (
        <p className="empty-state">No topics yet. Add one to get started.</p>
      )}

      {/* Add topic modal */}
      {showAddTopic && (
        <div className="modal-panel">
          <textarea
            id="insertComment"
            name="insertComment"
            placeholder="Enter topic name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          ></textarea>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
            <button onClick={handleConfirmAddTopic} className="icon-btn btn btn-secondary">
              <IoCheckmark style={{ color: 'var(--success)', fontSize: "24px" }} />
            </button>
            <button onClick={handleCancelAddTopic} className="icon-btn btn btn-secondary">
              <IoClose style={{ color: 'var(--danger)', fontSize: "24px" }} />
            </button>
          </div>
        </div>
      )}

      {showAddTopic && (
        <div className="modal-overlay" onClick={handleCancelAddTopic} />
      )}
    </div>
  );
}

export default ManageNotes;
