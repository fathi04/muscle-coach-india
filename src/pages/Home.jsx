// client/src/pages/Home.jsx
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import coachImg from "../assets/coach.jpeg";
import logoImg from "../assets/logo.jpeg";
import EnrollmentModal from "../components/EnrollmentModal";

// Import all images
import contestPrep1 from "../assets/contest prep.jpeg";
import contestPrep2 from "../assets/contest prep2.jpeg";
import contestPrep3 from "../assets/contest prep3.jpeg";
import fatLoss1 from "../assets/fatloss1.jpeg";
import fatLoss2 from "../assets/fatloss2.jpeg";
import fatLoss3 from "../assets/fatloss3.jpeg";
import muscleGainPhoto from "../assets/musclegain.jpeg";
import weightGainPhoto from "../assets/weightgain.jpeg";
import posingPhoto from "../assets/posing.jpeg";

function Home() {
  const [selectedDuration, setSelectedDuration] = useState({});
  const [showAllResults, setShowAllResults] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedProgramForEnrollment, setSelectedProgramForEnrollment] = useState(null);
  const [selectedDurationForEnrollment, setSelectedDurationForEnrollment] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Contact Details
  const CONTACT_NUMBER = "7356030946";
  const EMAIL = "shivafortrock96@gmail.com";
  const WHATSAPP_LINK = `https://wa.me/91${CONTACT_NUMBER}?text=Hi%20Coach%20Shiva%2C%20I'm%20interested`;

  const primaryColor = "#f59e0b";
  const primaryDark = "#d97706";
  const primaryLight = "#fef3c7";
  const lightBg = "#f9fafb";

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // FAQ Data
  const faqs = [
    { q: "How do I access the programs?", a: "After payment, you'll receive instant access via email and WhatsApp." },
    { q: "Can I switch programs?", a: "Yes, within first 7 days you can switch to any program free." },
    { q: "Is there a money-back guarantee?", a: "Yes, 7-day money-back guarantee if not satisfied." },
    { q: "Do I need a gym membership?", a: "No, home workout options available for all programs." }
  ];

  // Complete 10 Programs Data
  const programs = [
    { id: 1, name: "BODY FAT LOSS", title: "Fat Incinerator", price8: 8000, price12: 10000, duration8: "8 Weeks", duration12: "12 Weeks", bestFor: ["Weight loss", "Belly fat"], includes: ["Customized workout", "Cardio guidance", "Diet plan"], icon: "🔥", category: "fatloss", description: "Complete fat loss system to shed body fat while preserving muscle." },
    { id: 2, name: "MUSCLE GAIN", title: "Mass Builder", price8: 8000, price12: 10000, duration8: "8 Weeks", duration12: "12 Weeks", bestFor: ["Skinny to muscular", "Lean bulking"], includes: ["Hypertrophy training", "Progressive overload", "High-protein nutrition"], icon: "💪", category: "musclegain", description: "Scientific muscle building for maximum hypertrophy and strength." },
    { id: 3, name: "BODY RECOMPOSITION", title: "Build + Burn", price8: 8000, price12: 10000, duration8: "8 Weeks", duration12: "12 Weeks", bestFor: ["Beginners", "Athletic look"], includes: ["Build & burn training", "Body tracking", "Flexible nutrition"], icon: "⚡", category: "recomposition", description: "Build muscle while losing fat - most attractive program." },
    { id: 4, name: "CONTEST PREP", title: "Stage Ready", price12: 15000, price16: 20000, duration12: "12 Weeks", duration16: "16 Weeks", bestFor: ["Men's Physique", "Bodybuilding"], includes: ["Peak week", "Posing coaching", "Carb/water manipulation"], icon: "🏆", category: "contest", description: "Elite competition preparation for bodybuilding stage." },
    { id: 5, name: "STRENGTH", title: "Power Athlete", price8: 8000, price12: 10000, duration8: "8 Weeks", duration12: "12 Weeks", bestFor: ["Athletes", "Powerlifting"], includes: ["Strength cycles", "Mobility work", "Recovery management"], icon: "🏋️", category: "strength", description: "Build raw strength and athletic performance." },
    { id: 6, name: "BEGINNER", title: "Foundation", price8: 8000, price12: 10000, duration8: "8 Weeks", duration12: "12 Weeks", bestFor: ["New to gym", "Confidence"], includes: ["Basic plan", "Technique videos", "Simple nutrition"], icon: "🌱", category: "beginner", description: "Perfect for beginners - very high demand program." },
    { id: 7, name: "HOME WORKOUT", title: "No Gym Needed", price8: 8000, price12: 10000, duration8: "8 Weeks", duration12: "12 Weeks", bestFor: ["Busy professionals", "Home workouts"], includes: ["Minimal equipment", "Fat loss circuits", "Home nutrition"], icon: "🏠", category: "home", description: "Effective workouts from home with minimal equipment." },
    { id: 8, name: "WOMEN", title: "Her Journey", price8: 8000, price12: 10000, duration8: "8 Weeks", duration12: "12 Weeks", bestFor: ["Fat loss", "Toning", "Glute building"], includes: ["Glute training", "Toning workouts", "Female nutrition"], icon: "💃", category: "women", description: "Specialized program for women - toning and glute building." },
    { id: 9, name: "SHREDDING", title: "Summer Cut", price8: 8000, price12: 10000, duration8: "8 Weeks", duration12: "12 Weeks", bestFor: ["Summer cut", "Photo prep"], includes: ["Low body fat", "Abs focus", "Peak week"], icon: "❄️", category: "shredding", description: "Extreme conditioning for low body fat and definition." },
    { id: 10, name: "LIFESTYLE", title: "Sustainable Health", priceMonthly: 4000, priceQuarterly: 10000, durationMonthly: "Monthly", durationQuarterly: "3 Months", bestFor: ["Meal planning", "Habit coaching"], includes: ["Meal planning", "Habit coaching", "Supplement guidance"], icon: "🥗", category: "lifestyle", description: "Monthly coaching for sustainable lifestyle and nutrition." }
  ];

  const filteredPrograms = activeFilter === 'all' ? programs : programs.filter(p => p.category === activeFilter);

  // Gallery Images
  const galleryImages = [
    { id: 1, type: "Contest Prep", image: contestPrep1 },
    { id: 2, type: "Fat Loss", image: fatLoss1 },
    { id: 3, type: "Muscle Gain", image: muscleGainPhoto },
    { id: 4, type: "Contest Prep", image: contestPrep2 },
    { id: 5, type: "Fat Loss", image: fatLoss2 },
    { id: 6, type: "Weight Gain", image: weightGainPhoto },
    { id: 7, type: "Contest Prep", image: contestPrep3 },
    { id: 8, type: "Fat Loss", image: fatLoss3 },
    { id: 9, type: "Posing", image: posingPhoto }
  ];

  const featuredImages = galleryImages.slice(0, 3);
  const moreImages = galleryImages.slice(3);

  // Premium Add-Ons
  const premiumAddons = [
    { id: 1, name: "Personalized Diet Plans", price: 999, icon: "🍽️" },
    { id: 2, name: "Monthly Check-ins", price: 499, icon: "📅" },
    { id: 3, name: "Video Consultation", price: 599, icon: "📹" },
    { id: 4, name: "Form Correction", price: 299, icon: "🎯" },
    { id: 5, name: "Supplement Guide", price: 399, icon: "💊" },
    { id: 6, name: "Posing Sessions", price: 999, icon: "💃" },
    { id: 7, name: "Grocery Guide", price: 199, icon: "🛒" },
    { id: 8, name: "Blood Work Review", price: 699, icon: "🩸" }
  ];

  const handleEnrollmentClick = (program, selectedDur) => {
    if (!selectedDur) { alert("⚠️ Please select a duration first!"); return; }
    setSelectedProgramForEnrollment(program);
    setSelectedDurationForEnrollment(selectedDur);
    setShowEnrollmentModal(true);
  };

  const handleEnrollmentSuccess = (userData) => {
    setShowEnrollmentModal(false);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    alert("✅ Enrollment Successful! Redirecting to Dashboard...");
    setTimeout(() => window.location.href = '/dashboard', 1500);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif", color: '#111827', minHeight: '100vh' }}>
      
      {/* TIMER BANNER */}
      <div style={{ background: primaryColor, color: '#fff', textAlign: 'center', padding: '10px 16px', fontSize: '13px', fontWeight: 600 }}>
        ⏰ LIMITED OFFER: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s - Enroll now & get FREE Grocery Guide! ⏰
      </div>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#fff', borderBottom: '1px solid #eef2f6', padding: '16px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={logoImg} alt="MCI" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <div><div style={{ fontWeight: 700, fontSize: '16px' }}>MUSCLE COACH INDIA</div><div style={{ fontSize: '9px', color: primaryColor }}>ELITE TRANSFORMATION</div></div>
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            {['Home', 'Programs', 'Gallery', 'Contact'].map(item => (<a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563', textDecoration: 'none' }}>{item}</a>))}
            <a href={`tel:${CONTACT_NUMBER}`} style={{ background: primaryColor, color: '#fff', padding: '8px 20px', borderRadius: '30px', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>📞 Call Now</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - TWO SIDE LAYOUT */}
      <section ref={targetRef} style={{ padding: '80px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          
          {/* LEFT SIDE - Text Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'inline-block', background: primaryLight, padding: '4px 12px', borderRadius: '20px', marginBottom: '24px' }}>
              <span style={{ fontSize: '12px', color: primaryColor, fontWeight: 600 }}>🔥 TRANSFORMATION EXPERTS 🔥</span>
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 70px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
              Transform Your<br /><span style={{ color: primaryColor }}>Body & Life</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: 32, maxWidth: '500px', lineHeight: 1.6 }}>
              Premium physique transformation programs designed for muscle gain, fat loss, strength building, and complete body transformation.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: 48 }}>
              <a href="#programs"><button style={{ background: primaryColor, color: '#fff', padding: '14px 32px', borderRadius: '40px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>Explore Programs →</button></a>
              <a href={WHATSAPP_LINK} target="_blank"><button style={{ background: 'transparent', border: '2px solid #e5e7eb', color: '#4b5563', padding: '14px 32px', borderRadius: '40px', fontWeight: 600, cursor: 'pointer' }}>💬 Free Consultation</button></a>
            </div>
            <div style={{ display: 'flex', gap: '48px' }}>
              <div><div style={{ fontSize: '32px', fontWeight: 800, color: primaryColor }}>500+</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>HAPPY CLIENTS</div></div>
              <div><div style={{ fontSize: '32px', fontWeight: 800, color: primaryColor }}>10+</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>YEARS EXPERTISE</div></div>
              <div><div style={{ fontSize: '32px', fontWeight: 800, color: primaryColor }}>100%</div><div style={{ fontSize: '11px', color: '#9ca3af' }}>SATISFACTION</div></div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Coach Image */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <img src={coachImg} alt="Coach Shiva" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', bottom: '20px', left: '20px', background: '#fff', padding: '10px 20px', borderRadius: '40px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ width: '8px', height: '8px', background: primaryColor, borderRadius: '50%' }} /><span style={{ fontSize: '11px', fontWeight: 600 }}>SHIVA • ELITE COACH</span></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROGRAMS SECTION - WITH FILTERS */}
      <section id="programs" style={{ padding: '80px 32px', background: lightBg }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: primaryColor, fontSize: '11px', letterSpacing: '4px' }}>OUR PROGRAMS</span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 700, marginTop: 12 }}>Choose Your <span style={{ color: primaryColor }}>Transformation Path</span></h2>
            
            {/* Filter Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: 24 }}>
              {[
                { id: 'all', label: 'All Programs', icon: '📋' },
                { id: 'fatloss', label: 'Fat Loss', icon: '🔥' },
                { id: 'musclegain', label: 'Muscle Gain', icon: '💪' },
                { id: 'contest', label: 'Contest Prep', icon: '🏆' },
                { id: 'women', label: 'Women', icon: '💃' },
              ].map(filter => (
                <button key={filter.id} onClick={() => setActiveFilter(filter.id)} style={{ padding: '8px 20px', borderRadius: '30px', border: activeFilter === filter.id ? `2px solid ${primaryColor}` : '1px solid #e5e7eb', background: activeFilter === filter.id ? primaryLight : '#fff', color: activeFilter === filter.id ? primaryColor : '#4b5563', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>{filter.icon} {filter.label}</button>
              ))}
            </div>
          </div>

          {/* Programs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
            {filteredPrograms.map((program, idx) => {
              const [selectedDur, setSelectedDur] = useState(null);
              return (
                <motion.div key={program.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} style={{ background: '#fff', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: `1px solid ${primaryColor}20` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 20 }}>
                    <span style={{ fontSize: '48px' }}>{program.icon}</span>
                    <div><h3 style={{ fontSize: '18px', fontWeight: 700 }}>{program.name}</h3><p style={{ color: primaryColor, fontSize: '12px', fontWeight: 600 }}>{program.title}</p></div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, marginBottom: 16 }}>{program.description}</p>
                  <div style={{ marginBottom: 16 }}><p style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', marginBottom: 6 }}>📌 BEST FOR:</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{program.bestFor.map((item, i) => (<span key={i} style={{ background: primaryLight, padding: '3px 10px', borderRadius: '15px', fontSize: '10px', color: primaryColor }}>{item}</span>))}</div></div>
                  <div style={{ marginBottom: 20 }}><p style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', marginBottom: 6 }}>✓ INCLUDES:</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>{program.includes.map((item, i) => (<span key={i} style={{ background: '#f0fdf4', padding: '3px 10px', borderRadius: '15px', fontSize: '10px', color: '#16a34a' }}>{item}</span>))}</div></div>
                  
                  <div style={{ borderTop: `1px solid ${primaryColor}20`, paddingTop: 16, marginTop: 8 }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', marginBottom: 10 }}>⏱️ SELECT DURATION:</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: 16 }}>
                      {program.price8 && <button onClick={() => setSelectedDur({ duration: program.duration8, price: program.price8 })} style={{ padding: "6px 16px", borderRadius: "30px", fontSize: "12px", fontWeight: 500, border: selectedDur?.duration === program.duration8 ? `2px solid ${primaryColor}` : `1px solid ${primaryColor}30`, background: selectedDur?.duration === program.duration8 ? primaryColor : 'transparent', color: selectedDur?.duration === program.duration8 ? '#fff' : '#4b5563', cursor: "pointer" }}>{program.duration8} - ₹{program.price8}</button>}
                      {program.price12 && <button onClick={() => setSelectedDur({ duration: program.duration12, price: program.price12 })} style={{ padding: "6px 16px", borderRadius: "30px", fontSize: "12px", fontWeight: 500, border: selectedDur?.duration === program.duration12 ? `2px solid ${primaryColor}` : `1px solid ${primaryColor}30`, background: selectedDur?.duration === program.duration12 ? primaryColor : 'transparent', color: selectedDur?.duration === program.duration12 ? '#fff' : '#4b5563', cursor: "pointer" }}>{program.duration12} - ₹{program.price12}</button>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div><span style={{ fontSize: '24px', fontWeight: 700, color: primaryColor }}>₹{selectedDur?.price || program.price8}</span><span style={{ fontSize: '12px', color: '#9ca3af' }}> / {selectedDur?.duration || program.duration8}</span></div>
                      <button onClick={() => handleEnrollmentClick(program, selectedDur || { duration: program.duration8, price: program.price8 })} style={{ background: primaryColor, color: '#fff', padding: "8px 20px", borderRadius: "30px", fontWeight: 600, fontSize: "12px", border: "none", cursor: "pointer" }}>Enroll →</button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - PROFESSIONAL RESULTS */}
      <section id="gallery" style={{ padding: '80px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: primaryColor, fontSize: '11px', letterSpacing: '4px' }}>TRANSFORMATION GALLERY</span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 700, marginTop: 12 }}>Real <span style={{ color: primaryColor }}>Results</span></h2>
            <p style={{ color: '#6b7280', marginTop: 12 }}>See the amazing transformations of our clients</p>
          </div>

          {/* Featured Images */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
            {featuredImages.map((img, idx) => (
              <motion.div key={idx} whileHover={{ y: -8 }} style={{ background: '#f9fafb', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ height: '300px', overflow: 'hidden', background: '#f3f4f6' }}>
                  <img src={img.image} alt="Transformation" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f3f4f6' }} />
                </div>
                <div style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{ background: primaryLight, padding: '4px 12px', borderRadius: '20px', fontSize: '11px', color: primaryColor }}>{img.type}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          {!showAllResults && (
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <button onClick={() => setShowAllResults(true)} style={{ background: primaryColor, color: '#fff', padding: '12px 32px', borderRadius: '40px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>View More Results →</button>
            </div>
          )}

          {/* All Images */}
          {showAllResults && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: 48 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
                {moreImages.map((img, idx) => (
                  <div key={idx} style={{ background: '#f9fafb', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ height: '260px', overflow: 'hidden', background: '#f3f4f6' }}>
                      <img src={img.image} alt="Transformation" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f3f4f6' }} />
                    </div>
                    <div style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ background: primaryLight, padding: '4px 12px', borderRadius: '20px', fontSize: '10px', color: primaryColor }}>{img.type}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button onClick={() => setShowAllResults(false)} style={{ background: 'transparent', border: `1px solid ${primaryColor}`, color: primaryColor, padding: '8px 24px', borderRadius: '30px', cursor: 'pointer' }}>Show Less ↑</button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* PREMIUM ADD-ONS */}
      <section style={{ padding: '80px 32px', background: lightBg }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ color: primaryColor, fontSize: '11px', letterSpacing: '4px' }}>PREMIUM SERVICES</span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 700, marginTop: 12 }}>Premium <span style={{ color: primaryColor }}>Add-Ons</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '20px' }}>
            {premiumAddons.map((addon) => (
              <div key={addon.id} style={{ background: '#fff', borderRadius: '12px', padding: '20px', textAlign: 'center', border: `1px solid ${primaryColor}20` }}>
                <div style={{ fontSize: '35px' }}>{addon.icon}</div>
                <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{addon.name}</h4>
                <div style={{ fontSize: '22px', fontWeight: 700, color: primaryColor }}>₹{addon.price}</div>
                <button onClick={() => alert(`✅ Added ${addon.name} to cart!`)} style={{ width: '100%', background: primaryColor, color: '#fff', border: 'none', padding: '8px', borderRadius: '30px', cursor: 'pointer' }}>Add →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ padding: '80px 32px', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}><span style={{ color: primaryColor, fontSize: '11px', letterSpacing: '4px' }}>FAQ</span><h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 700, marginTop: 12 }}>Frequently Asked <span style={{ color: primaryColor }}>Questions</span></h2></div>
          <div style={{ display: 'grid', gap: '16px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: lightBg, padding: '20px 24px', borderRadius: '16px', border: `1px solid ${primaryColor}20` }}>
                <h4 style={{ fontWeight: 600, marginBottom: 8 }}>❓ {faq.q}</h4>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ padding: '80px 32px', background: lightBg, textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{ color: primaryColor, fontSize: '11px', letterSpacing: '4px' }}>GET IN TOUCH</span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 700, marginBottom: 40 }}>Start Your <span style={{ color: primaryColor }}>Journey Today</span></h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <a href={`tel:${CONTACT_NUMBER}`}><div style={{ padding: '20px 32px', background: '#fff', borderRadius: '16px', border: `1px solid ${primaryColor}20` }}><div style={{ fontSize: '28px' }}>📞</div><p style={{ fontWeight: 600 }}>{CONTACT_NUMBER}</p></div></a>
            <a href={WHATSAPP_LINK} target="_blank"><div style={{ padding: '20px 32px', background: '#fff', borderRadius: '16px', border: `1px solid ${primaryColor}20` }}><div style={{ fontSize: '28px' }}>💬</div><p style={{ fontWeight: 600 }}>WhatsApp</p></div></a>
            <div style={{ padding: '20px 32px', background: '#fff', borderRadius: '16px', border: `1px solid ${primaryColor}20` }}><div style={{ fontSize: '28px' }}>📧</div><p style={{ fontWeight: 600 }}>{EMAIL}</p></div>
          </div>
        </div>
      </section>

      {/* ENROLLMENT MODAL */}
      {showEnrollmentModal && selectedProgramForEnrollment && (
        <EnrollmentModal
          program={selectedProgramForEnrollment}
          selectedDuration={selectedDurationForEnrollment}
          onClose={() => setShowEnrollmentModal(false)}
          onSuccess={handleEnrollmentSuccess}
        />
      )}

      {/* FOOTER */}
      <footer style={{ padding: '48px 32px', background: '#111827', color: '#9ca3af', textAlign: 'center' }}>
        <div style={{ marginBottom: 24, fontWeight: 600, color: '#fff' }}>MUSCLE COACH INDIA</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', fontSize: '12px', flexWrap: 'wrap', marginBottom: 20 }}><span>© 2026 All Rights Reserved</span><span>Privacy</span><span>Terms</span><span>Refunds</span></div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ position: 'fixed', bottom: '20px', right: '20px', width: '50px', height: '50px', background: primaryColor, color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>↑</button>
      )}

      {/* FLOATING WHATSAPP */}
      <a href={WHATSAPP_LINK} target="_blank" style={{ position: 'fixed', bottom: '20px', right: '90px', background: '#25D366', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}><span style={{ fontSize: '28px' }}>💬</span></a>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

export default Home;