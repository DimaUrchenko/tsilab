import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

interface User {
  id?: number;
  firstName: string;
  lastName: string;
    phone: string;
  email: string;
  role: string;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<User | null>(null);

  // Registration data
  const [regData, setRegData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  // Login data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateRegister = () => {
    const newErrors: Record<string, string> = {};
    
    if (!regData.firstName) newErrors.firstName = 'Enter first name';
    if (!regData.lastName) newErrors.lastName = 'Enter last name';
    if (!regData.phone) newErrors.phone = 'Enter phone number';
    if (!regData.email) newErrors.email = 'Enter email';
    if (!regData.password) newErrors.password = 'Enter password';
    if (regData.password !== regData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (regData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    if (!/\S+@\S+\.\S+/.test(regData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateRegister()) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: regData.firstName,
          lastName: regData.lastName,
          phone: regData.phone,
          email: regData.email,
          password: regData.password,
          role: regData.role
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Registration successful. Please log in.');
        setTimeout(() => {
          setIsLogin(true);
          setMessage('');
        }, 2000);
      } else {
        setMessage(`Error: ${data.error || 'Registration failed'}`);
      }
    } catch (error) {
      setMessage('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setMessage('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(`Welcome, ${data.user.firstName}!`);
        setUser(data.user);
      } else {
        setMessage(`Error: ${data.error || 'Login failed'}`);
      }
    } catch (error) {
      setMessage('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMessage('You have been logged out');
    setLoginData({ email: '', password: '' });
  };

  // If user is logged in
  if (user) {
    return (
      <div className="max-w-md mx-auto p-8 mt-10">
        <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
          <Text variant="h1" bold>Welcome</Text>
          <div className="mt-6 text-left space-y-2">
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role === 'admin' ? 'Administrator' : 'User'}</p>
          </div>
          <Button color="primary" size="middle" title="Logout" onClick={handleLogout} className="mt-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-10">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            className={`flex-1 py-2 text-center font-bold transition ${
              isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => { setIsLogin(true); setMessage(''); }}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center font-bold transition ${
              !isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => { setIsLogin(false); setMessage(''); }}
          >
            Register
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div className={`p-3 rounded-lg mb-4 ${
            message.includes('successful') || message.includes('Welcome') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        {isLogin ? (
          // Login form
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="example@mail.com"
              value={loginData.email}
              onChange={(v) => setLoginData({ ...loginData, email: v })}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="******"
              value={loginData.password}
              onChange={(v) => setLoginData({ ...loginData, password: v })}
              required
            />
            <Button 
              color="primary" 
              size="middle" 
              title={loading ? "Loading..." : "Login"} 
              onClick={handleLogin} 
              disabled={loading}
              className="w-full"
            />
          </div>
        ) : (
          // Registration form
          <div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                placeholder="John"
                value={regData.firstName}
                onChange={(v) => setRegData({ ...regData, firstName: v })}
                error={errors.firstName}
                required
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                value={regData.lastName}
                onChange={(v) => setRegData({ ...regData, lastName: v })}
                error={errors.lastName}
                required
              />
            </div>
            <Input
              label="Phone"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={regData.phone}
              onChange={(v) => setRegData({ ...regData, phone: v })}
              error={errors.phone}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="example@mail.com"
              value={regData.email}
              onChange={(v) => setRegData({ ...regData, email: v })}
              error={errors.email}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="******"
              value={regData.password}
              onChange={(v) => setRegData({ ...regData, password: v })}
              error={errors.password}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="******"
              value={regData.confirmPassword}
              onChange={(v) => setRegData({ ...regData, confirmPassword: v })}
              error={errors.confirmPassword}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={regData.role}
                onChange={(e) => setRegData({ ...regData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <Button 
              color="primary" 
              size="middle" 
              title={loading ? "Loading..." : "Register"} 
              onClick={handleRegister} 
              disabled={loading}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;