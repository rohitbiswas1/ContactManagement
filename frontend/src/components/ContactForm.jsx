import React, { useState, useRef } from 'react';

function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstInputRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Contact added successfully');
        setFormData({ name: '', email: '', phone: '', message: '' });
        onSubmit();
        firstInputRef.current?.focus();
      } else {
        const err = await response.json().catch(() => ({}));
        setStatusMessage(err.message || 'Failed to add contact');
      }
    } catch (error) {
      setStatusMessage('Network error. Try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  const isFormValid =
    formData.name.trim() &&
    /^\d{10}$/.test(formData.phone) &&
    (!formData.email || /\S+@\S+\.\S+/.test(formData.email));

  return (
    <section className="card contact-form">
      <h2 className="card-title">Add Contact</h2>

      <form className="form-grid" onSubmit={handleSubmit} noValidate>
        <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
          <label>Name</label>
          <input
            name="name"
            ref={firstInputRef}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="field-error">{errors.name}</div>}
        </div>

        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>

        <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
          <label>Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="field-error">{errors.phone}</div>}
        </div>

        <div className="form-group full">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button className="btn primary" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Add Contact'}
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={() =>
              setFormData({ name: '', email: '', phone: '', message: '' })
            }
            disabled={isSubmitting}
          >
            Reset
          </button>
        </div>
      </form>

      {statusMessage && <div className="status-message">{statusMessage}</div>}
    </section>
  );
}

export default ContactForm;
