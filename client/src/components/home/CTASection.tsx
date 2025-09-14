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
import { supabase } from "@/lib/supabaseClient";
import { useMutation } from "@tanstack/react-query";
// Removed CSSMountainEnvironment import for better performance

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

  // Set up mutation for form submission using Supabase Edge Function
  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const { data: result, error } = await supabase.functions.invoke('contact-form', {
        body: data
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to submit contact request');
      }
      
      return result;
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Contact request submitted",
        description: "We'll be in touch with you shortly.",
        variant: "default"
      });
    },
    onError: (error: Error) => {
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
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Simple background dots */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full w-1 h-1"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the DataSarva Community</h2>
            <p className="text-xl opacity-90 mb-8">
              Get exclusive access to our weekly insights, implementation guides, and deep-dive analyses of the modern data stack.
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-start">
                <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-lg">Weekly implementation deep-dives</span>
              </li>
              <li className="flex items-start">
                <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-lg">Exclusive technology analyses</span>
              </li>
              <li className="flex items-start">
                <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-lg">Early access to research insights</span>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 md:pl-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white/20">
              <h3 className="text-white text-2xl font-bold mb-6">Join Our Newsletter</h3>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-cyan-400 text-5xl mb-4">
                    <Check className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                  <p className="text-white/80 mb-6">Your message has been received. We'll contact you shortly.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-white/60"
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
                          <FormLabel className="text-white font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@company.com" 
                              type="email"
                              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-white/60"
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
                          <FormLabel className="text-white font-medium">Company</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your company name" 
                              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-white/60"
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
                          <FormLabel className="text-white font-medium">I'm interested in:</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="snowflake">Snowflake Deep Dives</SelectItem>
                              <SelectItem value="databricks">Databricks Intelligence</SelectItem>
                              <SelectItem value="powerbi">Power BI Mastery</SelectItem>
                              <SelectItem value="modern-stack">Modern Data Stack</SelectItem>
                              <SelectItem value="newsletter">Newsletter Updates</SelectItem>
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
                          <FormLabel className="text-white font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us what data technologies you're most interested in learning about" 
                              rows={4}
                              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-white/60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-md"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Subscribing..." : "Subscribe to Newsletter"}
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
