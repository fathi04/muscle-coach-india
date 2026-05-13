// client/src/pages/Home.jsx
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import coachImg from "../assets/coach.jpeg";
import logoImg from "../assets/logo.jpeg";

function Home() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [purchasedProgram, setPurchasedProgram] = useState(null);
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // All 10 Programs Data
  const programs = {
    fatLoss: {
      id: "fatLoss",
      name: "BODY FAT LOSS PROGRAM",
      title: "Fat Incinerator",
      price: 4000,
      priceInPaise: 400000,
      duration: "12 Weeks",
      bestFor: ["Weight loss", "Belly fat reduction", "Lifestyle transformation"],
      includes: [
        "Customized workout plan",
        "Cardio guidance",
        "Diet plan",
        "Weekly check-ins",
        "Progress tracking"
      ],
      description: "Complete fat loss system to shed body fat while preserving muscle mass.",
      icon: "🔥",
      color: "#ef4444"
    },
    muscleGain: {
      id: "muscleGain",
      name: "MUSCLE GAIN PROGRAM",
      title: "Mass Builder",
      price: 4000,
      priceInPaise: 400000,
      duration: "16 Weeks",
      bestFor: ["Skinny to muscular transformation", "Lean bulking", "Strength + size"],
      includes: [
        "Hypertrophy training",
        "Progressive overload plan",
        "High-protein nutrition",
        "Supplement guidance"
      ],
      description: "Scientific muscle building program for maximum hypertrophy and strength gains.",
      icon: "💪",
      color: "#f59e0b"
    },
    recomposition: {
      id: "recomposition",
      name: "BODY RECOMPOSITION PROGRAM",
      title: "Build + Burn",
      price: 4000,
      priceInPaise: 400000,
      duration: "16 Weeks",
      bestFor: ["Beginners", "Intermediate clients", "Athletic look goal"],
      includes: [
        "Simultaneous build & burn training",
        "Body composition tracking",
        "Flexible nutrition plan",
        "Weekly progress assessments"
      ],
      description: "Build muscle while losing fat - the most attractive program for general clients.",
      icon: "⚡",
      color: "#10b981"
    },
    contestPrep: {
      id: "contestPrep",
      name: "CONTEST PREP PROGRAM",
      title: "Stage Ready",
      price: 4000,
      priceInPaise: 400000,
      duration: "20 Weeks",
      bestFor: ["Men's Physique", "Classic Physique", "Bodybuilding stage prep"],
      includes: [
        "Peak week guidance",
        "Posing coaching",
        "Carb/water manipulation",
        "Conditioning protocol"
      ],
      description: "Elite competition preparation for bodybuilding stage - makes your brand look elite.",
      icon: "🏆",
      color: "#8b5cf6"
    },
    strengthPerformance: {
      id: "strengthPerformance",
      name: "STRENGTH & PERFORMANCE",
      title: "Power Athlete",
      price: 4000,
      priceInPaise: 400000,
      duration: "12 Weeks",
      bestFor: ["Athletes", "Functional strength", "Powerlifting basics"],
      includes: [
        "Strength cycles",
        "Mobility work",
        "Recovery management",
        "Performance tracking"
      ],
      description: "Build raw strength and athletic performance with structured strength cycles.",
      icon: "🏋️‍♂️",
      color: "#3b82f6"
    },
    beginnerTransform: {
      id: "beginnerTransform",
      name: "BEGINNER TRANSFORMATION",
      title: "Foundation Builder",
      price: 4000,
      priceInPaise: 400000,
      duration: "8 Weeks",
      bestFor: ["People new to gym", "Confidence building", "Technique correction"],
      includes: [
        "Basic training plan",
        "Technique correction videos",
        "Simple nutrition guide",
        "Habit formation coaching"
      ],
      description: "Perfect for beginners - very high demand program. Build confidence and learn proper technique.",
      icon: "🌱",
      color: "#22c55e"
    },
    homeWorkout: {
      id: "homeWorkout",
      name: "HOME WORKOUT PROGRAM",
      title: "No Gym Needed",
      price: 4000,
      priceInPaise: 400000,
      duration: "12 Weeks",
      bestFor: ["Busy professionals", "Women at home", "No-gym clients"],
      includes: [
        "Minimal equipment workouts",
        "Fat loss circuits",
        "Home nutrition plans",
        "Follow-along videos"
      ],
      description: "Effective workouts from home with minimal equipment. Perfect for busy schedules.",
      icon: "🏠",
      color: "#14b8a6"
    },
    womenTransformation: {
      id: "womenTransformation",
      name: "WOMEN'S TRANSFORMATION",
      title: "Her Fitness Journey",
      price: 4000,
      priceInPaise: 400000,
      duration: "12 Weeks",
      bestFor: ["Fat loss", "Toning", "Glute building", "Post-pregnancy fitness"],
      includes: [
        "Glute focused training",
        "Toning workouts",
        "Post-pregnancy safe exercises",
        "Female nutrition guidance"
      ],
      description: "Specialized program for women - separate premium section for fat loss, toning, and glute building.",
      icon: "💃",
      color: "#ec4899"
    },
    advancedShredding: {
      id: "advancedShredding",
      name: "ADVANCED SHREDDING",
      title: "Summer Cut Elite",
      price: 4000,
      priceInPaise: 400000,
      duration: "8 Weeks",
      bestFor: ["Summer cut", "Photo shoot prep", "Extreme conditioning"],
      includes: [
        "Low body fat protocol",
        "Abs visibility focus",
        "High-definition physique training",
        "Peak week conditioning"
      ],
      description: "Extreme conditioning for low body fat, visible abs, and high-definition physique.",
      icon: "❄️",
      color: "#06b6d4"
    },
    lifestyleNutrition: {
      id: "lifestyleNutrition",
      name: "LIFESTYLE & NUTRITION",
      title: "Sustainable Health",
      price: 4000,
      priceInPaise: 400000,
      duration: "Monthly",
      bestFor: ["Meal planning", "Habit coaching", "Long-term success"],
      includes: [
        "Meal planning",
        "Habit coaching",
        "Supplement guidance",
        "Sleep & recovery tips"
      ],
      description: "Monthly recurring coaching for sustainable lifestyle and nutrition habits - great for recurring monthly clients.",
      icon: "🥗",
      color: "#a855f7"
    }
  };

  // Premium Add-On Services
  const premiumAddons = [
    { id: 1, name: "Personalized Diet Plans", price: 999, icon: "🍽️", description: "Custom meal plans" },
    { id: 2, name: "Monthly Check-ins", price: 499, icon: "📅", description: "Weekly reviews" },
    { id: 3, name: "Video Call Consultation", price: 799, icon: "📹", description: "1-on-1 coaching" },
    { id: 4, name: "Form Correction", price: 299, icon: "🎯", description: "Video analysis" },
    { id: 5, name: "Supplement Guidance", price: 399, icon: "💊", description: "Personalized recommendations" },
    { id: 6, name: "Posing Sessions", price: 599, icon: "💃", description: "Stage posing coaching" },
    { id: 7, name: "Grocery Guide", price: 199, icon: "🛒", description: "Shopping lists" },
    { id: 8, name: "Blood Work Review", price: 699, icon: "🩸", description: "Health analysis" }
  ];

  // Logo Component
  const Logo = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img src={logoImg} alt="MCI Logo" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '1px', color: '#1f2937' }}>MUSCLE COACH INDIA</div>
        <div style={{ fontSize: '7px', letterSpacing: '2px', color: '#f59e0b' }}>ELITE TRANSFORMATION</div>
      </div>
    </div>
  );

  // Razorpay Payment Handler
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (program) => {
    const isScriptLoaded = await loadRazorpayScript();
    
    if (!isScriptLoaded) {
      alert('Payment gateway loading failed. Please try again.');
      return;
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',
      amount: program.priceInPaise,
      currency: 'INR',
      name: 'Muscle Coach India',
      description: `${program.name} - ${program.duration}`,
      image: logoImg,
      handler: function(response) {
        setPaymentSuccess(true);
        setPurchasedProgram(program.id);
        alert(`✅ Payment Successful! You now have access to ${program.name}.`);
      },
      theme: { color: '#f59e0b' }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Mobile responsive styles
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ 
      backgroundColor: '#ffffff', 
      color: '#1f2937', 
      overflowX: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      
      {/* NAVBAR - Mobile Responsive */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <Logo />
        
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Home', 'Programs', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: '10px',
                letterSpacing: '1px',
                fontWeight: 500,
                color: '#6b7280',
                textDecoration: 'none'
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO SECTION - Mobile Responsive */}
      <section ref={targetRef} style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 20px 60px 20px',
        background: '#ffffff'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          width: '100%', 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '40px', 
          alignItems: 'center' 
        }}>
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}
          >
            <p style={{ color: '#f59e0b', fontSize: '11px', letterSpacing: '5px', marginBottom: '15px', fontWeight: 500 }}>
              MUSCLE COACH INDIA
            </p>
            
            <h1 style={{
              fontSize: 'clamp(32px, 8vw, 80px)',
              fontWeight: 900,
              lineHeight: '1.1',
              marginBottom: '15px',
              color: '#1f2937'
            }}>
              Elevate Your
              <br />
              <span style={{ color: '#f59e0b' }}>Fitness Journey</span>
            </h1>
            
            <p style={{
              fontSize: '15px',
              color: '#6b7280',
              maxWidth: '500px',
              lineHeight: '1.5',
              marginBottom: '25px',
              marginLeft: isMobile ? 'auto' : 0,
              marginRight: isMobile ? 'auto' : 0
            }}>
              Premium physique transformation programs designed for muscle gain, 
              fat loss, strength building, and complete body transformation.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: isMobile ? 'center' : 'flex-start', marginBottom: '30px' }}>
              <button
                onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: '#f59e0b',
                  color: '#ffffff',
                  padding: '12px 25px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                EXPLORE PROGRAMS →
              </button>
            </div>
            
            {/* Simplified Stats */}
            <div style={{ display: 'flex', gap: '30px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b' }}>10+</div>
                <p style={{ fontSize: '9px', letterSpacing: '1px', color: '#9ca3af' }}>YEARS EXPERIENCE</p>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b' }}>1000+</div>
                <p style={{ fontSize: '9px', letterSpacing: '1px', color: '#9ca3af' }}>VISIBLE RESULTS</p>
              </div>
            </div>
          </motion.div>
          
          {/* RIGHT CONTENT - COACH IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: 1, position: 'relative' }}
          >
            <div style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              maxWidth: isMobile ? '280px' : '100%',
              margin: isMobile ? '0 auto' : 0
            }}>
              <img 
                src={coachImg} 
                alt="Coach Shiva" 
                style={{ width: '100%', height: 'auto', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} 
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: isMobile ? '50%' : '20px',
              transform: isMobile ? 'translateX(-50%)' : 'none',
              background: '#ffffff',
              padding: '8px 16px',
              borderRadius: '30px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ width: '6px', height: '6px', background: '#f59e0b', borderRadius: '50%' }} />
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#1f2937' }}>SHIVA • ELITE COACH</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ALL 10 PROGRAMS SECTION - Mobile Responsive */}
      <section id="programs" style={{ padding: '60px 20px', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: '#f59e0b', fontSize: '11px', letterSpacing: '5px', marginBottom: '10px' }}>CHOOSE YOUR PATH</p>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1f2937' }}>Transformation <span style={{ color: '#f59e0b' }}>Programs</span></h2>
            <p style={{ color: '#6b7280', marginTop: '10px', fontSize: '13px' }}>All programs for just ₹4,000</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {Object.values(programs).map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '40px' }}>{program.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1f2937' }}>{program.name}</h3>
                    <p style={{ color: program.color, fontSize: '11px', fontWeight: 600 }}>{program.title}</p>
                  </div>
                </div>
                
                {/* Best For Section */}
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', marginBottom: '6px' }}>📌 BEST FOR:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {program.bestFor.map((item, i) => (
                      <span key={i} style={{
                        background: '#fef3c7',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '9px',
                        color: '#d97706'
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
                
                {/* Includes Section */}
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', marginBottom: '6px' }}>✓ INCLUDES:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {program.includes.slice(0, 3).map((item, i) => (
                      <span key={i} style={{
                        background: '#f0fdf4',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '9px',
                        color: '#16a34a'
                      }}>{item}</span>
                    ))}
                  </div>
                </div>
                
                <div style={{ marginBottom: '15px', paddingTop: '10px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '28px', fontWeight: 900, color: '#f59e0b' }}>₹{program.price}</span>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}> / {program.duration}</span>
                  </div>
                  <button
                    onClick={() => handlePayment(program)}
                    style={{
                      background: '#f59e0b',
                      color: '#ffffff',
                      padding: '8px 20px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '12px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    ENROLL →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM ADD-ONS SECTION - Mobile Responsive */}
      <section id="addons" style={{ padding: '60px 20px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: '#f59e0b', fontSize: '11px', letterSpacing: '5px', marginBottom: '10px' }}>ENHANCE YOUR JOURNEY</p>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1f2937' }}>Premium <span style={{ color: '#f59e0b' }}>Add-Ons</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {premiumAddons.map((addon, idx) => (
              <div
                key={addon.id}
                style={{
                  background: '#f9fafb',
                  borderRadius: '12px',
                  padding: '15px',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{addon.icon}</div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '5px', color: '#1f2937' }}>{addon.name}</h4>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b', marginBottom: '8px' }}>₹{addon.price}</div>
                <button
                  onClick={() => alert(`Added ${addon.name} to cart!`)}
                  style={{
                    width: '100%',
                    background: '#f3f4f6',
                    border: 'none',
                    color: '#4b5563',
                    padding: '6px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                >
                  ADD →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOVEMENT SECTION - Mobile Responsive */}
      <section style={{ padding: '60px 20px', background: '#f9fafb', textAlign: 'center', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ color: '#f59e0b', fontSize: '10px', letterSpacing: '5px', marginBottom: '15px' }}>#SETTHESTANDARD</p>
          <h2 style={{ fontSize: '24px', fontWeight: 900, lineHeight: '1.3', color: '#1f2937' }}>
            It's not just another fitness app,<br/>it's a <span style={{ color: '#f59e0b' }}>movement</span>.
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '20px auto 0', lineHeight: '1.5' }}>
            A tool designed to rebuild discipline, redefine excellence, and push individuals to become their best selves.
          </p>
          
          <button 
            onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: '#f59e0b',
              color: '#ffffff',
              padding: '12px 30px',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '25px'
            }}
          >
            START YOUR JOURNEY →
          </button>
        </div>
      </section>

      {/* FOOTER - Mobile Responsive */}
      <footer style={{ padding: '30px 20px', background: '#ffffff', textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
        <Logo />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '9px', color: '#9ca3af', flexWrap: 'wrap', marginTop: '15px', marginBottom: '10px' }}>
          <span>© 2026 MUSCLE COACH INDIA</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
        <div style={{ fontSize: '7px', color: '#d1d5db', letterSpacing: '1px' }}>
          ELITE TRANSFORMATION MOVEMENT — FORGE YOUR LEGACY
        </div>
      </footer>
    </div>
  );
}

export default Home;