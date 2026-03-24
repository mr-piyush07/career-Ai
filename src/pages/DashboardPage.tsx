import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { CheckCircle2, Circle, Clock, Target, TrendingUp, BookOpen, Calendar, ArrowUpRight, Flame, Plus, Trash2, Loader2, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
}

const weeklyActivity = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 0.5 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 4.1 },
  { day: "Sun", hours: 1.5 },
];
const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

const DashboardPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [streak, setStreak] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Load Tasks and Streak
  useEffect(() => {
    // Streak Logic
    const lastLoginStr = localStorage.getItem("lastLoginDate");
    const currentStreakStr = localStorage.getItem("activeStreak");
    const currentStreak = currentStreakStr ? parseInt(currentStreakStr, 10) : 0;
    const today = new Date().toDateString();

    if (lastLoginStr !== today) {
      if (lastLoginStr) {
        const lastLogin = new Date(lastLoginStr);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastLogin.toDateString() === yesterday.toDateString()) {
          const newStreak = currentStreak + 1;
          localStorage.setItem("activeStreak", newStreak.toString());
          setStreak(newStreak);
        } else {
          localStorage.setItem("activeStreak", "1");
          setStreak(1);
        }
      } else {
        localStorage.setItem("activeStreak", "1");
        setStreak(1);
      }
      localStorage.setItem("lastLoginDate", today);
    } else {
      setStreak(currentStreak);
    }

    // Load Tasks
    const storedTasks = localStorage.getItem("user_tasks");
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error("Failed to parse tasks");
      }
    } else {
      // Default tasks
      const defaultTasks: Task[] = [
        { id: "1", title: "Complete React module", status: "done", createdAt: new Date().toISOString() },
        { id: "2", title: "Practice TypeScript generics", status: "in-progress", createdAt: new Date().toISOString() },
        { id: "3", title: "Read Redux Toolkit docs", status: "todo", createdAt: new Date().toISOString() },
      ];
      setTasks(defaultTasks);
      localStorage.setItem("user_tasks", JSON.stringify(defaultTasks));
    }
  }, []);

  // Save Tasks on change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("user_tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      status: "todo",
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
  };

  const toggleTaskStatus = (id: string, currentStatus: string) => {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        const newStatus = currentStatus === "todo" ? "in-progress" : currentStatus === "in-progress" ? "done" : "todo";
        return { ...task, status: newStatus as Task["status"] };
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const tasksCompleted = tasks.filter((t) => t.status === "done").length;
  const overallProgress = tasks.length ? Math.round((tasksCompleted / tasks.length) * 100) : 0;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Navbar />
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading Profile...</p>
      </div>
    );
  }

  const firstName = isSignedIn ? user.firstName : "Guest";
  const email = isSignedIn ? user.emailAddresses[0]?.emailAddress : "Sign in to sync your progress";
  const profileImageUrl = isSignedIn ? user.imageUrl : "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-6 lg:pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 bg-card border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-6">
                <img src={profileImageUrl} alt="Profile" className="w-20 h-20 rounded-full border-4 border-background shadow-md bg-muted" />
                <div>
                  <p className="text-sm text-primary font-semibold mb-1 tracking-wider uppercase">Welcome back</p>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold">{firstName}</h1>
                  <p className="text-muted-foreground mt-1">{email}</p>
                </div>
              </div>
              <Button variant="hero" size="sm" asChild className="shrink-0">
                <Link to="/explore">Explore Careers <ArrowUpRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ScrollReveal delay={0} direction="scale">
              <div className="bg-card border border-border rounded-2xl p-5 card-hover shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
                  </div>
                </div>
                <p className="font-display text-2xl font-bold">{tasksCompleted}</p>
                <p className="text-xs text-muted-foreground/80 mt-1 uppercase tracking-wider font-semibold">Tasks Completed</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={60} direction="scale">
              <div className="bg-card border border-border rounded-2xl p-5 card-hover shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold">15h</p>
                <p className="text-xs text-muted-foreground/80 mt-1 uppercase tracking-wider font-semibold">Hours Invested</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120} direction="scale">
              <div className="bg-card border border-border rounded-2xl p-5 card-hover shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Flame className="w-4.5 h-4.5 text-orange-500" />
                  </div>
                </div>
                <p className="font-display text-2xl font-bold">{streak} {streak === 1 ? 'day' : 'days'}</p>
                <p className="text-xs text-muted-foreground/80 mt-1 uppercase tracking-wider font-semibold">Current Streak</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180} direction="scale">
              <div className="bg-card border border-border rounded-2xl p-5 card-hover shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold">{overallProgress}%</p>
                <p className="text-xs text-muted-foreground/80 mt-1 uppercase tracking-wider font-semibold">Task Progress</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Weekly Activity Chart */}
            <ScrollReveal delay={100} className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold">Weekly Activity</h3>
                    <p className="text-xs text-muted-foreground">Hours spent learning this week</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground font-medium">15.6h total</span>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-3 h-40">
                  {weeklyActivity.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full relative rounded-lg overflow-hidden bg-muted" style={{ height: "128px" }}>
                        <div
                          className="absolute bottom-0 left-0 right-0 gradient-bg rounded-lg transition-all duration-500 opacity-80 group-hover:opacity-100"
                          style={{ height: `${(d.hours / maxHours) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Smart Tasks */}
            <ScrollReveal delay={200} className="lg:row-span-2">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold">Today's Tasks</h3>
                    <p className="text-xs text-muted-foreground">Manage your daily goals</p>
                  </div>
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                
                <form onSubmit={addTask} className="mb-4 flex gap-2">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-3 py-2 text-sm bg-transparent border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button type="submit" size="sm" variant="hero" className="shrink-0"><Plus className="w-4 h-4" /></Button>
                </form>

                <div className="divide-y divide-border flex-1 overflow-y-auto pr-2 -mr-2">
                  {tasks.length === 0 ? (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      No tasks yet. Add one above!
                    </div>
                  ) : (
                    tasks.map((task) => (
                      <div key={task.id} className="py-3 flex items-center justify-between gap-3 group">
                        <div 
                          className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                          onClick={() => toggleTaskStatus(task.id, task.status)}
                        >
                          <button className="shrink-0 focus:outline-none">
                            {task.status === "done" ? (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            ) : task.status === "in-progress" ? (
                              <Circle className="w-5 h-5 text-accent fill-accent/20" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground/40" />
                            )}
                          </button>
                          <span className={`text-sm truncate transition-all ${task.status === "done" ? "line-through text-muted-foreground" : "font-medium"}`}>
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            task.status === "done" ? "bg-primary/10 text-primary" :
                            task.status === "in-progress" ? "bg-accent/15 text-accent-foreground" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {task.status.replace("-", " ")}
                          </span>
                          <button 
                            onClick={() => deleteTask(task.id)}
                            className="text-muted-foreground/40 hover:text-destructive opacity-0 group-hover:opacity-100 transition-all focus:outline-none"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DashboardPage;
