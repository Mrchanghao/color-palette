
import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900 ];

function generatePalette (startPalette) {
  let newPalette = {
    paletteName: startPalette.paletteName,
    id: startPalette.id,
    emoji: startPalette.emoji,
    colors: {
    }
  };
  
  for(let level of levels) {
    newPalette.colors[level] = [];
  }
  for(let color of startPalette.colors) {
    let scale = generateScale(color.color, 10).reverse();
    for(let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i]).css().replace('rgba', 'rgba').replace(")", ", 1.0)")
      })
    }
  }
  return newPalette;

};

function getRange(hexColor) {
  const end = '#fff';
  return [
    chroma(hexColor).darken(1.4).hex(),
    hexColor,
    end
  ]
}



function generateScale(hexColor, numOfColors) {
  return chroma.scale(getRange(hexColor)).mode('lab').colors(numOfColors);
}

export {
  generatePalette
};