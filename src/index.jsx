import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

const ReactGoogleMap = withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
  );
});

const WithScript = withScriptjs(ReactGoogleMap);

class GoogleMapWithLayers extends Component {
  render () {
    return (
      <WithScript
        googleMapURL={this.props.googleMapURL}
        loadingElement={this.props.loadingElement}
        containerElement={this.props.containerElement}
        mapElement={this.props.mapElement} />
    )
  }
}

GoogleMapWithLayers.propTypes = {
  googleMapURL: PropTypes.string.isRequired,
  loadingElement: PropTypes.element.isRequired,
  containerElement: PropTypes.element.isRequired,
  mapElement: PropTypes.element.isRequired
};

GoogleMapWithLayers.defaultProps = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style = {{ height: `100%` }} />,
  mapElement: <div style = {{ height: `100%` }} />
};

export default GoogleMapWithLayers;