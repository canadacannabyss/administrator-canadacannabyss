import React from 'react';
import MapComponent from '../../components/UI/Map/Map';
import WithAuth from '../../components/UI/withAuth/withAuth';

const Map = () => (
  <WithAuth>
    <MapComponent />
  </WithAuth>
);

export default Map;
