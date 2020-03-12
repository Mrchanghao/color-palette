import React, { PureComponent } from 'react'
import classNames from "classnames";
import {ChromePicker} from 'react-color';
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu'
import styles from './styles/NewPaletteFormStyles';
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from '@material-ui/core';


class NewPaletteForm extends PureComponent {

  state = {
    open: true,
    colors: []
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  render() {

    const { classes, maxColors, palettes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography  variant='h6' color='inherit' noWrap>
                Drawer
              </Typography>
          </Toolbar>
        </AppBar>
          <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={open}
            classes={{paper: classes.drawerPaper}}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
              
            </div>
            <Divider />
            <Typography variant='h6'>
                Design Your Palette
              </Typography>
            <div>
              <Button variant='contained' color='secondary'>Clear Palette</Button>
              <Button variant='contained' color='primary'>Random Color</Button>
            </div>
              
            <Divider />
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open
            })}
          >
            <div className={classes.drawerHeader} />
            
            
          </main>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);