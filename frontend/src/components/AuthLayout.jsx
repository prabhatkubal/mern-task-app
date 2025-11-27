import React from 'react';
import { Box, Container, Paper, Typography, useTheme } from '@mui/material';

/**
 * AuthLayout
 * Props:
 * - title (string): heading text (e.g. "Sign In")
 * - subtitle (string): optional small subtitle
 * - children: the form content
 */
export default function AuthLayout({ title, subtitle, children }) {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Container maxWidth="lg" sx={{ my: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={6} sx={{ width: '100%', maxWidth: 1100, minHeight: 520, borderRadius: 2, overflow: 'hidden', display: 'flex', minHeight: 480 }}>
          {/* Left: form area */}
          <Box sx={{
            flex: 1,
            p: { xs: 4, sm: 7 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 3
          }}>
            <Box>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
                {title}
              </Typography>
              {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
            </Box>

            <Box sx={{ mt: 1, width: '100%' }}>
              {children}
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                By continuing you agree to the <strong>Terms</strong> and <strong>Privacy Policy</strong>.
              </Typography>
            </Box>
          </Box>

          {/* Right: decorative panel (hidden on xs) */}
          <Box sx={{
            width: { xs: 0, md: 380 },
            display: { xs: 'none', md: 'flex' },
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary ? theme.palette.secondary.main : '#6d28d9'} 100%)`,
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Welcome Back</Typography>
            <Typography variant="body2" sx={{ opacity: 0.95, textAlign: 'center', px: 1 }}>
              Manage your tasks quickly and efficiently. Create, edit, and (if you're an admin) delete tasks.
            </Typography>

            {/* decorative subtle card */}
            <Box sx={{
              mt: 2,
              bgcolor: 'rgba(255,255,255,0.12)',
              p: 2,
              borderRadius: 1.5,
              textAlign: 'center',
              width: '100%'
            }}>
              <Typography variant="caption" sx={{ display: 'block' }}>Pro tip</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Use the dark theme for late-night coding</Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
