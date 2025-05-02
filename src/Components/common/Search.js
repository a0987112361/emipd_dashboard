import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'src/Theme';
import { Input } from 'antd';
import { translate as t } from 'src/Helpers/I18n';
import './Search.css';

class Search extends React.Component {
  static propTypes = {
    handleSearch: PropTypes.func,
    placeholder: PropTypes.string,
    searchStyle: PropTypes.object,
  };

  static defaultProps = {
    handleSearch: () => { },
    placeholder: t('common_search'),
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
        placeholder={t('common_search')}
        className="searchInput"
        style={{
          width: '150px',
          height: '25px',
          backgroundColor: 'white',
          color: '#6A67CE',
          border:'1.5px solid #A6C1D3', 
          marginLeft:'10px',
          // borderRadius: '5px',
          // boxShadow: 'rgba(0,0,0,0.4) 0px 0px 15px 0px inset',
          ...searchStyle,
        }}>
        </Input> 
    );
  }
}

export default Search;
