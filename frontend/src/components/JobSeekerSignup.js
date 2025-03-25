import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/JobSeekerSignup.css'; // Make sure this path is correct
import '../styles/ToastStyles.css'; 
import jobSearchImage1 from '../assets/image1.png';
import jobSearchImage2 from '../assets/image2.png'; // Step 2 image
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const images = [
  jobSearchImage1,
  jobSearchImage2,
];

const JobSeekerSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    sur_name: '',
    phone_number: '',
    district: '',
    date_of_birth: '',
    age: '',
    gender_type: 'Male',
    id_no: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const navigate = useNavigate(); // Initialize navigate

  // Email validation: Check if email exists
  const validateEmail = async () => {
    if (!formData.email) {
      toast.error('Please enter your email.'); // Show toast notification
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/jobseekers/check-email', {
        email: formData.email,
      });
      if (res.data.exists) {
        toast.error('Email already exists. Please use a different one.'); // Show toast notification
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email already exists. Please use a different one.'); // Show toast notification for conflict
      } else {
        console.error('Error checking email:', error);
        toast.error('Error validating email. Try again later.'); // Show generic error notification
      }
    }
  };

  // Check email on blur
  const handleEmailBlur = () => {
    validateEmail();
  };

  const nextStep = () => {
    let requiredFields = [];

    switch (step) {
      case 1:
        requiredFields = ['email', 'password', 'confirm_password'];
        // Validate password match before moving to the next step
        if (formData.password !== formData.confirm_password) {
          toast.error("Passwords do not match."); // Show toast notification for password mismatch
          return; // Prevent moving to the next step
        }
        break;
      case 2:
        requiredFields = ['first_name', 'sur_name','phone_number', 'district', 'id_no', 'age'];
        break;
      default:
        break;
    }

    // Check if all required fields are filled
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field.replace('_', ' ')} field.`); // Show toast notification for missing fields
        return; // Prevent moving to the next step
      }
    }

    // Move to the next step
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    // Check if passwords match on form submission
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match."); // Show toast notification for password mismatch
      return; // Prevent form submission
    }

    try {
      const res = await axios.post('http://localhost:5000/api/jobseekers/signup', data);
        // Show success notification with custom duration
    toast.success(res.data.message, {
      autoClose: 2000, // Set this to the same value as the timeout
    });
       // Delay navigation until the toast notification has completed
    setTimeout(() => {
      navigate('/login');
    }, 2000); // Adjust the timeout duration (3000ms = 3 seconds) as needed
    } catch (err) {
      console.error(err);
      toast.error('Signup failed.'); // Show toast notification for signup failure
    }
  };

  const handleDateFocus = (e) => {
    e.target.type = 'date';
  };
  
  const handleDateBlur = (e) => {
    if (!e.target.value) e.target.type = 'text';
  };
  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
           <div className="form-step">
      <h2>Account Information</h2>
      <h4>Please Fill All The Information In Each Step To Get The Best Experience</h4>

      {/* Email Input */}
      <div className="floating-label-input">
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          required
          className="floating-input"
          placeholder=" "
        />
        <label htmlFor="email" className="floating-label">Enter Your Email</label>
      </div>

      {/* Password Input */}
      <div className="floating-label-input">
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="floating-input"
          placeholder=" "
        />
        <label htmlFor="password" className="floating-label">Enter Your Password</label>
      </div>

      {/* Confirm Password Input */}
      <div className="floating-label-input">
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
          className="floating-input"
          placeholder=" "
        />
        <label htmlFor="confirm_password" className="floating-label">Confirm Password</label>
      </div>

      {/* Navigation Buttons */}
      <div className="button-group">
        {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
        <button type="button" className="btnnext" onClick={nextStep}>Next</button>
      </div>

      {/* Login Prompt */}
      <h4 className="login-prompt">
        Already Have An Account? <a href="/login" className="login-link">Login Now</a>
      </h4>
    </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2 className='pi'>Personal Informations</h2>
            {/* First Name and Surname */}
      <div className="inline-input-group">
        <div className="floating-label-input">
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="floating-input"
            placeholder=" "
          />
          <label htmlFor="first_name" className="floating-label">First Name</label>
        </div>

        <div className="floating-label-input">
          <input
            type="text"
            name="sur_name"
            id="sur_name"
            value={formData.sur_name}
            onChange={handleChange}
            required
            className="floating-input"
            placeholder=" "
          />
          <label htmlFor="sur_name" className="floating-label">Surname</label>
        </div>
      </div>

      {/* Phone Number */}
      <div className="floating-label-input">
        <input
          type="text"
          name="phone_number"
          id="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          className="floating-input"
          placeholder=" "
        />
        <label htmlFor="phone_number" className="floating-label">Phone Number</label>
      </div>

      {/* District */}
      <div className="floating-label-input">
        <input
          type="text"
          name="district"
          id="district"
          value={formData.district}
          onChange={handleChange}
          className="floating-input"
          placeholder=" "
        />
        <label htmlFor="district" className="floating-label">District</label>
      </div>

      {/* Date of Birth, Age, Gender */}
      <div className="inline-input-group">
        <div className="floating-label-input">
          <input
            type="text"
            name="date_of_birth"
            id="date_of_birth"
            value={formData.date_of_birth}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
            onChange={handleChange}
            className="floating-input"
            placeholder=" "
          />
          <label htmlFor="date_of_birth" className="floating-label">Date of Birth</label>
        </div>

        <div className="floating-label-input">
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            className="floating-input"
            placeholder=" "
          />
          <label htmlFor="age" className="floating-label2">Age</label>
        </div>

        <div className="floating-label-input">
          <select
            name="gender_type"
            id="gender_type"
            value={formData.gender_type}
            onChange={handleChange}
            className="floating-input-gender"
          >
          
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label htmlFor="gender_type" className="floating-label3">Gender</label>
        </div>
      </div>

      {/* ID Number */}
      <div className="floating-label-input">
        <input
          type="text"
          name="id_no"
          id="id_no"
          value={formData.id_no}
          onChange={handleChange}
          className="floating-input"
          placeholder=" "
        />
        <label htmlFor="id_no" className="floating-label">ID Number</label>
      </div>
 <div className="button-group">
            {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
            <button type="submit">Finish</button>
          </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <img src={images[step - 1]} alt="Job Search" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="progress-bar">
            <div 
              style={{ width: `${((step - 1) / 1) * 100}%` }} // Adjusted for 2 steps
              className="progress"
            ></div>
            <div className="step-numbers">
              {Array.from({ length: 2 }, (_, index) => (
                <div 
                  key={index} 
                  className={`step ${step === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          {renderStep()}
         
        </form>
      </div>
      <ToastContainer /> {/* Include ToastContainer for notifications */}
    </div>
  );
};

export default JobSeekerSignup;