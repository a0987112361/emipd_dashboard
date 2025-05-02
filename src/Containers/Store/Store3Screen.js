import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input, Select, Tabs, Form, Row, Col, Spin, Upload, Segmented, Tooltip, Modal } from 'antd';
import { Images, Colors } from 'src/Theme';

import "./Store3Screen.css"
import _ from 'lodash';
import { Store3Actions } from '../../Stores';
import { LoadingOutlined, DragOutlined } from '@ant-design/icons';
import { HtmlEditor, FormInput, SortButton } from 'src/Components';
import Swal from 'sweetalert2';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';

let timer;
const { TabPane } = Tabs;

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px'
  },
  contentTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: '30px',
  },
  contentBottom: {
    width: '100%',
    // minHeight: '1200px',
    height: '100%',
    marginTop: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 5px 20px rgba(176,195,211,0.16)',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '16px',
    overflowY: 'auto',
    // paddingBottom: '90px'
  },
  createBtnStyle: {
    backgroundColor: '#004C7C',
    width: '103px',
    height: '40px',
    color: 'white',
    borderRadius: '4px',
    marginLeft: '40px',
  },
  langMark: {
    fontWeight: 'bold',
    fontSize: '20px',
    color: Colors.primary
  },
  inputStyle: {
    // width: '470px',
    height: '40px',
    borderRadius: '5px',
    border: `1px solid #a6c1d3`,
    color: '#7D9EB5'
  },
  tabStyle: {
    width: '100%'
    // height: '1000px'
  },
  formTop: {
    padding: '20px 25px 30px 25px',
    borderBottom: '#A6C1D3 1px solid'
  },
  formStyle: {
    width: '100%',
    display: 'flex',
    padding: '25px'
  },
  QAFormStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btnBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  htmlBtnBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0px'
  },
  btnStyle: {
    width: '100px',
    height: '40px',
    color: '#fff',
    backgroundColor: '#004C7C',
    borderRadius: '4px'
  },
  areaStyle: {
    width: '470px',
    height: '150px',
    borderRadius: '4px',
    resize: 'none',
    padding: '10px',
    border: '1px solid #A6C1D3',
    color: '#7D9EB5'
  },
  selectStyle: {
    width: '250px',
    height: '40px',
    borderRadius: '5px',
    border: '1px solid #A6C1D3',
    color: '#7D9EB5'
  },
  titleStyle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#7D9EB5'
  },
  titleCenterStyle: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#7D9EB5'
  },
  uploadBtnStyle: {
    width: '100%',
    height: '50px',
    border: '1px solid #A6C1D3',
    color: '#7D9EB5'
  },
};

const teacherList = [
  {
    pic: Images.teacher01,
    name: '鄒文莉',
    jobTitle: '教授',
    occupation: '國立成功大學 外文系教授兼外語中心主任',
    education: '美國紐約州立大學水牛城校區外語暨第二語教學博士',
    study: [
      '英語教學與文化專業英語教學研究',
      '英語課程規劃',
      '評鑑英語教材教法研究'
    ],
  },
  {
    pic: Images.teacher02,
    name: '高實玫',
    jobTitle: '教授',
    occupation: '國立成功大學外文系教授兼文學院院長',
    education: '美國俄亥俄州立大學外語教學博士',
    study: [
      '語言測驗與評量',
      '外語學習理論',
      '教育戲劇',
      '言談分析',
      '雙語發展'
    ],
  },
  {
    pic: Images.teacher03,
    name: '林律君',
    jobTitle: '副教授',
    occupation: '國立陽明交通大學英語教學所副教授兼國際高教培訓暨認證中心主任',
    education: '美國伊利諾大學香檳校區語言與聽力科學博士第二語言習得與師資培訓',
    study: [
      '兒童語言語閱讀發展',
      '英語教學理論與實務',
      '雙語教學',
      '閱讀教學',
      '學術英語',
      '教師專業發展與培訓',
    ],
  },
  {
    pic: Images.teacher04,
    name: '駱藝瑄',
    jobTitle: '教授',
    occupation: '國立臺灣科技大學應用外語系教授',
    education: '美國印第安那大學語言教育所博士',
    study: [
      '英語教師專業發展',
      '語言與文化',
      '質化研究',
      '英語教學教材教法研究'
    ],
  },
  {
    pic: Images.teacher05,
    name: '張善貿',
    jobTitle: '教授',
    occupation: '國立彰化師範大學英語學系教授',
    education: '美國印第安那大學語文教育學系博士',
    study: [
      '英語教學',
      '教材教法',
      '外語學習動機',
      '語言測驗'
    ],
  },
  {
    pic: Images.teacher06,
    name: '林含怡',
    jobTitle: '副教授',
    occupation: '國立臺北科技大學應用英文系副教授',
    education: '英國雪菲爾大學英語與語言學博士',
    study: [
      'Global Englishes',
      'English-medium Instruction in Higher Education',
      'English Language Policy',
      'English Language Teaching',
      'Critical Discourse Analysis'
    ],
  },
  {
    pic: Images.teacher07,
    name: '林彥良',
    jobTitle: '教授',
    occupation: '國立成國立臺北科技大學應用英文系教授',
    education: '英國諾丁漢大學應用語言學博士',
    study: [
      'Speech & Gesture',
      'Corpus Linguistics',
      'Discourse Analysis',
      'English Language Teaching',
      'Computer Assisted Language Learning',
      'Teacher Education'
    ],
  },
  {
    pic: Images.teacher08,
    name: '黃怡萍',
    jobTitle: '副教授',
    occupation: '國立政治大學英語系副教授',
    education: '美國印第安納大學應用語言學系博士 ',
    study: [
      '英語授課',
      '雙語教學',
      '課程設計',
      '教師認知'
    ],
  },
  {
    pic: Images.teacher09,
    name: '高郁婷',
    jobTitle: '副教授',
    occupation: '國立高雄師範大學英語系副教授',
    education: '美國賓州州立大學課程與教學博士',
    study: [
      '教學測驗與評量',
      '外語習得',
      '課程設計與評鑑',
      '師資培訓'
    ],
  },
  {
    pic: Images.teacher10,
    name: '陳慧琴',
    jobTitle: '助理教授',
    occupation: '國立成功大學外語中心助理教授',
    education: '國立成功大學外國語文學系博士',
    study: [
      '英語教學',
      '應用英文',
      '專業英文',
      '專業科目英語授課'
    ],
  },
  {
    pic: Images.teacher11,
    name: '崔正芳',
    jobTitle: '助理教授',
    occupation: '國立政治大學外文中心助理教授',
    education: '美國紐約州大水牛城分校教育心理系博士',
    study: [
      '教育心理',
      '英語教學',
      '跨文化研究'
    ],
  },
];

const normFile = e => {
  let list = e.fileList;
  if (list.length >= 2) {
    list.slice(1);
    e.fileList = list;
  }
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class Store3Screen extends React.Component {
  constructor(props) {
    super(props);
    this.teamForm = React.createRef();
    this.teacherForm = React.createRef();
    this.state = {
      isOpen: true,
      isLoading: false,
      loading: false,
      viewModalVisible: false,
      infoId: '',
      notesText: '',
      isBirth: false,
      imgPath: '',
      avatar: '',
      adImgPath: '',
      adAvatar: '',
      adImg: [],
      urlData: [
        { index: '0', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '1', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '2', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '3', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '4', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '5', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '6', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' },
        { index: '7', id: '', imgUrl: '', imgFile: '', imgName: '', path: '', position: '' }
      ],
      deleteImgId: [],

      aboutContentZh: '', // 中心簡介的預設值(中文)
      aboutContentEn: '', // 中心簡介的預設值(英文)
      aboutContent2Zh: '', // 中心簡介2的預設值(中文)
      aboutContent2En: '', // 中心簡介2的預設值(英文)
      aboutImageData: [],
      aboutImageId: '',  // 中心簡介的圖片id
      tab: 1, // 分頁標籤
      columnChangeTeamForm: [], // 團隊成員的每行欄位
      column_type: '文字',
      teacherModalVisible: false, // 新增或編輯老師的彈窗
      teacherId: '',
      teacherInfo: {}, // 編輯老師的彈窗內容
      currentTeacherList: teacherList, // 師資陣容呈現的陣列內容
      teacherImgData: [],
      columnChangeTeacherForm: [],// 師資陣容的專長(中文)
      columnChangeTeacherEnForm: [], // 師資陣容的專長(英文)
      searchValue: '', // 師資陣容的搜尋值
      teacherMode: '',
      currentTeacherInfo: {},
      currentTeacherList: [],
      newTeacherList: [],
      isMoveTeacher: false,
    };
  }

  static propTypes = {
    class: PropTypes.object,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, () => {
      this.handleTabChange(1)
    });
  }

  errorCallback = () => {
    this.setState({
      isLoading: false,
    });
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // setFileList
  setFileList = (key, file, name) => {
    let newAdImg;

    newAdImg = this.state.adImg.map((item, index) => {
      if (index === name) {
        return {
          ...item,
          key: name,
          file: file[0],
        }
      } else {
        return item
      }
    })
    this.setState({
      adImg: newAdImg,
    });
  }

  // 更新中心簡介
  handleUpdateAbout = (value) => {
    const { updateStore } = this.props;
    const { aboutContentZh, aboutContentEn, aboutContent2Zh, aboutContent2En, aboutImageData, aboutImageId } = this.state;

    let formData = new FormData();

    formData.append('about_title_zh', value.about_title_zh);
    formData.append('about_title_en', value.about_title_en);
    formData.append('about_title_2_zh', value.about_title_2_zh);
    formData.append('about_title_2_en', value.about_title_2_en);
    formData.append('about_content_zh', aboutContentZh);
    formData.append('about_content_en', aboutContentEn);
    formData.append('about_content_2_zh', aboutContent2Zh);
    formData.append('about_content_2_en', aboutContent2En);

    if (aboutImageData.length === 0) {
      formData.append('file_id', '');
    } else if (_.has(aboutImageData[0], 'originFileObj')) {
      formData.append('upload_file', aboutImageData[0].originFileObj);
    }

    const callback = () => {
      this.setState({
        isLoading: false,
        aboutContentZh: aboutContentZh, // 中心簡介的預設值(中文)
        aboutContentEn: aboutContentEn, // 中心簡介的預設值(英文)
        aboutContent2Zh: aboutContent2Zh, // 中心簡介的預設值(中文)
        aboutContent2En: aboutContent2En, // 中心簡介的預設值(英文)
      })
    }

    this.setState({
      isLoading: true
    }, () => {
      updateStore(formData, callback, this.errorCallback)
    })
  }

  // 切換分頁
  handleTabChange = (key) => {
    const { getStore, getTeamList, getTeacherList } = this.props;
    const { searchValue } = this.state;

    let currentKey = Number(key);

    const aboutCallback = (value) => {
      let aboutImgTemp = [];
      if (_.has(value, 'file')) {
        if (!_.isEmpty(value.file) && !_.isNil(value.file.file_id)) {
          aboutImgTemp.push({
            uid: 1,
            name: 'about.jpg',
            status: 'done',
            id: value.file.file_id,
            url: value.file.file_url,
          });
        }
      }

      this.setState({
        aboutImageData: aboutImgTemp.length > 0 ? aboutImgTemp : [],  // 中心簡介的圖片
        aboutImageId: aboutImgTemp.length > 0 ? value.file.file_id : '',  // 中心簡介的圖片id
        aboutContentZh: value.about_content_zh, // 中心簡介的預設值(中文)
        aboutContentEn: value.about_content_en, // 中心簡介的預設值(英文)
        aboutContent2Zh: value.about_content_2_zh, // 中心簡介的預設值(中文)
        aboutContent2En: value.about_content_2_en, // 中心簡介的預設值(英文)
        isLoading: false,
      }, () => this.renderAbout());
    }

    const teamCallback = (value) => {
      this.setState({
        isLoading: false,
        columnChangeTeamForm: value.list,
      }, () => this.renderTeam())
    }

    const teacherCallback = (value) => {
      this.setState({
        isLoading: false,
        currentTeacherList: value.list
      })
    }

    this.setState({
      isLoading: true,
      tab: currentKey
    }, () => {
      if (currentKey === 1) {
        getStore(aboutCallback, this.errorCallback);
      } else if (currentKey === 2) {
        getTeamList(teamCallback, this.errorCallback);
      } else {
        getTeacherList(searchValue, teacherCallback, this.errorCallback)
      }
    });
  }

  // 團隊成員的表單更動
  handleChangeTeamForm = (change, all) => {
    this.setState({
      columnChangeTeamForm: all.columns,
    })
  }

  // 更新整個團隊成員
  handleUpdateTeamList = () => {
    const { teamList, updateTeamList } = this.props;
    const { columnChangeTeamForm } = this.state;


    let createTemp = [];
    let updateTemp = [];
    let delTemp = [];

    let newIds = []
    let originIds = []
    columnChangeTeamForm.map((item, index) => { newIds.push(item.team_id) })
    teamList.map((item, index) => { originIds.push(item.team_id) })

    if (originIds.length !== newIds.length) {// del
      originIds.map((item) => {
        if (!newIds.includes(item)) {
          delTemp.push(item)
        }
      })
    }

    columnChangeTeamForm.map((item, index) => {
      if (!_.has(item, 'order')) {  // add
        createTemp.push({ ...item, order: index + 1 })
      } else {
        updateTemp.push({ ...item, order: index })  // edit(update order)
      }
    })


    let payload = {
      add_teams: createTemp,
      edit_teams: updateTemp,
      delete_teams: delTemp,
    }

    const callback = (value) => {
      this.setState({
        isLoading: false,
        tab: 2
      }, () => this.handleTabChange(2))
    }

    this.setState({
      isLoading: true
    }, () => {
      updateTeamList(payload, callback, this.errorCallback)
    })
  }

  // 團隊成員的排序
  handleSortTeamColumn = (key, change, text) => {
    const { columnForm, columnChangeTeamForm, tab } = this.state;
    let temp;
    // 把columnForm從物件變json，再從json變為物件或值
    let copyList = ''
    copyList = JSON.parse(JSON.stringify(columnChangeTeamForm));

    temp = copyList[key];
    copyList[key] = copyList[key + change];
    copyList[key + change] = temp;

    this.teamForm.current.setFieldsValue({ columns: copyList })
    this.setState({
      columnChangeTeamForm: copyList,
    });
  }

  // 師資專長的排序(中文)
  handleSortTeacherColumn = (key, change, text) => {
    const { columnChangeTeacherForm, tab } = this.state;
    let temp;
    // 把columnForm從物件變json，再從json變為物件或值
    let copyList = ''
    copyList = JSON.parse(JSON.stringify(columnChangeTeacherForm));

    temp = copyList[key];
    copyList[key] = copyList[key + change];
    copyList[key + change] = temp;

    this.teacherForm.current.setFieldsValue({ teacherColumns: copyList })
    this.setState({
      columnChangeTeacherForm: copyList,
    });
  }

  // 師資專長的排序(英文)
  handleSortTeacherEnColumn = (key, change, text) => {
    const { columnForm, columnChangeTeacherEnForm, tab } = this.state;
    let temp;
    // 把columnForm從物件變json，再從json變為物件或值
    let copyList = ''
    copyList = JSON.parse(JSON.stringify(columnChangeTeacherEnForm));

    temp = copyList[key];
    copyList[key] = copyList[key + change];
    copyList[key + change] = temp;

    this.teacherForm.current.setFieldsValue({ teacherEnColumns: copyList })
    this.setState({
      columnChangeTeacherEnForm: copyList,
    });
  }

  // 師資陣容搜尋
  handleSearch = (e) => {
    const { getTeacherList } = this.props;
    let value = e.target.value;

    const handleGetList = () => {
      const teacherCallback = () => {
        this.setState({
          isLoading: false,
        });
      }

      if (value === '') {
        this.setState({
          isLoading: true,
          searchValue: '',
        }, () => getTeacherList('', teacherCallback, this.errorCallback));
      } else {
        this.setState({
          isLoading: true,
          searchValue: value,
        }, () => getTeacherList(value, teacherCallback, this.errorCallback));
      }
    }

    function debounce(func, delay = 250) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(value);
      }, delay)
    }
    debounce(handleGetList, 500);
  }

  // 師資彈窗的表單更動
  handleChangeTeacherForm = (change, all) => {
    this.setState({
      columnChangeTeacherForm: all.teacherColumns,
      columnChangeTeacherEnForm: all.teacherEnColumns,
    })
  }

  // html編輯器
  handleChangeContent = (text, value) => {
    if (text == 'aboutContentZh') {
      this.setState({ aboutContentZh: value.toHTML() });
    } else if (text == 'aboutContentEn') {
      this.setState({ aboutContentEn: value.toHTML() });
    } else if (text == 'aboutContent2Zh') {
      this.setState({ aboutContent2Zh: value.toHTML() });
    } else if (text == 'aboutContent2En') {
      this.setState({ aboutContent2En: value.toHTML() });
      // }else if (text == 'enIntro'){
      //   this.setState({ enIntroContent: value.toHTML() });
    }
  }

  // 圖片預覽 step 1
  handlePreview = (file) => {
    const imgWindow = window.open(file.thumbUrl);
    imgWindow.document.write(`<img src="${file.thumbUrl}">`);
  }
  // 圖片預覽 step 2
  handleAvatarChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList('aboutImageData', newFileList.splice(1, 1));
    } else {
      this.setFileList('aboutImageData', newFileList);
    }
  };

  handleTeacherChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 1) {
      this.setFileList('teacherImgData', newFileList.splice(1, 1));
    } else {
      this.setFileList('teacherImgData', newFileList);
    }
  };

  // 圖片預覽 step 3
  setFileList = (key, file) => {
    this.setState({
      [key]: file,
    });
  }

  // 中心簡介
  renderAbout = () => {
    const { store } = this.props;
    const { isLoading, loading, aboutImageData, aboutContentZh, aboutContentEn, aboutContent2Zh, aboutContent2En } = this.state;

    if (isLoading === true) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '150px', background: 'transparent' }}>
          <Spin size="large" />
        </div>
      )
    }

    return (
      <div style={{ width: '100%', padding: '25px' }}>
        <Form
          name="basic"
          initialValues={{ ...store }}
          onFinish={this.handleUpdateAbout}
          labelCol={{ span: 24 }}
        >
          <Form.Item
            name="main_img"
            label="主要圖片"
            colon={false}
            valuePropName="main_img"
            getValueFromEvent={normFile}
            style={{ height: '180px', marginTop: '10px', display: 'block' }}
          >
            <Upload
              listType="picture-card"
              className="avatar-uploader"
              accept=".PNG,.JPG,.JPEG"
              fileList={aboutImageData}
              onChange={this.handleAvatarChange}
              customRequest={dummyRequest}
              beforeUpload={(file) => {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJPG) {
                  return false;
                } else {
                  return true;
                }
              }}
            >
              {aboutImageData.imgUrl ?
                <img src={aboutImageData.imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                :
                <div>
                  {loading ? <LoadingOutlined /> : <img src={Images.outline} alt="avatar" />}
                  <div style={{ marginTop: 8 }}>上傳圖片</div>
                </div>
              }
            </Upload>
          </Form.Item>

          <div>
            <div style={styles.langMark}>中文</div>

            <FormInput
              propName='about_title_2_zh'
              placeholder="請輸入中文標題[左]"
              title="標題[左]"
              requiredErrorMessage="請輸入中文標題[左]"
              labelCol={24}
              wrapperCol={12}
              style={{ marginTop: '10px' }}
              showCount
              maxLength={25}
              rule={[
                { max: 25, message: '最多輸入25個字' }
              ]}
              allowClear={true}
            />

            <FormInput
              propName='about_title_zh'
              placeholder="請輸入中文標題[右]"
              title="標題[右]"
              requiredErrorMessage="請輸入中文標題[右]"
              labelCol={24}
              wrapperCol={12}
              style={{ marginTop: '10px' }}
              showCount
              maxLength={25}
              rule={[
                { max: 25, message: '最多輸入25個字' }
              ]}
              allowClear={true}
            />

            <HtmlEditor
              propName="about_content_2_zh"
              title='簡介[左]'
              requiredErrorMessage="請輸入中文簡介[左]"
              value={aboutContent2Zh}
              placeholder='請輸入中文簡介[左]'
              onEditorStateChange={(value) => this.handleChangeContent('aboutContent2Zh', value)}
            />

            <HtmlEditor
              propName="about_content_zh"
              title='簡介[右]'
              requiredErrorMessage="請輸入中文簡介[右]"
              value={aboutContentZh}
              placeholder='請輸入中文簡介[右]'
              onEditorStateChange={(value) => this.handleChangeContent('aboutContentZh', value)}
            />
          </div>

          <div style={{ marginTop: '25px' }}>
            <div style={styles.langMark}>英文</div>

            <FormInput
              propName='about_title_2_en'
              placeholder="請輸入英文標題[左]"
              title="標題[左]"
              requiredErrorMessage="請輸入英文標題[左]"
              labelCol={24}
              wrapperCol={12}
              style={{ marginTop: '10px' }}
              showCount
              maxLength={50}
              rule={[
                { max: 50, message: '最多輸入50個字' }
              ]}
            />

            <FormInput
              propName='about_title_en'
              placeholder="請輸入英文標題[右]"
              title="標題[右]"
              requiredErrorMessage="請輸入英文標題[右]"
              labelCol={24}
              wrapperCol={12}
              style={{ marginTop: '10px' }}
              showCount
              maxLength={50}
              rule={[
                { max: 50, message: '最多輸入50個字' }
              ]}
            />

            <HtmlEditor
              propName="about_content_2_en"
              title='簡介[左]'
              requiredErrorMessage="請輸入英文簡介[左]"
              value={aboutContent2En}
              placeholder='請輸入英文簡介[左]'
              onEditorStateChange={(value) => this.handleChangeContent('aboutContent2En', value)}
            />

            <HtmlEditor
              propName="about_content_en"
              title='簡介[右]'
              requiredErrorMessage="請輸入英文簡介[右]"
              value={aboutContentEn}
              placeholder='請輸入英文簡介[右]'
              onEditorStateChange={(value) => this.handleChangeContent('aboutContentEn', value)}
            />
          </div>

          <div style={styles.htmlBtnBlock}>
            <Button htmlType="submit" style={styles.btnStyle} loading={isLoading}>儲存</Button>
          </div>
        </Form>
      </div>
    )
  }

  // 團隊成員
  renderTeam = () => {
    const { isLoading, loading, aboutImageData, zhIntroContent, enIntroContent, columnChangeTeamForm, column_type } = this.state;

    if (isLoading === true) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '150px', background: 'transparent' }}>
          <Spin size="large" />
        </div>
      )
    }

    return (
      <div style={{ width: '100%', padding: '25px' }}>
        <Form
          name="basic"
          ref={this.teamForm}
          labelCol={{ span: 24 }}
          autoComplete="off"
          initialValues={{
            columns: columnChangeTeamForm,
          }}
          onValuesChange={this.handleChangeTeamForm}
          onFinish={this.handleUpdateTeamList}
        >
          <Row
            style={{
              width: '100%',
              background: Colors.primary,
              color: Colors.white,
              fontSize: '16px',
              textAlign: 'left'
            }}
          >
            <Col span={5} style={{ padding: '8px 16px' }} >職稱</Col>
            <Col span={5} style={{ padding: '8px 0px' }} >姓名</Col>
            <Col span={4} style={{ padding: '8px 0px' }} >稱呼</Col>
            <Col span={4} style={{ padding: '8px 16px' }} >email</Col>
            <Col span={3} style={{ padding: '8px 16px' }} >連絡電話</Col>
            <Col span={3} style={{ padding: '8px 16px' }} >操作</Col>
          </Row>

          <Form.List
            name="columns"
            required
          >
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field, index, arr) => (
                  <Row
                    gutter={24}
                    style={{
                      width: '100%',
                      margin: '0px',
                      padding: '20px 0px',
                      borderBottom: '1px solid rgba(0, 76, 124, 0.5)',
                      background: index % 2 !== 0 && 'rgba(0, 76, 124, 0.1)'
                    }}
                  >
                    <Col span={5}>
                      <Form.Item
                        colon={false}
                        {...field}
                        name={[field.name, 'team_jobtitle_zh']}
                        fieldKey={[field.fieldKey, 'team_jobtitle_zh']}
                        validateTrigger={['onChange']}
                        style={{ marginRight: '8px' }}
                        rules={[
                          {
                            required: true,
                            message: '請輸入中文職稱',
                          },
                        ]}
                      >
                        <Input
                          style={styles.inputStyle}
                          placeholder='請輸入中文職稱'
                        />
                      </Form.Item>
                    </Col>

                    <Col span={5}>
                      <Form.Item
                        colon={false}
                        {...field}
                        name={[field.name, 'team_name_zh']}
                        fieldKey={[field.fieldKey, 'team_name_zh']}
                        validateTrigger={['onChange']}
                        style={{ marginRight: '8px' }}
                        rules={[
                          {
                            required: true,
                            message: '請輸入中文姓名',
                          },
                        ]}
                      >
                        <Input
                          style={styles.inputStyle}
                          placeholder='請輸入中文姓名'
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        colon={false}
                        {...field}
                        name={[field.name, 'team_appe_zh']}
                        fieldKey={[field.fieldKey, 'team_appe_zh']}
                        validateTrigger={['onChange']}
                        style={{ marginRight: '8px' }}
                        rules={[
                          {
                            required: true,
                            message: '請輸入中文稱呼',
                          },
                        ]}
                      >
                        <Input
                          style={styles.inputStyle}
                          placeholder='請輸入中文稱呼'
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        colon={false}
                        {...field}
                        name={[field.name, 'team_email']}
                        fieldKey={[field.fieldKey, 'team_email']}
                        validateTrigger={['onChange']}
                        style={{ marginRight: '8px' }}
                        rules={[
                          {
                            required: true,
                            message: '請輸入email',
                          },
                          {
                            type: 'email',
                            message: '格式錯誤',
                          },
                        ]}
                      >
                        <Input
                          style={styles.inputStyle}
                          placeholder='請輸入email'
                        />
                      </Form.Item>
                    </Col>

                    <Col span={3}>
                      <Form.Item
                        colon={false}
                        {...field}
                        name={[field.name, 'team_ext']}
                        fieldKey={[field.fieldKey, 'team_ext']}
                        validateTrigger={['onChange']}
                        style={{ marginRight: '8px' }}
                        rules={[
                          {
                            required: true,
                            message: '請輸入電話',
                          },
                        ]}
                      >
                        <Input
                          style={styles.inputStyle}
                          placeholder='請輸入電話'
                        />
                      </Form.Item>
                    </Col>

                    <Col span={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          minWidth: '80px',
                          padding: '0px 24px',
                        }}
                      >
                        <SortButton
                          currentIndex={index}
                          length={fields.length}
                          handleClickUp={() => this.handleSortTeamColumn(index, -1)}
                          handleClickDown={() => this.handleSortTeamColumn(index, 1)}
                        />
                        <Button
                          style={{ border: 'none', cursor: 'pointer', background: 'transparent' }}
                          onClick={() => remove(field.name)}
                        >
                          <img
                            src={Images.delete}
                            style={{ marginRight: '8px' }}
                          />
                        </Button>
                      </div>
                    </Col>

                    <Col span={5}>
                      <Form.Item
                        colon={false}
                        {...field}
                        name={[field.name, 'team_jobtitle_en']}
                        fieldKey={[field.fieldKey, 'team_jobtitle_en']}
                        validateTrigger={['onChange']}
                        style={{ marginRight: '8px' }}
                        rules={[
                          {
                            required: true,
                            message: '請輸入英文職稱',
                          },
                        ]}
                      >
                        <Input
                          style={styles.inputStyle}
                          placeholder='請輸入英文職稱'
                        />
                      </Form.Item>
                    </Col>

                    <Col span={5}>
                      <Form.Item
                        colon={false}
                        {...field}
                        name={[field.name, 'team_name_en']}
                        fieldKey={[field.fieldKey, 'team_name_en']}
                        validateTrigger={['onChange']}
                        style={{ marginRight: '8px' }}
                        rules={[
                          {
                            required: true,
                            message: '請輸入英文姓名',
                          },
                        ]}
                      >
                        <Input
                          style={styles.inputStyle}
                          placeholder='請輸入英文姓名'
                        />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item
                        colon={false}
                        {...field}
                        name={[field.name, 'team_appe_en']}
                        fieldKey={[field.fieldKey, 'team_appe_en']}
                        validateTrigger={['onChange']}
                        style={{ marginRight: '8px' }}
                        rules={[
                          {
                            required: true,
                            message: "請輸入英文稱呼",
                          },
                        ]}
                      >
                        <Input
                          style={styles.inputStyle}
                          placeholder='請輸入英文稱呼'
                        />
                      </Form.Item>
                    </Col>

                  </Row>
                ))}

                <Form.Item
                  style={{
                    margin: '16px 0'
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: Colors.white,
                      border: `1px dashed ${Colors.primary}`,
                      // width: '100%',
                      height: '36px',
                      color: Colors.primary,
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      margin: '20px 0px',
                    }}
                    onClick={
                      () => add(
                        {
                          team_jobtitle_zh: '',
                          team_name_zh: '',
                          team_appe_zh: '',
                          team_email: '',
                          team_ext: '',
                          team_jobtitle_en: '',
                          team_name_en: '',
                          team_appe_en: '',
                        },
                        fields.length,
                      )
                    }
                    block
                  >
                    + 新增一行
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>

          <div style={styles.htmlBtnBlock}>
            <Button htmlType="submit" style={styles.btnStyle} loading={isLoading}>儲存</Button>
          </div>
        </Form>
      </div>
    )
  }

  handleDelete = (id) => {
    const { deleteTeacher, paging } = this.props;
    const { searchValue } = this.state;
    let payload = [];
    payload.push(id)
    const callback = () => {
      this.setState({
        isLoading: false,
      })
    }

    this.setState({
      isLoading: true,
    }, () => {
      deleteTeacher(payload, searchValue, callback, this.errorCallback);
    });
  }

  // 刪除教師的彈窗
  renderCheckModal(id) {
    Swal.fire({
      title: '確定要刪除嗎?',
      text: "資料刪除後無法恢復，如果要刪除請按確認",
      icon: 'warning',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: '確定刪除',
      cancelButtonText: '取消',
      confirmButtonColor: '#E21D53',
      cancelButtonColor: '#004C7C',
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleDelete(id)
        Swal.close()
      }
    })
  }



  onSortEnd = ({ oldIndex, newIndex, collection }) => {
    console.log('this.state.currentTeacherList =>', this.state.currentTeacherList);

    // switch(collection){
    //   case 'images':
    //     this.setState(({currentTeacherList}) => ({
    //       currentTeacherList: arrayMoveImmutable(currentTeacherList, oldIndex, newIndex),
    //     }));
    //   default:
    //     break;
    // }

    let tempChange;
    let newArr = JSON.parse(JSON.stringify(this.state.currentTeacherList));

    tempChange = newArr[oldIndex];
    newArr[oldIndex] = newArr[newIndex];
    newArr[newIndex] = tempChange;

    const arr2 = []
    newArr.map((item) => {
      if (item.constructor === Array) {
        arr2.push(item[0])
      } else if (item.constructor !== Array) {
        arr2.push(item)
      }
    })

    this.setState(({ currentTeacherList }) => ({
      currentTeacherList: arr2
    }));

    console.log('[...this.state.currentTeacherList] =>', [...this.state.currentTeacherList]);

    let temp = []
    this.state.currentTeacherList.map((item, index) => {
      temp.push({
        teacher_id: item.teacher_id,
        order: index
      })
    })

    this.setState({
      newTeacherList: temp
    })
  };

  submitTeacherOrder = () => {
    const { updateTeacherOrder } = this.props;
    const { newTeacherList, searchValue } = this.state;

    const callback = () => {
      this.setState({
        isLoading: false
      })
    }

    this.setState({
      isLoading: true,
    }, () => {
      updateTeacherOrder(newTeacherList, searchValue, callback, this.errorCallback)
    })
  }

  handleChangeMoveMode = (value) => {
    if (value === '排序模式') {
      this.setState({ isMoveTeacher: true })
    } else {
      this.setState({ isMoveTeacher: false })
    }
  }

  // 打開師資陣容的編輯彈窗
  handleTeacherModal = (mode, teacherId) => {
    const { getTeacherInfo } = this.props;

    this.setState({
      teacherMode: mode
    })

    const callback = (value) => {
      let zhTemp = [];
      let enTemp = [];
      // value.expertises.map((item) => {
      //   zhTemp.push({expertise_zh: item.expertise_zh, expertise_id: item.expertise_id})
      //   enTemp.push({expertise_en: item.expertise_en, expertise_id: item.expertise_id})
      // })
      if (value.expertises_zh.length > 0) {
        value.expertises_zh.map((item) => {
          zhTemp.push(item)
        })
      }

      if (value.expertises_en.length > 0) {
        value.expertises_en.map((item) => {
          enTemp.push(item)
        })
      }

      let teacherImgTemp = [];
      if (_.has(value, 'file')) {
        if (!_.isEmpty(value.file) && !_.isNil(value.file.file_id)) {
          teacherImgTemp.push({
            uid: 1,
            name: 'teacher.jpg',
            status: 'done',
            id: value.file.file_id,
            url: value.file.file_url,
          });
        }
      }

      let data = {
        ...value,
        teacher_img: teacherImgTemp,
        teacher_appe_zh: (value.teacher_appe_zh !== undefined && value.teacher_appe_zh !== null && value.teacher_appe_zh !== "null" && value.teacher_appe_zh !== '') ? value.teacher_appe_zh : '',
        teacher_appe_en: (value.teacher_appe_en !== undefined && value.teacher_appe_en !== null && value.teacher_appe_en !== "null" && value.teacher_appe_en !== '') ? value.teacher_appe_en : ''
      }

      this.setState({
        teacherId: value.teacher_id,
        currentTeacherInfo: data,
        teacherImgData: teacherImgTemp.length > 0 ? teacherImgTemp : [], // 教師照片
        teacherImageId: teacherImgTemp.length > 0 ? value.file.file_id : '',  // 教師照片的id
        columnChangeTeacherForm: zhTemp,
        columnChangeTeacherEnForm: enTemp,
        isLoading: false,
        teacherModalVisible: true,
      })
    }

    if (mode === 'update') {
      this.setState({
        isLoading: true
      }, () => {
        getTeacherInfo(teacherId, callback, this.errorCallback)
      })
    } else {
      this.setState({
        teacherModalVisible: true,
      })
    }

  }

  // 新增或更新師資
  handleSubmitTeacher = (value) => {
    const { createTeacher, updateTeacher, teacherInfo } = this.props;
    const { teacherMode, teacherImgData, teacherId, columnChangeTeacherForm, columnChangeTeacherEnForm, searchValue } = this.state;

    // let isOk = false;
    // if(value.teacherColumns.length < 0){
    //   message.warning('請新增至少一項中文之專長項目');
    // }else if(value.teacherEnColumns.length <= 0){
    //   message.warning('請新增至少一項英文之專長項目');
    // }else if(value.teacherColumns.length !== value.teacherEnColumns.length){
    //   message.warning('請確認中文與英文專長項目數量是否一致');
    // }else {
    //   isOk = true
    // }

    let formData = new FormData();

    formData.append('teacher_name_zh', value.teacher_name_zh);
    formData.append('teacher_name_en', value.teacher_name_en);
    formData.append('teacher_jobtitle_zh', value.teacher_jobtitle_zh);
    formData.append('teacher_jobtitle_en', value.teacher_jobtitle_en);
    formData.append('teacher_degree_zh', value.teacher_degree_zh);
    formData.append('teacher_degree_en', value.teacher_degree_en);

    if (value.teacher_appe_zh !== undefined && value.teacher_appe_zh !== null && value.teacher_appe_zh !== "null" && value.teacher_appe_zh !== '') {
      formData.append('teacher_appe_zh', value.teacher_appe_zh)
    }

    if (value.teacher_appe_en !== undefined && value.teacher_appe_en !== null && value.teacher_appe_en !== "null" && value.teacher_appe_en !== '') {
      formData.append('teacher_appe_en', value.teacher_appe_en)
    }

    let zhTemp = []; let enTemp = [];
    if (columnChangeTeacherForm.length > 0) {
      columnChangeTeacherForm.map((item, index) => {
        zhTemp.push(item.expertise_zh)
      })
    }
    if (columnChangeTeacherEnForm.length > 0) {
      columnChangeTeacherEnForm.map((item, index) => {
        enTemp.push(item.expertise_en)
      })
    }

    if (zhTemp.length > 0) {
      zhTemp.map((item, index) => {
        formData.append(`expertises_zh[${index}].expertise_zh`, item)
      })
    }

    if (enTemp.length > 0) {
      enTemp.map((item, index) => {
        formData.append(`expertises_en[${index}].expertise_en`, item)
      })
    }

    if (teacherMode === 'update') {
      formData.append('teacher_id', teacherId);

      if (!_.has(teacherImgData[0], 'originFileObj')) { // 如果沒有重新上傳的動作
        formData.append('file_id', teacherImgData[0].id);
      } else {  // 如果有重新上傳
        formData.append('upload_file', teacherImgData[0].originFileObj);
      }

      // formData.append('expertises_zh.expertise_zh', item.expertise_zh);

      // let addOrder = 0; let editOrder = 0; let delOrder = 0;

      // 先把中英文專長合併
      // let nowTemp = [];
      // columnChangeTeacherForm.map((item, index) => {
      //   nowTemp.push({  // 在空陣列裡推入id 和中文專長內容
      //     currentId: _.has(item, 'expertise_id') ? item.expertise_id : index, // 如果原本沒id，就給index值(int)
      //     expertise_zh: item.expertise_zh
      //   })
      // })

      // columnChangeTeacherEnForm.map((item, index) => {
      //   nowTemp.filter((info, infoIndex) => {
      //     if(infoIndex === index){  // 在已經有中文專長的陣列裡，照順序推入英文專長
      //       info.expertise_en = item.expertise_en
      //     }
      //   })
      // })

      // 比對新舊陣列id，沒有的刪掉
      // let oldTemp = []; let newTemp = [];
      // teacherInfo.expertises.map((item) => { oldTemp.push(item.expertise_id)} )
      // nowTemp.map((item) => { if(typeof(item.currentId) !== 'number'){newTemp.push(item.currentId)}} )

      // oldTemp.map((item) => {
      //   if(!newTemp.includes(item)) {
      //     formData.append('delete_expertises['+ `${delOrder}` + ']', item);
      //     delOrder += 1
      //   }
      // })

      // nowTemp.map((item) => {
      //   if(typeof(item.currentId) === 'number'){  // 判斷currentId如果型別是number，那就add
      //     formData.append('add_expertises['+ `${addOrder}` + '].expertise_zh', item.expertise_zh);
      //     formData.append('add_expertises['+ `${addOrder}` + '].expertise_en', item.expertise_en);
      //     addOrder += 1
      //   }else{
      //     formData.append('edit_expertises['+ `${editOrder}` + '].expertise_id', item.expertise_id);
      //     formData.append('edit_expertises['+ `${editOrder}` + '].expertise_zh', item.expertise_zh);
      //     formData.append('edit_expertises['+ `${editOrder}` + '].expertise_en', item.expertise_en);
      //   }
      // })
    } else {
      formData.append('upload_file', teacherImgData[0].originFileObj);
    }

    const callback = () => {
      this.setState({
        isLoading: false,
        teacherModalVisible: false
      })
    }

    // if(isOk === true){
    this.setState({
      isLoading: true
    }, () => {
      if (teacherMode === 'create') {
        createTeacher(formData, callback, this.errorCallback)
      } else {
        updateTeacher(formData, searchValue, callback, this.errorCallback)
      }
    })
    // }
  }

  // 師資陣容
  renderTeacherModal = () => {
    const { teacherInfo } = this.props;
    const { isLoading, teacherModalVisible, loading, teacherImgData, columnChangeTeacherForm, columnChangeTeacherEnForm, currentTeacherInfo } = this.state;

    if (isLoading === true) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '150px', background: 'transparent' }}>
          <Spin size="large" />
        </div>
      )
    }

    return (
      <Modal
        title={_.isEmpty(teacherInfo) ? '新增師資' : '編輯師資'}
        visible={teacherModalVisible}
        width={800}
        centered
        onCancel={() => this.setState({ teacherModalVisible: false, teacherImgData: [], })}
        footer={null}
        maskClosable={false}
      >
        <Form
          ref={this.teacherForm}
          name='basic'
          labelCol={{ span: 24 }}
          initialValues={{
            ...currentTeacherInfo,
            // teacher_appe_zh:(cu.teacher_appe_zh !== undefined || cu.teacher_appe_zh !== null || cu.teacher_appe_zh !== '') ? cu.teacher_appe_zh : ''),
            // teacher_appe_en:,
            teacherColumns: columnChangeTeacherForm,
            teacherEnColumns: columnChangeTeacherEnForm,
          }}
          onValuesChange={this.handleChangeTeacherForm}
          onFinish={this.handleSubmitTeacher}
        >
          <div style={{ display: 'flex' }}>
            <Form.Item
              name="teacher_img"
              label="照片"
              colon={false}
              valuePropName="teacher_img"
              getValueFromEvent={normFile}
              style={{ display: 'block' }}
              rules={[{ required: true, message: '請選擇照片' }]}
            >
              {/* <ImgCrop rotate> */}
              <Upload
                listType="picture-card"
                className="avatar-uploader"
                accept=".PNG,.JPG,.JPEG"
                fileList={teacherImgData}
                onChange={this.handleTeacherChange}
                customRequest={dummyRequest}
                beforeUpload={(file) => {
                  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJPG) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                {teacherImgData.imgUrl ?
                  <img src={teacherImgData.imgUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  :
                  <div>
                    {loading ? <LoadingOutlined /> : <img src={Images.outline} alt="avatar" />}
                    <div style={{ marginTop: 8 }}>上傳圖片</div>
                  </div>
                }
              </Upload>
              {/* </ImgCrop> */}
            </Form.Item>
          </div>

          <Row style={{ margin: '20px 0px', rowGap: '12px' }} gutter={24}>
            <Col span={24}>
              <div style={styles.langMark}>中文</div>
            </Col>
            <Col span={12}>
              <FormInput
                required
                propName='teacher_name_zh'
                placeholder="請輸入中文姓名"
                title="姓名"
                requiredErrorMessage="請輸入中文姓名"
                labelCol={24}
                wrapperCol={24}
                style={{ marginTop: '10px', width: '100%' }}
              />
            </Col>
            <Col span={12}>
              <FormInput
                // required
                propName='teacher_appe_zh'
                placeholder="請輸入中文稱呼"
                title="稱呼"
                // requiredErrorMessage="請輸入中文稱呼"
                labelCol={24}
                wrapperCol={24}
                style={{ marginTop: '10px', width: '100%' }}
              />
            </Col>
            <Col span={24}>
              <FormInput
                required
                propName='teacher_jobtitle_zh'
                placeholder="請輸入中文職稱"
                title="職稱"
                requiredErrorMessage="請輸入中文職稱"
                labelCol={24}
                wrapperCol={24}
                style={{ marginTop: '10px', width: '100%' }}
              />
            </Col>
            <Col span={24}>
              <FormInput
                required
                propName='teacher_degree_zh'
                placeholder="請輸入中文學歷"
                title="學歷"
                requiredErrorMessage="請輸入中文學歷"
                labelCol={24}
                wrapperCol={24}
                style={{ marginTop: '10px', width: '100%' }}
              />
            </Col>
            <Col span={24}>
              <div style={{ color: '#7D9EB5', fontSize: '16px', fontWeight: 'bold' }}>專長</div>
              <Form.List
                name="teacherColumns"
                required
              >
                {(fields, { add, remove }) => (
                  <div>
                    {fields.map((field, index, arr) => (
                      <Row
                        gutter={24}
                        style={{
                          width: '100%',
                          margin: '0px',
                          padding: '4px 0px',
                          borderBottom: '1px solid rgba(0, 76, 124, 0.5)',
                          background: index % 2 !== 0 && 'rgba(0, 76, 124, 0.1)'
                        }}
                      >
                        <Col span={20}>
                          <Form.Item
                            colon={false}
                            {...field}
                            name={[field.name, 'expertise_zh']}
                            fieldKey={[field.key, 'expertise_id']}
                            validateTrigger={['onChange']}
                            style={{ marginRight: '8px' }}
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: '請輸入中文專長',
                            //   },
                            // ]}
                            labelCol={4}
                            label=""
                            wrapperCol={20}
                          // rules={[
                          //   {
                          //     required: true,
                          //     whitespace: true,
                          //     message: "請輸入中文專長",
                          //   },
                          // ]}
                          >
                            <Input
                              style={styles.inputStyle}
                              placeholder='請輸入中文專長'
                              required
                            />
                          </Form.Item>
                        </Col>

                        <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              minWidth: '80px',
                              padding: '0px 24px',
                            }}
                          >
                            <SortButton
                              currentIndex={index}
                              length={fields.length}
                              handleClickUp={() => this.handleSortTeacherColumn(index, -1)}
                              handleClickDown={() => this.handleSortTeacherColumn(index, 1)}
                            />
                            <Button
                              style={{ border: 'none', cursor: 'pointer', background: 'transparent' }}
                              onClick={() => remove(field.name)}
                            >
                              <img
                                src={Images.delete}
                                style={{ marginRight: '8px' }}
                              />
                            </Button>
                          </div>
                        </Col>

                      </Row>
                    ))}

                    <Form.Item
                      style={{
                        margin: '16px 0'
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: Colors.white,
                          border: `1px dashed ${Colors.primary}`,
                          // width: '100%',
                          height: '36px',
                          color: Colors.primary,
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          margin: '20px 0px',
                        }}
                        onClick={
                          () => add(
                            {
                              teacher_expertise_zh: ''
                            },
                            fields.length,
                          )
                        }
                        block
                      >
                        + 新增一行
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
            </Col>
          </Row>

          <Row style={{ margin: '20px 0px', rowGap: '12px' }} gutter={24}>
            <Col span={24}>
              <div style={styles.langMark}>英文</div>
            </Col>
            <Col span={12}>
              <FormInput
                required
                propName='teacher_name_en'
                placeholder="請輸入英文姓名"
                title="姓名"
                requiredErrorMessage="請輸入英文姓名"
                labelCol={24}
                wrapperCol={24}
                style={{ marginTop: '10px', width: '100%' }}
              />
            </Col>
            <Col span={12}>
              <FormInput
                // required
                propName='teacher_appe_en'
                placeholder="請輸入英文稱呼"
                title="稱呼"
                // requiredErrorMessage="請輸入英文稱呼"
                labelCol={24}
                wrapperCol={24}
                style={{ marginTop: '10px', width: '100%' }}
              />
            </Col>
            <Col span={24}>
              <FormInput
                required
                propName='teacher_jobtitle_en'
                placeholder="請輸入英文職稱"
                title="職稱"
                requiredErrorMessage="請輸入英文職稱"
                labelCol={24}
                wrapperCol={24}
                style={{ marginTop: '10px', width: '100%' }}
              />
            </Col>
            <Col span={24}>
              <FormInput
                required
                propName='teacher_degree_en'
                placeholder="請輸入英文學歷"
                title="學歷"
                requiredErrorMessage="請輸入英文學歷"
                labelCol={24}
                wrapperCol={24}
                style={{ marginTop: '10px', width: '100%' }}
              />
            </Col>
            <Col span={24}>
              <div style={{ color: '#7D9EB5', fontSize: '16px', fontWeight: 'bold' }}>專長</div>
              <Form.List
                name="teacherEnColumns"
                required
              >
                {(enFields, { add, remove }) => (
                  <div>
                    {enFields.map((field, index, arr) => (
                      <Row
                        gutter={24}
                        style={{
                          width: '100%',
                          margin: '0px',
                          padding: '4px 0px',
                          borderBottom: '1px solid rgba(0, 76, 124, 0.5)',
                          background: index % 2 !== 0 && 'rgba(0, 76, 124, 0.1)'
                        }}
                      >
                        <Col span={20}>
                          <Form.Item
                            colon={false}
                            {...field}
                            name={[field.name, 'expertise_en']}
                            fieldKey={[field.key, 'expertise_id']}
                            validateTrigger={['onChange']}
                            style={{ marginRight: '8px' }}
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: '請輸入英文專長',
                            //   },
                            // ]}
                            labelCol={4}
                            label=""
                            wrapperCol={20}
                          // rules={[
                          //   {
                          //     required: true,
                          //     whitespace: true,
                          //     message: "請輸入英文專長",
                          //   },
                          // ]}
                          >
                            <Input
                              style={styles.inputStyle}
                              placeholder='請輸入英文專長'
                              required
                            />
                          </Form.Item>
                        </Col>

                        <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              minWidth: '80px',
                              padding: '0px 24px',
                            }}
                          >
                            <SortButton
                              currentIndex={index}
                              length={enFields.length}
                              handleClickUp={() => this.handleSortTeacherEnColumn(index, -1)}
                              handleClickDown={() => this.handleSortTeacherEnColumn(index, 1)}
                            />
                            <Button
                              style={{ border: 'none', cursor: 'pointer', background: 'transparent' }}
                              onClick={() => remove(field.name)}
                            >
                              <img
                                src={Images.delete}
                                style={{ marginRight: '8px' }}
                              />
                            </Button>
                          </div>
                        </Col>

                      </Row>
                    ))}

                    <Form.Item
                      style={{
                        margin: '16px 0'
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: Colors.white,
                          border: `1px dashed ${Colors.primary}`,
                          // width: '100%',
                          height: '36px',
                          color: Colors.primary,
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          margin: '20px 0px',
                        }}
                        onClick={
                          () => add(
                            {
                              teacher_expertise_en: ''
                            },
                            enFields.length,
                          )
                        }
                        block
                      >
                        + 新增一行
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
            </Col>
          </Row>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <Button style={styles.btnStyle} htmlType='submit' loading={isLoading}>
              儲存
            </Button>
          </div>
        </Form>
      </Modal>
    )
  }


  render() {
    const { store, screenHeight, history, teacherList } = this.props;
    const { tab, teacherModalVisible, isLoading, isMoveTeacher } = this.state;

    let teacherMoveMode = [
      {
        label: '一般模式',
        value: '一般模式',
        // icon: <BarsOutlined />,
      },
      {
        label: '排序模式',
        value: '排序模式',
        // icon: <AppstoreOutlined />,
      },
    ]

    // if (_.isEmpty(store)) {
    //   return null;
    // }

    // 需要拖动的元素的容器
    const SortableItem = sortableElement(({ item }) => (
      <Col xs={24} sm={12} md={8} lg={4} xl={4} style={{ cursor: isMoveTeacher ? 'grab' : 'default' }}>
        <div
          style={{
            boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
            background: `url(${Images.teacherBg}) no-repeat 95% 50%, #fff`,
            borderRadius: '10px',
            color: '#545454',
            fontSize: '16px'
          }}
        >
          <div style={{ padding: '19px 19px 0px 19px', display: 'flex', justifyContent: 'center' }} >
            <img src={(_.has(item, 'file') && !_.isEmpty(item.file.file_url)) && item.file.file_url} alt="teacherPic" style={{ width: '180px', minHeight: '180px', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <div style={{ margin: '8px 0px 16px 0px', textAlign: 'center', fontWeight: 'bold' }}>
            {item.teacher_name_zh} {item.teacher_appe_zh}
          </div>
          <Row style={{ borderTop: '1px solid #c2d7e6' }}>
            <Col span={24} style={{ display: isMoveTeacher ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', height: '40px', }}>
              <DragOutlined style={{ color: '#223345', fontSize: '16px' }} />
            </Col>
            <Col span={12} style={{ display: isMoveTeacher ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', height: '40px', borderRight: '1px solid #c2d7e6' }}>
              <img
                src={Images.edit}
                style={{ width: '16px', height: '16px', objectFit: 'scale-down', cursor: 'pointer' }}
                onClick={() => this.handleTeacherModal('update', item.teacher_id)}
              />
            </Col>
            <Col span={12} style={{ display: isMoveTeacher ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', height: '40px', }}>
              <img
                src={Images.delete}
                style={{ width: '16px', height: '16px', objectFit: 'scale-down', cursor: 'pointer' }}
                onClick={() => this.renderCheckModal(item.teacher_id)}
              />
            </Col>
          </Row>
        </div>
      </Col>
    ));

    const SortableList = sortableContainer(({ items }) => (
      <Row style={{ width: '100%', margin: '20px -12px', rowGap: '24px' }} gutter={24}>
        {items.map((item, index) => (
          <SortableItem
            key={`${item.teacher_id}`}
            index={index}
            item={item}
            collection="images"
            disabled={!isMoveTeacher}
          />
        ))}
      </Row>
    ));

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={styles.root}>
          <div style={styles.wrapper}>
            <div style={styles.contentTop}>
              關於中心管理
            </div>
            <div style={{ ...styles.contentBottom, minHeight: screenHeight - 183 }}>
              <Tabs defaultActiveKey={tab} onChange={this.handleTabChange} >
                <TabPane tab="中心簡介" key={1} style={styles.tabStyle}>
                  {this.renderAbout()}
                </TabPane>
                <TabPane tab="團隊成員" key={2} style={styles.tabStyle}>
                  {this.renderTeam()}
                </TabPane>
                <TabPane tab="師資陣容" key={3} style={{ ...styles.tabStyle, padding: '25px' }}>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Input
                      style={{ width: '317px', height: '40px', borderRadius: '5px', border: '1px solid #A6C1D3', }}
                      placeholder='輸入關鍵字'
                      onChange={this.handleSearch}
                    />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ marginRight: '16px' }}>
                        <Tooltip title="切換功能模式" color="223345">
                          <Segmented
                            options={teacherMoveMode}
                            size="large"
                            onChange={this.handleChangeMoveMode}
                          />
                        </Tooltip>
                      </div>
                      <Button style={styles.createBtnStyle} onClick={() => this.handleTeacherModal('create', '')} disabled={isMoveTeacher}>
                        <img src={Images.add} style={{ width: '15px', marginRight: '10px' }} />新增
                      </Button>
                    </div>
                  </div>
                  {this.state.currentTeacherList.length > 0 &&
                    <SortableList
                      items={this.state.currentTeacherList}
                      onSortEnd={isMoveTeacher ? this.onSortEnd : () => { }}
                      axis="xy"
                    />
                  }
                  {isMoveTeacher &&
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0px' }}>
                      <Button style={styles.btnStyle} htmlType='submit' loading={isLoading} onClick={this.submitTeacherOrder}>
                        儲存
                      </Button>
                    </div>
                  }

                  <Row style={{ width: '100%', margin: '20px -12px', rowGap: '24px' }} gutter={24} >
                    {teacherList.length > 0 &&
                      teacherList.map((item) => {
                        return (
                          <div></div>

                          // <Col xs={24} sm={12} md={8} lg={4} xl={4}>
                          //   <div
                          //     style={{
                          //       boxShadow: '0px 3px 6px rgba(0,0,0,0.2)', 
                          //       background: `url(${Images.teacherBg}) no-repeat 95% 60%, #fff`,
                          //       borderRadius: '10px',
                          //       color: '#545454',
                          //       fontSize: '24px',
                          //       // cursor: 'pointer'
                          //     }}
                          //     className="zoom-img"
                          //   >
                          //     {/* <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '19px'}}>
                          //       <Button 
                          //         className="teacher-del-btn"
                          //         onClick={() => this.renderCheckModal(item.teacher_id)} 
                          //       >
                          //         <img
                          //           src={Images.delete}
                          //           style={{ width: '100%', height: '100%', objectFit: 'scale-down'}}
                          //         />
                          //       </Button>
                          //     </div> */}
                          //     <div style={{padding: '19px 19px 0px 19px',}} >
                          //       <img src={item.file.file_url} alt="teacherPic" style={{width: '100%', borderRadius: '50%'}} />
                          //     </div>
                          //     <div style={{margin: '18px 0px', textAlign: 'center', fontWeight: 'bold'}}>
                          //       {item.teacher_name_zh} {item.teacher_appe_zh}
                          //     </div>
                          //     <Row style={{ borderTop: '1px solid #c2d7e6'}}>
                          //       <Col span={12} style={{padding: '0px 16px', height: '50px', borderRight: '1px solid #c2d7e6'}}>
                          //         <img
                          //           src={Images.edit}
                          //           style={{ width: '100%', height: '100%', objectFit: 'scale-down', cursor: 'pointer'}}
                          //           onClick={() => this.handleTeacherModal('update', item.teacher_id)}
                          //         />
                          //       </Col>
                          //       <Col span={12} style={{ padding: '0px 16px', height: '50px',}}>
                          //         <img
                          //           src={Images.delete}
                          //           style={{ width: '100%', height: '100%', objectFit: 'scale-down', cursor: 'pointer'}}
                          //           onClick={() => this.renderCheckModal(item.teacher_id)} 
                          //         />
                          //       </Col>
                          //     </Row>
                          //   </div>
                          // </Col>
                        )
                      })
                    }

                  </Row >


                  {teacherModalVisible && this.renderTeacherModal()}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    class: state.class,
    store: state.store3.store,
    teamList: state.store3.teamList,
    teacherList: state.store3.teacherList,
    teacherInfo: state.store3.teacherInfo,
    screenHeight: state.screen.screenHeight,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getStore: Store3Actions.getStore3,
        updateStore: Store3Actions.updateStore3,

        getTeamList: Store3Actions.getTeam3List,
        updateTeamList: Store3Actions.updateTeam3List,

        getTeacherList: Store3Actions.getTeacher3List,
        getTeacherInfo: Store3Actions.getTeacher3Info,
        createTeacher: Store3Actions.createTeacher3,
        updateTeacher: Store3Actions.updateTeacher3,
        deleteTeacher: Store3Actions.deleteTeacher3,
        updateTeacherOrder: Store3Actions.updateTeacher3Order,
      },
      dispatch,
    ),
)(Store3Screen);