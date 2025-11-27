import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography, MenuItem, Alert, CircularProgress } from '@mui/material';
import API from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskForm() {
  const { id } = useParams(); // if id exists -> edit mode
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    // fetch task to edit
    (async () => {
      setInitialLoading(true);
      try {
        const res = await API.get(`/tasks/${id}`);
        const t = res.data;
        setTitle(t.title || '');
        setDescription(t.description || '');
        setStatus(t.status || 'pending');
      } catch (error) {
        setErr(error.response?.data?.message || 'Failed to load task');
      } finally {
        setInitialLoading(false);
      }
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    if (!title) return setErr('Title is required');
    setLoading(true);

    try {
      if (id) {
        await API.put(`/tasks/${id}`, { title, description, status });
      } else {
        await API.post('/tasks', { title, description, status });
      }
      navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return (
    <Container sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Container>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>{id ? 'Edit Task' : 'Add Task'}</Typography>
      {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
      <Box component="form" onSubmit={submit} sx={{ display: 'grid', gap: 2 }}>
        <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <TextField select label="Status" value={status} onChange={e => setStatus(e.target.value)}>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
        </Box>
      </Box>
    </Container>
  );
}
