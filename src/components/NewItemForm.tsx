import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Participant, ParticipantList } from '../data/Actor';
import { IBillItem } from './BillItem';
import { Button } from './Button/Button';
import Input, { TextArea } from './Input';

interface FormProps {
  participants: ParticipantList;
  data?: IBillItem;
  onSubmit?: (item: IBillItem) => any;
}

export const NewItemForm: React.FC<FormProps> = ({
  participants,
  data,
  onSubmit,
}: FormProps) => {
  const { register, handleSubmit, control, reset, setValue } =
    useForm<IBillItem>({
      mode: 'onChange',
    });

  const handleFormSubmit = (data: IBillItem) => {
    if (onSubmit) {
      onSubmit(data);
      reset();
      setValue('participants', []);
    }
  };

  const ParticipantSelect = observer<{ store: ParticipantList }>(
    ({ store }) => (
      <Controller
        as={Select}
        name="participants"
        options={store.participants}
        placeholder="Select participants"
        getOptionLabel={(o: Participant) => o.name}
        getOptionValue={(o: Participant) => o.id}
        isMulti
        isSearchable={false}
        control={control}
        defaultValue={[]}
      />
    ),
  );

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-2">
        <label htmlFor="mainName" className="required-label">
          Item Name
        </label>
        <Input
          type="text"
          placeholder="e.g. Caesar Salad"
          className="w-full"
          name="itemName"
          ref={register({
            required: true,
          })}
          isBox
          id="mainName"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="mainDesc">Item Description</label>
        <TextArea
          type="text"
          placeholder="Some description about the item..."
          className="w-full"
          name="itemDescription"
          ref={register}
          isBox
          id="mainDesc"
        />
      </div>
      <div className="mb-2">
        <label className="required-label">Item Participants</label>
        <ParticipantSelect store={participants} />
      </div>
      <div className="mb-3">
        <label htmlFor="mainPrice" className="required-label">
          Item Cost
        </label>
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
          step={0.01}
          id="mainPrice"
        />
      </div>
      <div>
        <Button level="primary" isBlock>
          Save
        </Button>
      </div>
    </form>
  );
};

export default NewItemForm;
