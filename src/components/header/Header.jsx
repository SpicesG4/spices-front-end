import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ListIcon from '@material-ui/icons/List';
import SignInForm from '../../components/SignInForm'
import User from '../../components/User'

import { AuthContext } from '../../context/auth';
import { useContext } from 'react';
import { Link,Redirect } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PolicyIcon from '@material-ui/icons/Policy';
import Signin from '../signin/Signin';



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
    const { loggedIn, setLoggedIn, user, setUser, validateToken, logout, login, setLoginState } = useContext(AuthContext);
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem onClick={handleMenuClose}>
        <Link to="/home" style={{ textDecoration: "none" }}>
          Home  
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>

<a href="/" style={{ textDecoration: "none" }}>

        <p onClick={logout} >logout</p>  
          <Signin />
          
</a>
      </MenuItem>
      {user&&  user.role == "admin" &&<MenuItem onClick={handleMenuClose}>
        <Link to="/admin" style={{ textDecoration: "none" }}>
          Admin
        </Link>
      </MenuItem>}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
   
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ListIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>

          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}

          <Typography className={classes.title} variant="h6"  noWrap style={{marginRight:" 125px ", marginLeft:"40px", fontWeight:"700px"}}>
          <Link to="/" style={{ textDecoration: "none", color:"white", fontWeight:"650px" }}>
          Spices
          </Link>
          </Typography>

          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            /> */}
          {/* </div> */}
          <div style={{margin:"20px"}}>
          {/* <HomeIcon /> */}
          <Link to="/home" style={{ textDecoration: "none", color:"rgba(248, 248, 242, 0.8)"}}>
            Home  
          </Link>
          </div>
          <div style={{margin:"20px"}}>
          {/* <AccountCircle/> */}
          <Link to="/profile" style={{ textDecoration: "none",color:"rgba(248, 248, 242, 0.8)" }}>
           Profile  
        </Link>
        </div>
        <div style={{margin:"20px"}}>
        {/* <SupervisedUserCircleIcon/> */}
        <Link to="/followers" style={{ textDecoration: "none" ,color:"rgba(248, 248, 242, 0.8)"}}>
           Followers  
        </Link>
        </div>
        <div style={{margin:"20px"}}>
        <Link to="/Search" style={{ textDecoration: "none" ,color:"rgba(248, 248, 242, 0.8)"}}>
           Search  
        </Link>
        </div>
       {user&& user.role == "admin" &&<div style={{margin:"20px"}}>
        <PolicyIcon/>
        <Link to="/admin" style={{ textDecoration: "none",color:"rgba(248, 248, 242, 0.8)" }}>
           Admin
        </Link>

        </div>}
        
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
                  
             <Link to="/msg" style={{ textDecoration: "none" }}>
            <IconButton  aria-label="show 4 new mails" color="inherit">
              {/* <Badge badgeContent={4} color="secondary"> */}
             <MailIcon style={{ color:"white" }} /> 
              {/* </Badge> */}
            </IconButton>
             </Link>
           
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <ListIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}