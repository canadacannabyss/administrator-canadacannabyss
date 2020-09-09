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
} from '../../../../styles/Components/UI/List/Categories/CategoryList';

const CategoryList = (props) => {
  const { categories } = props;

  const dateFormatter = new DateFormatter();

  return (
    <List>
      <SpansDiv>
        <div className='categoryName'>
          <span>Category Name</span>
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
            <a href={`${process.env.SECURED_MAIN_DOMAIN}/category/${category.slug}`}>
              {category.categoryName}
            </a>
          </div>
          <div className='createdOn'>
            <p>
              {dateFormatter.formatDateFullDate(category.createdOn)}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {category.updatedOn ? (
                <>
                  {dateFormatter.formatDateFullDate(category.updatedOn)}
                </>
              ) : ('Not updated')}
            </p>
          </div>
          <div className='featured'>
            {category.featured ? <input type='checkbox' checked /> : <input type='checkbox' />}
          </div>
          <div className='buttons'>
            <Link
              href='/edit/category/[slug]'
              as={`/edit/category/${category.slug}`}
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
  categories: PropTypes.shape().isRequired
};

export default CategoryList;
