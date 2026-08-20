import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowUpRight, 
  CalendarDays, 
  Camera, 
  Mail, 
  Menu, 
  Phone, 
  Sparkles, 
  Star, 
  X,
  CheckCircle2,
  MessageCircle,
  Eye,
  Sliders,
  Share2,
  Check
} from 'lucide-react';
import './styles.css';

const defaultReviews = [];
const FAKE_NAMES = ['Aaradhya S.', 'Naveen & Maya', 'Aditi K.'];

const galleryItems = [
  { label: '01 — Wedding reception', src: '/wedding-counter.png', category: 'weddings' },
  { label: '02 — Corporate functions', src: '/corporate-event.png', category: 'corporate' },
  { label: '03 — College farewell', src: '/college-farewell.png', category: 'farewell' },
  { label: '04 — Birthday & Party', src: '/roopa-live-keychain.png', category: 'parties' }
];

const presetPhotos = [
  '/wedding-counter.png',
  '/corporate-event.png',
  '/college-farewell.png',
  '/roopa-live-keychain.png'
];

function Stars({ count = 5 }) {
  return (
    <span className="stars">
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={15} fill="currentColor" />
      ))}
    </span>
  );
}

function Header({ open, setOpen, onOpenBook }) {
  return (
    <header>
      <a className="brand" href="#top">
        <span>R</span>Roopa Creations
      </a>
      <nav className={open ? 'open' : ''}>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#gallery" onClick={() => setOpen(false)}>Gallery</a>
        <a href="#customizer" onClick={() => setOpen(false)}>Live Simulator</a>
        <a href="#services" onClick={() => setOpen(false)}>Services</a>
        <a href="#reviews" onClick={() => setOpen(false)}>Reviews</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
      <button className="header-cta" onClick={onOpenBook}>
        Book your date <ArrowUpRight size={16} />
      </button>
      <button className="menu" aria-label="menu" onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function BookingModal({ isOpen, onClose, defaultProduct = 'Instant Photo Magnets', showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Wedding',
    eventDate: '',
    location: '',
    guestCount: '100 - 250 guests',
    product: defaultProduct,
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(prev => ({ ...prev, product: defaultProduct }));
  }, [defaultProduct]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      _subject: `New Event Booking Inquiry - ${formData.name}`,
      form_type: 'Event Booking Inquiry',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      eventType: formData.eventType,
      eventDate: formData.eventDate || 'TBD',
      location: formData.location || 'TBD',
      guestCount: formData.guestCount,
      product: formData.product,
      notes: formData.notes || 'None'
    };

    try {
      await fetch('https://formspree.io/f/xqpznagg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Formspree submit notice:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Inquiry submitted successfully!');

      // Prepare WhatsApp pre-filled message as direct chat backup
      const message = `Hi Roopa Creations! I would like to book a stall for my event.%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Event Type:* ${encodeURIComponent(formData.eventType)}%0A*Date:* ${encodeURIComponent(formData.eventDate || 'TBD')}%0A*Location:* ${encodeURIComponent(formData.location || 'TBD')}%0A*Guests:* ${encodeURIComponent(formData.guestCount)}%0A*Preferred Keepsake:* ${encodeURIComponent(formData.product)}%0A*Notes:* ${encodeURIComponent(formData.notes)}`;

      window.open(`https://wa.me/919019720502?text=${message}`, '_blank');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <CheckCircle2 size={56} color="#c94f71" style={{ margin: '0 auto 16px' }} />
            <h2>Thank You, {formData.name}!</h2>
            <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6', margin: '14px 0 24px' }}>
              We've opened WhatsApp to directly send your details to our team. We will get back to you with custom package options within 2 hours.
            </p>
            <button className="button" onClick={() => { setSubmitted(false); onClose(); }}>
              Close Window
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow" style={{ margin: '0 0 8px' }}>
              <CalendarDays size={14} /> BOOK YOUR EVENT STALL
            </p>
            <h2>Let's stick around at your event</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '0 0 20px' }}>
              Fill in your event details below to get an instant quote and date availability confirmation.
            </p>

            <form onSubmit={handleSubmit} className="booking-form-grid">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                >
                  <option value="Wedding">Wedding / Reception</option>
                  <option value="Corporate Function">Corporate Function</option>
                  <option value="College Farewell">College Farewell / Fest</option>
                  <option value="Birthday Party">Birthday Celebration</option>
                  <option value="Engagement">Engagement Party</option>
                  <option value="Baby Shower">Baby Shower / Naming Ceremony</option>
                  <option value="Other Celebration">Other Special Event</option>
                </select>
              </div>

              <div>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="City / Venue Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                >
                  <option value="Under 100 guests">Under 100 guests</option>
                  <option value="100 - 250 guests">100 - 250 guests</option>
                  <option value="250 - 500 guests">250 - 500 guests</option>
                  <option value="500+ guests">500+ guests</option>
                </select>
              </div>

              <div>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                >
                  <option value="Instant Photo Magnets">Instant Photo Magnets</option>
                  <option value="Live Acrylic Keychains">Live Acrylic Keychains</option>
                  <option value="Combo Stall (Magnets + Keychains)">Combo Stall (Both)</option>
                </select>
              </div>

              <div className="full-width">
                <textarea
                  placeholder="Any special requests or event theme notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <div className="full-width" style={{ marginTop: '8px' }}>
                <button 
                  type="submit" 
                  className="button" 
                  disabled={isSubmitting} 
                  style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry via WhatsApp'} <ArrowUpRight size={17} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookingProduct, setBookingProduct] = useState('Instant Photo Magnets');
  const [toastMessage, setToastMessage] = useState(null);

  // Customizer Simulator state
  const [simTitle, setSimTitle] = useState('Rahul & Ananya');
  const [simSub, setSimSub] = useState('24.10.2026 • Wedding Celebration');
  const [simTheme, setSimTheme] = useState('gold');
  const [simType, setSimType] = useState('magnet');
  const [simPhoto, setSimPhoto] = useState('/roopa-live-keychain.png');

  // Reviews state with persistence (only real user reviews)
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('roopaReviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(r => !FAKE_NAMES.includes(r.name));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [reviewForm, setReviewForm] = useState({ name: '', text: '', rating: 5 });

  useEffect(() => {
    localStorage.setItem('roopaReviews', JSON.stringify(reviews));
  }, [reviews]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) return;

    const newRev = { ...reviewForm };
    setReviews([newRev, ...reviews]);
    setReviewForm({ name: '', text: '', rating: 5 });
    showToast('Thank you for submitting your review!');

    // Send copy to Formspree
    try {
      await fetch('https://formspree.io/f/xqpznagg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Customer Review - ${newRev.name}`,
          form_type: 'Customer Review',
          name: newRev.name,
          rating: `${newRev.rating} Stars`,
          review_text: newRev.text
        })
      });
    } catch (err) {
      console.warn('Formspree review submit notice:', err);
    }
  };

  const filteredGallery = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const openBookingWithProduct = (prodName) => {
    setBookingProduct(prodName);
    setIsBookModalOpen(true);
  };

  return (
    <>
      <div className="page" id="top">
        <Header 
          open={menu} 
          setOpen={setMenu} 
          onOpenBook={() => openBookingWithProduct('Instant Photo Magnets')} 
        />

        <main>
          {/* HERO SECTION */}
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">
                <Sparkles size={15} /> LIVE EVENT KEEPSAKES
              </p>
              <h1>
                Roopa Creations <i>– Live Fridge magnet and key chain stall at your event</i>
              </h1>
              <p className="hero-lead">
                A little memory your guests can take home, made right there in the moment.
              </p>
              <div className="hero-actions">
                <button 
                  className="button" 
                  onClick={() => openBookingWithProduct('Instant Photo Magnets')}
                >
                  Make your event memorable <ArrowUpRight size={17} />
                </button>
                <a href="#gallery" className="text-link">
                  Explore our moments <span>↓</span>
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src="/roopa-live-keychain.png" alt="Roopa Creations live keychain making counter" />
              <div className="floating-card">
                <Camera />
                <b>Made live</b>
                <span>at your celebration</span>
              </div>
            </div>
          </section>

          {/* INTRO SECTION */}
          <section className="intro" id="about">
            <div className="intro-image">
              <img 
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85" 
                alt="Wedding guests smiling" 
              />
            </div>
            <div className="intro-copy">
              <p className="eyebrow">A GUEST EXPERIENCE</p>
              <h2>Give your guests a fun, memorable takeaway with our live fridge magnet stall</h2>
              <p>
                We photograph your guests on the spot, print them instantly, and transform them into premium personalized fridge magnets and keychains—right at your event.
              </p>
              <a className="text-link" href="#services">
                Discover the experience <ArrowUpRight size={16} />
              </a>
            </div>
          </section>

          {/* INTERACTIVE GALLERY SECTION */}
          <section id="gallery" className="gallery">
            <div className="section-heading">
              <div>
                <p className="eyebrow">FROM THE STALL</p>
                <h2>Fresh off the printer</h2>
                <p className="gallery-intro">
                  A few frames from recent weddings, birthdays, farewells, and corporate nights.
                </p>
              </div>
              <button 
                className="text-link" 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => openBookingWithProduct('Live Event Stall')}
              >
                Plan yours <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Category Filter Buttons */}
            <div className="gallery-filters">
              {[
                { id: 'all', label: 'All Celebrations' },
                { id: 'weddings', label: 'Weddings' },
                { id: 'corporate', label: 'Corporate' },
                { id: 'farewell', label: 'Farewells' },
                { id: 'parties', label: 'Parties' }
              ].map(cat => (
                <button
                  key={cat.id}
                  className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="gallery-grid">
              {filteredGallery.map((item) => (
                <figure key={item.label} onClick={() => setSelectedImage(item)}>
                  <div className="pin" />
                  <img src={item.src} alt={item.label} />
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="gallery-tail">
              …and plenty more from baby showers, engagement parties, and every other celebration worth printing.
            </p>
          </section>

          {/* LIVE MAGNET / KEYCHAIN SIMULATOR (WOW FEATURE) */}
          <section id="customizer" className="customizer">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
              <p className="eyebrow" style={{ justifyContent: 'center' }}>
                <Sliders size={14} /> INTERACTIVE SIMULATOR
              </p>
              <h2 style={{ font: "600 clamp(30px, 3.4vw, 44px)/1.13 'Playfair Display'" }}>
                Preview your event keepsake live
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '12px' }}>
                Customize your event title, border frame style, and keepsake type to see how your guests' souvenir will look!
              </p>
            </div>

            <div className="customizer-grid">
              {/* Simulator Controls */}
              <div className="customizer-controls">
                <div className="control-group">
                  <label>Event Name / Couple Title</label>
                  <input
                    type="text"
                    value={simTitle}
                    onChange={(e) => setSimTitle(e.target.value)}
                    placeholder="e.g. Rahul & Ananya"
                  />
                </div>

                <div className="control-group">
                  <label>Event Date & Subtitle</label>
                  <input
                    type="text"
                    value={simSub}
                    onChange={(e) => setSimSub(e.target.value)}
                    placeholder="e.g. 24.10.2026 • Wedding"
                  />
                </div>

                <div className="control-group">
                  <label>Keepsake Format</label>
                  <select value={simType} onChange={(e) => setSimType(e.target.value)}>
                    <option value="magnet">Fridge Magnet (Flat Matte/Gloss)</option>
                    <option value="keychain">Acrylic Photo Keychain (Crystal Frame)</option>
                  </select>
                </div>

                <div className="control-group">
                  <label>Border Theme Style</label>
                  <select value={simTheme} onChange={(e) => setSimTheme(e.target.value)}>
                    <option value="gold">Royal Gold Border</option>
                    <option value="pink">Roopa Signature Pink</option>
                    <option value="dark">Midnight Dark Elegance</option>
                    <option value="classic">Classic Clean White</option>
                  </select>
                </div>

                <div className="control-group">
                  <label>Select Sample Photo</label>
                  <div className="preset-photos">
                    {presetPhotos.map((p, idx) => (
                      <img
                        key={idx}
                        src={p}
                        alt={`Sample ${idx + 1}`}
                        className={simPhoto === p ? 'active' : ''}
                        onClick={() => setSimPhoto(p)}
                      />
                    ))}
                  </div>
                </div>

                <button
                  className="button"
                  style={{ marginTop: '10px' }}
                  onClick={() => openBookingWithProduct(`${simType === 'magnet' ? 'Fridge Magnet' : 'Acrylic Keychain'} - Theme: ${simTheme}`)}
                >
                  Book Stall with this Design <ArrowUpRight size={16} />
                </button>
              </div>

              {/* Real-time Preview Component */}
              <div className="simulator-preview">
                {simType === 'keychain' && <div className="keychain-ring" />}
                
                <div className={`magnet-frame ${simTheme} ${simType}`}>
                  <img src={simPhoto} alt="Live Preview" className="magnet-img" />
                  <div className="magnet-caption">
                    <b>{simTitle || 'Your Event Title'}</b>
                    <span>{simSub || 'Live Souvenir'}</span>
                  </div>
                </div>

                <span style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '20px' }}>
                  ✨ Prints live at your venue in under 2 minutes
                </span>
              </div>
            </div>
          </section>

          {/* SERVICES SECTION */}
          <section id="services" className="services">
            <p className="eyebrow">WHAT WE BRING</p>
            <h2>
              A live counter full of<br />
              <i>little happy moments.</i>
            </h2>

            <div className="service-grid">
              <article>
                <Sparkles />
                <h3>Instant Photo Magnets</h3>
                <p>
                  High-gloss magnetic photo keepsakes printed on-site in under two minutes for your guests to display on their fridge forever.
                </p>
              </article>

              <article>
                <Camera />
                <h3>Live Acrylic Keychains</h3>
                <p>
                  Durable, double-sided clear acrylic keychains custom crafted right at your event stall for a portable daily memory.
                </p>
              </article>

              <article>
                <CalendarDays />
                <h3>Custom Event Branding</h3>
                <p>
                  Tailored photo borders printed with host names, event date, custom logo, or hashtag on every single print.
                </p>
              </article>
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section className="process">
            <div className="process-heading">
              <div>
                <p className="eyebrow">
                  <span className="dot" /> Roopa Creations
                </p>
                <h2>
                  Set up, snap, <i>stick</i>
                </h2>
              </div>
              <p>Three simple steps. One unforgettable takeaway.</p>
            </div>
            <div className="process-grid">
              <article>
                <span>01</span>
                <h3>We set up on-site</h3>
                <p>
                  Our team arrives an hour early with camera, high-speed printer, and a compact setup — fits in any corner of your venue.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Guests strike a pose</h3>
                <p>
                  A quick capture at the stall, guided by our photographer. No app, no login, no waiting in a long line.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Magnet in hand</h3>
                <p>
                  A durable, fridge-ready photo magnet prints in under two minutes — a keepsake guests actually keep.
                </p>
              </article>
            </div>
          </section>

          {/* BOOKING CTA BANNER */}
          <section className="booking" id="book">
            <div>
              <p className="eyebrow">GET IN TOUCH</p>
              <h2>Let's stick around at your next event</h2>
              <p>
                Tell us the date, the venue, and the headcount—we'll send a quote with custom package options the same day.
              </p>
            </div>
            <button className="button light" onClick={() => openBookingWithProduct('Instant Stall Booking')}>
              Start a conversation <ArrowUpRight size={17} />
            </button>
          </section>

          {/* REVIEWS SECTION */}
          <section id="reviews" className="reviews">
            <div className="section-heading">
              <div>
                <p className="eyebrow">KIND WORDS</p>
                <h2>Made with love. Remembered with joy.</h2>
              </div>
              <Stars count={5} />
            </div>

            {reviews.length ? (
              <div className="review-grid">
                {reviews.slice(0, 6).map((r, i) => (
                  <article className="review" key={i}>
                    <Stars count={r.rating} />
                    <p>“{r.text}”</p>
                    <b>{r.name}</b>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty-reviews">Be the first to share your experience with Roopa Creations.</p>
            )}

            {/* Submit Review Form */}
            <div className="review-form">
              <div>
                <p className="eyebrow">SHARE YOUR EXPERIENCE</p>
                <h3>Were we part of your day?</h3>
                <p>Your words help future hosts find us.</p>
              </div>
              <form onSubmit={handleReviewSubmit}>
                <input
                  aria-label="Your name"
                  placeholder="Your name *"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                />
                <textarea
                  aria-label="Your review"
                  placeholder="Tell us about your experience with Roopa Creations..."
                  required
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                />
                <label>
                  Rating
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: +e.target.value })}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option value={n} key={n}>
                        {n} stars
                      </option>
                    ))}
                  </select>
                </label>
                <button className="button" type="submit">
                  Submit review <ArrowUpRight size={16} />
                </button>
              </form>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer id="contact">
          <div className="brand">
            <span>R</span>Roopa Creations
          </div>
          <div>
            <a href="tel:9019720502">
              <Phone size={15} /> 9019720502 / 8618912538
            </a>
            <a href="mailto:roopacreations.official@gmail.com">
              <Mail size={15} /> roopacreations.official@gmail.com
            </a>
          </div>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <a 
              className="insta" 
              href="https://wa.me/919019720502" 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a className="insta" href="#top" aria-label="Back to top">
              Top ↑
            </a>
          </div>
        </footer>
      </div>

      {/* LIGHTBOX MODAL FOR GALLERY */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              <X size={20} />
            </button>
            <img src={selectedImage.src} alt={selectedImage.label} className="lightbox-img" />
            <div className="lightbox-caption">
              <div>
                <h4>{selectedImage.label}</h4>
                <span style={{ fontSize: '12px', color: '#a4a7ad' }}>Live Stall Photo Keepake</span>
              </div>
              <button 
                className="button"
                style={{ padding: '8px 16px', fontSize: '12px' }}
                onClick={() => {
                  setSelectedImage(null);
                  openBookingWithProduct(`Inquiry from gallery: ${selectedImage.label}`);
                }}
              >
                Inquire For Your Event <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      <BookingModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
        defaultProduct={bookingProduct}
        showToast={showToast}
      />

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/919019720502?text=Hi%20Roopa%20Creations!%20I%20am%20interested%20in%20booking%20a%20Live%20Keychain%20%26%20Fridge%20Magnet%20stall%20for%20my%20event." 
        target="_blank" 
        rel="noreferrer" 
        className="floating-whatsapp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="toast">
          <Check size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
