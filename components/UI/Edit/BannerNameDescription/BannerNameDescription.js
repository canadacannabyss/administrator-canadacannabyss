import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import {
  Container,
  ContentContainer,
  TitleSearchBarAddButtonDiv,
  TitleDiv,
  Content,
  PlusIconSign,
  Label,
  Input
} from '../../../../styles/Pages/Add/Product';
import FeaturedCheckbox from '../../Buttons/Checkbox/Featured';

const BannerNameDescription = (props) => {
  const {
    MainIcon,
    PlusIcon,
    title,
    itemName,
    itemNameInput,
    onChangeItemName,
    description,
    onChangeDescription,
    handleCheckFeatured,
    featured
  } = props;

  return (
    <Container>
      <ContentContainer>
        <Content>
          <TitleSearchBarAddButtonDiv>
            <TitleDiv>
              <PlusIconSign>
                {MainIcon}
                {PlusIcon}
              </PlusIconSign>
              <h1>{title}</h1>
            </TitleDiv>
          </TitleSearchBarAddButtonDiv>
          <Label htmlFor='itemName'>{itemName}</Label>
          <Input
            id='itemName'
            type='text'
            autoComplete='off'
            onChange={onChangeItemName}
            value={itemNameInput}
          />
          <br />
          <FeaturedCheckbox
            handleCheckFeatured={handleCheckFeatured}
            featured={featured}
          />
          <Label htmlFor='productDescription'>Description</Label>
          <div>
            {description && (
            <Editor
              apiKey='z1imaefgqfqi5gkj9tp9blogndyf2gp0aj3fgubdtz73p658'
              name='description'
              initialValue={description}
              init={{
                height: 320,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
              }}
              onChange={onChangeDescription}
            />
            )}
          </div>
        </Content>
      </ContentContainer>
    </Container>
  );
};

BannerNameDescription.propTypes = {
  MainIcon: PropTypes.element.isRequired,
  PlusIcon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemNameInput: PropTypes.string.isRequired,
  onChangeItemName: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  handleCheckFeatured: PropTypes.func.isRequired,
  featured: PropTypes.bool.isRequired
};

export default BannerNameDescription;
