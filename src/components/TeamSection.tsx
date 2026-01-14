
import { TeamMember } from '@/types';

interface TeamSectionProps {
    team: TeamMember[];
}

export default function TeamSection({ team }: TeamSectionProps) {
    if (!team || team.length === 0) return null;

    return (
        <div className="flex items-center gap-3 bg-zinc-900/40 px-3 py-1.5 rounded-full border border-zinc-800/60 backdrop-blur-sm">
            <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Assigned Team</span>
            <div className="flex -space-x-2.5">
                {team.map((member, i) => (
                    <div key={i} className="relative group">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-zinc-950 transition-transform hover:z-10 hover:scale-110 ${member.type === 'ai'
                            ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-300 ring-offset-0'
                            : 'bg-zinc-800 text-zinc-300'
                            }`}>
                            {member.name.charAt(0)}
                        </div>

                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-all duration-200 z-20 flex flex-col gap-0.5">
                            <span className="font-semibold block">{member.name}</span>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wide font-medium">{member.role}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
