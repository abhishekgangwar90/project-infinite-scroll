import React from 'react';
import PropTypes from 'prop-types';
import './searchBar.scss';
import SEARCH_ICON from '../../assets/icons/search.svg';

function SearchBar({ customClass, ...rest }) {
  return (
    <div className="search">
      <input className={`${customClass} search--animated`} {...rest} />
      <img className="search__icon" alt="search" src={SEARCH_ICON} />
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
