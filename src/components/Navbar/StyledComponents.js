
import { styled } from "@mui/material/styles";
import { 
  AppBar as MuiAppBar, 
  Typography as MuiTypography, 
  Button as MuiButton 
} from "@mui/material";

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.navbar.main,
  padding: '10px',
  '& .MuiContainer-root': {
    maxWidth: 'none',
  },
}));

export const Typography = styled(MuiTypography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  fontSize: '24px',
  fontWeight: 'bold',
  textDecoration: 'none',
}));

export const Button = styled(MuiButton)(({ theme }) => ({
  display: { xs: 'block', md: 'block' },
  my: 2,
  color: theme.palette.navbar.contrastText,
}));