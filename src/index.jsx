import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const ReactGoogleMap = withGoogleMap((props) => {
  let {
    markers
  } = props;

  return (
    <GoogleMap
      defaultZoom={props.defaultZoom}
      defaultCenter={props.defaultCenter}>
      {
        markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position} />
        ))
      }
    </GoogleMap>
  );
});

const GoogleMapsWithScript = withScriptjs(ReactGoogleMap);

class GoogleMapWithLayers extends Component {
  render () {
    return (
      <GoogleMapsWithScript
        googleMapURL={this.props.googleMapURL}
        loadingElement={this.props.loadingElement}
        containerElement={this.props.containerElement}
        mapElement={this.props.mapElement}
        defaultCenter={this.props.defaultCenter}
        defaultZoom={this.props.defaultZoom}
        markers={this.props.markers} />
    )
  }
}

GoogleMapWithLayers.propTypes = {
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  mapElement: PropTypes.element,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  defaultZoom: PropTypes.number,
  marker: PropTypes.array
};

GoogleMapWithLayers.defaultProps = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style = {{ height: `100%` }} />,
  mapElement: <div style = {{ height: `100%` }} />,
  defaultCenter: {
    lat: -27.4780849,
    lng: -58.8346995
  },
  defaultZoom: 10,
  markers: []
};

export default GoogleMapWithLayers;