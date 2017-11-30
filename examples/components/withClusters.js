import React from 'react'
import ReactDOM from 'react-dom'

import Map, {GoogleApiWrapper} from '../../src/index'
import Cluster from '../../src/components/Cluster'
import InfoWindow from '../../src/components/InfoWindow'

const WithMarkers = React.createClass({
  render: function() {

    var markers = [
                    {
                      name: 'SOMA',
                      title: 'The marker`s title will appear as a tooltip.',
                      position: {lat: 37.778519, lng: -122.405640}
                    },
                    {
                      name: 'SOMA 2',
                      title: 'The marker`s title will appear as a tooltip.',
                      position: {lat: 37.776519, lng: -122.435640}
                    },
                    {
                      name: 'Dolores park',
                      position: {lat: 37.759703, lng: -122.428093}
                    }
                  ];
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}>
          <Cluster markers={markers}
                  styles={[{
                    url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
                    height: 52,
                    width: 52,
                    anchor: [-26, -26],
                    textSize: 0.001
                  }]}/>
      </Map>
    )
  }
});

export default WithMarkers

// const mountNode = document.querySelector('#root')
// ReactDOM.render(<Wrapped />, mountNode)
