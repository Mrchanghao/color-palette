import React, { Component } from 'react'
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
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";


class NewPaletteForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      colors: [{color: 'red', name: 'red'}],
      currentColor: 'teal',
      newName: ''
    }

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameOne', value => {
      this.state.colors.every(color => color.name.toLowerCase() !== value.toLowerCase()
      )
    })

    ValidatorForm.addValidationRule('isColorOne', value => {
      this.state.colors.every(({color}) => color !== this.state.currentColor
      )
    })
  }

  // componentWillUnmount() {
  //   ValidatorForm.removeValidationRule('isColorOne')
  //   ValidatorForm.removeValidationRule('isColorNameOne')
  // }


  handleDrawerOpen () {
    this.setState({ open: true });
  };

  handleDrawerClose() {
    this.setState({ open: false });
  };

  updateCurrentColor (newColor) {
    // console.log(newColor)
    this.setState({
      currentColor: newColor.hex
    })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  } 

  addNewColor (e) {
    e.preventDefault();
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newName
    }
    this.setState({
      colors: [...this.state.colors, newColor],
      newName: ''
    })
  }

  

  render() {
  
    const { classes, maxColors, palettes } = this.props;
    const { open, currentColor, newName } = this.state;

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
            <Typography variant='h4'>
              Design New Palette
            </Typography>
            
            <div>
              <Button variant='contained' color='secondary'>Clear Palette</Button>
              
              <Button variant='contained' color='primary'>random Color</Button>
            </div>
            
            <ChromePicker
              color={currentColor}
              onChangeComplete={this.updateCurrentColor}
              />

            <ValidatorForm ref="form"
                onError={errors => console.log(errors)}
                onSubmit={this.addNewColor}> 

              <TextValidator value={newName} 
              placeholder='Color Name'
              validators={[ 'required' , 'isColorNameOne', 'isColorOne']}
              fullWidth
              name={'newName'}
              margin='normal'
              errorMessages={['Enter name', "Another NAme", "Another Color"]}
              onChange={this.handleChange}  />

              <Button variant='contained' 
                type="submit"
                className={classes.addColor}
                onClick={this.addNewColor}
                style={{backgroundColor: `${currentColor}`, width: '90%' }}
                color='primary'>
                  ADD COLOR
              </Button>

            </ValidatorForm>

            
            <Divider />
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open
            })}
          >

            <div className={classes.drawerHeader} />
              
              {this.state.colors.map(color => (
                <DraggableColorBox color={color.color} 
                key={color.name} name={color.name} />
              ))}
            
          </main>
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);