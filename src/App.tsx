import React, { useState } from 'react';
import './App.css';
import EditableTitle from './components/EditableTitle';
import { getHumanizedDate } from './helpers/dateHelper';

function App() {
  const [billName, setBillName] = useState(`${getHumanizedDate()} Bill`);

  return (
    <div className="container md:mx-auto mt-8">
      <div className="mb-6">
        <EditableTitle
          level="h1"
          defaultValue={billName}
          onChange={(v) => setBillName(v)}
          className="mb-2"
        />
        <div className="text-xl text-gray-600">Food deliver</div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
