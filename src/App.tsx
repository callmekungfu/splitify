import React, { useState } from 'react';
import BillActor, { BillActorForm } from './components/Actor';
import { Button } from './components/Button/Button';
import EditableTitle from './components/EditableTitle';
import { getHumanizedDate } from './helpers/dateHelper';

function App() {
  const [billName, setBillName] = useState(`${getHumanizedDate()} Bill`);
  const [
    shouldShowParticipantCreate,
    setShouldShowParticipantCreate,
  ] = useState(false);

  return (
    <div className="container md:mx-auto mt-8">
      <div>
        <EditableTitle
          level="h1"
          defaultValue={billName}
          onChange={(v) => setBillName(v)}
          className="mb-2"
        />
        <div className="text-xl text-gray-600">Food deliver</div>
      </div>
      <hr className="my-4" />
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold mb-4">Participants</h3>
          <Button
            level="primary"
            onClick={() => setShouldShowParticipantCreate(true)}
          >
            Add participant
          </Button>
        </div>
        {shouldShowParticipantCreate && <BillActorForm className="mb-4" />}
        <BillActor className="mb-4" name="Yong Lin Wang" />
        <BillActor className="mb-4" name="Daniel Wu" />
        <BillActor className="mb-4" name="Jack" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold mb-4">Items</h3>
          <Button level="primary">Add item</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
