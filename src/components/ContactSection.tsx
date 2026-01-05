import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Linkedin, MapPin, Send, Loader2 } from "lucide-react";
const ContactSection = () => {
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to send a message.",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        }
      });
      if (error) {
        console.error("Error sending email:", error);
        throw new Error(error.message || "Failed to send message");
      }
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!"
      });
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error sending message",
        description: error.message || "Something went wrong. Please try again or email me directly.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const contactInfo = [{
    icon: Mail,
    label: "Email",
    value: "khennyphresh@gmail.com",
    href: "mailto:khennyphresh@gmail.com"
  }, {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://linkedin.com/in/ekene-okoli-93480816b"
  }, {
    icon: MapPin,
    label: "Location",
    value: "Lagos, Nigeria",
    href: null
  }];
  return <section id="contact" className="py-20 md:py-32 bg-secondary/30 relative">
      <div className="absolute inset-0 data-grid opacity-50 bg-[#f4e0ff]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Let's <span className="gradient-text text-[#895bf5]">Connect</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Looking for a data analyst to help with your next project? 
              I'm always open to discussing new opportunities and collaborations.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
              
              {contactInfo.map((info, index) => <Card key={index} variant="glass" className="group">
                  <CardContent className="p-4">
                    {info.href ? <a href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex items-center gap-4 hover:text-primary transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          <p className="font-medium text-foreground">{info.value}</p>
                        </div>
                      </a> : <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          <p className="font-medium text-foreground">{info.value}</p>
                        </div>
                      </div>}
                  </CardContent>
                </Card>)}

              <div className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Available for freelance projects, full-time positions, and consulting work.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card variant="glow">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Send a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2 text-inherit bg-inherit">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          Your Name
                        </label>
                        <Input id="name" placeholder="John Doe" value={formData.name} onChange={e => setFormData({
                        ...formData,
                        name: e.target.value
                      })} className="bg-secondary border-border focus:border-primary" maxLength={100} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email Address
                        </label>
                        <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({
                        ...formData,
                        email: e.target.value
                      })} className="bg-secondary border-border focus:border-primary" maxLength={255} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Tell me about your project or opportunity..." rows={5} value={formData.message} onChange={e => setFormData({
                      ...formData,
                      message: e.target.value
                    })} className="bg-secondary border-border focus:border-primary resize-none" maxLength={2000} />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                      {isLoading ? <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </> : <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;