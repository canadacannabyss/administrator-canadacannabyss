import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import DateFormatter from "../../../../utils/dateFormatter";
import {
  List,
  ListLiContent,
  EditLink,
  DeleteButton,
  SpansDiv,
} from "../../../../styles/Components/UI/List/Categories/CategoryList";

const CategoryList = (props) => {
  const { categories, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className="categoryName">
          <span>Category Name</span>
        </div>
        <div className="createdAt">
          <span>Created On</span>
        </div>
        <div className="updatedAt">
          <span>Updated On</span>
        </div>
        <div className="featured">
          <span>Featured</span>
        </div>
        <div className="buttons">
          <span>Edit / Delete</span>
        </div>
      </SpansDiv>
      {categories.map((category) => (
        <ListLiContent id={category._id}>
          <div className="categoryName">
            <a
              href={`${process.env.SECURED_MAIN_DOMAIN}/category/${category.slug}`}
            >
              {category.categoryName}
            </a>
          </div>
          <div className="createdAt">
            <p>{dateFormatter.formatDateFullDate(category.createdAt)}</p>
          </div>
          <div className="updatedAt">
            <p>
              {category.updatedAt ? (
                <>{dateFormatter.formatDateFullDate(category.updatedAt)}</>
              ) : (
                "Not updated"
              )}
            </p>
          </div>
          <div className="featured">
            {category.featured ? (
              <input type="checkbox" checked />
            ) : (
              <input type="checkbox" />
            )}
          </div>
          <div className="buttons">
            <Link
              href="/edit/category/[slug]"
              as={`/edit/category/${category.slug}`}
            >
              <EditLink>
                <FaEdit />
              </EditLink>
            </Link>
            <DeleteButton
              onClick={(e) => {
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

CategoryList.propTypes = {
  categories: PropTypes.shape().isRequired,
};

export default CategoryList;
