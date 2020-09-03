import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import DateFormatter from '../../../../utils/dateFormatter';
import {
  List,
  ListLiContent,
  EditLink,
  DeleteButton,
  SpansDiv
} from '../../../../styles/Components/UI/List/Products/ProductList';

const ProductList = (props) => {
  const { products, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className='productName'>
          <span>Product Name</span>
        </div>
        <div className='price'>
          <span>
            Price
          </span>
        </div>
        <div className='compareTo'>
          <span>
            Compare To
          </span>
        </div>
        <div className='createdOn'>
          <span>
            Created On
          </span>
        </div>
        <div className='updatedOn'>
          <span>
            Updated On
          </span>
        </div>
        <div className='featured'>
          <span>Featured</span>
        </div>
        <div className='buttons'>
          <span>Edit / Delete</span>
        </div>
      </SpansDiv>
      {products.map((product) => (
        <ListLiContent id={product._id}>
          <div className='productName'>
            <a
              href={`${process.env.SECURED_MAIN_DOMAIN}/product/${product.slug}`}
              target='_blank'
              rel='noreferrer'
            >
              {product.productName}
            </a>
          </div>
          <div className='price'>
            <p>
              {product.prices.price}
            </p>
          </div>
          <div className='compareTo'>
            <p>
              {product.prices.compareTo}
            </p>
          </div>
          <div className='createdOn'>
            <p>
              {dateFormatter.formatDateFullDate(product.createdOn)}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {product.updatedOn ? (
                <>
                  {dateFormatter.formatDateFullDate(product.updatedOn)}
                </>
              ) : ('Not updated')}
            </p>
          </div>
          <div className='featured'>
            {product.featured ? <input type='checkbox' checked /> : <input type='checkbox' />}
          </div>
          <div className='buttons'>
            <Link
              href='/edit/product/[slug]'
              as={`/edit/product/${product.slug}`}
            >
              <EditLink>
                <FaEdit />
              </EditLink>
            </Link>
            <DeleteButton onClick={(e) => {
              handleSelectProduct(e);
            }}
            >
              <FaTrashAlt />
            </DeleteButton>
          </div>
        </ListLiContent>
      ))}
    </List>
  );
};

ProductList.propTypes = {
  products: PropTypes.shape().isRequired
};

export default ProductList;
