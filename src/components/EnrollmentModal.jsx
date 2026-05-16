// client/src/components/EnrollmentModal.jsx
import { useState } from 'react';

function EnrollmentModal({ program, selectedDuration, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    referralCode: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setStep(2);
    } else {
      alert('Please fill all required fields');
    }
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const existingUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        program: program.name,
        duration: selectedDuration.duration,
        amount: selectedDuration.price,
        enrolledDate: new Date().toISOString().split('T')[0],
        status: 'active',
        referralCode: formData.referralCode
      };
      existingUsers.push(newUser);
      localStorage.setItem('admin_users', JSON.stringify(existingUsers));
      
      alert(`✅ Enrollment Successful!\n\nWelcome ${formData.name}!\nYou have enrolled in ${program.name} (${selectedDuration.duration})\nAmount: ₹${selectedDuration.price}\n\nYou will receive access details via WhatsApp/Email within 24 hours.`);
      onSuccess(newUser);
    }, 1500);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>×</button>
        
        {/* Progress Steps */}
        <div style={styles.progressSteps}>
          <div style={{ ...styles.step, ...(step >= 1 ? styles.stepActive : {}) }}>
            <span>1</span> Details
          </div>
          <div style={styles.stepLine}></div>
          <div style={{ ...styles.step, ...(step >= 2 ? styles.stepActive : {}) }}>
            <span>2</span> Payment
          </div>
        </div>
        
        {/* Program Summary */}
        <div style={styles.summaryCard}>
          <h3>{program.icon} {program.name}</h3>
          <p>{selectedDuration.duration} · ₹{selectedDuration.price}</p>
        </div>
        
        {/* Step 1: User Details */}
        {step === 1 && (
          <form onSubmit={handleSubmitDetails}>
            <h3 style={styles.sectionTitle}>📝 Enter Your Details</h3>
            <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} style={styles.input} required />
            <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} style={styles.input} required />
            <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} style={styles.input} required />
            <textarea name="address" placeholder="Address (Optional)" value={formData.address} onChange={handleChange} style={styles.textarea} rows="2" />
            <input type="text" name="referralCode" placeholder="Referral Code (if any)" value={formData.referralCode} onChange={handleChange} style={styles.input} />
            
            <button type="submit" style={styles.nextButton}>Proceed to Payment →</button>
          </form>
        )}
        
        {/* Step 2: Payment Options */}
        {step === 2 && (
          <div>
            <h3 style={styles.sectionTitle}>💳 Select Payment Method</h3>
            
            <div style={styles.paymentOptions}>
              <div style={styles.paymentOption} onClick={handlePayment}>
                <span style={{ fontSize: '24px' }}>📱</span>
                <div>
                  <strong>UPI / GPay / PhonePe</strong>
                  <p style={{ fontSize: '11px', color: '#6b7280' }}>Pay using any UPI app</p>
                </div>
              </div>
              
              <div style={styles.paymentOption} onClick={handlePayment}>
                <span style={{ fontSize: '24px' }}>💳</span>
                <div>
                  <strong>Credit / Debit Card</strong>
                  <p style={{ fontSize: '11px', color: '#6b7280' }}>Visa, Mastercard, RuPay</p>
                </div>
              </div>
              
              <div style={styles.paymentOption} onClick={handlePayment}>
                <span style={{ fontSize: '24px' }}>🏦</span>
                <div>
                  <strong>Net Banking</strong>
                  <p style={{ fontSize: '11px', color: '#6b7280' }}>All major banks</p>
                </div>
              </div>
              
              <div style={styles.paymentOption} onClick={handlePayment}>
                <span style={{ fontSize: '24px' }}>📞</span>
                <div>
                  <strong>Pay Later / WhatsApp</strong>
                  <p style={{ fontSize: '11px', color: '#6b7280' }}>Pay on WhatsApp after consultation</p>
                </div>
              </div>
            </div>
            
            {loading && (
              <div style={styles.loadingOverlay}>
                <div style={styles.spinner}></div>
                <p>Processing payment...</p>
              </div>
            )}
            
            <button onClick={() => setStep(1)} style={styles.backButton}>← Back</button>
          </div>
        )}
        
        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <h4>Order Summary</h4>
          <div style={styles.summaryRow}><span>{program.name}</span><span>₹{selectedDuration.price}</span></div>
          <div style={styles.summaryRow}><span>Duration</span><span>{selectedDuration.duration}</span></div>
          <div style={{ ...styles.summaryRow, fontWeight: 'bold', borderTop: '1px solid #e5e7eb', paddingTop: '12px', marginTop: '8px' }}>
            <span>Total Amount</span><span style={{ color: '#f59e0b', fontSize: '20px' }}>₹{selectedDuration.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
  },
  modal: {
    background: 'white',
    borderRadius: '24px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: '24px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '20px',
    fontSize: '28px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9ca3af',
  },
  progressSteps: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#f3f4f6',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: 500,
  },
  stepActive: {
    background: '#f59e0b',
    color: 'white',
  },
  stepLine: {
    width: '50px',
    height: '2px',
    background: '#e5e7eb',
    margin: '0 8px',
  },
  summaryCard: {
    background: '#fef3c7',
    padding: '16px',
    borderRadius: '16px',
    textAlign: 'center',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '18px',
    marginBottom: '16px',
    color: '#1f2937',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    marginBottom: '12px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    marginBottom: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  nextButton: {
    width: '100%',
    background: '#f59e0b',
    color: 'white',
    padding: '14px',
    borderRadius: '40px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  },
  backButton: {
    background: 'transparent',
    border: '1px solid #e5e7eb',
    padding: '10px',
    borderRadius: '30px',
    width: '100%',
    cursor: 'pointer',
    marginTop: '12px',
  },
  paymentOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  orderSummary: {
    background: '#f9fafb',
    padding: '16px',
    borderRadius: '12px',
    marginTop: '20px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
  },
  loadingOverlay: {
    textAlign: 'center',
    padding: '20px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f4f6',
    borderTop: '4px solid #f59e0b',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px',
  },
};

// Add keyframes for spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default EnrollmentModal;