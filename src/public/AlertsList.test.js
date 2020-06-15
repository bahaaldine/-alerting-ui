import React from 'react';
import ReactDOM from 'react-dom';
import AlertsList from './AlertsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AlertsList />, div);
});
