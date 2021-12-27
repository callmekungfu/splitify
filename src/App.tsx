import { useState } from 'react';
import BillActor from './components/Actor';
import { LinkButton } from './components/Button/LinkButton';
import EditableTitle from './components/EditableTitle';
import { getHumanizedDate } from './helpers/dateHelper';
import { IParticipant } from './types/types';
import { CardBillItem, IBillItem } from './components/BillItem';
import { Divider } from './components/General';
import { $, getSubtotal } from './helpers/currencyHelper';
import { splitBill } from './lib/split';
import { LS } from './helpers/store';
import NewItemForm from './components/NewItemForm';
import ItemEditDialog from './components/EditDialog';
import CostSummary from './components/CostSummary';
import { Participant, ParticipantList } from './data/Actor';
import { ParticipantSection } from './components/Participants';
import { Bill, BillItem } from './data/Bill';
import { observer } from 'mobx-react-lite';

function App() {
  const participantStore = new ParticipantList(
    LS.get<IParticipant[]>('participants')?.map(
      (p) => new Participant(p.name, p.uuid),
    ),
  );
  const billStore = new Bill();
  const [billName, setBillName] = useState(`${getHumanizedDate()} Bill`);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxFees, setTaxFees] = useState<number>(0);
  const [split, setSplit] = useState<Record<string, number>>({});
  const [grandOverride, setGrandOverride] = useState<number>(0);
  const [editingBillItem, setEditingBillItem] = useState<BillItem | null>(null);

  const [shouldShowEditDialog, setShouldShowEditDialog] =
    useState<boolean>(false);

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

  const BillItemView = observer<{ store: Bill }>(({ store }) => (
    <div>
      {store.items.map((i) => (
        <CardBillItem
          item={i}
          key={i.id}
          onRemove={removeBillItem}
          onEdit={(item) => {
            setEditingBillItem(item);
            setShouldShowEditDialog(true);
          }}
        />
      ))}
    </div>
  ));

  const NewItemView = observer<{ store: ParticipantList }>(({ store }) => (
    <NewItemForm
      participants={store.participants}
      onSubmit={(d) => billStore.create(d)}
    ></NewItemForm>
  ));

  const ItemDialogView = observer<{
    store: ParticipantList;
    editItem: BillItem | null;
  }>(({ store, editItem }) => (
    <>
      {editItem && (
        <ItemEditDialog
          item={editItem}
          participants={store.participants}
          isOpen={shouldShowEditDialog}
          onSave={(data) => billStore.update(data)}
          onClose={() => setShouldShowEditDialog(false)}
        ></ItemEditDialog>
      )}
    </>
  ));

  return (
    <div className="container md:mx-auto my-8 px-3">
      <ItemDialogView store={participantStore} editItem={editingBillItem} />
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
      <ParticipantSection store={participantStore} />
      <Divider />
      <div>
        <div className="mb-4">
          <h3 className="text-3xl font-bold mb-4">Items</h3>
        </div>
        <div className="mb-4 p-4 border rounded bg-white shadow-md">
          <NewItemView store={participantStore} />
        </div>
        <BillItemView store={billStore} />
      </div>
      <Divider />
      <CostSummary
        changeGrand={changeGrand}
        changeTaxFees={changeTaxFees}
        grandOverride={grandOverride}
        subtotal={subtotal}
        taxFees={taxFees}
      />
      <Divider />
      <section>
        <h3 className="text-3xl font-bold mb-4">Split</h3>
        <LinkButton>Add percentage modifier</LinkButton>
        {Object.keys(split).map((key) => {
          const participant = participantStore.participants.find(
            (p) => p.id === key,
          );
          if (participant) {
            return (
              <div key={participant.id} className="flex items-center my-4">
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
