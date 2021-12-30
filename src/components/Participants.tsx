import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ParticipantList } from '../data/Actor';
import BillActor, { BillActorForm } from './Actor';
import { Button } from './Button/Button';
import { LinkButton } from './Button/LinkButton';
import { RemoveIcon } from './Icons';

export interface ParticipantSectionProps {
  store: ParticipantList;
}

const ParticipantListView = observer<{
  participantList: ParticipantList;
  isInputVisible: boolean;
}>(({ participantList, isInputVisible }) => (
  <div>
    {participantList.participants.map((p) => (
      <div className="mb-4 flex items-center" key={p.id}>
        <BillActor name={p.name} className="mr-2" />
        <LinkButton onClick={() => participantList.remove(p)}>
          <RemoveIcon className="h-4 w-4" />
        </LinkButton>
      </div>
    ))}
    {!participantList.participants.length && !isInputVisible && (
      <div className="text-center h-14">
        No participants added to the bill yet, click{' '}
        <span className="font-bold">Add participant</span> to get started.
      </div>
    )}
  </div>
));

export const ParticipantSection: React.FC<ParticipantSectionProps> = ({
  store,
}) => {
  const [shouldShowParticipantCreate, setShouldShowParticipantCreate] =
    useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold mb-4">Participants</h3>
        <Button
          level="primary"
          onClick={() =>
            setShouldShowParticipantCreate(!shouldShowParticipantCreate)
          }
        >
          {shouldShowParticipantCreate ? 'Dismiss form' : 'Add participant'}
        </Button>
      </div>
      {shouldShowParticipantCreate && (
        <BillActorForm className="mb-4" onSave={(n) => store.create(n)} />
      )}
      <ParticipantListView
        participantList={store}
        isInputVisible={shouldShowParticipantCreate}
      />
    </div>
  );
};
