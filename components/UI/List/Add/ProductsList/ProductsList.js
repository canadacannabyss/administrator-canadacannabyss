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
} from '../../../../../styles/Components/UI/List/Add/Bundle/ProductsList';

const ProductsList = (props) => {
  const { title, products, handleGetElement } = props;

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
            </List>
          </Content>
        </ContentContainer>
      </Container>
    </>
  );
};

ProductsList.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.shape().isRequired,
  handleGetElement: PropTypes.func.isRequired
};

export default ProductsList;
