import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
  AccountCircle,
} from "@material-ui/icons";
// import CloseFriend from "../closeFriend/CloseFriend";
import { Link,Redirect } from "react-router-dom";
import Profile from "../pages/profile/Profile";
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PolicyIcon from '@material-ui/icons/Policy';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


export default function Sidebar() {


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <Link to="/home" style={{ textDecoration: "none", color:"black"}}>
          <HomeIcon />
          </Link>
          <span className="sidebarListItemText">Home</span>
          </li>
          <li className="sidebarListItem">
          <Link to="/profile" style={{ textDecoration: "none",color:"black" }}>
          <AccountCircle/>
            </Link>
            <span className="sidebarListItemText">Profile</span>
          </li>
          <li className="sidebarListItem">
        <Link to="/followers" style={{ textDecoration: "none" ,color:"black"}}>
          <SupervisedUserCircleIcon/> 
        </Link>
        <span className="sidebarListItemText">Followers  </span>
          </li>
          <li className="sidebarListItem">
          <Link to="/msg" style={{ textDecoration: "none" }}>
             <MailIcon style={{ color:"black" }} /> 
          </Link>
            <span className="sidebarListItemText">Messages</span>
          </li>
          <li className="sidebarListItem">
          <Link to="/Search" style={{ textDecoration: "none" }}>
           <SearchIcon className="sidebarIcon" style={{ color:"black" }} />
          </Link>
            <span className="sidebarListItemText">Srearch recipe</span>
          </li>
          <li>
          <Link to="/followers" style={{ textDecoration: "none" ,color:"rgba(248, 248, 242, 0.8)"}}>
           Followers  
        </Link>
        </li>
          {/* <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
