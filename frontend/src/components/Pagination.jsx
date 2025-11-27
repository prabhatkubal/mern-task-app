import React from 'react';
import MUIPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Pagination({ page, count, onChange }) {
  if (!count || count <= 1) return null;
  return (
    <Stack spacing={2} sx={{ alignItems: 'center', my: 2 }}>
      <MUIPagination
        count={count}
        page={page}
        onChange={(e, v) => onChange(v)}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
