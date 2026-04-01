export interface Host {
  id: string;
  hostname: string;
  hostUUID: string;
  ipAddress: string;
  lastSeen: Date;
  osVersion: string;
  architecture: string;
  locale: string;
  domain: string;
  username: string;
  userUID: string;
  privileges: string[];
  isElevated: boolean;
  processName: string;
  processPID: number;
  glideinMem: number;
  glideinCPU: number;
  iocs: IOC[];
  tags: string[];
}

export interface IOC {
  id: string;
  hostID: string;
  type: 'ipv4' | 'ipv6' | 'domain' | 'md5' | 'sha1' | 'sha256' | 'url';
  value: string;
  description: string;
  createdAt: Date;
}
