import { AppBar, Box, Button, Toolbar } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';

function ListNav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/"><Button variant="contained" id='backbtn'><KeyboardBackspaceIcon/> Back</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default ListNav
