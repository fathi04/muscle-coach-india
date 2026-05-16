// client/src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [saveMessage, setSaveMessage] = useState('');
  
  // Data States
  const [programs, setPrograms] = useState([]);
  const [premiumAddons, setPremiumAddons] = useState([]);
  const [specialOffers, setSpecialOffers] = useState([]);
  const [dailyTip, setDailyTip] = useState('');
  const [videos, setVideos] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('fatLoss');
  
  // Stats
  const [stats, setStats] = useState({ totalUsers: 0, totalRevenue: 0, activePrograms: 0 });
  
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
      fetchVideos();
    }
  }, [isAuthenticated]);
  
  const loadAllData = () => {
    const savedPrograms = localStorage.getItem('admin_programs');
    if (savedPrograms) setPrograms(JSON.parse(savedPrograms));
    else setPrograms([
      { id: 1, name: "BODY FAT LOSS", icon: "🔥", price8: 8000, price12: 10000 },
      { id: 2, name: "MUSCLE GAIN", icon: "💪", price8: 8000, price12: 10000 },
      { id: 3, name: "BODY RECOMPOSITION", icon: "⚡", price8: 8000, price12: 10000 },
    ]);
    
    const savedAddons = localStorage.getItem('admin_addons');
    if (savedAddons) setPremiumAddons(JSON.parse(savedAddons));
    else setPremiumAddons([
      { id: 1, name: "Personalized Diet Plans", price: 999, icon: "🍽️" },
      { id: 2, name: "Monthly Check-ins", price: 499, icon: "📅" },
    ]);
    
    const savedOffers = localStorage.getItem('admin_offers');
    if (savedOffers) setSpecialOffers(JSON.parse(savedOffers));
    else setSpecialOffers([]);
    
    const savedTip = localStorage.getItem('admin_dailyTip');
    setDailyTip(savedTip || "Stay consistent with your workouts! 💪");
    
    const savedFaqs = localStorage.getItem('admin_faqs');
    if (savedFaqs) setFaqs(JSON.parse(savedFaqs));
    else setFaqs([
      { id: 1, q: "How do I access the programs?", a: "After payment, you'll get instant access." },
    ]);
    
    const savedContact = localStorage.getItem('admin_contact');
    if (savedContact) setContactInfo(JSON.parse(savedContact));
    else setContactInfo({ phone: "7356030946", email: "shivafortrock96@gmail.com" });
    
    const savedUsers = localStorage.getItem('admin_users');
    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      setEnrolledUsers(users);
      const totalRevenue = users.reduce((sum, u) => sum + (u.amount || 0), 0);
      setStats({ totalUsers: users.length, totalRevenue, activePrograms: programs.length });
    }
  };
  
  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    }
  };
  
  const handleVideoUpload = async () => {
    if (!selectedFile) {
      alert('Please select a video file');
      return;
    }
    if (!videoTitle) {
      alert('Please enter a video title');
      return;
    }
    
    setUploading(true);
    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('program', selectedProgram);
    formData.append('title', videoTitle);
    
    try {
      const response = await axios.post('http://localhost:5000/api/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });
      
      if (response.data.success) {
        alert('✅ Video uploaded successfully!');
        setSelectedFile(null);
        setVideoTitle('');
        setUploadProgress(0);
        fetchVideos();
      }
    } catch (error) {
      alert('❌ Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };
  
  const deleteVideo = async (videoId) => {
    if (confirm('Delete this video?')) {
      try {
        await axios.delete(`http://localhost:5000/api/videos/${videoId}`);
        fetchVideos();
        alert('✅ Video deleted');
      } catch (error) {
        alert('❌ Delete failed');
      }
    }
  };
  
  const saveAllData = () => {
    localStorage.setItem('admin_programs', JSON.stringify(programs));
    localStorage.setItem('admin_addons', JSON.stringify(premiumAddons));
    localStorage.setItem('admin_offers', JSON.stringify(specialOffers));
    localStorage.setItem('admin_dailyTip', dailyTip);
    localStorage.setItem('admin_faqs', JSON.stringify(faqs));
    localStorage.setItem('admin_contact', JSON.stringify(contactInfo));
    setSaveMessage('✅ All changes saved!');
    setTimeout(() => setSaveMessage(''), 2000);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };
  
  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <div style={styles.loginIcon}>🔐</div>
          <h2 style={styles.loginTitle}>Admin Login</h2>
          <p style={styles.loginSubtitle}>Enter password to access dashboard</p>
          <form onSubmit={handleLogin}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" style={styles.loginInput} />
            <button type="submit" style={styles.loginButton}>Login →</button>
          </form>
          {loginError && <p style={styles.loginError}>❌ Wrong password! Try: admin123</p>}
        </div>
      </div>
    );
  }
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🛠️ Admin Dashboard</h1>
          <p style={styles.subtitle}>Complete control over your website</p>
        </div>
        <div style={styles.headerRight}>
          <button onClick={saveAllData} style={styles.saveButton}>💾 Save All</button>
          <button onClick={handleLogout} style={styles.logoutButton}>🚪 Logout</button>
        </div>
      </div>
      
      {saveMessage && <div style={styles.saveMessage}>{saveMessage}</div>}
      
      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}><div style={styles.statIcon}>👥</div><div style={styles.statValue}>{stats.totalUsers}</div><div style={styles.statLabel}>Enrolled Users</div></div>
        <div style={styles.statCard}><div style={styles.statIcon}>💰</div><div style={styles.statValue}>₹{stats.totalRevenue.toLocaleString()}</div><div style={styles.statLabel}>Total Revenue</div></div>
        <div style={styles.statCard}><div style={styles.statIcon}>📋</div><div style={styles.statValue}>{programs.length}</div><div style={styles.statLabel}>Programs</div></div>
        <div style={styles.statCard}><div style={styles.statIcon}>🎥</div><div style={styles.statValue}>{videos.length}</div><div style={styles.statLabel}>Videos</div></div>
      </div>
      
      {/* Tabs */}
      <div style={styles.tabs}>
        <button onClick={() => setActiveTab('dashboard')} style={{ ...styles.tab, ...(activeTab === 'dashboard' ? styles.tabActive : {}) }}>📊 Dashboard</button>
        <button onClick={() => setActiveTab('programs')} style={{ ...styles.tab, ...(activeTab === 'programs' ? styles.tabActive : {}) }}>📋 Programs</button>
        <button onClick={() => setActiveTab('videos')} style={{ ...styles.tab, ...(activeTab === 'videos' ? styles.tabActive : {}) }}>🎥 Videos</button>
        <button onClick={() => setActiveTab('users')} style={{ ...styles.tab, ...(activeTab === 'users' ? styles.tabActive : {}) }}>👥 Users</button>
        <button onClick={() => setActiveTab('addons')} style={{ ...styles.tab, ...(activeTab === 'addons' ? styles.tabActive : {}) }}>✨ Add-ons</button>
        <button onClick={() => setActiveTab('faq')} style={{ ...styles.tab, ...(activeTab === 'faq' ? styles.tabActive : {}) }}>❓ FAQ</button>
        <button onClick={() => setActiveTab('contact')} style={{ ...styles.tab, ...(activeTab === 'contact' ? styles.tabActive : {}) }}>📞 Contact</button>
      </div>
      
      <div style={styles.content}>
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={styles.welcomeCard}>
              <h2>Welcome, Coach! 👋</h2>
              <p>Here's what's happening with your business today.</p>
            </div>
            <div style={styles.recentActivity}>
              <h3>📋 Recent Enrollments</h3>
              {enrolledUsers.slice(-5).reverse().map(user => (
                <div key={user.id} style={styles.activityItem}>
                  <div><strong>{user.name}</strong> enrolled in <strong>{user.program}</strong><p style={{ fontSize: '11px', color: '#6b7280' }}>{user.enrolledDate}</p></div>
                  <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '20px', fontSize: '11px' }}>₹{user.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* VIDEOS TAB - Direct Video Upload & View */}
        {activeTab === 'videos' && (
          <div>
            {/* Upload Section */}
            <div style={styles.uploadSection}>
              <h2 style={styles.sectionTitle}>📹 Upload New Video</h2>
              
              <div style={styles.formGroup}>
                <label>Select Program:</label>
                <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)} style={styles.select}>
                  <option value="fatLoss">🔥 Body Fat Loss</option>
                  <option value="muscleGain">💪 Muscle Gain</option>
                  <option value="recomposition">⚡ Body Recomposition</option>
                  <option value="contestPrep">🏆 Contest Prep</option>
                  <option value="strength">🏋️ Strength & Performance</option>
                  <option value="beginner">🌱 Beginner Transformation</option>
                  <option value="homeWorkout">🏠 Home Workout</option>
                  <option value="women">💃 Women's Transformation</option>
                  <option value="shredding">❄️ Advanced Shredding</option>
                  <option value="lifestyle">🥗 Lifestyle & Nutrition</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label>Video Title:</label>
                <input type="text" placeholder="e.g., Week 1: Introduction" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} style={styles.input} />
              </div>
              
              <div style={styles.formGroup}>
                <label>Select Video File (MP4):</label>
                <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => setSelectedFile(e.target.files[0])} style={styles.fileInput} />
                {selectedFile && <p style={styles.fileInfo}>📹 {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>}
              </div>
              
              {uploading && (
                <div style={styles.progressContainer}>
                  <div style={{ ...styles.progressBar, width: `${uploadProgress}%` }}></div>
                  <p style={styles.progressText}>Uploading: {uploadProgress}%</p>
                </div>
              )}
              
              <button onClick={handleVideoUpload} disabled={uploading || !selectedFile} style={styles.uploadButton}>
                {uploading ? '⏳ Uploading...' : '📤 Upload Video'}
              </button>
            </div>
            
            {/* Videos List */}
            <div style={styles.videosList}>
              <h2 style={styles.sectionTitle}>📋 Uploaded Videos ({videos.length})</h2>
              
              {videos.length === 0 ? (
                <div style={styles.emptyState}>No videos uploaded yet. Upload your first video above!</div>
              ) : (
                <div style={styles.videosGrid}>
                  {videos.map(video => (
                    <div key={video.id} style={styles.videoCard}>
                      <div style={styles.videoPreview}>
                        <video controls style={styles.videoPlayer}>
                          <source src={`http://localhost:5000${video.url}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div style={styles.videoInfo}>
                        <div>
                          <h4>{video.title}</h4>
                          <p style={styles.videoProgram}>📌 Program: {video.program}</p>
                          <p style={styles.videoDate}>📅 Uploaded: {new Date(video.uploadedAt).toLocaleDateString()}</p>
                        </div>
                        <button onClick={() => deleteVideo(video.id)} style={styles.deleteVideoBtn}>🗑️ Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div>
            <div style={styles.sectionHeader}>
              <h2>👥 Enrolled Users</h2>
              <div style={styles.totalCount}>Total: {enrolledUsers.length} users</div>
            </div>
            
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Phone</th><th>Program</th><th>Amount</th><th>Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {enrolledUsers.map(user => (
                    <tr key={user.id}>
                      <td><strong>{user.name}</strong></td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.program}</td>
                      <td style={{ color: '#f59e0b', fontWeight: 'bold' }}>₹{user.amount}</td>
                      <td>{user.enrolledDate}</td>
                      <td><span style={{ background: '#d1fae5', padding: '4px 8px', borderRadius: '20px', fontSize: '11px' }}>✅ Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* ADD-ONS TAB */}
        {activeTab === 'addons' && (
          <div>
            <div style={styles.sectionHeader}>
              <h2>✨ Premium Add-ons</h2>
              <button onClick={() => setPremiumAddons([...premiumAddons, { id: Date.now(), name: "New Service", price: 500, icon: "✨" }])} style={styles.addButton}>+ Add</button>
            </div>
            {premiumAddons.map(addon => (
              <div key={addon.id} style={styles.addonCard}>
                <input value={addon.icon} onChange={(e) => setPremiumAddons(premiumAddons.map(a => a.id === addon.id ? { ...a, icon: e.target.value } : a))} style={styles.smallIcon} />
                <input value={addon.name} onChange={(e) => setPremiumAddons(premiumAddons.map(a => a.id === addon.id ? { ...a, name: e.target.value } : a))} style={styles.addonNameInput} />
                <input type="number" value={addon.price} onChange={(e) => setPremiumAddons(premiumAddons.map(a => a.id === addon.id ? { ...a, price: parseInt(e.target.value) } : a))} style={styles.priceInput} />
                <button onClick={() => setPremiumAddons(premiumAddons.filter(a => a.id !== addon.id))} style={styles.deleteBtn}>🗑️</button>
              </div>
            ))}
          </div>
        )}
        
        {/* FAQ TAB */}
        {activeTab === 'faq' && (
          <div>
            <div style={styles.sectionHeader}>
              <h2>❓ FAQs</h2>
              <button onClick={() => setFaqs([...faqs, { id: Date.now(), q: "New Question?", a: "New answer here." }])} style={styles.addButton}>+ Add</button>
            </div>
            {faqs.map(faq => (
              <div key={faq.id} style={styles.faqCard}>
                <input value={faq.q} onChange={(e) => setFaqs(faqs.map(f => f.id === faq.id ? { ...f, q: e.target.value } : f))} style={styles.faqQuestion} placeholder="Question" />
                <textarea value={faq.a} onChange={(e) => setFaqs(faqs.map(f => f.id === faq.id ? { ...f, a: e.target.value } : f))} style={styles.faqAnswer} placeholder="Answer" rows="2" />
                <button onClick={() => setFaqs(faqs.filter(f => f.id !== faq.id))} style={styles.deleteBtn}>🗑️</button>
              </div>
            ))}
          </div>
        )}
        
        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div>
            <div style={styles.sectionHeader}>
              <h2>📞 Contact Information</h2>
            </div>
            <div style={styles.contactForm}>
              <div><label>Phone:</label><input value={contactInfo.phone || ''} onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} style={styles.input} /></div>
              <div><label>Email:</label><input value={contactInfo.email || ''} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} style={styles.input} /></div>
              <div><label>WhatsApp:</label><input value={contactInfo.whatsapp || ''} onChange={(e) => setContactInfo({ ...contactInfo, whatsapp: e.target.value })} style={styles.input} /></div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f3f4f6', fontFamily: "'Inter', sans-serif" },
  loginContainer: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  loginBox: { background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', width: '350px' },
  loginIcon: { fontSize: '48px', marginBottom: '16px' },
  loginTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' },
  loginSubtitle: { fontSize: '14px', color: '#6b7280', marginBottom: '24px' },
  loginInput: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', marginBottom: '16px' },
  loginButton: { width: '100%', background: '#f59e0b', color: 'white', padding: '12px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
  loginError: { color: '#ef4444', fontSize: '12px', marginTop: '12px' },
  header: { background: 'white', padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
  title: { fontSize: '20px', fontWeight: 'bold', margin: 0 },
  subtitle: { fontSize: '12px', color: '#6b7280', marginTop: '4px' },
  headerRight: { display: 'flex', gap: '12px' },
  saveButton: { background: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' },
  logoutButton: { background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' },
  saveMessage: { background: '#d1fae5', color: '#065f46', padding: '10px 20px', textAlign: 'center' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '24px' },
  statCard: { background: 'white', padding: '20px', borderRadius: '16px', textAlign: 'center' },
  statIcon: { fontSize: '32px', marginBottom: '8px' },
  statValue: { fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' },
  statLabel: { fontSize: '12px', color: '#6b7280' },
  tabs: { display: 'flex', gap: '4px', padding: '16px 24px', background: 'white', borderBottom: '1px solid #e5e7eb', flexWrap: 'wrap' },
  tab: { padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 500 },
  tabActive: { background: '#fef3c7', color: '#f59e0b' },
  content: { padding: '24px' },
  welcomeCard: { background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', padding: '24px', borderRadius: '16px', marginBottom: '24px' },
  recentActivity: { background: 'white', padding: '20px', borderRadius: '16px' },
  activityItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #e5e7eb' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' },
  sectionTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' },
  totalCount: { background: '#f3f4f6', padding: '6px 12px', borderRadius: '20px', fontSize: '13px' },
  tableContainer: { overflowX: 'auto', background: 'white', borderRadius: '16px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  uploadSection: { background: 'white', padding: '24px', borderRadius: '16px', marginBottom: '24px' },
  formGroup: { marginBottom: '16px' },
  select: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '14px' },
  fileInput: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px' },
  fileInfo: { fontSize: '12px', color: '#6b7280', marginTop: '8px' },
  progressContainer: { background: '#e5e7eb', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', height: '30px', position: 'relative' },
  progressBar: { background: '#f59e0b', height: '100%', transition: 'width 0.3s' },
  progressText: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '12px', fontWeight: 'bold' },
  uploadButton: { width: '100%', background: '#f59e0b', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
  videosList: { background: 'white', padding: '24px', borderRadius: '16px' },
  videosGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' },
  videoCard: { border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' },
  videoPreview: { background: '#1f2937', padding: '16px' },
  videoPlayer: { width: '100%', maxHeight: '200px', borderRadius: '8px' },
  videoInfo: { padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  videoProgram: { fontSize: '12px', color: '#f59e0b', marginTop: '4px' },
  videoDate: { fontSize: '11px', color: '#9ca3af', marginTop: '2px' },
  deleteVideoBtn: { background: '#fee2e2', color: '#ef4444', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' },
  emptyState: { textAlign: 'center', padding: '60px', color: '#9ca3af' },
  addonCard: { background: 'white', padding: '16px', borderRadius: '12px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  smallIcon: { width: '50px', padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center', fontSize: '20px' },
  addonNameInput: { flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb' },
  priceInput: { width: '80px', padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb' },
  deleteBtn: { background: '#fee2e2', color: '#ef4444', padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer' },
  faqCard: { background: 'white', padding: '16px', borderRadius: '12px', marginBottom: '12px' },
  faqQuestion: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '8px', fontWeight: 'bold' },
  faqAnswer: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e7eb', fontFamily: 'inherit' },
  contactForm: { background: 'white', padding: '24px', borderRadius: '16px', display: 'grid', gap: '16px' },
  addButton: { background: '#f59e0b', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' },
};

export default Admin;