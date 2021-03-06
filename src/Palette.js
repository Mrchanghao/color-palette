import React, { Component } from 'react'
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css'
import {withStyles} from '@material-ui/styles'
import Slider from 'rc-slider';
import Navbar from './Navbar';
import styles from './styles/PaletteStyle'
import PaletteFooter from './PaletteFooter';


class Pallette extends Component {

  state = {
    level: 500,
    format: 'hex'
  }

  changeLevel = (newLevel) => {
    this.setState(() => ({
      level: newLevel
    }))
  }

  changeFormat = (value) => {
    this.setState({
      format: value
    })
  }


  render() {
    // console.log(this.props)
    const {colors, paletteName, emoji, id} = this.props.palette;
    const { classes } = this.props;
    const {level, format} = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox 
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette
        />
    ))
    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showingAllColors
        />
        <div className={classes.colors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(Pallette)