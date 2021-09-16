import { useState } from 'react';
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
import { Divider } from './components/General';
import { $, getSubtotal } from './helpers/currencyHelper';
import { splitBill } from './lib/split';
import { LS } from './helpers/store';
import NewItemForm from './components/NewItemForm';
import ItemEditDialog from './components/EditDialog';

function App() {
  const [billName, setBillName] = useState(`${getHumanizedDate()} Bill`);
  const [participants, setParticipants] = useState<IParticipant[]>(
    LS.get<IParticipant[]>('participants') ?? [],
  );
  const [billItems, setBillItems] = useState<IBillItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxFees, setTaxFees] = useState<number>(0);
  const [split, setSplit] = useState<Record<string, number>>({});
  const [grandOverride, setGrandOverride] = useState<number>(0);
  const [editingBillItem, setEditingBillItem] = useState<IBillItem | null>(
    null,
  );
  const [shouldShowParticipantCreate, setShouldShowParticipantCreate] =
    useState(false);

  const { register, handleSubmit, control, reset, setValue } =
    useForm<IBillItem>({
      mode: 'onChange',
    });

  const addParticipant = (name: string) => {
    const p: IParticipant = {
      name,
      uuid: generateId(),
    };
    const ps = [p, ...participants];
    setParticipants(ps);
    LS.put('participants', ps);
  };

  const removeParticipant = (uuid: string) => {
    const ps = participants.filter((p) => p.uuid !== uuid);
    setParticipants(ps);
    LS.put('participants', ps);
  };

  const addBillItem = (data: IBillItem) => {
    reset();
    data.id = generateId();
    const newList = [...billItems, data];
    recalculateSubtotal(newList);
    setBillItems(newList);
  };

  const removeBillItem = (data: IBillItem) => {
    const newList = billItems.filter((i) => i.id !== data.id);
    recalculateSubtotal(newList);
    setBillItems(newList);
  };

  const recalculateSubtotal = (items: IBillItem[]) => {
    setSubtotal(getSubtotal(items));
    changeGrand(0);
    calculateSplit(items, taxFees);
  };

  const changeTaxFees = (val: number) => {
    setTaxFees(val);
    calculateSplit(billItems, val);
  };

  const changeGrand = (val: number) => {
    setGrandOverride(val);
    const map = splitBill(billItems, taxFees, val);
    setSplit(map);
  };

  const calculateSplit = (items: IBillItem[], tax: number) => {
    const map = splitBill(items, tax);
    setSplit(map);
  };

  return (
    <div className="container md:mx-auto my-8">
      {editingBillItem && (
        <ItemEditDialog
          item={editingBillItem}
          participants={participants}
          open={true}
        ></ItemEditDialog>
      )}
      <div>
        <EditableTitle
          level="h1"
          defaultValue={billName}
          onChange={(v) => setBillName(v)}
          className="mb-2"
        />
        <div className="text-xl text-gray-600">Food delivery</div>
      </div>
      <Divider />
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
      <Divider />
      <div>
        <div className="mb-4">
          <h3 className="text-3xl font-bold mb-4">Items</h3>
        </div>

        <div className="mb-4 p-4 border rounded border-gray-300">
          <h4 className="text-xl font-bold mb-4">Add a New Bill Item</h4>
          <NewItemForm
            participants={participants}
            onSubmit={addBillItem}
          ></NewItemForm>
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
            {billItems.map((i) => (
              <BillItem
                item={i}
                key={i.id}
                onRemove={removeBillItem}
                onEdit={(item) => setEditingBillItem(item)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Divider />
      <section>
        <h3 className="text-3xl font-bold mb-4">Cost Summary</h3>
        <div className="w-full flex justify-end">
          <div className="w-full lg:w-1/5 grid grid-cols-2 gap-3 text-right">
            <div className="font-bold">Subtotal</div>
            <div>
              <Input
                disabled
                type="text"
                placeholder="0.00"
                className="w-full"
                value={$(subtotal)}
              />
            </div>
            <div className="font-bold">Tax &amp; Fees</div>
            <div>
              <Input
                type="number"
                placeholder="0.00"
                className="w-full"
                value={taxFees}
                onChange={(e) => changeTaxFees(+e.currentTarget.value)}
              />
            </div>
            <hr className="col-span-2 my-4" />
            <div className="font-bold">Total</div>
            <div>
              <Input
                type="number"
                placeholder="0.00"
                className="w-full"
                value={grandOverride !== 0 ? grandOverride : subtotal + taxFees}
                onChange={(e) => changeGrand(+e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </section>
      <Divider />
      <section>
        <h3 className="text-3xl font-bold mb-4">Split</h3>
        {Object.keys(split).map((key) => {
          const participant = participants.find((p) => p.uuid === key);
          if (participant) {
            return (
              <div key={participant.uuid} className="flex items-center my-4">
                <BillActor name={participant.name} size="sm" />
                <div className="ml-4">{$(split[key])}</div>
              </div>
            );
          }
          return <></>;
        })}
      </section>
    </div>
  );
}

export default App;
