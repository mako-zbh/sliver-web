import { useState } from 'react';
import { Download, FileCode, Loader } from 'lucide-react';
import type { ImplantConfig } from '@/types';

interface GenerateFormProps {
  onGenerate: (config: ImplantConfig) => Promise<void>;
}

export default function GenerateForm({ onGenerate }: GenerateFormProps) {
  const [config, setConfig] = useState<ImplantConfig>({
    name: '',
    type: 'exe',
    os: 'windows',
    arch: 'x64',
    transport: 'mTLS',
    obfs: false,
    debug: false,
    runOnExit: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.name) return;
    
    setIsGenerating(true);
    try {
      await onGenerate(config);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
            Implant Name
          </label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            className="input w-full"
            placeholder="my-implant"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
            Operating System
          </label>
          <select
            value={config.os}
            onChange={(e) => setConfig({ ...config, os: e.target.value as ImplantConfig['os'] })}
            className="input w-full"
          >
            <option value="windows">Windows</option>
            <option value="linux">Linux</option>
            <option value="macos">macOS</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
            Architecture
          </label>
          <select
            value={config.arch}
            onChange={(e) => setConfig({ ...config, arch: e.target.value as ImplantConfig['arch'] })}
            className="input w-full"
          >
            <option value="x64">x64</option>
            <option value="x86">x86</option>
            <option value="ARM">ARM</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
            Implant Type
          </label>
          <select
            value={config.type}
            onChange={(e) => setConfig({ ...config, type: e.target.value as ImplantConfig['type'] })}
            className="input w-full"
          >
            <option value="exe">Executable</option>
            <option value="shellcode">Shellcode</option>
            <option value="dll">DLL</option>
            <option value="service">Service</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-sliver-text-secondary mb-2">
            Transport
          </label>
          <select
            value={config.transport}
            onChange={(e) => setConfig({ ...config, transport: e.target.value as ImplantConfig['transport'] })}
            className="input w-full"
          >
            <option value="mTLS">mTLS</option>
            <option value="WireGuard">WireGuard</option>
            <option value="HTTP">HTTP</option>
            <option value="DNS">DNS</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={config.obfs}
            onChange={(e) => setConfig({ ...config, obfs: e.target.checked })}
            className="w-4 h-4 rounded border-sliver-border bg-sliver-bg-primary"
          />
          <span className="text-sm">Obfuscate</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={config.debug}
            onChange={(e) => setConfig({ ...config, debug: e.target.checked })}
            className="w-4 h-4 rounded border-sliver-border bg-sliver-bg-primary"
          />
          <span className="text-sm">Debug</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={config.runOnExit}
            onChange={(e) => setConfig({ ...config, runOnExit: e.target.checked })}
            className="w-4 h-4 rounded border-sliver-border bg-sliver-bg-primary"
          />
          <span className="text-sm">Run on Exit</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isGenerating || !config.name}
          className="btn btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download size={16} />
              Generate
            </>
          )}
        </button>
        <button
          type="button"
          disabled={isGenerating || !config.name}
          className="btn btn-secondary flex items-center justify-center gap-2"
        >
          <FileCode size={16} />
          Generate Stage
        </button>
      </div>
    </form>
  );
}
