// client/src/components/LiveClasses.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function LiveClasses() {
  const [meetings, setMeetings] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    topic: '',
    start_time: '',
    duration: 60,
    agenda: ''
  });

  const createMeeting = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/create-meeting', newMeeting);
      alert(`Meeting created! Join URL: ${response.data.meeting_url}`);
      setShowCreateForm(false);
      loadMeetings();
    } catch (error) {
      alert('Failed to create meeting');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>🎥 Live Classes</h2>
        <button onClick={() => setShowCreateForm(true)} style={styles.createBtn}>+ Schedule Class</button>
      </div>

      {showCreateForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Schedule Live Class</h3>
            <input
              placeholder="Class Topic"
              value={newMeeting.topic}
              onChange={(e) => setNewMeeting({...newMeeting, topic: e.target.value})}
              style={styles.input}
            />
            <input
              type="datetime-local"
              value={newMeeting.start_time}
              onChange={(e) => setNewMeeting({...newMeeting, start_time: e.target.value})}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={newMeeting.duration}
              onChange={(e) => setNewMeeting({...newMeeting, duration: parseInt(e.target.value)})}
              style={styles.input}
            />
            <textarea
              placeholder="Agenda / Description"
              value={newMeeting.agenda}
              onChange={(e) => setNewMeeting({...newMeeting, agenda: e.target.value})}
              style={styles.textarea}
            />
            <div style={styles.modalActions}>
              <button onClick={() => setShowCreateForm(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={createMeeting} style={styles.submitBtn}>Create Class</button>
            </div>
          </div>
        </div>
      )}

      <div style={styles.meetingsList}>
        <div style={styles.meetingCard}>
          <div style={styles.meetingIcon}>🎯</div>
          <div>
            <h3>Weekly Group Workout</h3>
            <p>Every Monday, 7:00 PM IST</p>
            <a href="#" style={styles.joinBtn}>Join Meeting →</a>
          </div>
        </div>
        <div style={styles.meetingCard}>
          <div style={styles.meetingIcon}>💪</div>
          <div>
            <h3>Q&A Session with Coach</h3>
            <p>Every Friday, 8:00 PM IST</p>
            <a href="#" style={styles.joinBtn}>Join Meeting →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '24px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  createBtn: { background: '#f59e0b', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' },
  meetingsList: { display: 'grid', gap: '16px' },
  meetingCard: { display: 'flex', gap: '16px', padding: '20px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' },
  meetingIcon: { fontSize: '32px' },
  joinBtn: { display: 'inline-block', marginTop: '8px', color: '#f59e0b', textDecoration: 'none' },
  modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { background: 'white', padding: '24px', borderRadius: '16px', width: '90%', maxWidth: '500px' },
  input: { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' },
  textarea: { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', minHeight: '80px' },
  modalActions: { display: 'flex', gap: '12px', justifyContent: 'flex-end' },
  cancelBtn: { padding: '8px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer' },
  submitBtn: { padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#f59e0b', color: 'white', cursor: 'pointer' }
};

export default LiveClasses;