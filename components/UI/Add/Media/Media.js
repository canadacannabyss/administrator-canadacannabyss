import React from 'react';
import PropTypes from 'prop-types';
import { ImageUploader } from 'portrait-load';
import {
  Container,
  ContentContainer,
  Content
} from '../../../../styles/Pages/Add/Product';

const Media = (props) => {
  const {
    childRef, multipleFiles, handleSetImagesArray, imagesArray
  } = props;

  return (
    <Container>
      <ContentContainer>
        <Content>
          <ImageUploader
            ref={childRef}
            width='100%'
            height='300px'
            imagesArray={imagesArray}
            handleSetImagesArray={handleSetImagesArray}
            isDragNotAcceptColor='rgba(0, 0, 0, 0.3)'
            isDragAcceptColor='#18840f'
            isDragRejectColor='#ff0000'
            textColor='#18840f'
            textSize='18px'
            onDragMessage='Drop the files here'
            defaultMessage='Allowed files dimensions'
            fileDimensions={{
              width: '640px',
              height: '640px'
            }}
            multipleFiles={multipleFiles}
            apiEndpoint={`${process.env.MAIN_API_ENDPOINT}/admin/products/publish/media`}
          />
        </Content>
      </ContentContainer>
    </Container>
  );
};

Media.propTypes = {
  childRef: PropTypes.shape().isRequired,
  multipleFiles: PropTypes.bool.isRequired,
  handleSetImagesArray: PropTypes.func.isRequired,
  imagesArray: PropTypes.shape().isRequired
};

export default Media;
