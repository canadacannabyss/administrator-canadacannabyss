import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import {
  List,
  ListLiContent,
  EditLink,
  DeleteButton,
  SpansDiv,
} from '../../../../styles/Components/UI/List/Categories/CategoryList';

const CategoryList = (props) => {
  const { categories } = props;
  return (
    <List>
      <SpansDiv>
        <div className='categoryName'>
          <span>Category Name</span>
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
      {categories.map((category) => (
        <ListLiContent>
          <div className='categoryName'>
            <a href={`${process.env.STORE_MAIN_DOMAIN}/category/${category.slug}`}>
              {category.categoryName}
            </a>
          </div>
          <div className='price'>
            <p>
              {category.prices.price}
            </p>
          </div>
          <div className='compareTo'>
            <p>
              {category.prices.compareTo}
            </p>
          </div>
          <div className='createdOn'>
            <p>
              {category.createdOn}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {category.updatedOn}
            </p>
          </div>
          <div className='featured'>
            {category.featured ? <input type='checkbox' checked /> : <input type='checkbox' />}
          </div>
          <div className='buttons'>
            <Link
              href='/categories/edit/[slug]'
              as={`/categories/edit/${category.slug}`}
            >
              <EditLink>
                <FaEdit />
              </EditLink>
            </Link>
            <DeleteButton>
              <FaTrashAlt />
            </DeleteButton>
          </div>
        </ListLiContent>
      ))}
    </List>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.shape().isRequired,
};

export default CategoryList;
