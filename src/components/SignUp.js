import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return value.length < 3 ? 'Name must be at least 3 characters long' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'password':
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasMinLength = value.length >= 8;
        
        if (!hasMinLength) return 'Password must be at least 8 characters long';
        if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
        if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
        if (!hasNumber) return 'Password must contain at least one number';
        return '';
      
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      case 'mobile':
        return !/^\d{10}$/.test(value) ? 'Please enter a valid 10-digit mobile number' : '';
      default:
        return '';
    }
  };

  // Update handleChange to include password strength check
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  
    // Update confirm password validation when password changes
    if (name === 'password' && formData.confirmPassword) {
      const confirmError = formData.confirmPassword !== value ? 'Passwords do not match' : '';
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="login-header">
          <div className="logo-container">
            <svg className="login-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="login-title">Create Account</h1>
          <p className="login-subtitle">Join Flipzone today</p>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? 'error' : ''}
            required
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            required
          />
          <button 
            type="button" 
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          {errors.mobile && <span className="error-message">{errors.mobile}</span>}
        </div>

        <button type="submit">Sign Up</button>
        <button type="button" className="secondary-button" onClick={() => navigate('/login')}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;