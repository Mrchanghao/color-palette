import React from 'react';
import Palette from './Palette';
import mainColor from './mainColor';
import { generatePalette } from './colorHelper';
import {Route, Switch} from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
// import 

function App() {
  // console.log(generatePalette(mainColor[1]))
  const findPalette = (id) => {
    return mainColor.find((color) => {
      return color.id === id
    })
  }
  return (
    <Switch>
      <Route path='/palette/new' exact render={() => <NewPaletteForm />} /> 
      <Route path='/' exact render={(routeProps) => <PaletteList palette={mainColor} {...routeProps} />}  />
      <Route path='/palette/:paletteId' 
        exact
        render={(routeProps) => <Palette 
        palette={generatePalette(findPalette(routeProps.match.params.paletteId))} />} />

      <Route path='/palette/:paletteId/:colorId' 
      exact
      render={(routeProps) => <SingleColorPalette
      colorId={routeProps.match.params.colorId}
      {...routeProps} palette={generatePalette(findPalette(routeProps.match.params.paletteId))}
      /> } />
    </Switch>
  );
}

export default App;
