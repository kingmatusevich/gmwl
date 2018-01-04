// @flow

import * as React from 'react';
import { GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs } from 'react-google-maps'
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

type MarkerType = {
  position: {
    lat: number,
    lng: number,
  },
  InfoWindow: string | Element,
  showInfoWindow: bool,
  onCloseClick: Function
}

type PropsTypes = {
  googleMapURL: string,
  loadingElement: Element,
  containerElement: Element,
  mapElement: Element,
  clusters: bool,
  defaultCenter: {
    lat: number,
    lng: number
  },
  defaultZoom: number,
  markers: Array<MarkerType>
};

const ReactGoogleMap = withGoogleMap((props: PropsTypes) => {
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

class GoogleMapWithLayers extends React.Component<PropsTypes> {

  static defaultProps = {
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    clusters: 3,
    defaultCenter: {
      lat: -27.4780849,
      lng: -58.8346995
    },
    defaultZoom: 10,
    markers: []
  }

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

export default GoogleMapWithLayers;