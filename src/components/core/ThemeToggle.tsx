import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  currentTheme?: 'sterile' | 'cyberpunk';
  onToggleTheme?: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme = 'cyberpunk',
  onToggleTheme,
}) => {
  const isCyber = currentTheme === 'cyberpunk';

  return (
    <button
      onClick={onToggleTheme}
      className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 ${
        isCyber
          ? 'bg-lab-panel border-neon-cyan/40 text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_12px_rgba(0,255,209,0.3)]'
          : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-white hover:border-slate-400'
      }`}
      title={`Switch to ${isCyber ? 'Sterile Lab Mode' : 'Cyberpunk Night Mode'}`}
    >
      {isCyber ? (
        <>
          <Moon className="w-4 h-4 text-neon-cyan" />
          <span className="text-[10px] font-mono hidden lg:inline">CYBER_MODE</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-500" />
          <span className="text-[10px] font-mono hidden lg:inline text-slate-800">STERILE_LAB</span>
        </>
      )}
    </button>
  );
};
