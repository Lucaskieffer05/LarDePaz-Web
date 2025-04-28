import { Typography } from '@mui/material';

export default function NavHeader({text}) {
  return (
    <>
        <div>
            <Typography style={{ textAlign: 'left', color:'#a1a8aa', fontSize:'30px', fontFamily:'inherit'}}>{text}</Typography>
        </div>    
    </>
  );
}