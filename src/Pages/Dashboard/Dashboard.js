import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouteMatch } from 'react-router';
import { Link,Switch,Route } from 'react-router-dom';
import { Button } from '@mui/material';
import Addproduct from './Addproduct/Addproduct';
import DashboardHome from './DashboardHome/DashboardHome';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import useAuth from '../../hooks/useAuth';
import AdminRoute from './../../Router/AdminRoute';
import OrderProduct from './OrderProducts/OrderProduct';

const drawerWidth = 240;

const Dashboard=(props)=> {
  let { path, url } = useRouteMatch();
  const { admin } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
    <Toolbar />
    <Typography variant='h4'>Dashboard</Typography>
      <Divider />
      <div style={{ padding: '13px' }}>
        
        <Link style={{ textDecoration: 'none', color: 'black' }} to={`${url}`}><Button color="inherit">Dashboard</Button></Link>
        {
          admin && <Box>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`${url}/makeadmin`}><Button color="inherit">Make Admin</Button></Link>
              <br/>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`${url}/adminorder`}><Button color="inherit">Order</Button></Link>
            <br/>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`${url}/addproperty`}><Button color="inherit">Add Property</Button></Link>
     </Box>
      }
        
      </div>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
            <Toolbar />
            <Switch>
            <Route exact path={path}>
              <DashboardHome/>
            </Route>
            <AdminRoute path={`${path}/makeadmin`}>
              <MakeAdmin/>
            </AdminRoute>
            <AdminRoute path={`${path}/addproperty`}>
              <Addproduct/>
            </AdminRoute>
            <AdminRoute path={`${path}/adminorder`}>
              <OrderProduct/>
            </AdminRoute>
          </Switch>
          </Box>

    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;