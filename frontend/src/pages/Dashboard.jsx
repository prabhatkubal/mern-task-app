import React, { useEffect, useState } from 'react';
import { Container, Grid, CircularProgress, Alert, Box, Typography } from '@mui/material';
import API from '../api/axios';
import TaskCard from '../components/TaskCard';
import Pagination from '../components/Pagination';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(8); // tasks per page
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async (p = 1) => {
    setLoading(true);
    setErr('');
    try {
      const res = await API.get(`/tasks?page=${p}&limit=${limit}`);
      setTasks(res.data.tasks || []);
      setTotal(res.data.total ?? 0);
      setPage(res.data.page ?? p);
      setPages(res.data.pages ?? 1);
    } catch (error) {
      setErr(error.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(page); /* eslint-disable-next-line */ }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await API.delete(`/tasks/${id}`);
      // refresh current page
      fetchTasks(page);
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleEdit = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Tasks</Typography>
        <Typography variant="body2" color="text.secondary">Total: {total}</Typography>
      </Box>

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>}
      {err && <Alert severity="error">{err}</Alert>}

      {!loading && tasks.length === 0 && <Alert severity="info">No tasks yet. Click Add Task to create one.</Alert>}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {tasks.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <TaskCard task={task} onEdit={handleEdit} onDelete={handleDelete} currentUser={user} />
          </Grid>
        ))}
      </Grid>

      <Pagination page={page} count={pages} onChange={(p) => { setPage(p); fetchTasks(p); }} />
    </Container>
  );
}
