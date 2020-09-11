import React from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { BackgroundMap } from '../../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';

const LoadingContainer = (props) => <div>Fancy loading container!</div>;

const MapComponent = (props) => {
  const {
    google,
    zoom,
    onMarkerClick,
    onInfoWindowClose,
    selectedPlace,
  } = props;

  return (
    <BackgroundMap>
      <Map google={google} zoom={zoom}>
        <Marker onClick={onMarkerClick} name={'Current location'} />
        <InfoWindow onClose={onInfoWindowClose}>
          <div>
            <h1>{selectedPlace}</h1>
          </div>
        </InfoWindow>
      </Map>
    </BackgroundMap>
  );
};

Map.propTypes = {
  location: PropTypes.shape().isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBeMNQovf8Eeug6YF3A4zeoft_UwVpzdLQ',
  LoadingContainer,
})(MapComponent);
