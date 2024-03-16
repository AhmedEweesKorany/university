import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import { GroupsOutlined } from '@mui/icons-material';
import Link from 'next/link';
import {AdminAuth} from "../../utils/auth"
import  { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function index({childern}) {
  const theme = useTheme();
  const [auth,setAuth] = React.useState(false)
const [open, setOpen] = React.useState(false);

const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};
  const router = useRouter()
React.useEffect(()=>{
  if(!AdminAuth()){
    console.log("not auth")

Swal.fire({
  title: "You are not Authorized to Access This Route",
  icon: "error",
})
  router.back()
  }
  
  else{
    setAuth(true)
  }
  }
,[])

if(auth){
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Typography gutterBottom variant="h5" component="div" sx={{ml:"10px" ,display:"flex",justifyContent:"center",alignItems:"center"}}>
            Users <AccountCircleIcon/>
          </Typography>
        <Divider />
        <List>
  
            <Link href={"individual"}>
            <ListItem key="İndividual" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                 <PersonIcon/>
                </ListItemIcon>
                <ListItemText primary="İndividual" />
              </ListItemButton>
            </ListItem></Link>  
  
          <Link href={"team"}>
          <ListItem key="Team" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                 <GroupsOutlined  />
                </ListItemIcon>
                <ListItemText primary="Team" />
              </ListItemButton>
            </ListItem>
  
          </Link>
        </List>

        <Typography gutterBottom variant="h5" component="div" sx={{ml:"10px" ,display:"flex",justifyContent:"center",alignItems:"center"}}>
            Operations <SettingsIcon/>
          </Typography>
        <Divider />
        <List>
        <Link href={"event"}>
          <ListItem key="event" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                 <EventAvailableIcon  />
                </ListItemIcon>
                <ListItemText primary="Event" />
              </ListItemButton>
            </ListItem>
  
          </Link>

          <Link href={"competation"}>
          <ListItem key="competation" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                 <EmojiEventsIcon  />
                </ListItemIcon>
                <ListItemText primary="competation" />
              </ListItemButton>
            </ListItem>
  
          </Link>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
    
            {childern}
      </Main>
    </Box>
  );
}else{
  return <h1>you are not authorized</h1>
}
  
}