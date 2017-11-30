(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', '../lib/String'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('../lib/String'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.String);
    global.Cluster = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _String) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cluster = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var evtNames = ['click', 'dblclick', 'dragend', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'recenter'];

  var wrappedPromise = function wrappedPromise() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
    wrappedPromise.then = promise.then.bind(promise);
    wrappedPromise.catch = promise.catch.bind(promise);
    wrappedPromise.promise = promise;

    return wrappedPromise;
  };

  var Cluster = exports.Cluster = function (_React$Component) {
    _inherits(Cluster, _React$Component);

    function Cluster() {
      _classCallCheck(this, Cluster);

      return _possibleConstructorReturn(this, (Cluster.__proto__ || Object.getPrototypeOf(Cluster)).apply(this, arguments));
    }

    _createClass(Cluster, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.clusterPromise = wrappedPromise();
        this.renderCluster();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.map !== prevProps.map || this.props.position !== prevProps.position || this.props.icon !== prevProps.icon) {
          this.renderCluster();
        }
      }
    }, {
      key: 'renderCluster',
      value: function renderCluster() {
        var _this2 = this;

        if (this.props.markers && this.props.markers.length > 0) {

          var markersGoogle = [];

          var _props = this.props,
              map = _props.map,
              google = _props.google,
              position = _props.position,
              mapCenter = _props.mapCenter,
              icon = _props.icon,
              label = _props.label,
              draggable = _props.draggable,
              title = _props.title;

          if (!google) {
            return null;
          }

          if (map) {
            var _loop = function _loop() {

              var markerInfo = _this2.props.markers[i];

              var pref = {
                map: map,
                position: markerInfo.position,
                icon: markerInfo.icon,
                label: markerInfo.label,
                title: markerInfo.title,
                draggable: markerInfo.draggable
              };

              marker = new google.maps.Marker(pref);


              evtNames.forEach(function (e) {
                if (markerInfo[e]) {
                  marker.addListener(e, markerInfo[e]);
                }
              });

              markersGoogle.push(marker);
            };

            for (var i = 0; i < this.props.markers.length; i++) {
              var marker;

              _loop();
            }

            var options = {
              imagePath: this.props.imagePath,
              styles: this.props.styles ? this.props.styles : []
            };

            var markerCluster = new MarkerClusterer(map, markersGoogle, options);
          }
        }

        this.clusterPromise.resolve(this.cluster);
      }
    }, {
      key: 'getCluster',
      value: function getCluster() {
        return this.clusterPromise;
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }]);

    return Cluster;
  }(_react2.default.Component);

  Cluster.propTypes = {
    markers: _propTypes2.default.array,
    imagePath: _propTypes2.default.string,
    styles: _propTypes2.default.array,
    map: _propTypes2.default.object
  };

  Cluster.defaultProps = {
    name: 'Cluster'
  };

  exports.default = Cluster;
});