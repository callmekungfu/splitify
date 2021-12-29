import { useMemo, useState } from 'react';
import BillActor from './components/Actor';
import { LinkButton } from './components/Button/LinkButton';
import EditableTitle from './components/EditableTitle';
import { getHumanizedDate } from './helpers/dateHelper';
import { CardBillItem } from './components/BillItem';
import { Divider } from './components/General';
import { $ } from './helpers/currencyHelper';
import NewItemForm from './components/NewItemForm';
import ItemEditDialog from './components/EditDialog';
import CostSummary from './components/CostSummary';
import { ParticipantList } from './data/Actor';
import { ParticipantSection } from './components/Participants';
import { Bill, BillItem } from './data/Bill';
import { observer } from 'mobx-react-lite';

function App() {
  const participantStore = useMemo(() => new ParticipantList(), []);

  const billStore = useMemo(() => new Bill(), []);

  const [billName, setBillName] = useState(`${getHumanizedDate()} Bill`);

  const [editingBillItem, setEditingBillItem] = useState<BillItem | null>(null);
  const [shouldShowEditDialog, setShouldShowEditDialog] =
    useState<boolean>(false);

  const BillItemView = observer<{ store: Bill }>(({ store }) => (
    <div>
      {store.items.map((i) => (
        <CardBillItem
          item={i}
          key={i.id}
          onRemove={(i) => store.delete(i)}
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
      onSubmit={(d) => billStore.add(d)}
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
          onClose={() => setShouldShowEditDialog(false)}
        ></ItemEditDialog>
      )}
    </>
  ));

  const CostSummaryView = observer<{
    billStore: Bill;
    participantStore: ParticipantList;
  }>(({ billStore, participantStore }) => (
    <>
      <CostSummary
        changeGrand={(a) => billStore.setGrandTotal(a)}
        changeTaxFees={(a) => billStore.setTaxFees(a)}
        grandOverride={billStore.grandTotal}
        subtotal={billStore.subtotal}
        taxFees={billStore.taxFees}
      />
      <Divider />
      <section>
        <h3 className="text-3xl font-bold mb-4">Split</h3>
        <LinkButton>Add percentage modifier</LinkButton>
        {Object.keys(billStore.split).map((key) => {
          const participant = participantStore.participants.find(
            (p) => p.id === key,
          );
          if (participant) {
            return (
              <div key={participant.id} className="flex items-center my-4">
                <BillActor name={participant.name} size="sm" />
                <div className="ml-4">{$(billStore.split[key])}</div>
              </div>
            );
          }
          return <></>;
        })}
      </section>
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
      <CostSummaryView
        billStore={billStore}
        participantStore={participantStore}
      />
    </div>
  );
}

export default App;
