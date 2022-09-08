import { observer } from 'mobx-react-lite';
import { ParticipantList } from '../data/Actor';
import { Bill } from '../data/Bill';
import { $ } from '../helpers/currencyHelper';
import BillActor from './Actor';
import { Divider } from './General';
import Input from './Input';

export interface CostSummaryProps {
  changeTaxFees: (amount: number) => any;
  changeGrand: (amount: number) => any;
  subtotal: number;
  taxFees: number;
  grandOverride: number;
}

const CostSummary: React.FC<CostSummaryProps> = ({
  changeGrand,
  changeTaxFees,
  grandOverride,
  subtotal,
  taxFees,
}) => {
  return (
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
  );
};

export const CostSummaryView = observer<{
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

export default CostSummary;
