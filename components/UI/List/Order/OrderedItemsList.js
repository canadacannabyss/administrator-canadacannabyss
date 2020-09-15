import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Container,
  ContentContainer,
  Content,
  InputGroupTitle
} from '../../../../styles/Pages/Add/Product';
import {
  List,
  ListLiContent
} from '../../../../styles/Components/UI/List/Add/Coupon/ProductsBundlesList';

const ProductsBundlesList = (props) => {
  const {
    title, products, handleGetElement
  } = props;

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
              {!_.isEmpty(products) && (
              <>
                {products.map((product) => (
                  <ListLiContent
                    key={product._id}
                    id={product._id}
                    className='product'
                    onClick={handleSelectProduct}
                  >
                    <div className='media'>
                      <img src={product.media.url} alt={product.itemName} />
                    </div>
                    <div className='productName'>
                      <p className='name'>
                        {product.itemName}
                      </p>
                    </div>
                  </ListLiContent>
                ))}
              </>
              )}
            </List>
          </Content>
        </ContentContainer>
      </Container>
    </>
  );
};

ProductsBundlesList.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.shape().isRequired,
  handleGetElement: PropTypes.func.isRequired,
  applyCouponOn: PropTypes.string.isRequired
};

export default ProductsBundlesList;
