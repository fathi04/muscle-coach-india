// client/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [programVideos, setProgramVideos] = useState([]);
  const [dailyTip, setDailyTip] = useState('');
  const [activeTab, setActiveTab] = useState('videos');
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData) {
      setUser(userData);
      loadProgramContent(userData.program);
    }
    
    // Load daily tip
    const savedTip = localStorage.getItem('admin_dailyTip');
    setDailyTip(savedTip || "Stay consistent with your workouts! Small progress every day leads to big results. 💪");
  }, []);
  
  const loadProgramContent = (programName) => {
    // Load videos based on program
    const savedVideos = localStorage.getItem('admin_videos');
    if (savedVideos) {
      const allVideos = JSON.parse(savedVideos);
      const programKey = programName.toLowerCase().includes('fat') ? 'fatLoss' :
                        programName.toLowerCase().includes('muscle') ? 'muscleGain' : 'fatLoss';
      setProgramVideos(allVideos[programKey] || []);
    } else {
      setProgramVideos([
        { id: 1, week: 1, title: "Introduction to Your Program", duration: "15:30", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: 2, week: 2, title: "Week 2: Progressing Forward", duration: "22:15", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
        { id: 3, week: 3, title: "Week 3: Advanced Techniques", duration: "18:45", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      ]);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };
  
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.errorBox}>
          <h2>⚠️ No User Found</h2>
          <p>Please enroll in a program first.</p>
          <a href="/" style={styles.homeLink}>Go to Homepage →</a>
        </div>
      </div>
    );
  }
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>💪</span>
            <span style={styles.logoText}>MUSCLE COACH INDIA</span>
          </div>
          <div style={styles.userInfo}>
            <span style={styles.userName}>👋 Welcome, {user.name}!</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </div>
      </div>
      
      {/* Hero Banner */}
      <div style={styles.heroBanner}>
        <h1>Your Transformation Journey</h1>
        <p>{user.program} · {user.duration} · Enrolled on {user.enrolledDate}</p>
      </div>
      
      {/* Dashboard Tabs */}
      <div style={styles.tabs}>
        <button onClick={() => setActiveTab('videos')} style={{ ...styles.tab, ...(activeTab === 'videos' ? styles.tabActive : {}) }}>🎥 Videos</button>
        <button onClick={() => setActiveTab('tips')} style={{ ...styles.tab, ...(activeTab === 'tips' ? styles.tabActive : {}) }}>💡 Daily Tips</button>
        <button onClick={() => setActiveTab('mealplan')} style={{ ...styles.tab, ...(activeTab === 'mealplan' ? styles.tabActive : {}) }}>🥗 Meal Plan</button>
        <button onClick={() => setActiveTab('progress')} style={{ ...styles.tab, ...(activeTab === 'progress' ? styles.tabActive : {}) }}>📊 Progress</button>
        <button onClick={() => setActiveTab('support')} style={{ ...styles.tab, ...(activeTab === 'support' ? styles.tabActive : {}) }}>💬 Support</button>
      </div>
      
      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <div style={styles.tabContent}>
          <h2 style={styles.sectionTitle}>📹 Program Videos</h2>
          <p style={styles.sectionSubtitle}>Watch these videos in order for best results</p>
          
          <div style={styles.videosGrid}>
            {programVideos.length > 0 ? (
              programVideos.map((video, idx) => (
                <div key={idx} style={styles.videoCard}>
                  <div style={styles.videoThumbnail}>
                    <span style={styles.videoIcon}>🎬</span>
                    <span style={styles.videoDuration}>{video.duration}</span>
                  </div>
                  <div style={styles.videoInfo}>
                    <h3>Week {video.week}: {video.title}</h3>
                    <button onClick={() => window.open(video.url, '_blank')} style={styles.watchBtn}>Watch Now →</button>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.emptyState}>
                <p>📹 Videos will be added by your coach soon. Stay tuned!</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Daily Tips Tab */}
      {activeTab === 'tips' && (
        <div style={styles.tabContent}>
          <h2 style={styles.sectionTitle}>💡 Daily Motivation & Tips</h2>
          
          <div style={styles.tipCard}>
            <div style={styles.tipIcon}>📌</div>
            <div>
              <h3>Today's Tip</h3>
              <p style={styles.tipText}>{dailyTip}</p>
            </div>
          </div>
          
          <div style={styles.tipHistory}>
            <h3>Previous Tips</h3>
            <div style={styles.tipHistoryItem}>
              <span>📅 May 14, 2026</span>
              <p>Don't skip your warm-up! It prevents injury and improves performance.</p>
            </div>
            <div style={styles.tipHistoryItem}>
              <span>📅 May 13, 2026</span>
              <p>Drink 3-4 liters of water daily for optimal hydration and recovery.</p>
            </div>
            <div style={styles.tipHistoryItem}>
              <span>📅 May 12, 2026</span>
              <p>Get 7-8 hours of sleep - that's when your muscles grow!</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Meal Plan Tab */}
      {activeTab === 'mealplan' && (
        <div style={styles.tabContent}>
          <h2 style={styles.sectionTitle}>🥗 Sample Meal Plan</h2>
          <p style={styles.sectionSubtitle}>Customized plan will be provided by your coach</p>
          
          <div style={styles.mealPlanCard}>
            <div style={styles.mealDay}>
              <h3>Morning (7:00 AM)</h3>
              <p>4 eggs + 1 cup oats + 1 banana</p>
            </div>
            <div style={styles.mealDay}>
              <h3>Lunch (1:00 PM)</h3>
              <p>200g chicken breast + 1 cup brown rice + mixed vegetables</p>
            </div>
            <div style={styles.mealDay}>
              <h3>Snack (5:00 PM)</h3>
              <p>Protein shake + handful of nuts</p>
            </div>
            <div style={styles.mealDay}>
              <h3>Dinner (8:00 PM)</h3>
              <p>200g fish + salad + sweet potato</p>
            </div>
          </div>
          
          <button style={styles.downloadBtn}>📥 Download Full Meal Plan</button>
        </div>
      )}
      
      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div style={styles.tabContent}>
          <h2 style={styles.sectionTitle}>📊 Track Your Progress</h2>
          <p style={styles.sectionSubtitle}>Update your weekly progress</p>
          
          <div style={styles.progressCard}>
            <div style={styles.progressHeader}>
              <span>Week 1 of 12</span>
              <span style={styles.progressPercent}>25% Complete</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: '25%' }}></div>
            </div>
            
            <div style={styles.statsGrid}>
              <div style={styles.statBox}>
                <label>Current Weight (kg)</label>
                <input type="number" placeholder="Enter weight" style={styles.statInput} />
              </div>
              <div style={styles.statBox}>
                <label>Body Fat %</label>
                <input type="number" placeholder="Enter body fat" style={styles.statInput} />
              </div>
              <div style={styles.statBox}>
                <label>Chest (inches)</label>
                <input type="number" placeholder="Enter chest" style={styles.statInput} />
              </div>
              <div style={styles.statBox}>
                <label>Waist (inches)</label>
                <input type="number" placeholder="Enter waist" style={styles.statInput} />
              </div>
            </div>
            
            <button style={styles.updateBtn}>Update Progress</button>
          </div>
          
          <div style={styles.progressHistory}>
            <h3>Progress History</h3>
            <table style={styles.progressTable}>
              <thead>
                <tr><th>Week</th><th>Weight</th><th>Body Fat</th><th>Date</th></tr>
              </thead>
              <tbody>
                <tr><td>Week 1</td><td>-</td><td>-</td><td>May 15, 2026</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Support Tab */}
      {activeTab === 'support' && (
        <div style={styles.tabContent}>
          <h2 style={styles.sectionTitle}>💬 Get Support</h2>
          
          <div style={styles.supportCard}>
            <div style={styles.supportOption}>
              <span style={styles.supportIcon}>💬</span>
              <div>
                <h3>WhatsApp Support</h3>
                <p>Get quick responses from your coach</p>
                <a href="https://wa.me/917356030946?text=Hi%20Coach%2C%20I%20need%20help%20with%20my%20program" target="_blank" style={styles.supportBtn}>Message on WhatsApp →</a>
              </div>
            </div>
            
            <div style={styles.supportOption}>
              <span style={styles.supportIcon}>📧</span>
              <div>
                <h3>Email Support</h3>
                <p>Send detailed queries via email</p>
                <a href="mailto:shivafortrock96@gmail.com" style={styles.supportBtn}>Send Email →</a>
              </div>
            </div>
            
            <div style={styles.supportOption}>
              <span style={styles.supportIcon}>📞</span>
              <div>
                <h3>Call Support</h3>
                <p>Speak directly with your coach</p>
                <a href="tel:7356030946" style={styles.supportBtn}>Call Now →</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f3f4f6',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    background: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoIcon: {
    fontSize: '28px',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#1f2937',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#4b5563',
  },
  logoutBtn: {
    background: '#ef4444',
    color: 'white',
    padding: '6px 16px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
  },
  heroBanner: {
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: 'white',
    padding: '40px 24px',
    textAlign: 'center',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    padding: '16px 24px',
    background: 'white',
    borderBottom: '1px solid #e5e7eb',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '10px 20px',
    borderRadius: '30px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: '#6b7280',
  },
  tabActive: {
    background: '#fef3c7',
    color: '#f59e0b',
  },
  tabContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#1f2937',
  },
  sectionSubtitle: {
    color: '#6b7280',
    marginBottom: '32px',
  },
  videosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
  },
  videoCard: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  videoThumbnail: {
    height: '200px',
    background: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  videoIcon: {
    fontSize: '48px',
  },
  videoDuration: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    background: 'rgba(0,0,0,0.7)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    color: 'white',
  },
  videoInfo: {
    padding: '16px',
  },
  watchBtn: {
    background: '#f59e0b',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '30px',
    fontSize: '12px',
    cursor: 'pointer',
    marginTop: '12px',
    width: '100%',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px',
    background: 'white',
    borderRadius: '16px',
    color: '#9ca3af',
  },
  tipCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    gap: '16px',
    marginBottom: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  tipIcon: {
    fontSize: '32px',
  },
  tipText: {
    color: '#4b5563',
    lineHeight: 1.6,
    marginTop: '8px',
  },
  tipHistory: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
  },
  tipHistoryItem: {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
  },
  mealPlanCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
  },
  mealDay: {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
  },
  downloadBtn: {
    background: '#f59e0b',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  },
  progressCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '32px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  progressPercent: {
    color: '#f59e0b',
    fontWeight: 'bold',
  },
  progressBar: {
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  progressFill: {
    height: '100%',
    background: '#f59e0b',
    borderRadius: '4px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  statInput: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
  },
  updateBtn: {
    background: '#f59e0b',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
  },
  progressHistory: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
  },
  progressTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '16px',
  },
  supportCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  supportOption: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  supportIcon: {
    fontSize: '32px',
  },
  supportBtn: {
    display: 'inline-block',
    marginTop: '12px',
    color: '#f59e0b',
    textDecoration: 'none',
    fontWeight: 500,
  },
  errorBox: {
    textAlign: 'center',
    padding: '60px',
    background: 'white',
    maxWidth: '500px',
    margin: '100px auto',
    borderRadius: '16px',
  },
  homeLink: {
    color: '#f59e0b',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '16px',
  },
};

export default Dashboard;