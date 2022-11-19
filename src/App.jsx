import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import OverallLayout from './component/layout/OverallLayout.jsx';
const App = () => {
  return <div>
      <h1>Hello World! hahahah</h1>
      <OverallLayout />
    </div>;
};
ReactDOM.render(<App />, document.getElementById('app'));