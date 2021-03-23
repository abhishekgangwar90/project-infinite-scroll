import React from 'react';
import PropTypes from 'prop-types';
import './searchBar.scss';

function SearchBar({ customClass, ...rest }) {
  return (
    <div className="search">
      <input className={`${customClass} search--animated`} {...rest} />
    </div>
  );
}

SearchBar.defaultProps = {
  customClass: '',
};

SearchBar.propTypes = {
  customClass: PropTypes.string,
};

export default SearchBar;
