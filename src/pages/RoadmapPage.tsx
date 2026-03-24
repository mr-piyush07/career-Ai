import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Circle, Lock, BookOpen, Clock, ChevronDown, ChevronUp, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getCareerById, Phase } from "@/data/careers";

const statusIcon = (status: string) => {
  if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-primary" />;
  if (status === "in-progress") return <Circle className="w-5 h-5 text-accent cursor-pointer hover:text-primary transition-colors" />;
  return <Lock className="w-5 h-5 text-muted-foreground/40" />;
};

const phaseStatusBadge = (status: string) => {
  if (status === "completed") return "bg-primary/15 text-primary";
  if (status === "in-progress") return "bg-accent/15 text-accent-foreground";
  return "bg-muted text-muted-foreground";
};

const RoadmapPage = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const career = careerId ? getCareerById(careerId) : null;

  const storageKey = `career_progress_${career?.id}`;
  
  const [completedSkills, setCompletedSkills] = useState<Record<string, boolean>>(() => {
    try {
      if (!career) return {};
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Track expanded phases (all expanded by default initially, or just first one)
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (career && career.roadmap.length > 0 && Object.keys(expandedPhases).length === 0) {
      // Default expand the first phase
      setExpandedPhases({ [career.roadmap[0].id]: true });
    }
  }, [career, expandedPhases]);

  useEffect(() => {
    if (career) {
      localStorage.setItem(storageKey, JSON.stringify(completedSkills));
    }
  }, [completedSkills, career, storageKey]);

  if (!career) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-3xl font-bold mb-4 font-display">Roadmap Not Found</h1>
        <p className="text-muted-foreground mb-6">The career you are looking for doesn't exist.</p>
        <Button asChild><Link to="/explore">Explore Careers</Link></Button>
      </div>
    );
  }

  const toggleSkill = (skillId: string, isLocked: boolean) => {
    if (isLocked) return;
    setCompletedSkills((prev) => ({ ...prev, [skillId]: !prev[skillId] }));
  };

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const checkPhaseComplete = (phase: Phase) => {
    return phase.skills.length > 0 && phase.skills.every(skill => completedSkills[skill.id]);
  };

  const getPhaseStatus = (phaseIndex: number) => {
    if (phaseIndex === 0) {
      return checkPhaseComplete(career.roadmap[0]) ? "completed" : "in-progress";
    }
    const prevPhase = career.roadmap[phaseIndex - 1];
    if (checkPhaseComplete(prevPhase)) {
      return checkPhaseComplete(career.roadmap[phaseIndex]) ? "completed" : "in-progress";
    }
    return "locked";
  };

  const totalSkillsCount = career.roadmap.reduce((acc, phase) => acc + phase.skills.length, 0);
  const completedCount = Object.values(completedSkills).filter(Boolean).length;
  const progressPercent = totalSkillsCount === 0 ? 0 : Math.round((completedCount / totalSkillsCount) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-8 lg:pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm text-primary font-semibold mb-1 uppercase tracking-wider">Your Roadmap</p>
                <h1 className="font-display text-3xl lg:text-5xl font-bold mb-3">{career.name}</h1>
                <p className="text-muted-foreground max-w-2xl">{career.description}</p>
                <div className="mt-4">
                  <Button variant="hero" asChild>
                    <Link to={`/resources/${career.id}`}><FolderOpen className="mr-2 w-4 h-4" /> View Career Resources</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-card border px-6 py-4 rounded-2xl shadow-sm">
                <div className="text-right">
                  <p className="text-3xl font-bold font-display">{progressPercent}%</p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">{completedCount}/{totalSkillsCount} skills</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-muted relative">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="hsl(160 84% 22%)"
                      strokeWidth="3"
                      strokeDasharray={`${progressPercent}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Progress bar */}
          <ScrollReveal delay={80}>
            <div className="w-full h-2.5 bg-muted rounded-full mb-12 overflow-hidden shadow-inner">
              <div className="h-full gradient-bg rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-6">
              {career.roadmap.map((phase, pi) => {
                const phaseStatus = getPhaseStatus(pi);
                const isExpanded = expandedPhases[phase.id];
                const phaseCompletedSkills = phase.skills.filter(s => completedSkills[s.id]).length;

                return (
                  <ScrollReveal key={phase.id} delay={pi * 80}>
                    <div className="relative md:pl-12">
                      {/* Timeline dot */}
                      <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 rounded-full bg-background border-2 border-border items-center justify-center z-10 transition-colors duration-300 shadow-sm">
                        {phaseStatus === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        ) : phaseStatus === "in-progress" ? (
                          <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground/40" />
                        )}
                      </div>

                      <div className={`bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 ${phaseStatus === "locked" ? "opacity-75" : "shadow-sm hover:shadow-md"}`}>
                        <button 
                          className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus-visible:bg-muted/50 transition-colors"
                          onClick={() => togglePhase(phase.id)}
                        >
                          <div className="flex items-center gap-4">
                            <h3 className="font-display text-xl font-bold text-foreground">{phase.title}</h3>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${phaseStatusBadge(phaseStatus)}`}>
                              {phaseStatus.replace("-", " ")}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded-lg hidden sm:block">
                              {phaseCompletedSkills}/{phase.skills.length} skills
                            </span>
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                          </div>
                        </button>
                        
                        {isExpanded && (
                          <div className="divide-y divide-border border-t border-border bg-card/50">
                            {phase.skills.map((skill) => {
                              const isSkillCompleted = !!completedSkills[skill.id];
                              const skillStatus = phaseStatus === "locked" ? "locked" : (isSkillCompleted ? "completed" : "in-progress");
                              
                              return (
                                <div key={skill.id} 
                                  className={`px-6 py-4 flex items-center justify-between gap-4 transition-colors duration-200 ${skillStatus === "locked" ? "bg-muted/30" : "hover:bg-muted/50 cursor-pointer"}`}
                                  onClick={() => toggleSkill(skill.id, skillStatus === "locked")}
                                >
                                  <div className="flex items-center gap-4 min-w-0">
                                    <div className="shrink-0 p-1">
                                      {statusIcon(skillStatus)}
                                    </div>
                                    <div className="min-w-0">
                                      <p className={`font-semibold text-[15px] truncate transition-colors ${isSkillCompleted ? "text-muted-foreground line-through" : "text-foreground"}`}>
                                        {skill.name}
                                      </p>
                                      <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-1.5">
                                        <span className="flex items-center gap-1.5 bg-background shadow-sm border px-2 py-0.5 rounded-md"><Clock className="w-3.5 h-3.5" />{skill.hours}h</span>
                                        <span className="flex items-center gap-1.5 bg-background shadow-sm border px-2 py-0.5 rounded-md"><BookOpen className="w-3.5 h-3.5" />{skill.resourcesCount} resources</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RoadmapPage;
