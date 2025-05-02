import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Input, Popover } from 'antd';
import {
  WarningFilled,
} from '@ant-design/icons';
import { Metrics, Screen } from 'src/Theme';
import './DataTable.css';

const { Search } = Input;
const styles = {
  table: {
    minWidth: 650,
  },
  root: {
    width: '100%',
    height: '100%',
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: Metrics.baseMargin,
  },
  input: {
    flex: 1,
    height: '46px',
    marginLeft: Metrics.baseMargin,
  },
  iconButton: {
    padding: 10,
  },
  toolbar: {
    display: 'flex',
  },
  btnStyle: {
    height: '46px',
    minWidth: '90px',
    marginLeft: Metrics.baseMargin,
  },
  searchBtn: {
    width: '400px'
  },
  headerBox: {
    // marginBottom: Metrics.baseMargin,
    display: 'flex',
  },
  // btnStyle: {
  //   width: '100px',
  //   marginLeft: Metrics.baseMargin,
  //   height: '40px',
  // },
  popoverBtn: {
    fontSize: '10px',
    padding: '0px',
    width: '45px',
    height: '20px',
  },
  textBox: {
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingTop: '32px',
    width: '100%',
    height: Screen.screenWidth >= 600 ? '356px' : '626px',
  },
  header: {
    display: 'flex',
    fontSize: '16px',
    marginBottom: '16px',
  },
  requiredText: {
    color: 'red',
    marginLeft: '2px',
  },
  groupBox: {
    flexDirection: 'row',
  },
  dialog: {
    zIndex: 1111111,
  },
  labelStyle: {
    // width: Screen.screenWidth >= 1024 ? '210px' : '210px',
    width: '210px',
    height: '270px',
    display: 'inline-block',
    border: '2px dotted #0000EE',
    textAlign: 'center',
    lineHeight: '300px',
    '&:hover': {
      opacity: 0.5,
    },
  },
  inputStyle: {
    display: 'none',
  },
  uploadIcon: {
    width: '60px',
    height: '60px',
    display: 'block',
    margin: '100px auto 0px',
  },
  iconBox: {
    lineHeight: '270px',
    position: 'relative',
    zIndex: 123,
    fontSize: '16px',
  },
  imgStyle: {
    height: '266px',
    width: '206px',
    position: 'relative',
    top: '-17px',
  },
  cardWrapper: {
    height: '500px',
    width: Screen.screenWidth >= 1024 ? '500px' : '100%',
  },
  labelBox: {
    width: '100%',
    textAlign: Screen.screenWidth >= 600 ? 'left' : 'center',
    display: Screen.screenWidth >= 600 ? 'flex' : 'block',
  },
  avatarSample: {
    width: '210px',
    height: '270px',
    marginRight: '16px',
  },
  cropBtnStyle: {
    width: '120px',
    height: '40px',
    marginTop: '16px',
  }
};

class DataTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    showPayButton: PropTypes.bool,
    showDisableButton: PropTypes.bool,
    column: PropTypes.array,
    handleChange: PropTypes.func,
    isRowSelection: PropTypes.bool,
    rowSelectionChange: PropTypes.object,
    showDeleteButton: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    showCreateButton: PropTypes.bool,
    showPointButton: PropTypes.bool,
    expandable: PropTypes.object,
    showSearch: PropTypes.bool,
    // showSelect: PropTypes.bool,
    customChildren: PropTypes.element,
    hasCustomChildren: PropTypes.bool,
    showClassSettingButton: PropTypes.bool,
    handleClassSetting: PropTypes.func,
    isLoading: PropTypes.bool,
    paging: PropTypes.object,
    hasPagination: PropTypes.bool,
    rowClassName: PropTypes.string,
    showSizeChanger: PropTypes.bool,
  };

  static defaultProps = {
    showPayButton: false,
    showDisableButton: false,
    handleChange: () => { },
    isRowSelection: true,
    rowSelectionChange: () => { },
    showDeleteButton: true,
    searchPlaceholder: '輸入搜尋文字',
    showCreateButton: true,
    showPointButton: false,
    expandable: {},
    showSearch: true,
    // showSelect: false,
    hasCustomChildren: false,
    showClassSettingButton: false,
    hasPagination: false,
    handleClassSetting: () => { },
    isLoading: false,
    paging: {
      total: 0,
      now_page: 1,
      page_size: 10,
    },
    rowClassName: '',
    showSizeChanger: false,
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.cropImage = this.cropImage.bind(this);
  }

  state = {
    selected: [],
    classOptions: [],
    selectedRowKeys: [],
    visible: false,
    allData: [],
    modalVisible: false,


    imgSrc: '',
    showModal: false,
    cropResult: '',
    hover: false,
    src: '',
    cropTime: false,
  };

  componentDidMount() {
    const {
      options,
      value,
    } = this.props;

    this.setState({
      classOptions: options,
      searchValue: value,
    });
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  // handleDelete = () => {
  //   let { selectedRowKeys, allData } = this.state;
  //   let tempData = allData.filter(function (value) {
  //     return selectedRowKeys.indexOf(value.key) === -1;
  //   });
  //   this.setState({
  //     allData: tempData,
  //     searchData: tempData,
  //   });
  //   this.setState({
  //     visible: false,
  //   });
  //   Swal.fire({
  //     icon: 'success',
  //     title: '刪除成功',
  //   });
  // }

  // handleSearch = (value) => {
  //   const { allData } = this.state;
  //   if (value === '') {
  //     this.setState({
  //       searchData: allData,
  //     });
  //   } else {
  //     let tempData = allData.filter(function (item) {
  //       return item.name.toUpperCase().indexOf(value.toUpperCase()) > -1
  //     });
  //     this.setState({
  //       searchData: tempData,
  //     });
  //   }
  // }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      showModal: false,
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
      cropTime: false,
    });
  }

  // onChange = (e) => {
  //   e.preventDefault();
  //   let files = '';
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }

  //   this.setState({
  //     cropTime: true,
  //   });
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.setState({ src: reader.result });
  //   };
  //   reader.readAsDataURL(files[0]);
  // };


  render() {
    let {
      selectedRowKeys,
    } = this.state;
    const {
      showDeleteButton,
      column,
      handleChange,
      data,
      searchValue,
      handleSearch,
      handleDelete,
      openModal,
      openPointModal,
      isRowSelection, // row 是否可以勾選
      rowSelectionChange,
      searchPlaceholder,
      showCreateButton,
      showPointButton,
      expandable,
      toolbar,
      tableStyle,
      scroll,
      showSearch,
      showSelect,
      customChildren, // 客製化內容
      hasCustomChildren, // 是否有客製化內容
      showClassSettingButton,
      handleClassSetting,
      hasPagination,
      isLoading,
      paging, // 分頁
      rowClassName,
      showSizeChanger,
    } = this.props;
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };

    const renderPagination = (current, type, originalElement) => {
      if (type === 'prev') {
        return <a className="table-prev" >&lt;&nbsp;&nbsp;  Prev</a>;
      } if (type === 'next') {
        return <a>Next  &nbsp;&nbsp;&gt;</a>;
      }
      return originalElement;
    }

    return (
      <div style={{ width: '100%' }}>
        <div style={styles.headerBox}>
          {
            hasCustomChildren && customChildren
          }
          {showSearch && <Search
            placeholder={searchPlaceholder}
            enterButton="搜尋"
            size="large"
            value={searchValue}
            style={styles.searchBtn}
            onChange={(e) => handleSearch(e.target.value)}
          />}
          {
            showCreateButton && <Button onClick={openModal} type="primary" style={styles.btnStyle}>
              新增
            </Button>
          }
          {
            showDeleteButton && <Popover
              content={<div>
                <div>
                  <WarningFilled style={{ color: 'red', fontSize: '16px', marginRight: '8px' }} />請確認是否要刪除？
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button style={{ ...styles.popoverBtn, marginRight: '4px' }} onClick={() => handleDelete(selectedRowKeys)}>確定</Button>
                  <Button style={styles.popoverBtn} onClick={() => this.setState({ visible: false })}>取消</Button>
                </div>
              </div>}
              // title="Title"
              trigger="click"
              visible={this.state.visible}
              onVisibleChange={() => this.setState({ visible: !this.state.visible })}
            >
              <Button ghost onClick={() => this.setState({ visible: true })} disabled={selectedRowKeys.length === 0} danger style={styles.btnStyle}>
                刪除
              </Button>
            </Popover>
          }
        </div>
        <Table
          expandable={expandable}
          rowSelection={isRowSelection ? rowSelectionChange : null}
          columns={column}
          dataSource={data}
          scroll={scroll}
          pagination={hasPagination ? {
            pageSize: paging.page_size || 10,
            current: paging.now_page,
            total: paging.total,
            showSizeChanger: showSizeChanger,
            position: ['bottomCenter'],
            itemRender: (current, type, originalElement) => renderPagination(current, type, originalElement)
          } : null}
          onChange={handleChange}
          rowClassName={rowClassName}
          loading={isLoading}
          style={{ width: '100%', opacity: '0.95', ...tableStyle }}
        />
      </div>
    );
  }
}

export default DataTable;