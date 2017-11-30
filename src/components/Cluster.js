import React from 'react'
import PropTypes from 'prop-types'

import { camelize } from '../lib/String'

const evtNames = [
  'click',
  'dblclick',
  'dragend',
  'mousedown',
  'mouseout',
  'mouseover',
  'mouseup',
  'recenter',
];

const wrappedPromise = function() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
            wrappedPromise.resolve = resolve;
            wrappedPromise.reject = reject;
        });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
}

export class Cluster extends React.Component {

  componentDidMount() {
    this.clusterPromise = wrappedPromise();
    this.renderCluster();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position) ||
      (this.props.icon !== prevProps.icon)) {
        this.renderCluster();
    }
  }

  renderCluster() {

    if (this.props.markers && this.props.markers.length > 0) {

      var markersGoogle = [];

      let {
        map, google, position, mapCenter, icon, label, draggable, title
      } = this.props;
      if (!google) {
        return null
      }

      if (map) {
        for (var i=0; i < this.props.markers.length; i++) {

          let markerInfo = this.props.markers[i];

          const pref = {
            map: map,
            position: markerInfo.position,
            icon: markerInfo.icon,
            label: markerInfo.label,
            title: markerInfo.title,
            draggable: markerInfo.draggable
          };

          var marker = new google.maps.Marker(pref);

          evtNames.forEach(e => {
            if (markerInfo[e]) {
              marker.addListener(e, markerInfo[e]);
            }
          });

          markersGoogle.push(marker);

        }

        var options = {
          imagePath: this.props.imagePath,
          styles: ((this.props.styles) ? this.props.styles : [])
        };

        var markerCluster = new MarkerClusterer(map, markersGoogle, options);
      }

    }

    this.clusterPromise.resolve(this.cluster);
  }

  getCluster() {
    return this.clusterPromise;
  }

  render() {
    return null;
  }
}

Cluster.propTypes = {
  markers: PropTypes.array,
  imagePath: PropTypes.string,
  styles: PropTypes.array,
  map: PropTypes.object
}

Cluster.defaultProps = {
  name: 'Cluster'
}

export default Cluster
