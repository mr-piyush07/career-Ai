import { BarChart3, CheckCircle2, Clock, Target, TrendingUp, BookOpen, Calendar, ArrowUpRight, Flame } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const summaryCards = [
  { label: "Skills Completed", value: "4", change: "+2 this week", icon: CheckCircle2, trend: "up" },
  { label: "Hours Invested", value: "127", change: "+14h this week", icon: Clock, trend: "up" },
  { label: "Current Streak", value: "12 days", change: "Best: 18 days", icon: Flame, trend: "neutral" },
  { label: "Overall Progress", value: "33%", change: "Full-Stack Dev", icon: Target, trend: "up" },
];

const weeklyActivity = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 0.5 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 4.1 },
  { day: "Sun", hours: 1.5 },
];
const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

const recentTasks = [
  { title: "Complete React Hooks module", status: "done", time: "2h 15m" },
  { title: "Practice TypeScript generics", status: "done", time: "1h 30m" },
  { title: "Build a CRUD app with state management", status: "in-progress", time: "Est. 3h" },
  { title: "Read Redux Toolkit docs", status: "todo", time: "Est. 45m" },
  { title: "State management quiz", status: "todo", time: "Est. 20m" },
];

const upcomingSkills = [
  { name: "State Management", progress: 60 },
  { name: "Testing & TDD", progress: 0 },
  { name: "Node.js & Express", progress: 0 },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-6 lg:pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Welcome back</p>
                <h1 className="font-display text-3xl lg:text-4xl font-bold">Your Dashboard</h1>
              </div>
              <Button variant="hero" size="sm" asChild>
                <Link to="/roadmap">Continue Learning <ArrowUpRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card, i) => (
              <ScrollReveal key={card.label} delay={i * 60} direction="scale">
                <div className="bg-card border border-border rounded-2xl p-5 card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <card.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    {card.trend === "up" && <TrendingUp className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="font-display text-2xl font-bold">{card.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{card.change}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{card.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Weekly Activity Chart */}
            <ScrollReveal delay={100} className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold">Weekly Activity</h3>
                    <p className="text-xs text-muted-foreground">Hours spent learning this week</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">15.6h total</span>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-3 h-40">
                  {weeklyActivity.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative rounded-lg overflow-hidden bg-muted" style={{ height: "128px" }}>
                        <div
                          className="absolute bottom-0 left-0 right-0 gradient-bg rounded-lg transition-all duration-500"
                          style={{ height: `${(d.hours / maxHours) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Upcoming Skills */}
            <ScrollReveal delay={160}>
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg font-semibold">Skill Progress</h3>
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-5">
                  {upcomingSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-bg rounded-full transition-all duration-700"
                          style={{ width: `${Math.max(skill.progress, 2)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Tasks */}
          <ScrollReveal delay={200}>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg font-semibold">Learning Tasks</h3>
                  <p className="text-xs text-muted-foreground">Your current to-do list</p>
                </div>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="divide-y divide-border">
                {recentTasks.map((task) => (
                  <div key={task.title} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${
                        task.status === "done" ? "bg-primary" : task.status === "in-progress" ? "bg-accent" : "bg-muted-foreground/30"
                      }`} />
                      <span className={`text-sm truncate ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">{task.time}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        task.status === "done" ? "bg-primary/10 text-primary" :
                        task.status === "in-progress" ? "bg-accent/15 text-accent-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {task.status === "in-progress" ? "In Progress" : task.status === "done" ? "Done" : "To Do"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DashboardPage;
