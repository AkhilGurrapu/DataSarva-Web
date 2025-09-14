import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/lib/types";
import { useMobile } from "@/hooks/use-mobile";

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "The DataSarva team transformed how we use data. Their Snowflake implementation and custom dashboards gave us insights we never had before, directly impacting our bottom line.",
    author: "Sarah Johnson",
    position: "CIO",
    company: "Global Financial Services",
    rating: 5
  },
  {
    id: "2",
    quote: "Working with DataSarva on our AI implementation was a game-changer. Their expertise in machine learning and business process optimization delivered results that exceeded our expectations.",
    author: "Michael Chen",
    position: "VP of Analytics",
    company: "Healthcare Solutions",
    rating: 5
  },
  {
    id: "3",
    quote: "The DataSarva team provided expert guidance on our data strategy and architecture. Their ability to translate complex technical concepts into business value made all the difference.",
    author: "Rebecca Torres",
    position: "Director of Data",
    company: "Retail Innovations",
    rating: 4.5
  },
  {
    id: "4",
    quote: "Their data engineering expertise helped us build a scalable foundation for our analytics. We've seen a dramatic improvement in our ability to make data-driven decisions.",
    author: "James Wilson",
    position: "Head of Business Intelligence",
    company: "Manufacturing Technologies",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const isMobile = useMobile();
  
  // Determine slides to show based on screen size
  const getSlidesToShow = () => {
    if (isMobile) return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  
  // Update slides to show on window resize
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);
  
  const nextSlide = () => {
    if (slideIndex < testimonials.length - slidesToShow) {
      setSlideIndex(slideIndex + 1);
    }
  };
  
  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-primary text-primary h-5 w-5" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-primary h-5 w-5" />
          <Star className="absolute top-0 left-0 fill-primary text-primary h-5 w-5 overflow-hidden" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-primary h-5 w-5" />);
    }
    
    return stars;
  };

  return (
    <section className="py-20 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Hear from the organizations we've helped transform through data and AI.
          </p>
        </div>

        <div className="relative">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500"
              style={{ 
                transform: `translateX(-${slideIndex * (100 / slidesToShow)}%)`,
                width: `${(testimonials.length / slidesToShow) * 100}%`
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="px-4"
                  style={{ width: `${100 / testimonials.length * slidesToShow}%` }}
                >
                  <Card className="h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="text-primary flex">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                      <blockquote className="mb-6 text-neutral-700 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center mr-4">
                          <User className="h-6 w-6 text-neutral-700" />
                        </div>
                        <div>
                          <div className="font-bold">{testimonial.author}</div>
                          <div className="text-sm text-neutral-700">{testimonial.position}, {testimonial.company}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={slideIndex === 0}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary/10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={slideIndex >= testimonials.length - slidesToShow}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary/10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
