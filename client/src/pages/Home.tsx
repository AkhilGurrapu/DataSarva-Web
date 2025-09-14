import HeroSection from "@/components/home/HeroSection";
import { ContentSections } from "@/components/home/ContentSections";
import ClientsSection from "@/components/home/ClientsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ResourcesSection from "@/components/home/ResourcesSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import CTASection from "@/components/home/CTASection";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ContentSections />
        <ClientsSection />
        <ServicesSection />
        <ResourcesSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
