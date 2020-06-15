// Add this to the VERY top of the first file loaded in your app
import { init as initApm } from '@elastic/apm-rum'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';

import alertsList from './AlertsList';
import { ApmRoute } from '@elastic/apm-rum-react'
import registerServiceWorker from './registerServiceWorker';

const apm = initApm({

    // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
    serviceName: 'alert-triage-ui',
  
    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'https://fdf8d494ed7843d2b8cfbdf3af5d43ef.apm.us-east-1.aws.cloud.es.io',
  
    // Set service version (required for sourcemap feature)
    serviceVersion: '1.0'
  })

const store = configureStore();

const routing = (
    <Provider store={store}>
        <Router>
            <div>
                <ApmRoute path="/" component={alertsList} />
            </div>
        </Router>
    </Provider>
)

render(
    routing,
    document.getElementById('root')
);

registerServiceWorker();
