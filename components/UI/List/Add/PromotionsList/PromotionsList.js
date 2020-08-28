import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ContentContainer,
  Content,
  InputGroupTitle
} from '../../../../../styles/Pages/Add/Product';
import {
  List,
  ListLiContent
} from '../../../../../styles/Components/UI/List/Add/Banner/PromotionsList';

const PromotionsList = (props) => {
  const { title, promotions, handleGetElement } = props;

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <>
      <Container>
        <ContentContainer>
          <Content>
            <InputGroupTitle>{title}</InputGroupTitle>
            <List style={{
              height: '400px'
            }}
            >
              {promotions.map((promotion) => (
                <ListLiContent
                  key={promotion._id}
                  id={promotion._id}
                  onClick={handleSelectProduct}
                >
                  <div className='media'>
                    <img src={promotion.media.url} alt={promotion.promotionName} />
                  </div>
                  <div className='productName'>
                    <p className='name'>
                      {promotion.promotionName}
                    </p>
                  </div>
                </ListLiContent>
              ))}
            </List>
          </Content>
        </ContentContainer>
      </Container>
    </>
  );
};

PromotionsList.propTypes = {
  title: PropTypes.string.isRequired,
  promotions: PropTypes.shape().isRequired,
  handleGetElement: PropTypes.func.isRequired
};

export default PromotionsList;
