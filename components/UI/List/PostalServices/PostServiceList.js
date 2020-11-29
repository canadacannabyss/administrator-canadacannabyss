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
} from "../../../../styles/Components/UI/List/Coupons/CouponList";

const PostalServiceList = (props) => {
  const { postalServices, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className="couponName">
          <span>Coupon Name</span>
        </div>
        <div className="createdAt">
          <span>Created On</span>
        </div>
        <div className="updatedAt">
          <span>Updated On</span>
        </div>
        <div className="buttons">
          <span>Edit / Delete</span>
        </div>
      </SpansDiv>
      {postalServices.map((postalService) => (
        <ListLiContent id={postalService._id}>
          <div className="couponName">
            <a>{postalService.name}</a>
          </div>
          <div className="createdAt">
            <p>{dateFormatter.formatDateFullDate(postalService.createdAt)}</p>
          </div>
          <div className="updatedAt">
            <p>
              {postalService.updatedAt ? (
                <>{dateFormatter.formatDateFullDate(postalService.updatedAt)}</>
              ) : (
                "Not updated"
              )}
            </p>
          </div>
          <div className="buttons">
            <Link
              href="/edit/postal-service/[slug]"
              as={`/edit/postal-service/${postalService.slug}`}
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

PostalServiceList.propTypes = {
  postalServices: PropTypes.shape().isRequired,
};

export default PostalServiceList;
