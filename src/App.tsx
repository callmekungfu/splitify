import { useMemo, useState } from 'react';
import EditableTitle from './components/EditableTitle';
import { getHumanizedDate } from './helpers/dateHelper';
import { BillItemView } from './components/BillItem';
import { Divider } from './components/General';
import NewItemForm from './components/NewItemForm';
import ItemEditDialog from './components/EditDialog';
import { CostSummaryView } from './components/CostSummary';
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
        <BillItemView
          store={billStore}
          onEdit={(item) => {
            setEditingBillItem(item);
            setShouldShowEditDialog(true);
          }}
        />
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
