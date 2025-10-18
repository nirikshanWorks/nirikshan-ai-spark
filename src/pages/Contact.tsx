import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "United Arab Emirates",
  "Germany",
  "France",
  "Saudi Arabia",
  "Other",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    city: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteKey) {
      toast.error("reCAPTCHA is not configured. Please contact the site administrator.");
      return;
    }
    if (!formData.country) {
      toast.error("Please select your country.");
      return;
    }
    if (!formData.city.trim()) {
      toast.error("Please share your city.");
      return;
    }
    if (!recaptchaToken) {
      toast.error("Please verify you are human before submitting.");
      return;
    }
    setIsSubmitting(true);

    // TODO: Replace this delay with an API call that passes recaptchaToken to your backend for verification.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", company: "", phone: "", country: "", city: "", message: "" });
    recaptchaRef.current?.reset();
    setRecaptchaToken(null);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with AI and technology solutions
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-10 card-hover border-2 border-border hover:border-primary/30 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-gradient">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="transition-all focus:ring-2 focus:ring-primary hover:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9410 992204"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Bengaluru"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project or inquiry..."
                      rows={6}
                    />
                  </div>
                  <div className="flex justify-center">
                    {siteKey ? (
                      <ReCAPTCHA
                        ref={(instance) => {
                          recaptchaRef.current = instance;
                        }}
                        sitekey={siteKey}
                        onChange={(token) => setRecaptchaToken(token)}
                        onExpired={() => setRecaptchaToken(null)}
                      />
                    ) : (
                      <p className="text-sm text-destructive">
                        reCAPTCHA key missing. Add VITE_RECAPTCHA_SITE_KEY to your environment.
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-primary text-white font-semibold text-lg hover:shadow-2xl"
                    disabled={isSubmitting || !recaptchaToken}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className={`ml-2 ${isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 transition-transform"}`} size={18} />
                  </Button>
                </form>
              </div>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-50" />
                <div className="relative">
                  <h2 className="text-3xl font-bold mb-8 text-gradient">Contact Information</h2>
                  <div className="space-y-6">
                  <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-lg hover:bg-secondary/50 transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Mail className="text-white" size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-lg">Email</h3>
                      <a href="mailto:ai.nirikshan@gmail.com" className="text-muted-foreground hover:text-primary transition-colors block group-hover:translate-x-1 transition-transform duration-300">
                        ai.nirikshan@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-lg hover:bg-secondary/50 transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Phone className="text-white" size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-lg">Phone</h3>
                      <a href="tel:+919410992204" className="text-muted-foreground hover:text-primary transition-colors block group-hover:translate-x-1 transition-transform duration-300">
                        +91 9410 992204
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">Mon-Fri, 9AM-6PM IST</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-lg hover:bg-secondary/50 transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="text-white" size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-lg">Office</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Nirikshan AI Pvt. Ltd.<br />
                        Noida, Uttar Pradesh, India<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <Card className="p-8 bg-secondary/30 border-2 border-border hover:border-primary/30 transition-all duration-300 card-hover">
                <h3 className="font-bold mb-4 text-lg">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 card-hover">
                <h3 className="font-bold mb-3 text-lg">Looking for Support?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Existing clients can reach our support team at <a href="mailto:ai.nirikshan@gmail.com" className="text-primary hover:text-accent transition-colors font-semibold">ai.nirikshan@gmail.com</a> for 
                  technical assistance and inquiries.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
