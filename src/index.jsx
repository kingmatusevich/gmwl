import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

const ReactGoogleMap = withGoogleMap((props) => {
  let {
    clusters,
    defaultCenter,
    defaultZoom,
    markers
  } = props;

  const renderMarkers = (markers) => {
    let renderedMarkers = markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}>
        {
          marker.showInfoWindow && marker.infoWindow &&
          <InfoWindow onCloseClick={marker.onCloseClick}>
            {
              typeof marker.infoWindow === 'string' ?
              <p>{marker.infoWindow}</p> : marker.infoWindow
            }
          </InfoWindow>
        }
      </Marker>
    ));

    if (clusters) {
      return (
        <MarkerClusterer>
          {renderedMarkers}
        </MarkerClusterer>
      );
    } else {
      return renderedMarkers;
    }

  }

  return (
    <GoogleMap
      defaultCenter={defaultCenter}
      defaultZoom={defaultZoom}>
      {renderMarkers(markers)}
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
        clusters={this.props.clusters}
        defaultCenter={this.props.defaultCenter}
        defaultZoom={this.props.defaultZoom}
        markers={this.props.markers} />
    )
  }
}

GoogleMapWithLayers.propTypes = {
  clusters: PropTypes.bool,
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  mapElement: PropTypes.element,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  defaultZoom: PropTypes.number,
  marker: PropTypes.arrayOf(PropTypes.shape({
    position: {
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    },
    InfoWindow: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    showInfoWindow: PropTypes.bool,
    onCloseClick: PropTypes.func
  }))
};

GoogleMapWithLayers.defaultProps = {
  googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style = {{ height: `100%` }} />,
  mapElement: <div style = {{ height: `100%` }} />,
  clusters: true,
  defaultCenter: {
    lat: -27.4780849,
    lng: -58.8346995
  },
  defaultZoom: 10,
  markers: []
};

export default GoogleMapWithLayers;