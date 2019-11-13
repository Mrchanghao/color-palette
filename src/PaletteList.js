import React, { Component } from 'react'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyle';
import {Link} from 'react-router-dom';

class PaletteList extends Component {

  goToPalette = (id) => {
    this.props.history.push('/palette/' + id);
  }

  render() {
    const {palette, classes} = this.props;

    return (
      <div className={classes.root}>  
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>PaletteList</h1>
            <Link to='/palette/new'>Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palette.map((color) => (
                <MiniPalette {...color} key={color.id} goToPalette={() => this.goToPalette(color.id)} />
            ))}
          </div>
        </div>
        
        
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)