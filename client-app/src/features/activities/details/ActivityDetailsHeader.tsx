import React from 'react';
import { observer } from 'mobx-react-lite';

import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';

import { Activity } from '../../../app/models/activity';

const activityImageStyle = { filter: 'brightness(30%)' };
const activityImageTextStyle = {
  bottom: '5%',
  color: 'white',
  height: 'auto',
  left: '5%',
  position: 'absolute',
  width: '100%'
};

const ActivityDetailsHeader: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size="huge" content={activity.title} style={{ color: 'white' }} />
                <p>{activity.date}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Activity</Button>
        <Button>Cancel Attendance</Button>
        <Button color="orange" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailsHeader);
