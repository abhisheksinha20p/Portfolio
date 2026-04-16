import { TerminalSquare } from 'lucide-react';

interface Skill {
  name: string;
  val: number;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

export const SkillsView = () => {
  const skills: SkillCategory[] = [
    { category: "Frontend", items: [{name: "React", val: 95}, {name: "TypeScript", val: 90}, {name: "Tailwind CSS", val: 95}, {name: "React Query", val: 85}] },
    { category: "Backend & APIs", items: [{name: "Node.js/Express", val: 90}, {name: "REST APIs", val: 95}, {name: "GraphQL", val: 80}, {name: "Stripe Integration", val: 85}] },
    { category: "Databases", items: [{name: "MongoDB", val: 90}, {name: "PostgreSQL", val: 75}, {name: "Redis", val: 80}, {name: "Schema Design", val: 85}] },
    { category: "DevOps & Cloud", items: [{name: "Docker", val: 85}, {name: "AWS", val: 70}, {name: "Nginx", val: 80}, {name: "CI/CD", val: 85}] },
    { category: "Security", items: [{name: "JWT Auth", val: 90}, {name: "RBAC", val: 90}, {name: "OAuth", val: 80}, {name: "Data Encryption", val: 85}] },
    { category: "Mobile", items: [{name: "React Native", val: 85}, {name: "Cross-Platform", val: 85}, {name: "Mobile UI", val: 80}] }
  ];

  return (
    <div className="h-full overflow-y-auto p-6 md:p-12 font-mono text-sm bg-[#0D0D14] custom-scrollbar text-[#E2E8F0]">
      <div className="mb-8 flex items-center gap-2 text-[#39FF14]">
        <TerminalSquare size={20} />
        <span className="text-lg">~/user/abhi/skills.sh</span>
      </div>
      <div className="space-y-10 max-w-3xl">
        {skills.map((section, sIdx) => (
          <div key={sIdx} className="animate-fade-in-up" style={{animationDelay: `${sIdx * 0.2}s`}}>
            <div className="text-[#B026FF] mb-4"># {section.category}</div>
            <div className="space-y-4 pl-4 border-l border-white/10">
              {section.items.map((skill, iIdx) => {
                const totalBlocks = 30;
                const filledBlocks = Math.floor((skill.val / 100) * totalBlocks);
                const bar = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);
                return (
                  <div key={iIdx} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#00F0FF]">{skill.name}</span>
                      <span className="text-[#64748B] group-hover:text-[#39FF14] transition-colors">{skill.val}%</span>
                    </div>
                    <div className="text-[#39FF14]/50 group-hover:text-[#39FF14] group-hover:shadow-[0_0_10px_rgba(57,255,20,0.2)] transition-all tracking-widest text-xs hidden sm:block">
                      [{bar}]
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded overflow-hidden sm:hidden mt-2">
                       <div className="h-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" style={{ width: `${skill.val}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
