import HeroSection from "@/components/home/HeroSection";
import ClientsSection from "@/components/home/ClientsSection";
import ProductsSection from "@/components/home/ProductsSection";
import ServicesSection from "@/components/home/ServicesSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
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
        <ClientsSection />
        <ServicesSection />
        <ResourcesSection />
        <ProductsSection />
        <CaseStudiesSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
