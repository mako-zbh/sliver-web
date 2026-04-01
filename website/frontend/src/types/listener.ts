export interface Listener {
  id: string;
  name: string;
  type: 'mTLS' | 'WireGuard' | 'HTTP' | 'DNS' | 'TCP';
  address: string;
  port: number;
  isActive: boolean;
  beaconCount: number;
  sessionCount: number;
  startedAt: Date;
}

export interface ImplantConfig {
  name: string;
  type: 'exe' | 'shellcode' | 'dll' | 'service';
  os: 'windows' | 'linux' | 'macos' | 'android';
  arch: 'x64' | 'x86' | 'ARM';
  transport: 'mTLS' | 'WireGuard' | 'HTTP' | 'DNS';
  obfs: boolean;
  debug: boolean;
  runOnExit: boolean;
}
