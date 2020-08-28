import React from 'react';
import _ from 'lodash';
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
} from '../../../../../styles/Components/UI/List/Add/Coupon/ProductsBundlesList';

const ProductsBundlesList = (props) => {
  const {
    title, products, bundles, handleGetElement, applyCouponOn
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
              {applyCouponOn === 'items' && (
                <>
                  {!_.isEmpty(products) && (
                    <>
                      <h5>Products</h5>
                      {products.map((product) => (
                        <ListLiContent
                          key={product._id}
                          id={product._id}
                          onClick={handleSelectProduct}
                        >
                          <div className='media'>
                            <img src={product.media[0].url} alt={product.productName} />
                          </div>
                          <div className='productName'>
                            <p className='name'>
                              {product.productName}
                            </p>
                          </div>
                        </ListLiContent>
                      ))}
                    </>
                  )}
                  <br />
                  {!_.isEmpty(bundles) && (
                    <>
                      <h5>Bundles</h5>
                      {bundles.map((bundle) => (
                        <ListLiContent
                          key={bundle._id}
                          id={bundle._id}
                          onClick={handleSelectProduct}
                        >
                          <div
                            className='media'
                          >
                            <img
                              src={bundle.products[0].media[0].url}
                              alt={bundle.bundleName}
                            />
                          </div>
                          <div className='productName'>
                            <p className='name'>
                              {bundle.bundleName}
                            </p>
                          </div>
                        </ListLiContent>
                      ))}
                    </>
                  )}
                </>
              )}
              {applyCouponOn === 'products' && (
                <>
                  {!_.isEmpty(products) && (
                    <>
                      <h5>Products</h5>
                      {products.map((product) => (
                        <ListLiContent
                          key={product._id}
                          id={product._id}
                          onClick={handleSelectProduct}
                        >
                          <div className='media'>
                            <img src={product.media[0].url} alt={product.productName} />
                          </div>
                          <div className='productName'>
                            <p className='name'>
                              {product.productName}
                            </p>
                          </div>
                        </ListLiContent>
                      ))}
                    </>
                  )}
                </>
              )}
              {applyCouponOn === 'bundles' && (
                <>
                  {!_.isEmpty(bundles) && (
                  <>
                    <h5>Bundles</h5>
                    {bundles.map((bundle) => (
                      <ListLiContent
                        key={bundle._id}
                        id={bundle._id}
                        onClick={handleSelectProduct}
                      >
                        <div className='media'>
                          <img src={bundle.products[0].media[0].url} alt={bundle.bundleName} />
                        </div>
                        <div className='productName'>
                          <p className='name'>
                            {bundle.bundleName}
                          </p>
                        </div>
                      </ListLiContent>
                    ))}
                  </>
                  )}
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
