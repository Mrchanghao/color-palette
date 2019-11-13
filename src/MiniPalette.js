import React from 'react';
import {withStyles} from '@material-ui/styles';
import styles from './styles/MiniPaletteStyle'

// const styles = 

const MiniPalette = (props) => {
  const {classes, paletteName, emoji, colors} = props;
  // console.log(colors)
  
  const miniPalette = colors.map(color => (
    <div 
    style={{backgroundColor: color.color}}
    key={color.name}
    className={classes.miniColor}></div>
  ))

  return (
  
    <section className={classes.root} onClick={props.goToPalette}>
      <div className={classes.colors}>{miniPalette}</div>
        <h4 className={classes.title}>{paletteName} 
        <span className={classes.emoji}>{emoji}</span></h4>
      
    </section>
  )
};

export default withStyles(styles)(MiniPalette);