import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AppBar, Typography, Button } from './StyledNavbar';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';
import { useLocation } from 'react-router-dom';



function ResponsiveAppBar({pages, settings}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logout } = useContext(AuthContext);

  const location = useLocation();
  
  if (location.pathname === '/login') {
    return null; // No renderiza nada en la página de login
  }

  const handleLogout = () => {
    logout();
    handleCloseUserMenu(); // Cierra el menú
  };

  const handleOpenNavMenu = (event) => {
    if (event.currentTarget) {
      setAnchorElNav(event.currentTarget);
    }
  };
  const handleOpenUserMenu = (event) => {
    if (event.currentTarget) {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="navbar" position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
          >
            <img
              width="250"
              height="83"
              src="/src/assets/logo_lar_de_paz.png"
              alt="Lar de Paz"
              decoding="async"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'flex', md: 'none' }, minWidth: '100%' }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3, marginLeft: '30px' }}>
            {pages.map((page) => (
              <Button
                sx={{ fontSize: '16px' }}
                key={page.name}
                onClick={handleCloseNavMenu}
              >
                <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon sx={{ color: '#02a256', fontSize: '35px' }} />
              </IconButton>
            </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting.name}
                    onClick={setting.name === 'Cerrar sesión' ? handleLogout : handleCloseUserMenu}
                  >
                    {setting.name === 'Cerrar sesión' ? (
                      <Typography sx={{ textAlign: 'center', fontSize: '15px' }}>
                        {setting.name}
                      </Typography>
                    ) : (
                      <Link 
                        to={setting.path} 
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography sx={{ textAlign: 'center', fontSize: '15px' }}>
                          {setting.name}
                        </Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;