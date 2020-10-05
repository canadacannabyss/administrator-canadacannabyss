import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Container,
  ContentContainer,
  Content,
  InputGroupTitle,
  Label,
  Input,
  HalfGrid,
  Select
} from '../../../../styles/Pages/Add/Product';

const TrackingNumber = (props) => {
  const {
    handleTrackingNumber,
    trackingNumber,
    postalServices,
    handleSelectPostalService
  } = props;

  return (
    <Container>
      <ContentContainer>
        <Content>
          <InputGroupTitle>Tracking Number</InputGroupTitle>
          <HalfGrid>
            <div>
              <Label htmlFor='trackingNumber'>Tracking Number</Label>
              <Input id='trackingNumber' value={trackingNumber} onChange={handleTrackingNumber} />
            </div>
            <div>
              <Label>Postal Service</Label>
              <Select onChange={handleSelectPostalService}>
                <>
                  <option value='-'>------------</option>
                  {!_.isEmpty(postalServices.data) &&
                  postalServices.fetched &&
                  !postalServices.loading &&
                  !postalServices.error && (
                  <>
                    {postalServices.data.map((postalService) => (
                      <option value={postalService._id}>{postalService.name}</option>
                    ))}
                  </>
                  )}
                </>
              </Select>
            </div>
          </HalfGrid>
        </Content>
      </ContentContainer>
    </Container>
  );
};

TrackingNumber.propTypes = {
  handleTrackingNumber: PropTypes.func.isRequired,
  trackingNumber: PropTypes.string.isRequired
};

export default TrackingNumber;
