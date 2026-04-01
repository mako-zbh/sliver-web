import { X, Shield, User, Monitor, Cpu, HardDrive, Globe, Tag } from 'lucide-react';
import type { Host } from '@/types';
import clsx from 'clsx';

interface HostDetailProps {
  host: Host;
  onClose: () => void;
}

export default function HostDetail({ host, onClose }: HostDetailProps) {
  return (
    <div className="h-full flex flex-col bg-sliver-bg-secondary border-l border-sliver-border">
      <div className="flex items-center justify-between p-4 border-b border-sliver-border">
        <h2 className="font-semibold text-sliver-text-primary">Host Details</h2>
        <button
          onClick={onClose}
          className="p-1 text-sliver-text-secondary hover:text-sliver-text-primary"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h3 className="text-sm font-medium text-sliver-text-secondary mb-3">Basic Info</h3>
          <div className="space-y-2">
            <InfoRow icon={Monitor} label="Hostname" value={host.hostname} />
            <InfoRow icon={Globe} label="IP Address" value={host.ipAddress} />
            <InfoRow icon={Globe} label="OS" value={host.osVersion} />
            <InfoRow icon={Cpu} label="Architecture" value={host.architecture} />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-sliver-text-secondary mb-3">User Context</h3>
          <div className="space-y-2">
            <InfoRow icon={User} label="Username" value={host.username} />
            <InfoRow icon={Shield} label="User SID" value={host.userUID} />
            <InfoRow 
              icon={Shield} 
              label="Privileges" 
              value={host.privileges.join(', ') || 'User'} 
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-sliver-text-secondary">Elevated</span>
              <span className={clsx(
                'px-2 py-0.5 rounded text-xs',
                host.isElevated 
                  ? 'bg-sliver-accent bg-opacity-20 text-sliver-accent' 
                  : 'bg-sliver-border text-sliver-text-secondary'
              )}>
                {host.isElevated ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-sliver-text-secondary mb-3">Process Info</h3>
          <div className="space-y-2">
            <InfoRow icon={Monitor} label="Process Name" value={host.processName} />
            <InfoRow icon={HardDrive} label="PID" value={host.processPID.toString()} />
            <InfoRow icon={HardDrive} label="Memory" value={`${host.glideinMem} MB`} />
            <InfoRow icon={Cpu} label="CPU" value={`${host.glideinCPU}%`} />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-sliver-text-secondary mb-3">Domain & Locale</h3>
          <div className="space-y-2">
            <InfoRow icon={Globe} label="Domain" value={host.domain || 'N/A'} />
            <InfoRow icon={Globe} label="Locale" value={host.locale} />
          </div>
        </section>

        {host.tags.length > 0 && (
          <section>
            <h3 className="text-sm font-medium text-sliver-text-secondary mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {host.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-1 bg-sliver-bg-primary border border-sliver-border rounded text-sm"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {host.iocs.length > 0 && (
          <section>
            <h3 className="text-sm font-medium text-sliver-text-secondary mb-3">IOCs</h3>
            <div className="space-y-2">
              {host.iocs.map((ioc) => (
                <div
                  key={ioc.id}
                  className="p-2 bg-sliver-bg-primary border border-sliver-border rounded text-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-sliver-text-secondary uppercase">{ioc.type}</span>
                  </div>
                  <span className="font-mono text-xs break-all">{ioc.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={14} className="text-sliver-text-secondary" />
      <span className="text-sm text-sliver-text-secondary w-24">{label}</span>
      <span className="text-sm text-sliver-text-primary truncate">{value}</span>
    </div>
  );
}
