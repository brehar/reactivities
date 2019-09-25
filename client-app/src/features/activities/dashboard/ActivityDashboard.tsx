import React, { SyntheticEvent } from 'react';

import { Grid } from 'semantic-ui-react';

import { Activity } from '../../../app/models/activity';

import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  selectedActivity: Activity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: Activity | null) => void;
  createActivity: (activity: Activity) => void;
  editActivity: (activity: Activity) => void;
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<Props> = ({
  activities,
  createActivity,
  deleteActivity,
  editActivity,
  editMode,
  selectActivity,
  selectedActivity,
  setEditMode,
  setSelectedActivity,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            setEditMode={setEditMode}
            activity={selectedActivity!}
            createActivity={createActivity}
            editActivity={editActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
