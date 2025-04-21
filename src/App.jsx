import './App.css'
import Button from '@mui/material/Button';
import ResponsiveNavbar from './components/Navbar.jsx';

export function App() {
  return (
    <div className="App">
      <ResponsiveNavbar />
      <Button variant="contained">Hello world</Button>
    </div>
  )
}

