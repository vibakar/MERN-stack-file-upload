import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import ApiService from '../services/api.service';

function Header(props) {
  const logout = () => {
    ApiService.logout().then(res => {
      if(res.success) {
        props.history.push('/');
        sessionStorage.removeItem('authorization');
      }
    });
  }

  return (
    <AppBar className="app-bar" position="static">
      <Toolbar>
        <Typography variant="h6" className="header">
          Dashboard
        </Typography>
        <Button className="logout-btn" onClick={logout} color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
