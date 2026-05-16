// client/src/components/RazorpayPayment.jsx
import { useState } from 'react';
import axios from 'axios';

function RazorpayPayment({ amount, userDetails, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert('Failed to load payment gateway');
      setLoading(false);
      return;
    }

    try {
      // Create order on backend
      const orderResponse = await axios.post('http://localhost:5000/api/create-order', {
        amount: amount
      });

      const options = {
        key: 'rzp_test_yourkey', // Your Razorpay Key ID
        amount: orderResponse.data.amount,
        currency: 'INR',
        name: 'Muscle Coach India',
        description: 'Program Enrollment',
        image: '/logo.png',
        order_id: orderResponse.data.id,
        handler: async (response) => {
          // Verify payment
          const verifyResponse = await axios.post('http://localhost:5000/api/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verifyResponse.data.success) {
            // Send welcome email
            await axios.post('http://localhost:5000/api/send-welcome-email', userDetails);
            
            // Send WhatsApp message
            await axios.post('http://localhost:5000/api/send-whatsapp', {
              to: userDetails.phone,
              message: `🎉 Welcome ${userDetails.name}! Your enrollment in ${userDetails.program} is confirmed. Access your dashboard: https://yourdomain.com/dashboard`
            });
            
            onSuccess(response);
          } else {
            onError('Payment verification failed');
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone
        },
        theme: {
          color: '#f59e0b'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading}
      style={{
        width: '100%',
        background: '#f59e0b',
        color: 'white',
        padding: '14px',
        borderRadius: '40px',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1
      }}
    >
      {loading ? 'Processing...' : `Pay ₹${amount} →`}
    </button>
  );
}

export default RazorpayPayment;