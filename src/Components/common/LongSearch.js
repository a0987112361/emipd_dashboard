import React from 'react';
import PropTypes from 'prop-types';
import './LongSearch.css';
import { Colors } from 'src/Theme';
import { Input } from 'antd';

class LongSearch extends React.Component {
  static propTypes = {
    handleSearch: PropTypes.func,
    placeholder: PropTypes.string,
    searchStyle: PropTypes.object,
  };

  static defaultProps = {
    handleSearch: () => { },
    placeholder: 'Search',
    searchStyle: {},
  };

  render() {
    const {
      handleSearch,
      placeholder,
      searchStyle,
    } = this.props;

    return (
      <Input
        onChange={handleSearch}
        placeholder={placeholder}
        className="longSearchInput"
        style={{
          width: '220px',
          height: '40px',
          backgroundColor: Colors.searchBlue,
          color: 'white',
          borderRadius: '5px',
          boxShadow: 'rgba(0,0,0,0.4) 0px 0px 15px 0px inset',
          ...searchStyle,
        }} />
    );
  }
}

export default LongSearch;
