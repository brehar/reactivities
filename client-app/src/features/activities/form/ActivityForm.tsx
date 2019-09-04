import React, { FormEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Button, Form, Segment } from 'semantic-ui-react';

import { Activity } from '../../../app/models/activity';

interface Props {
  setEditMode: (editMode: boolean) => void;
  activity: Activity;
  createActivity: (activity: Activity) => void;
  editActivity: (activity: Activity) => void;
}

const ActivityForm: React.FC<Props> = ({ activity: initialFormState, createActivity, editActivity, setEditMode }) => {
  const initializeForm = () => {
    if (initialFormState) return initialFormState;

    return {
      id: '',
      title: '',
      category: '',
      description: '',
      date: '',
      city: '',
      venue: ''
    };
  };

  const [activity, setActivity] = useState<Activity>(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      const newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input onChange={handleInputChange} name="title" placeholder="Title" value={activity.title} />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input onChange={handleInputChange} name="category" placeholder="Category" value={activity.category} />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input onChange={handleInputChange} name="city" placeholder="City" value={activity.city} />
        <Form.Input onChange={handleInputChange} name="venue" placeholder="Venue" value={activity.venue} />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button onClick={() => setEditMode(false)} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
