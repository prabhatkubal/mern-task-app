import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Chip, Box } from '@mui/material';
import dayjs from 'dayjs';

export default function TaskCard({ task, onEdit, onDelete, currentUser }) {
  const isAdmin = currentUser?.role === 'admin';
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">{task.title}</Typography>
          <Chip label={task.status === 'completed' ? 'Completed' : 'Pending'} size="small" />
        </Box>

        <Typography variant="body2" sx={{ mb: 1 }}>
          {task.description || <i>No description</i>}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Created: {dayjs(task.createdAt || task.createdAt?.date || task.createdAt).format('DD MMM YYYY HH:mm')}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => onEdit(task._id)}>Edit</Button>
        {isAdmin && (
          <Button size="small" color="error" onClick={() => onDelete(task._id)}>Delete</Button>
        )}
      </CardActions>
    </Card>
  );
}
