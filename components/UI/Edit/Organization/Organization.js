import React from 'react';
import PropTypes from 'prop-types';
import {
  Content,
  ContentContainer,
  Label,
  SideContainer,
  TitleSearchBarAddButtonDiv,
  TitleDiv,
  OrganizationTextArea,
} from '../../../../styles/Pages/Add/Product';

const Organization = (props) => {
  const {
    onChangeCategories, onChangeTags, categories, tags,
  } = props;

  return (
    <SideContainer className='side'>
      <ContentContainer>
        <Content>
          <TitleSearchBarAddButtonDiv>
            <TitleDiv>
              <h2>Organization</h2>
            </TitleDiv>
          </TitleSearchBarAddButtonDiv>
          <Label htmlFor='category'>Category</Label>
          <OrganizationTextArea
            id='category'
            type='text'
            autoComplete='off'
            onChange={onChangeCategories}
            value={categories}
          />
          <br />
          <Label htmlFor='tags'>Tags</Label>
          <OrganizationTextArea
            id='tags'
            type='text'
            autoComplete='off'
            onChange={onChangeTags}
            value={tags}
          />
        </Content>
      </ContentContainer>
    </SideContainer>
  );
};

Organization.propTypes = {
  onChangeCategories: PropTypes.func.isRequired,
  onChangeTags: PropTypes.func.isRequired,
  categories: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Organization;
