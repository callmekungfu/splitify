import React, { useState } from 'react';
import BillActor, { BillActorForm } from './components/Actor';
import { Button } from './components/Button/Button';
import { LinkButton } from './components/Button/LinkButton';
import EditableTitle from './components/EditableTitle';
import { RemoveIcon } from './components/Icons';
import Input from './components/Input';
import { getHumanizedDate } from './helpers/dateHelper';
import { generateId } from './helpers/participantHelper';
import { IParticipant } from './types/types';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { BillItem, IBillItem } from './components/BillItem';

function App() {
  const [billName, setBillName] = useState(`${getHumanizedDate()} Bill`);
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [items, setItems] = useState<IBillItem[]>([]);
  const [
    shouldShowParticipantCreate,
    setShouldShowParticipantCreate,
  ] = useState(false);

  const { register, handleSubmit, control } = useForm<IBillItem>({
    mode: 'onChange',
  });

  const addParticipant = (name: string) => {
    const p: IParticipant = {
      name,
      uuid: generateId(),
    };

    setParticipants([p, ...participants]);
  };

  const removeParticipant = (uuid: string) => {
    setParticipants(participants.filter((p) => p.uuid !== uuid));
  };

  const addBillItem = (data: IBillItem) => {
    data.id = generateId();
    setItems([...items, data]);
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
          <div className="mb-4 flex items-center" key={p.uuid}>
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
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th className="w-2/12">Item Name</th>
              <th className="w-5/12">Item Description</th>
              <th className="w-2/12">Participants</th>
              <th className="w-1/12">Cost</th>
              <th className="w-1/12">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <BillItem item={i} key={i.id} />
            ))}
            <tr>
              <td>
                <Input
                  type="text"
                  placeholder="e.g. Caesar Salad"
                  className="w-full"
                  name="itemName"
                  ref={register({
                    required: true,
                  })}
                  isBox
                />
              </td>
              <td>
                <Input
                  type="text"
                  placeholder="Some description about the item..."
                  className="w-full"
                  name="itemDescription"
                  ref={register}
                  isBox
                />
              </td>
              <td>
                <Controller
                  as={Select}
                  name="participants"
                  options={participants}
                  placeholder="Select participants"
                  getOptionLabel={(o: IParticipant) => o.name}
                  getOptionValue={(o: IParticipant) => o.uuid}
                  isMulti
                  isSearchable={false}
                  control={control}
                  defaultValue={[]}
                />
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="13.99"
                  isBox
                  className="w-full"
                  name="itemCost"
                  ref={register({
                    required: true,
                    min: 0,
                  })}
                />
              </td>
              <td>
                <Button
                  level="primary"
                  isBlock
                  onClick={handleSubmit(addBillItem)}
                >
                  Save
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
