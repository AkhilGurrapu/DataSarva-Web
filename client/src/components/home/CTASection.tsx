import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactFormData } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  interest: z.string().min(1, { message: "Please select an area of interest." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

const CTASection = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize form
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      interest: "",
      message: ""
    }
  });

  // Set up mutation for form submission
  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data)
        .then(res => res.json());
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Contact request submitted",
        description: "We'll be in touch with you shortly.",
        variant: "default"
      });
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message || "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-primary to-accent text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Data Strategy?</h2>
            <p className="text-xl opacity-90 mb-8">
              Schedule a consultation with our expert team to discover how we can help you unleash the power of your data.
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-start">
                <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <span>Free initial consultation and assessment</span>
              </li>
              <li className="flex items-start">
                <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <span>Tailored recommendations for your specific challenges</span>
              </li>
              <li className="flex items-start">
                <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <span>Flexible engagement models to fit your needs</span>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 md:pl-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-primary text-2xl font-bold mb-6">Contact Us</h3>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-primary text-5xl mb-4">
                    <Check className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-4">Thank You!</h3>
                  <p className="text-neutral-700 mb-6">Your message has been received. We'll contact you shortly.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@company.com" 
                              type="email"
                              className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">Company</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your company name" 
                              className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">I'm interested in:</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="snowflake">Snowflake Solutions</SelectItem>
                              <SelectItem value="databricks">Databricks Solutions</SelectItem>
                              <SelectItem value="powerbi">Power BI Implementation</SelectItem>
                              <SelectItem value="ai">AI Applications</SelectItem>
                              <SelectItem value="consulting">Consulting Services</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-800 font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project or requirements" 
                              rows={4}
                              className="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-md"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Submitting..." : "Submit Request"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
