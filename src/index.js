import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { WebGLRenderer } from 'three';
import App from './Containers/AppContainer';

import { setI18nConfig } from 'src/Helpers/I18n';
import createStore from 'src/Stores';

global.__DEV__ = 'production' !== process.env.NODE_ENV;

const rootEl = document.getElementById('root');
const renderer = new WebGLRenderer({ antialias: true });

// kick off i18n env.
setI18nConfig();

// eslint-disable-next-line import/prefer-default-export
const reduxStore = createStore();

export const { store, persistor } = reduxStore;

const Providers = (props) => (
  <Provider store={store}>
    <React.Fragment>
      {props.children}
    </React.Fragment>
  </Provider>
);

ReactDOM.render(
  <Providers>
    <App renderer={renderer} />
  </Providers>,
  rootEl,
);

