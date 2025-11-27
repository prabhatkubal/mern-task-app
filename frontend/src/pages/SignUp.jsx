// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Alert, Stack, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function SignUp(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!name || !email || !password) return setErr('Please fill all fields');
    setLoading(true);
    try {
      const res = await API.post('/auth/signup', { name, email, password, role: 'user' });
      setAuth(res.data.user, res.data.token);
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start managing tasks the easy way">
      <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2 }}>
        {err && <Alert severity="error">{err}</Alert>}

        <TextField label="Full name" value={name} onChange={e => setName(e.target.value)} required fullWidth />
        <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth />

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <MuiLink component={Link} to="/signin" underline="hover" variant="body2">
                Already have an account?
                <span style={{ fontWeight: 600, marginLeft: 4 }}>Sign in</span>
            </MuiLink>
          <Button type="submit" variant="contained" size="large" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </Button>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
