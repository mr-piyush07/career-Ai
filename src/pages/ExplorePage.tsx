import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Briefcase, Code, Palette, LineChart, Stethoscope, GraduationCap, Film, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const categories = [
  { label: "All", value: "all" },
  { label: "Technology", value: "tech" },
  { label: "Business", value: "business" },
  { label: "Design", value: "design" },
  { label: "Healthcare", value: "health" },
  { label: "Education", value: "education" },
  { label: "Creative", value: "creative" },
];

const careers = [
  { id: "fullstack", title: "Full-Stack Developer", category: "tech", icon: Code, demand: "Very High", skills: 12, avgSalary: "$105k", growth: "+25%", description: "Build complete web applications from frontend to backend." },
  { id: "data-scientist", title: "Data Scientist", category: "tech", icon: LineChart, demand: "High", skills: 15, avgSalary: "$120k", growth: "+35%", description: "Extract insights from complex datasets using ML and statistics." },
  { id: "frontend", title: "Frontend Developer", category: "tech", icon: Palette, demand: "High", skills: 10, avgSalary: "$95k", growth: "+18%", description: "Create intuitive digital experiences that delight users." },
  { id: "backend", title: "Backend Developer", category: "tech", icon: Code, demand: "Very High", skills: 14, avgSalary: "$115k", growth: "+28%", description: "Architect secure, scalable, and high-performance server systems." },
  { id: "product-manager", title: "Product Manager", category: "business", icon: Briefcase, demand: "High", skills: 11, avgSalary: "$130k", growth: "+22%", description: "Lead product strategy from concept to market launch." },
  { id: "health-analyst", title: "Healthcare Analyst", category: "health", icon: Stethoscope, demand: "Moderate", skills: 9, avgSalary: "$85k", growth: "+15%", description: "Improve healthcare outcomes through data-driven insights." },
  { id: "edtech", title: "EdTech Specialist", category: "education", icon: GraduationCap, demand: "Moderate", skills: 8, avgSalary: "$78k", growth: "+20%", description: "Shape the future of learning with technology and pedagogy." },
  { id: "motion-designer", title: "Motion Designer", category: "creative", icon: Film, demand: "Moderate", skills: 10, avgSalary: "$88k", growth: "+16%", description: "Bring stories to life through animation and visual effects." },
  { id: "marketing", title: "Marketing Strategist", category: "business", icon: LineChart, demand: "High", skills: 11, avgSalary: "$92k", growth: "+12%", description: "Drive growth through data-informed marketing campaigns." },
];

const demandColor = (d: string) => {
  if (d === "Very High") return "bg-primary/15 text-primary";
  if (d === "High") return "bg-accent/15 text-accent-foreground";
  return "bg-muted text-muted-foreground";
};

const ExplorePage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = careers.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || c.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h1 className="font-display text-3xl lg:text-5xl font-bold mb-3">Explore Careers</h1>
            <p className="text-muted-foreground text-lg max-w-xl mb-8">
              Discover professions aligned with your interests, skills, and the market demand.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="relative max-w-xl mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search careers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((career, i) => (
              <ScrollReveal key={career.id} delay={i * 60} direction="scale">
                <div className="group bg-card border border-border rounded-2xl p-6 card-hover h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <career.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${demandColor(career.demand)}`}>
                      {career.demand} Demand
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-1.5">{career.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{career.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span>{career.skills} skills</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{career.avgSalary} avg</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-primary font-medium">{career.growth}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full group/btn" asChild>
                    <Link to={`/roadmap/${career.id}`}>
                      View Roadmap <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No careers match your search. Try different keywords.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ExplorePage;
