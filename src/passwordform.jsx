import React, { useState } from 'react';
import './PasswordForm.css';

const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClearPassword = () => {
    setPassword('');
  };
  const handleCopyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
      });
    }
  }
  const getPasswordStrength = () => {
    let strength = 0;

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChars = /[$#@!~&%?^*]/.test(password);
    const isLengthValid = password.length >= 8;

    strength += hasLowerCase ? 1 : 0;
    strength += hasUpperCase ? 1 : 0;
    strength += hasNumber ? 1 : 0;
    strength += hasSpecialChars ? 1 : 0;
    strength += isLengthValid ? 1 : 0;

    return strength;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();

    if (password.length === 0 || (password.length < 8 && strength < 2)) {
      return 'red';
    } else if (password.length >= 8 && strength >= 5) {
      return 'green';
    } else {
      return 'orange';
    }
  };

  const getPasswordMessage = () => {
    if (password.length === 0) return '';
    return password.length < 8
      ? 'Password must be >= 8 characters including uppercase, lowercase, a special character and a number for strong password.'
      : '';
  };
  const generateRandomPassword = () => {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!~&%?^*';
    let generatedPassword = '';
    let strength = 0;

    while (strength < 5) {
      generatedPassword = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
      }

      // Checking password strength
      const hasLowerCase = /[a-z]/.test(generatedPassword);
      const hasUpperCase = /[A-Z]/.test(generatedPassword);
      const hasNumber = /\d/.test(generatedPassword);
      const hasSpecialChars = /[$#@!~&%?^*]/.test(generatedPassword);
      strength = hasLowerCase + hasUpperCase + hasNumber + hasSpecialChars + (generatedPassword.length >= 8 ? 1 : 0);
    }

    setPassword(generatedPassword);
  };
  return (
    <div className="password-form">
      <h1>Password strength meter</h1>
      <div className="password-input">
        <label>Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          placeholder='Enter password...'
        />
        <button onClick={toggleShowPassword}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        <button onClick={handleClearPassword}>Clear</button>
        <button onClick={handleCopyPassword}>Copy to clipboard</button>
        <button onClick={generateRandomPassword}>
          Generate Password
        </button>
      </div>
      {password.length > 0 && (
        <div className="password-strength">
          <p style={{ color: getStrengthColor() }}>
            Password Strength: {getPasswordStrength() === 1 ? 'Weak' : getPasswordStrength() < 5 ? 'Moderate' : 'Strong'}
          </p>
          <p className="password-message">{getPasswordMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordForm