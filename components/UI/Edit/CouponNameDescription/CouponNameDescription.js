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
  HalfGrid,
  Label,
  Input,
  Select,
  WeightLabel,
  WeightInput,
  WeightUnitSelect
} from '../../../../styles/Pages/Add/Product';
import FeaturedCheckbox from '../../Buttons/Checkbox/Featured';
import FreeShippingCheckbox from '../../Buttons/Checkbox/FreeShippingCheckbox';

const BannerNameDescription = (props) => {
  const {
    MainIcon,
    PlusIcon,
    title,
    itemName,
    onChangeItemName,
    onChangeDiscountAmount,
    onChangeDiscountType,
    onChangeAvailableAt,
    onChangeApplyOn,
    onChangeQuantity,
    description,
    onChangeDescription,
    handleCheckFeatured,
    handleCheckFreeShipping,
    featured,
    freeShipping
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
          />
          <br />
          <HalfGrid>
            <div>
              <WeightLabel htmlFor='discountAmount'>
                Discount
              </WeightLabel>
              <br />
              <WeightInput
                id='discountAmount'
                type='number'
                min='0'
                step='0.1'
                autoComplete='off'
                onChange={onChangeDiscountAmount}
              />
              <WeightUnitSelect onChange={onChangeDiscountType}>
                <option value='percent'>Percent</option>
                <option value='cash'>Cash</option>
              </WeightUnitSelect>
            </div>
            <div>
              <WeightLabel htmlFor='quantity'>
                Quantity
              </WeightLabel>
              <br />
              <WeightInput
                id='quantity'
                type='number'
                min='0'
                step='0.1'
                autoComplete='off'
                onChange={onChangeQuantity}
              />
            </div>
          </HalfGrid>
          <HalfGrid>
            <div>
              <WeightLabel>Available At</WeightLabel>
              <br />
              <Select onChange={onChangeAvailableAt}>
                <option value='canada'>Canadawide</option>
              </Select>
            </div>
            <div>
              <WeightLabel>Applied On</WeightLabel>
              <br />
              <Select onChange={onChangeApplyOn}>
                <option value='items'>All Items</option>
                <option value='products'>Products</option>
                <option value='bundles'>Bundles</option>
              </Select>
            </div>
          </HalfGrid>
          <br />
          <HalfGrid>
            <div>
              <FeaturedCheckbox
                handleCheckFeatured={handleCheckFeatured}
                featured={featured}
              />
            </div>
            <div>
              <FreeShippingCheckbox
                handleCheckFreeShipping={handleCheckFreeShipping}
                freeShipping={freeShipping}
              />
            </div>
          </HalfGrid>
          <Label htmlFor='productDescription'>Description</Label>
          <div>
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
  onChangeItemName: PropTypes.func.isRequired,
  onChangeDiscountAmount: PropTypes.func.isRequired,
  onChangeDiscountType: PropTypes.func.isRequired,
  onChangeAvailableAt: PropTypes.func.isRequired,
  onChangeApplyOn: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  handleCheckFeatured: PropTypes.func.isRequired,
  handleCheckFreeShipping: PropTypes.func.isRequired,
  featured: PropTypes.bool.isRequired,
  freeShipping: PropTypes.bool.isRequired
};

export default BannerNameDescription;
