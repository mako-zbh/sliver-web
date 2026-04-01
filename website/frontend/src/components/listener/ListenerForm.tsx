import { useState } from 'react';
import { X, Globe } from 'lucide-react';

interface ListenerFormProps {
  onSubmit: (config: ListenerConfig) => void;
  onCancel: () => void;
}

export interface ListenerConfig {
  name: string;
  type: 'mTLS' | 'WireGuard' | 'HTTP' | 'DNS' | 'TCP';
  host: string;
  port: number;
  domain?: string;
  acme?: boolean;
  letsEncrypt?: boolean;
}

export default function ListenerForm({ onSubmit, onCancel }: ListenerFormProps) {
  const [config, setConfig] = useState<ListenerConfig>({
    name: '',
    type: 'mTLS',
    host: '0.0.0.0',
    port: 8888,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config);
  };

  return (
    <div className="card p-6 max-w-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-sliver-text-primary">Create Listener</h2>
        <button onClick={onCancel} className="p-1 text-sliver-text-secondary hover:text-sliver-text-primary">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
            Name
          </label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            className="input w-full"
            placeholder="mtls-listener"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
            Type
          </label>
          <select
            value={config.type}
            onChange={(e) => setConfig({ ...config, type: e.target.value as ListenerConfig['type'] })}
            className="input w-full"
          >
            <option value="mTLS">mTLS</option>
            <option value="WireGuard">WireGuard</option>
            <option value="HTTP">HTTP</option>
            <option value="DNS">DNS</option>
            <option value="TCP">TCP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
            Host
          </label>
          <input
            type="text"
            value={config.host}
            onChange={(e) => setConfig({ ...config, host: e.target.value })}
            className="input w-full"
            placeholder="0.0.0.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
            Port
          </label>
          <input
            type="number"
            value={config.port}
            onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) })}
            className="input w-full"
            min={1}
            max={65535}
          />
        </div>

        {config.type === 'DNS' && (
          <div>
            <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
              Domain
            </label>
            <input
              type="text"
              value={config.domain || ''}
              onChange={(e) => setConfig({ ...config, domain: e.target.value })}
              className="input w-full"
              placeholder="dns.example.com"
            />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary flex-1">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
