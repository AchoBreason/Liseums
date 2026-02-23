import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Exhibit from "@/components/Exhibit";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-black/10">
      <Header />
      <Hero />
      <About />
      <Exhibit />
      <div className="flex-grow"></div>
      <Footer />
    </main>
  );
}
