import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

function useOutsideAlerter(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeTab(handler);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

function closeTab(handler) {
  const closer = handler;
  closer();
}

function OutsideAlerter(props) {
  const { children, handleClose } = props;

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClose);

  return <div ref={wrapperRef}>{children}</div>;
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default OutsideAlerter;
