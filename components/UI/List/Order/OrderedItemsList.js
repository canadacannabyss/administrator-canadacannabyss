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
  ListLiContent,
  ProductDetail,
  ProductDetailList,
  ProductDetailQuantity
} from '../../../../styles/Components/UI/List/Edit/Order/OrderedItemsList';

const ProductsBundlesList = (props) => {
  const {
    title, products, handleGetElement
  } = props;

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  const capitalizeString = (string) => string.substring(0, 1).toUpperCase() + string.substring(1, string.length);

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
                    <div className='empty' />
                    <ProductDetail id={`order-items-details-${product._id}`} className='items-detail'>
                      {product.variant.length > 0 && (
                        <>
                          <ProductDetailList productsLength={product.variantName.length}>
                            {product.variantName.map((name, index) => (
                              <div>
                                <label htmlFor={product.variant[index]}>{capitalizeString(name)}</label>
                                <p id={product.variant[index]}>{product.variant[index]}</p>
                              </div>
                            ))}
                          </ProductDetailList>
                          <br />
                        </>
                      )}
                      <ProductDetailQuantity>
                        <label htmlFor='quantity'>Quantity</label>
                        <p id='quantity'>{product.quantity}</p>
                      </ProductDetailQuantity>
                    </ProductDetail>
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
