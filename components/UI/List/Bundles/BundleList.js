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
} from "../../../../styles/Components/UI/List/Bundles/BundleList";

const BundleList = (props) => {
  const { bundles, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className="productName">
          <span>Bundle Name</span>
        </div>
        <div className="price">
          <span>Price</span>
        </div>
        <div className="compareTo">
          <span>Compare To</span>
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
      {bundles.map((bundle) => (
        <ListLiContent id={bundle._id}>
          <div className="bundleName">
            <a
              href={`${process.env.SECURED_MAIN_DOMAIN}/bundle/${bundle.slug}`}
            >
              {bundle.bundleName}
            </a>
          </div>
          <div className="price">
            <p>{bundle.prices.price}</p>
          </div>
          <div className="compareTo">
            <p>{bundle.prices.compareTo}</p>
          </div>
          <div className="createdAt">
            <p>{dateFormatter.formatDateFullDate(bundle.createdAt)}</p>
          </div>
          <div className="updatedAt">
            <p>
              {bundle.updatedAt ? (
                <>{dateFormatter.formatDateFullDate(bundle.updatedAt)}</>
              ) : (
                "Not updated"
              )}
            </p>
          </div>
          <div className="featured">
            {bundle.featured ? (
              <input type="checkbox" checked />
            ) : (
              <input type="checkbox" />
            )}
          </div>
          <div className="buttons">
            <Link href="/edit/bundle/[slug]" as={`/edit/bundle/${bundle.slug}`}>
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

BundleList.propTypes = {
  bundles: PropTypes.shape().isRequired,
};

export default BundleList;
