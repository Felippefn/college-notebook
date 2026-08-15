import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { FaPencilAlt } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { GrAdd } from "react-icons/gr";

function TopicNotesPageNote() {
  const { topicId } = useParams(); // Destructure topicId from the useParams object
  const [notes, setNotes] = useState([]);
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAddTopic, setShowAddTopic] = useState(false); // Track form visibility
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch notes for the Topic using the actual topicId
  useEffect(() => {
    axios.get(`http://localhost:5000/api/topics/${topicId}/notes/`)
      .then(res => {
        setTopic(res.data.name);
        setNotes(res.data.notes); // Set notes after fetching
      })
      .catch(err => console.error(err));
  }, [topicId]);

  // Function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddTopic = () => {
    setShowAddTopic(true); // Show the form
  };

  const handleCancelAddTopic = () => {
    setShowAddTopic(false); // Hide the form
  };

  const handleConfirmAddTopic = () => {
    axios.post(`http://localhost:5000/api/add/topics/${topicId}/notes`, { title, content })
      .then(res => {
        setNotes(prevNotes => [...prevNotes, res.data]); // Update notes list
        setTitle(''); // Clear title
        setContent(''); // Clear content
        setShowAddTopic(false); // Hide the form after adding
      })
      .catch(err => console.error(err));
  };

  const DeleteTopicAndRefresh = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/topics/${topicId}/notes/del`);

      if (response.status === 204) {
        navigate('/manage-notes'); // Navigate to manage-notes instead of going back
        window.location.reload(); // Refresh the page after navigating back
      }
    } catch (err) {
      console.error("Error deleting topic:", err);
    }
  };

  return (
    <div className='page'>
      < GrLinkPrevious onClick={() => navigate(-1)} className="back-button" />
      <div className="page-header">
        <h1>{topic}</h1>
        <Button onClick={() => {
          if (window.confirm('Delete this item?')) {
            DeleteTopicAndRefresh();
          }
        }} className='btn-danger icon-btn'>
          <FaRegTrashAlt style={{ fontSize: "18px" }} />
        </Button>
        <Button onClick={handleAddTopic} className='btn-primary icon-btn'><GrAdd fontSize={"18px"} /></Button>
      </div>

      {/* Form to add a new note */}
      {showAddTopic && (
        <div className="card-surface" style={{ padding: "20px", maxWidth: "480px", margin: "0 0 24px" }}>
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <textarea
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", resize: "vertical", minHeight: "100px" }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="primary" onClick={handleConfirmAddTopic}>
              Add Note
            </Button>
            <Button variant="secondary" onClick={handleCancelAddTopic}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {
        notes.length > 0 ? (
          notes.map(note => (
            <div className="note-card" key={note._id}>
              <a href={`notes/${note._id}`}>
                <FaPencilAlt />
                <span className="note-title">{note.title}</span>
              </a>
              <p className="note-date">
                Last updated: {formatDate(note.updatedAt)}
              </p>
            </div>
          ))
        ) : (
          <p className="empty-state">No notes available.</p>
        )
      }
    </div >
  );
}

export default TopicNotesPageNote;
