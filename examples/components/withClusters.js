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
                  imagePath="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Brad_Pitt_June_2014_%28cropped%29.jpg/200px-Brad_Pitt_June_2014_%28cropped%29.jpg"/>
      </Map>
    )
  }
});

export default WithMarkers

// const mountNode = document.querySelector('#root')
// ReactDOM.render(<Wrapped />, mountNode)
