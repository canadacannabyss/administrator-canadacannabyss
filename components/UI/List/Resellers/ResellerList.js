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
} from "../../../../styles/Components/UI/List/Resellers/ResellerList";

const ResellerList = (props) => {
  const { resellers, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className="resellerName">
          <span>Reseller Name</span>
        </div>
        <div className="createdAt">
          <span>Created On</span>
        </div>
        <div className="updatedAt">
          <span>Updated On</span>
        </div>
        <div className="featured">
          <span>Verified</span>
        </div>
        <div className="buttons">
          <span>Edit / Delete</span>
        </div>
      </SpansDiv>
      {resellers.map((reseller) => (
        <ListLiContent id={reseller._id}>
          <div className="resellerName">
            <Link
              href="/reseller/[username]"
              as={`/reseller/${reseller.username}`}
            >
              <a>{`${reseller.names.firstName} ${reseller.names.lastName}`}</a>
            </Link>
          </div>
          <div className="createdAt">
            <p>{dateFormatter.formatDateFullDate(reseller.createdAt)}</p>
          </div>
          <div className="updatedAt">
            <p>
              {reseller.updatedAt ? (
                <>{dateFormatter.formatDateFullDate(reseller.updatedAt)}</>
              ) : (
                "Not updated"
              )}
            </p>
          </div>
          <div className="featured">
            {reseller.isVerified ? (
              <input type="checkbox" checked />
            ) : (
              <input type="checkbox" disabled />
            )}
          </div>
          <div className="buttons">
            <Link
              href="/edit/reseller/[username]"
              as={`/edit/reseller/${reseller.username}`}
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

ResellerList.propTypes = {
  resellers: PropTypes.shape().isRequired,
};

export default ResellerList;
