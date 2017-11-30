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

export class Marker extends React.Component {

  componentDidMount() {
    this.markerPromise = wrappedPromise();
    this.renderMarker();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position) ||
      (this.props.icon !== prevProps.icon)) {
        if (this.marker) {
            this.marker.setMap(null);
        }
        this.renderMarker();
    }
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.position && this.props.position.lat && nextProps.position && nextProps.position.lat && this.props.position.lat!=nextProps.position.lat) {
      return true;
    }
    if (this.props.icon && this.props.icon.url && nextProps.icon && nextProps.icon.url && this.props.icon.url!=nextProps.icon.url) {
      return true;
    }
    if (this.props.icon && this.props.icon.scaledSize && this.props.icon.scaledSize.width && nextProps.icon && nextProps.icon.scaledSize && nextProps.icon.scaledSize.width && this.props.icon.scaledSize.width!=nextProps.icon.scaledSize.width) {
      return true;
    }
    if (this.props.icon && this.props.icon.scaledSize && this.props.icon.scaledSize.height && nextProps.icon && nextProps.icon.scaledSize && nextProps.icon.scaledSize.height && this.props.icon.scaledSize.height!=nextProps.icon.scaledSize.height) {
      return true;
    }
    return false;
  }

  renderMarker() {
    let {
      map, google, position, mapCenter, icon, label, draggable, title
    } = this.props;
    if (!google) {
      return null
    }

    let pos = position || mapCenter;
    if (!(pos instanceof google.maps.LatLng)) {
      position = new google.maps.LatLng(pos.lat, pos.lng);
    }

    const pref = {
      map: map,
      position: position,
      icon: icon,
      label: label,
      title: title,
      draggable: draggable
    };
    this.marker = new google.maps.Marker(pref);

    evtNames.forEach(e => {
      this.marker.addListener(e, this.handleEvent(e));
    });

    this.markerPromise.resolve(this.marker);
  }

  getMarker() {
    return this.markerPromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    }
  }

  render() {
    return null;
  }
}

Marker.propTypes = {
  position: PropTypes.object,
  map: PropTypes.object
}

evtNames.forEach(e => Marker.propTypes[e] = PropTypes.func)

Marker.defaultProps = {
  name: 'Marker'
}

export default Marker