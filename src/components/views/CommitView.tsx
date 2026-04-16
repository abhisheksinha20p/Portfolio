import { TIMELINE, type TimelineItem } from '../../data/portfolio';

const BRANCH_COLORS: Record<string, { color: string; dim: string }> = {
  'main': { color: '#378ADD', dim: 'rgba(55,138,221,0.1)' },
  'feature/vera-core': { color: '#1D9E75', dim: 'rgba(29,158,117,0.1)' },
};

interface CommitViewProps {
  hash: string;
}

export const CommitView = ({ hash }: CommitViewProps) => {
  const item: TimelineItem | undefined = TIMELINE.find(t => t.hash === hash);
  
  if (!item) {
    return (
      <div className="flex items-center justify-center h-full font-mono text-[#64748B]">
        <p>// commit not found: <span className="text-[#00F0FF]">{hash}</span></p>
      </div>
    );
  }

  const branchKey = item.branch || 'main';
  const bStyle = BRANCH_COLORS[branchKey] || { color: '#64748B', dim: 'rgba(100,116,139,0.1)' };
  const isFeature = branchKey !== 'main';

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-8 font-mono">
      {/* File header comment */}
      <div className="text-[#64748B] text-sm mb-6">
        {'/** @commit '}
        <span className="text-[#00F0FF]">{item.hash}</span>
        {' → '}
        <span style={{ color: bStyle.color }}>{branchKey}</span>
        {' */'}
      </div>

      {/* Commit card */}
      <div
        className="rounded-xl border p-6 mb-8 relative overflow-hidden"
        style={{ borderColor: `${bStyle.color}30`, backgroundColor: bStyle.dim }}
      >
        {/* Glow accent */}
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
          style={{ backgroundColor: bStyle.color }}
        />

        {/* Date + hash */}
        <div className="flex items-center gap-3 mb-3 pl-4">
          <span className="text-[11px] text-[#64748B]">{item.date}</span>
          <span
            className="text-[10px] px-2 py-0.5 rounded border font-mono"
            style={{ color: bStyle.color, borderColor: `${bStyle.color}40`, backgroundColor: `${bStyle.color}15` }}
          >
            {item.hash}
          </span>
          {isFeature && (
            <span
              className="text-[10px] px-2 py-0.5 rounded border font-mono"
              style={{ color: bStyle.color, borderColor: `${bStyle.color}40`, backgroundColor: `${bStyle.color}10` }}
            >
              ⎇ {branchKey}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-white text-lg font-bold leading-snug mb-2 pl-4">
          {item.title}
        </h1>

        {/* Description */}
        <p className="text-[#94A3B8] text-[13px] leading-relaxed pl-4">
          {item.desc}
        </p>
      </div>

      {/* Execution log */}
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[10px] text-[#00F0FF] font-mono uppercase tracking-widest opacity-70">// execution_log.md</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <div className="space-y-3">
        {item.details?.map((detail, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02] group hover:bg-white/[0.04] hover:border-white/10 transition-colors"
          >
            <span className="text-[#39FF14] opacity-60 font-mono text-sm mt-0.5 shrink-0">→</span>
            <p className="text-[#CBD5E1] text-[12px] leading-relaxed">{detail}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#475569]">
        <span>authored by <span className="text-[#64748B]">@abhisinha</span></span>
        <span className="text-[#39FF14] opacity-50">status: Verified ✓</span>
      </div>
    </div>
  );
};
