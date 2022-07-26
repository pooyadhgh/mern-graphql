import { Status } from '@types';

export const mapProjectStatus = (status: string) => {
  const mappedStatus: { [key: string]: string } = {
    'Not Started': Status.New,
    'In Progress': Status.InProgress,
    Completed: Status.Completed,
  };

  return mappedStatus[status];
};
