import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SliceCard from "@/components/SliceCard";

// Mock data for the gallery
const slices = [
  { id: "001", title: "The Anti-Work Guide", imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop" },
  { id: "002", title: "Midnight Coder", imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop" },
  { id: "003", title: "Urban Escape", imageSrc: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2670&auto=format&fit=crop" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-black/10">
      <Header />

      {/* Magazine Flow Gallery */}
      <section className="flex-grow pt-32 pb-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 w-full">
          {slices.map((slice) => (
            <SliceCard
              key={slice.id}
              id={slice.id}
              title={slice.title}
              imageSrc={slice.imageSrc}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
