import React, { useState } from 'react'
import classNames from "classnames";
import {ChromePicker} from 'react-color';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    height: "100vh"
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%"
  },
  button: {
    width: "50%"
  }
}));


const NewPaletteForm = (props) => {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState('teal');
  const [colors, setColors] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateColor = (newColor) => {
    console.log(newColor)
    setCurrentColor({currentColor: newColor.hex})
  }

  const addNewColor = () => {
    setColors([...colors, currentColor.currentColor])
  }

  return (
    <div className={classes.root}>
        {/* <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={handleSubmit}
          handleDrawerOpen={handleDrawerOpen}
        /> */}
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{paper: classes.drawerPaper}}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant='h4'>
              Design Your Palette
            </Typography>
          <div>
            <Button variant='contained' color='secondary'>Clear Palette</Button>
            <Button variant='contained' color='primary'>Random Color</Button>
          </div>
          <ChromePicker 
            color={currentColor}
            onChangeComplete={(newColor) => updateColor(newColor) } />
          <Button variant='contained' 
            onClick={addNewColor}
            color='primary' style={{backgroundColor: `${currentColor}`}}>
            Add Color
          </Button>
          <div className={classes.container}>
            {/* <Typography variant='h4' gutterBottom>
              Design Your Palette
            </Typography> */}
            <div className={classes.buttons}>
            
            </div>
              
            
          </div>
            
          <Divider />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <ul>
            {
              colors.map((color) => {
                // console.log(color)
              return (<li key={color} style={{background: color}}>
                {color}</li>)
              })
            }
          </ul>
          
        </main>
      </div>
  );
}

export default NewPaletteForm