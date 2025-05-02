import { put, call, select } from 'redux-saga/effects';
import { saveUserInformation } from 'src/utils/localStorage';
import {
    AdvertisementActions,
} from 'src/Stores';
import { Handler, Advertisement } from 'src/apis';
import { showMessage } from 'src/utils/message';
import _ from 'lodash';

export function* getAdDetail({ callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.get({ Authorization: token }),
            Advertisement.getAdDetail(),
        )

        if (res.success) {
            yield put(AdvertisementActions.getAdDetailSuccess(res.data));
            if (callback) { callback(res.data) }
        }
    } catch (err) {
        console.log('err', err);
    }
}

export function* updateAd({ payload, callback }) {
    try {
        const token = yield select((state) => state.user.Token);
        const { data: res } = yield call(
            Handler.put({ data: payload, Authorization: token, ContentType: 'multipart/form-data' }),
            Advertisement.updateAd(),
        );
        if (res.success) {
            showMessage({ content: '修改成功' }), 10;
            if (callback) {
                callback()
            }
        }
    } catch (err) {
        console.log('err', err);
    }
    finally {
        if (callback) { callback() }
    }
}
