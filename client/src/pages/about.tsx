import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About DataSarva</h1>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              We're your premier data insights hub, analyzing and explaining the modern data stack to help you make informed technology decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
              <p className="text-lg text-neutral-700 mb-8">
                To demystify the modern data stack through comprehensive analysis, practical insights, and thought leadership that helps organizations navigate the complex world of data technologies.
              </p>
              <div className="bg-neutral-100 p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2 text-primary">Excellence</h4>
                      <p className="text-neutral-700">
                        We're committed to delivering the highest quality analysis and insights to our community.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2 text-primary">Innovation</h4>
                      <p className="text-neutral-700">
                        We continuously research emerging technologies to provide cutting-edge insights on the evolving data landscape.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold mb-2 text-primary">Integrity</h4>
                      <p className="text-neutral-700">
                        We provide unbiased analysis with transparency and honesty, helping you make informed decisions.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Research Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                    <p className="text-primary font-medium mb-3">Chief Research Officer</p>
                    <p className="text-neutral-700 text-sm">
                      20+ years of experience in enterprise data architecture and analytics research.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-1">Michael Chen</h3>
                    <p className="text-primary font-medium mb-3">Lead Technical Analyst</p>
                    <p className="text-neutral-700 text-sm">
                      PhD in Computer Science with expertise in analyzing ML platforms and distributed systems.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 bg-neutral-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-1">Rebecca Torres</h3>
                    <p className="text-primary font-medium mb-3">Head of Industry Analysis</p>
                    <p className="text-neutral-700 text-sm">
                      Former top consultant with 15+ years experience analyzing data strategy and digital transformation trends.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Research Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-100 p-8 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Technology-First Analysis</h3>
                  <p className="text-neutral-700 mb-4">
                    We start with deep technical analysis of each technology, then explore real-world use cases and implementation patterns.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</div>
                      <span>Technical architecture analysis</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</div>
                      <span>Performance benchmarking</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</div>
                      <span>Use case identification</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</div>
                      <span>Best practice documentation</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-neutral-100 p-8 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Continuous Research</h3>
                  <p className="text-neutral-700 mb-4">
                    We continuously monitor the data technology landscape to provide the most current insights and trend analysis.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">1</div>
                      <span>Market trend monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">2</div>
                      <span>Weekly technology updates</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">3</div>
                      <span>Community feedback integration</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">4</div>
                      <span>Predictive analysis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
