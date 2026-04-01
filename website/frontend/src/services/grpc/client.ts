import type { Session, Beacon, Host, Listener } from '@/types';

export const sessionService = {
  async getSessions(): Promise<Session[]> {
    return [];
  },

  async getSession(_id: string): Promise<Session | null> {
    return null;
  },

  async interact(_sessionId: string, _command: string): Promise<string> {
    return '';
  },
};

export const beaconService = {
  async getBeacons(): Promise<Beacon[]> {
    return [];
  },

  async sendTask(_beaconId: string, _command: string): Promise<void> {
  },

  async getTaskResults(_beaconId: string): Promise<unknown[]> {
    return [];
  },
};

export const hostService = {
  async getHosts(): Promise<Host[]> {
    return [];
  },

  async getHost(_id: string): Promise<Host | null> {
    return null;
  },

  async updateHostTags(_id: string, _tags: string[]): Promise<void> {
  },
};

export const listenerService = {
  async getListeners(): Promise<Listener[]> {
    return [];
  },

  async startListener(_config: unknown): Promise<Listener> {
    return {} as Listener;
  },

  async stopListener(_id: string): Promise<void> {
  },
};

export const generateService = {
  async generate(_config: unknown): Promise<ArrayBuffer> {
    return new ArrayBuffer(0);
  },

  async generateStage(_config: unknown): Promise<ArrayBuffer> {
    return new ArrayBuffer(0);
  },
};
