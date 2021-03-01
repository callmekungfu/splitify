import React, { useState } from 'react';
import BillActor, { BillActorForm } from './components/Actor';
import { Button } from './components/Button/Button';
import { LinkButton } from './components/Button/LinkButton';
import EditableTitle from './components/EditableTitle';
import { RemoveIcon } from './components/Icons';
import { getHumanizedDate } from './helpers/dateHelper';
import { generateParticipantId } from './helpers/participantHelper';
import { IItem, IParticipant } from './types/types';

function App() {
  const [billName, setBillName] = useState(`${getHumanizedDate()} Bill`);
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const [
    shouldShowParticipantCreate,
    setShouldShowParticipantCreate,
  ] = useState(false);

  const addParticipant = (name: string) => {
    const p: IParticipant = {
      name,
      uuid: generateParticipantId(),
    };

    setParticipants([p, ...participants]);
  };

  const removeParticipant = (uuid: string) => {
    setParticipants(participants.filter((p) => p.uuid !== uuid));
  };

  return (
    <div className="container md:mx-auto mt-8">
      <div>
        <EditableTitle
          level="h1"
          defaultValue={billName}
          onChange={(v) => setBillName(v)}
          className="mb-2"
        />
        <div className="text-xl text-gray-600">Food delivery</div>
      </div>
      <hr className="my-6" />
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold mb-4">Participants</h3>
          <Button
            level="primary"
            onClick={() =>
              setShouldShowParticipantCreate(!shouldShowParticipantCreate)
            }
          >
            Add participant
          </Button>
        </div>
        {shouldShowParticipantCreate && (
          <BillActorForm className="mb-4" onSave={addParticipant} />
        )}
        {participants.map((p) => (
          <div className="mb-4 flex items-center">
            <BillActor name={p.name} className="mr-2" />
            <LinkButton onClick={() => removeParticipant(p.uuid)}>
              <RemoveIcon className="h-4 w-4" />
            </LinkButton>
          </div>
        ))}
        {!participants.length && !shouldShowParticipantCreate && (
          <div className="text-center h-14">
            No participants added to the bill yet, click{' '}
            <span className="font-bold">Add participant</span> to get started.
          </div>
        )}
      </div>
      <hr className="my-6" />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-3xl font-bold mb-4">Items</h3>
          <Button level="primary">Add item</Button>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-2 text-center font-bold">Item Name</div>
          <div className="col-span-6 text-center font-bold">
            Item Description
          </div>
          <div className="col-span-2 text-center font-bold">Participants</div>
          <div className="col-span-2 text-center font-bold">Cost</div>
          <div className="col-span-12">
            <hr className="my-4" />
          </div>
          {!items.length && (
            <div className="col-span-12 text-center">
              No items added to the bill yet, click{' '}
              <span className="font-bold">Add item</span> to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
