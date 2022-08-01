import { Status } from '@types';
import { mapProjectStatus } from './mapProjectStatus';

describe('mapProjectStatus', () => {
  it('Should return accurate status for the status parameter', () => {
    const newStatus = mapProjectStatus('Not Started');
    const inProgressStatus = mapProjectStatus('In Progress');
    const completedStatus = mapProjectStatus('Completed');

    expect(newStatus).toEqual(Status.New);
    expect(inProgressStatus).toEqual(Status.InProgress);
    expect(completedStatus).toEqual(Status.Completed);
  });
});
