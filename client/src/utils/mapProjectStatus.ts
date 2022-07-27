import { Status } from '@types';

export const mapProjectStatus = (status: string): Status => {
  const mappedStatus: { [key: string]: Status } = {
    'Not Started': Status.New,
    'In Progress': Status.InProgress,
    Completed: Status.Completed,
  };

  return mappedStatus[status];
};
