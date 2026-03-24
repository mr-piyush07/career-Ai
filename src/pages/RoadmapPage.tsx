import { CheckCircle2, Circle, Lock, BookOpen, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const roadmapData = {
  career: "Full-Stack Developer",
  totalSkills: 12,
  completed: 4,
  phases: [
    {
      title: "Foundation",
      status: "completed" as const,
      skills: [
        { name: "HTML & CSS", status: "completed" as const, hours: 40, resources: 5 },
        { name: "JavaScript Fundamentals", status: "completed" as const, hours: 60, resources: 8 },
      ],
    },
    {
      title: "Frontend Development",
      status: "in-progress" as const,
      skills: [
        { name: "React.js", status: "completed" as const, hours: 50, resources: 7 },
        { name: "TypeScript", status: "completed" as const, hours: 35, resources: 4 },
        { name: "State Management", status: "in-progress" as const, hours: 20, resources: 3 },
        { name: "Testing & TDD", status: "locked" as const, hours: 25, resources: 4 },
      ],
    },
    {
      title: "Backend Development",
      status: "locked" as const,
      skills: [
        { name: "Node.js & Express", status: "locked" as const, hours: 45, resources: 6 },
        { name: "Databases (SQL & NoSQL)", status: "locked" as const, hours: 40, resources: 5 },
        { name: "REST APIs & GraphQL", status: "locked" as const, hours: 30, resources: 4 },
      ],
    },
    {
      title: "DevOps & Deployment",
      status: "locked" as const,
      skills: [
        { name: "Git & CI/CD", status: "locked" as const, hours: 20, resources: 3 },
        { name: "Docker & Cloud", status: "locked" as const, hours: 35, resources: 5 },
        { name: "System Design", status: "locked" as const, hours: 30, resources: 4 },
      ],
    },
  ],
};

const statusIcon = (status: string) => {
  if (status === "completed") return <CheckCircle2 className="w-5 h-5 text-primary" />;
  if (status === "in-progress") return <Circle className="w-5 h-5 text-accent" />;
  return <Lock className="w-5 h-5 text-muted-foreground/40" />;
};

const phaseStatusBadge = (status: string) => {
  if (status === "completed") return "bg-primary/15 text-primary";
  if (status === "in-progress") return "bg-accent/15 text-accent-foreground";
  return "bg-muted text-muted-foreground";
};

const RoadmapPage = () => {
  const progress = Math.round((roadmapData.completed / roadmapData.totalSkills) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-8 lg:pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Roadmap</p>
                <h1 className="font-display text-3xl lg:text-4xl font-bold">{roadmapData.career}</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold font-display">{progress}%</p>
                  <p className="text-xs text-muted-foreground">{roadmapData.completed}/{roadmapData.totalSkills} skills</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-muted relative">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="hsl(160 84% 22%)"
                      strokeWidth="3"
                      strokeDasharray={`${progress}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Progress bar */}
          <ScrollReveal delay={80}>
            <div className="w-full h-2 bg-muted rounded-full mb-12 overflow-hidden">
              <div className="h-full gradient-bg rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-8">
              {roadmapData.phases.map((phase, pi) => (
                <ScrollReveal key={phase.title} delay={pi * 100}>
                  <div className="relative md:pl-12">
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 rounded-full bg-card border-2 border-border items-center justify-center z-10">
                      {phase.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : phase.status === "in-progress" ? (
                        <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
                      ) : (
                        <Lock className="w-4 h-4 text-muted-foreground/40" />
                      )}
                    </div>

                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-lg font-semibold">{phase.title}</h3>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${phaseStatusBadge(phase.status)}`}>
                            {phase.status.replace("-", " ")}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {phase.skills.filter(s => s.status === "completed").length}/{phase.skills.length} skills
                        </span>
                      </div>
                      <div className="divide-y divide-border">
                        {phase.skills.map((skill) => (
                          <div key={skill.name} className={`px-6 py-4 flex items-center justify-between gap-4 ${skill.status === "locked" ? "opacity-50" : ""}`}>
                            <div className="flex items-center gap-3 min-w-0">
                              {statusIcon(skill.status)}
                              <div className="min-w-0">
                                <p className="font-medium text-sm truncate">{skill.name}</p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{skill.hours}h</span>
                                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{skill.resources} resources</span>
                                </div>
                              </div>
                            </div>
                            {skill.status !== "locked" && (
                              <Button variant="ghost" size="sm" className="shrink-0">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RoadmapPage;
