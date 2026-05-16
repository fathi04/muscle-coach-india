// client/src/components/VideoUploader.jsx
import { useState } from 'react';
import axios from 'axios';

function VideoUploader({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoDetails, setVideoDetails] = useState({
    program: 'fatLoss',
    title: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      alert('Please select a valid video file (MP4, MOV, AVI, etc.)');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a video file');
      return;
    }

    if (!videoDetails.title) {
      alert('Please enter a video title');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('program', videoDetails.program);
    formData.append('title', videoDetails.title);

    try {
      const response = await axios.post('http://localhost:5000/api/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      if (response.data.success) {
        alert('✅ Video uploaded successfully!');
        setSelectedFile(null);
        setVideoDetails({ program: 'fatLoss', title: '' });
        setUploadProgress(0);
        if (onUploadSuccess) onUploadSuccess();
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const programsList = [
    { id: 'fatLoss', name: '🔥 Body Fat Loss Program' },
    { id: 'muscleGain', name: '💪 Muscle Gain Program' },
    { id: 'recomposition', name: '⚡ Body Recomposition' },
    { id: 'contestPrep', name: '🏆 Contest Prep' },
    { id: 'strength', name: '🏋️ Strength & Performance' },
    { id: 'beginner', name: '🌱 Beginner Transformation' },
    { id: 'homeWorkout', name: '🏠 Home Workout' },
    { id: 'women', name: '💃 Women\'s Transformation' },
    { id: 'shredding', name: '❄️ Advanced Shredding' },
    { id: 'lifestyle', name: '🥗 Lifestyle & Nutrition' }
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📹 Upload Program Video</h3>
      
      <div style={styles.formGroup}>
        <label>Select Program:</label>
        <select 
          value={videoDetails.program} 
          onChange={(e) => setVideoDetails({...videoDetails, program: e.target.value})}
          style={styles.select}
        >
          {programsList.map(program => (
            <option key={program.id} value={program.id}>{program.name}</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label>Video Title:</label>
        <input 
          type="text" 
          placeholder="e.g., Introduction to Fat Loss, Week 1 Workout, Nutrition Guide"
          value={videoDetails.title}
          onChange={(e) => setVideoDetails({...videoDetails, title: e.target.value})}
          style={styles.input}
        />
        <p style={styles.hint}>Example: "Week 1: Getting Started" or "Full Body Workout"</p>
      </div>

      <div style={styles.formGroup}>
        <label>Select Video File (MP4, MOV, AVI, WebM):</label>
        <input 
          type="file" 
          accept="video/mp4,video/mpeg,video/quicktime,video/x-msvideo,video/webm"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        {selectedFile && (
          <p style={styles.fileInfo}>📹 Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
        )}
      </div>

      {uploading && (
        <div style={styles.progressContainer}>
          <div style={{...styles.progressBar, width: `${uploadProgress}%`}}></div>
          <p style={styles.progressText}>Uploading: {uploadProgress}%</p>
        </div>
      )}

      <button 
        onClick={handleUpload} 
        disabled={uploading || !selectedFile}
        style={styles.uploadButton}
      >
        {uploading ? '⏳ Uploading...' : '📤 Upload Video'}
      </button>

      <div style={styles.infoBox}>
        <p>💡 <strong>Tips:</strong></p>
        <ul>
          <li>✓ MP4 format works best</li>
          <li>✓ Keep file size under 100MB</li>
          <li>✓ Use clear, descriptive titles</li>
          <li>✓ Videos will be visible in user dashboard</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'white',
    padding: '24px',
    borderRadius: '16px',
    marginBottom: '24px',
    border: '1px solid #e5e7eb'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#1f2937'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#4b5563'
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px'
  },
  hint: {
    fontSize: '11px',
    color: '#9ca3af',
    marginTop: '4px'
  },
  fileInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px'
  },
  fileInfo: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '8px'
  },
  progressContainer: {
    background: '#e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '16px',
    position: 'relative',
    height: '30px'
  },
  progressBar: {
    background: '#f59e0b',
    height: '100%',
    transition: 'width 0.3s'
  },
  progressText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  uploadButton: {
    width: '100%',
    background: '#f59e0b',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  infoBox: {
    marginTop: '20px',
    padding: '16px',
    background: '#fef3c7',
    borderRadius: '12px',
    fontSize: '13px'
  }
};

export default VideoUploader;