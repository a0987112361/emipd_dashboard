import { message } from 'antd';
import Swal from 'sweetalert2';

export const showMessage = ({ type = 'success', content = 'success', duration = 5 }) => {
  message[type]({ content, duration, rtl: true, onClose: () => message.destroy() });
}


export const showSwal = ({ callback, title = '是否要捨棄變更並離開？', icon = 'warning' }) => {
  Swal.fire({
    title: title,
    icon: icon,
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '確定',
  }).then((result) => {
    if (result.value) {
      if (callback) { callback() }
    }
  });
}