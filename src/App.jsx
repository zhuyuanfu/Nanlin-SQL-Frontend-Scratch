import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import OverallLayout from './component/layout/OverallLayout.jsx';
const App = () => {
  return <div>
      <OverallLayout />
    </div>;
};
ReactDOM.render(<App />, document.getElementById('app'));