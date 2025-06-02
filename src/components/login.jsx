import React, { useState } from 'react';

export default function Login() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      const userExists = users.find((user) => user.name === name);
      if (userExists) {
        setMessage('User already exists. Please login.');
      } else {
        setUsers([...users, { name, password }]);
        setMessage('Account created! Please login.');
        setIsNewUser(false);
        setName('');
        setPassword('');
      }
    } else {
      const user = users.find((user) => user.name === name && user.password === password);
      if (user) {
        setMessage(`Welcome back, ${name}!`);
      } else {
        setMessage('Invalid credentials or user does not exist.');
      }
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f7f5f2',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
        }}>
          <h2 style={{
            marginRight: '10px',
            borderBottom: !isNewUser ? '3px solid red' : 'none',
            paddingBottom: '5px',
            cursor: 'pointer',
          }} onClick={() => { setIsNewUser(false); setMessage(''); }}>
            Sign in
          </h2>
          <h2 style={{
            marginLeft: '10px',
            borderBottom: isNewUser ? '3px solid red' : 'none',
            paddingBottom: '5px',
            cursor: 'pointer',
          }} onClick={() => { setIsNewUser(true); setMessage(''); }}>
            Register
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
            Email address
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />

          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#e10600',
            color: '#fff',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '14px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
            {isNewUser ? 'Register' : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
        }}>
          {isNewUser ? (
            <>Already have an account?{' '}
              <span onClick={() => { setIsNewUser(false); setMessage(''); }} style={{ color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>
                Sign in
              </span>
            </>
          ) : (
            <>Don’t have an account yet?{' '}
              <span onClick={() => { setIsNewUser(true); setMessage(''); }} style={{ color: 'red', cursor: 'pointer', fontWeight: 'bold' }}>
                Register
              </span>
            </>
          )}
        </div>

        {message && <p style={{ marginTop: '15px', color: 'green', textAlign: 'center' }}>{message}</p>}
      </div>
    </div>
  );
}
