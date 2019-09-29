import React, { FormEvent, useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { RouteComponentProps } from 'react-router-dom';

import { Button, Form, Grid, Segment } from 'semantic-ui-react';

import { Activity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore';

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ history, match }) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity: initialFormState,
    clearActivity,
    createActivity,
    editActivity,
    loadActivity,
    submitting
  } = activityStore;

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState);
      });
    }

    return () => {
      clearActivity();
    };
  }, [activity.id.length, clearActivity, initialFormState, loadActivity, match.params.id]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      const newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <Grid.Column width={10}>
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
            <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
            <Button onClick={() => history.push('/activities')} floated="right" type="button" content="Cancel" />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
