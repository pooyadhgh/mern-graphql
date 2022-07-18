export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  client: Client;
}

export enum Status {
  New = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export type ClientsQuery = {
  clients: Client[];
};
