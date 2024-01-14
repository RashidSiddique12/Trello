import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';

function ListNav({boardName}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className='listAppToolbar'>
          <Link to="/"><Button variant="contained" id='backbtn'><KeyboardBackspaceIcon/> Back</Button></Link>
          <Typography  variant='h5' id='typo'>{boardName}</Typography>
          <Typography  variant='h6' id='typo'>
          <img src="https://trello.com/assets/87e1af770a49ce8e84e3.gif" alt="" width={100} />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ListNav
