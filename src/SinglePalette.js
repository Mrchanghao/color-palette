import React, { Component } from 'react'
import ColorBox from './ColorBox';
import {withStyles} from '@material-ui/styles';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import {Link} from 'react-router-dom';
import styles from './styles/PaletteStyle'




class SinglePalette extends Component {

  state = {
    format: 'hex'
  }

  gatherShades = (palette, colorId) => {
    let shades = [];

    let allColors = palette.colors;

    for(let key in allColors) {
      let fiteredColor = allColors[key].filter(color => color.id === colorId);
      shades = [...shades, ...fiteredColor];
    }
    return shades.slice(1);
    
  }

  _shades = this.gatherShades(this.props.palette, this.props.colorId)

  changeFormat = (val) => {
    this.setState(() => ({
      format: val
    }))
  }
  

  render() {
    const {palette, classes} = this.props;
    console.log(this.props.palette)
    console.log(this._shades);
    const colorBoxes = this._shades.map(color => {
      return <ColorBox key={color.name} name={color.name} 
      showLink={false}
      background={color[this.state.format]} />
    })
    return (
      <div className={classes.Palette}>
        {/* NAvbar */}
        <Navbar handleChange={this.changeFormat} showingSlider={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${palette.id}`}>Go Back</Link>
          </div>
        </div>
        <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(SinglePalette)