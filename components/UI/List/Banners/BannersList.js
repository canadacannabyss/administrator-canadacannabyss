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
} from "../../../../styles/Components/UI/List/Banners/BannerList";

const BannerList = (props) => {
  const { banners, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className="promotionName">
          <span>Banner Name</span>
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
      {banners.map((banner) => (
        <ListLiContent id={banner._id}>
          <div className="promotionName">
            <a
              href={`${process.env.SECURED_MAIN_DOMAIN}/banner/${banner.slug}`}
            >
              {banner.bannerName}
            </a>
          </div>
          <div className="createdAt">
            <p>{dateFormatter.formatDateFullDate(banner.createdAt)}</p>
          </div>
          <div className="updatedAt">
            <p>
              {banner.updatedAt ? (
                <>{dateFormatter.formatDateFullDate(banner.updatedAt)}</>
              ) : (
                "Not updated"
              )}
            </p>
          </div>
          <div className="featured">
            {banner.featured ? (
              <input type="checkbox" checked />
            ) : (
              <input type="checkbox" />
            )}
          </div>
          <div className="buttons">
            <Link href="/edit/banner/[slug]" as={`/edit/banner/${banner.slug}`}>
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

BannerList.propTypes = {
  banners: PropTypes.shape().isRequired,
};

export default BannerList;
