import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import {Snackbar, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import 'rc-slider/assets/index.css'
import { MenuItem } from '@material-ui/core';
import {withStyles} from '@material-ui/styles';
import styles from './styles/NavbarStyle';




class Navbar extends Component {

  state = {
    format: 'hex',
    open: false
  }

  handleFormatChange = (e) => {
    this.setState({
      format: e.target.value,
      open: true
    });

    this.props.handleChange(e.target.value)
  }

  closeSnackbar = () => {
    this.setState({open: false})
  }

  render() {
    const {level, changeLevel, showingSlider, classes} = this.props;
    const {format} = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>COLOR APP</Link>  
        </div>
        {showingSlider && (
          <div className='slider-container'>
          <span>LEVEL</span>
          <div className={classes.slider}>
            <Slider 
            step={100}
            onAfterChange={changeLevel}
            defaultValue={level} min={100} max={900} />
          </div>
        </div>
        )}
        <div className={classes.selectContainer}>
          <Select 
          value={format}
          onChange={this.handleFormatChange}>
            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgb(255,255,255, 1.0)</MenuItem>
          </Select>

        </div>
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        open={this.state.open}
        autoHideDuration={3000}
        message={<span id="message-id">format changed to {format}</span>}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        onClose={this.closeSnackbar}
        action={[
          <IconButton onClick={this.closeSnackbar} 
          color='inherit' key='close' aria-label='close'>
            <CloseIcon  />
          </IconButton>
        ]}
        ></Snackbar>
      </header>
    )
  }
}

export default withStyles(styles)(Navbar)