import _ from 'lodash';
import { removeUserInformation } from 'src/utils/localStorage';
import { showMessage } from 'src/utils/message';

export const DefaultSuccessHandler = (response) => {

  // switch (response.status) {
  //   case 200: {
  //     global.__DEV__ &&
  //       ThrottledAlert({
  //         title: t('_alert_api_success_title'),
  //         content: `${t('_alert_api_success_desc')} (200)`,
  //         button: [{ onPress: () => { } }],
  //         type: 'info',
  //       });
  //     break;
  //   }
  // }
};

export const DefaultErrorHandler = (response) => {
  let tempErrorString = '';
  if (_.has(response, 'data')) {
    if (_.has(response.data, 'errorMessages')) {
      if (_.has(response.data.errorMessages, 'error')) {
        if (response.data.errorMessages.error.length > 0) {
          response.data.errorMessages.error.map((item) => {
            tempErrorString += item;
          });
        }
      }
    }
  }
  if (response.status === 401) {
    removeUserInformation();
    // window.location.reload();
    showMessage({ type: 'error', duration: 5, content: `登入時限已過，請重新登入` });
  } else {
    showMessage({ type: 'error', duration: 10, content: `${response.status} 提交失敗，${tempErrorString !== '' ? tempErrorString : '檢查填寫資料是否異常'}` });
  }
  // switch (response.status) {
  //   case 400: {
  //     showMessage({ type: 'error', duration: 0, content: `提交失敗，${tempErrorString !== '' ? tempErrorString : '檢查填寫資料是否異常'}`})
  //       // Swal.fire({
  //       //   icon: 'error',
  //       //   title: '提交失敗',
  //       //   text: tempErrorString !== '' ? tempErrorString : '檢查填寫資料是否異常',
  //       // });
  //     break;
  //   }

  //   case 401: {
  //     showMessage({ type: 'error', duration: 5, content: '登入時限已過，請重新登入' });
  //     // Swal.fire({
  //     //   icon: 'error',
  //     //   title: '登入時限已過，請重新登入'
  //     // });
  //     removeUserInformation();
  //     window.location.reload();
  //     break;
  //   }

  //   case 403: {
  //     showMessage({ type: 'error', duration: 5, content: '登入時限已過，請重新登入' });
  //     Swal.fire({
  //       icon: 'error',
  //       title: '該帳號為最後一個User，無法被刪除'
  //     });
  //     break;
  //   }

  //   case 404: {
  //     Swal.fire({
  //       icon: 'error',
  //       title: '提交失敗',
  //       text: tempErrorString !== '' ? tempErrorString : '檢查填寫資料是否異常',
  //     });
  //     break;
  //   }

  //   // case 409: {
  //   //   ThrottledAlert({
  //   //     type: 'warning',
  //   //     title: t('_api_warring_title'),
  //   //     content: `${t('_alert_api_warring_desc', {
  //   //       message: response.message,
  //   //     })} (409)`,
  //   //   });
  //   //   break;
  //   // }

  //   case 500: {
  //     Swal.fire({
  //       icon: 'error',
  //       title: '提交失敗',
  //       text: tempErrorString !== '' ? tempErrorString : '系統錯誤',
  //     });
  //     break;
  //   }
  //   default: {
  //     break;
  //   }
  // }
};

export default {
  DefaultErrorHandler,
  DefaultSuccessHandler,
};
