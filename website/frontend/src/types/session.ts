export interface Session {
  id: string;
  beaconID: string;
  name: string;
  hostname: string;
  uuid: string;
  hostUUID: string;
  ipAddress: string;
  port: number;
  transport: 'mTLS' | 'WireGuard' | 'HTTP' | 'DNS' | 'TCP';
  encrypted: boolean;
  compressed: boolean;
  username: string;
  uid: string;
  domain: string;
  privileges: string[];
  isActive: boolean;
  isElevated: boolean;
  lastSeen: Date;
  activeC2: string;
}

export interface Beacon {
  id: string;
  name: string;
  hostname: string;
  uuid: string;
  hostUUID: string;
  ipAddress: string;
  transport: string;
  lastSeen: Date;
  interval: number;
  jitter: number;
  isActive: boolean;
  tasks: Task[];
}

export interface Task {
  id: string;
  beaconID: string;
  command: string;
  createdAt: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
  response?: string;
}
