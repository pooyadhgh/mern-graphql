import { Project, Status } from '@types';
import { client } from './client';

export const project: Project = {
  client,
  status: Status.New,
  description: 'Project Description',
  name: 'Project 1',
  id: '62dfe6ed894b8a3b0a4e4df8',
};
