import { Status } from '@types';

export const mapProjectStatus = (status: string) =>
  status === 'Not Started'
    ? Status.New
    : status === 'In Progress'
    ? Status.InProgress
    : Status.Completed;
