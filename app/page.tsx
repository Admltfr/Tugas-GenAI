import {
  HeroSection,
  TemplatesSection,
  FeaturesSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <TemplatesSection />
      <FeaturesSection />
    </main>
  );
}
