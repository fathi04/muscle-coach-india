// client/src/components/AnalyticsDashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalUsers: 0,
    averageOrderValue: 0,
    monthlyRevenue: {},
    topPrograms: []
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    fetchAnalytics(users);
  }, []);

  const fetchAnalytics = async (users) => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics/revenue', {
        params: { users: JSON.stringify(users) }
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Business Analytics</h2>
      
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>₹{analytics.totalRevenue.toLocaleString()}</div>
          <div style={styles.statLabel}>Total Revenue</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{analytics.totalUsers}</div>
          <div style={styles.statLabel}>Total Customers</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>₹{analytics.averageOrderValue}</div>
          <div style={styles.statLabel}>Avg Order Value</div>
        </div>
      </div>

      <div style={styles.chartCard}>
        <h3>📈 Top Programs</h3>
        {analytics.topPrograms.map((program, idx) => (
          <div key={idx} style={styles.programBar}>
            <span>{program.name}</span>
            <div style={styles.barContainer}>
              <div style={{ ...styles.bar, width: `${(program.count / (analytics.totalUsers || 1)) * 100}%` }}></div>
              <span style={styles.barLabel}>{program.count} enrollments</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.chartCard}>
        <h3>📅 Monthly Revenue</h3>
        {Object.entries(analytics.monthlyRevenue).map(([month, revenue]) => (
          <div key={month} style={styles.monthRow}>
            <span>{month}</span>
            <span style={styles.revenueAmount}>₹{revenue.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '24px' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' },
  statCard: { background: 'white', padding: '24px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  statValue: { fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' },
  statLabel: { fontSize: '12px', color: '#6b7280', marginTop: '8px' },
  chartCard: { background: 'white', padding: '24px', borderRadius: '16px', marginBottom: '24px' },
  programBar: { marginBottom: '16px' },
  barContainer: { position: 'relative', marginTop: '8px', height: '30px', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' },
  bar: { height: '100%', background: '#f59e0b', borderRadius: '8px' },
  barLabel: { position: 'absolute', right: '12px', top: '6px', fontSize: '12px', color: '#4b5563' },
  monthRow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' },
  revenueAmount: { fontWeight: 'bold', color: '#f59e0b' }
};

export default AnalyticsDashboard;