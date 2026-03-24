import { useParams, Link } from "react-router-dom";
import { getCareerById } from "@/data/careers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

const ResourcesPage = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const career = careerId ? getCareerById(careerId) : null;

  if (!career) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-3xl font-bold mb-4">Career Not Found</h1>
        <Button asChild><Link to="/explore">Explore Careers</Link></Button>
      </div>
    );
  }

  const freeResources = career.resources.filter(r => r.type === "free");
  const paidResources = career.resources.filter(r => r.type === "paid");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1">
        <section className="pt-24 pb-8 lg:pt-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <Button variant="ghost" asChild className="mb-4 -ml-4">
                <Link to={`/roadmap/${career.id}`}><ArrowLeft className="w-4 h-4 mr-2" /> Back to Roadmap</Link>
              </Button>
              <h1 className="font-display text-4xl font-bold">{career.name} Resources</h1>
              <p className="text-muted-foreground mt-2">Curated learning materials to master this career path.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">Free Resources</h2>
                <div className="space-y-4">
                  {freeResources.length ? freeResources.map(r => (
                    <div key={r.id} className="p-5 bg-card border border-border rounded-xl">
                      <h3 className="font-semibold text-lg">{r.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 mb-4">{r.description}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="bg-primary/15 text-primary font-medium px-2.5 py-1 rounded-full">{r.duration}</span>
                        <Button variant="outline" size="sm" asChild>
                          <a href={r.link} target="_blank" rel="noreferrer">Visit <ExternalLink className="w-3 h-3 ml-2" /></a>
                        </Button>
                      </div>
                    </div>
                  )) : <p className="text-muted-foreground text-sm">No free resources listed.</p>}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">Paid Resources</h2>
                <div className="space-y-4">
                  {paidResources.length ? paidResources.map(r => (
                    <div key={r.id} className="p-5 bg-card border border-border rounded-xl">
                      <h3 className="font-semibold text-lg">{r.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2 mb-4">{r.description}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="bg-accent/15 text-accent-foreground font-medium px-2.5 py-1 rounded-full">{r.duration}</span>
                        <Button variant="outline" size="sm" asChild>
                          <a href={r.link} target="_blank" rel="noreferrer">Visit <ExternalLink className="w-3 h-3 ml-2" /></a>
                        </Button>
                      </div>
                    </div>
                  )) : <p className="text-muted-foreground text-sm">No paid resources listed.</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
