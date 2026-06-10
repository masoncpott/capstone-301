import { AppBar, Box, IconButton, Toolbar, Typography, Button } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { NavLink } from 'react-router-dom'
import { useColorMode } from '../themeContext'

const links = [
  { path: '/', label: 'Home' },
  { path: '/genre', label: 'Genre' },
  { path: '/region', label: 'Region' },
  { path: '/type', label: 'Content Type' },
]

export function TopNav() {
  const { mode, toggleMode } = useColorMode()

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)', borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ letterSpacing: 0.3 }}>
          StreamScope Atlas
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          {links.map((link) => (
            <Button
              key={link.path}
              size="small"
              component={NavLink}
              to={link.path}
              sx={{
                color: 'text.primary',
                '&.active': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                },
              }}
            >
              {link.label}
            </Button>
          ))}
          <IconButton aria-label="toggle color mode" onClick={toggleMode} color="inherit">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
