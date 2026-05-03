import { useState } from "react";
import {
  Stethoscope,
  Sparkles,
  Smile,
  Baby,
  Award,
  Wallet,
  Cpu,
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/Reveal";
import { toast } from "sonner";
import dentistHero from "@/assets/dentist-hero.jpg";
import { json } from "stream/consumers";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Us" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    desc: "Routine checkups, cleanings and preventive care to keep your smile healthy.",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    desc: "Whitening, veneers and smile makeovers tailored just for you.",
  },
  {
    icon: Smile,
    title: "Orthodontics",
    desc: "Modern braces and clear aligners for perfectly aligned teeth.",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    desc: "Gentle, fun-friendly dental care designed for our youngest patients.",
  },
];

const benefits = [
  {
    icon: Award,
    title: "Experienced Dentists",
    desc: "15+ years of trusted clinical excellence.",
  },
  {
    icon: Wallet,
    title: "Affordable Care",
    desc: "Transparent pricing and flexible payment plans.",
  },
  {
    icon: Cpu,
    title: "Modern Equipment",
    desc: "State-of-the-art tools for precise treatment.",
  },
  {
    icon: HeartHandshake,
    title: "Friendly Environment",
    desc: "A warm, welcoming clinic for the whole family.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient since 2021",
    quote:
      "The team made me feel completely at ease. My smile has never looked better!",
  },
  {
    name: "Michael Chen",
    role: "Patient since 2019",
    quote:
      "Modern, clean and professional. The dentists genuinely care about your comfort.",
  },
  {
    name: "Emma Rodriguez",
    role: "Mom of two",
    quote:
      "My kids actually look forward to the dentist now. That says it all!",
  },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj.entries());

    try {
      const res = await fetch(`/api/contact`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send message')

      toast.success("Appointment request sent!", {
        description: "We'll reach out within 24 hours to confirm.",
      });

      form.reset();
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/60">
        <nav className="container flex items-center justify-between h-16">
          <a
            href="#home"
            className="flex items-center gap-2 font-display font-bold text-lg"
          >
            <span className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
              <Smile className="w-5 h-5 text-primary-foreground" />
            </span>
            <span className="text-primary-deep">BrightSmile</span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button
              className="rounded-full gradient-hero border-0 shadow-soft hover:shadow-glow transition-all"
              onClick={() => {
                (window as any).Calendly.initPopupWidget({
                  url: "https://calendly.com/craigbencadag/face-to-face-clinic-checkup",
                });
              }}
            >Book Appointment</Button>
          </div>

          <button
            className="md:hidden p-2 text-primary-deep"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <ul className="container py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-foreground font-medium"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  className="w-full rounded-full gradient-hero border-0"
                  onClick={() => {
                    setMenuOpen(false);
                    (window as any).Calendly.initPopupWidget({
                      url: 'https://calendly.com/craigbencadag/face-to-face-clinic-checkup'
                    })
                  }}
                >
                  Book Appointment
                </Button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden"
      >
        <div className="absolute inset-0 gradient-soft -z-10" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-glow/20 blur-3xl -z-10" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-accent/15 blur-3xl -z-10" />

        <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Trusted by 5,000+ patients
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-deep leading-[1.05] tracking-tight">
              BrightSmile <br />
              <span className="text-gradient">Dental Clinic</span>
            </h1>
            <p className="mt-5 text-xl md:text-2xl font-medium text-foreground/80">
              Your Smile, Our Priority
            </p>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Compassionate, modern dental care for the whole family. From
              routine cleanings to complete smile transformations — we make
              every visit comfortable.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full gradient-hero border-0 shadow-glow hover:scale-105 transition-transform h-12 px-8 text-base"
                onClick={() => {
                  (window as any).Calendly.initPopupWidget({
                    url: 'https://calendly.com/craigbencadag/face-to-face-clinic-checkup'
                  })
                }}
              >
                Book Appointment
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full h-12 px-8 text-base border-2"
              >
                <a href="#services">Our Services</a>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <div className="text-3xl font-display font-bold text-primary-deep">
                  15+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years experience
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-3xl font-display font-bold text-primary-deep">
                  5K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Happy patients
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-3xl font-display font-bold text-primary-deep">
                  4.9★
                </div>
                <div className="text-sm text-muted-foreground">
                  Patient rating
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <div className="absolute inset-0 gradient-hero rounded-[2rem] rotate-3 opacity-20 blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-glow">
              <img
                src={dentistHero}
                alt="Friendly dentist at BrightSmile Dental Clinic"
                width={1280}
                height={1280}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-card p-4 flex items-center gap-3 animate-float">
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display font-bold text-primary-deep">
                  Gentle Care
                </div>
                <div className="text-xs text-muted-foreground">
                  Painless treatments
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              About Us
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-primary-deep">
              Where exceptional care meets warm smiles
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At BrightSmile Dental Clinic, we believe everyone deserves a
              healthy, confident smile. Our team of board-certified dentists
              combines decades of experience with the latest dental technology
              to deliver care that's both gentle and effective.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              From digital imaging to laser dentistry, every treatment room is
              equipped with modern tools — so you receive precise, comfortable
              care every visit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 bg-secondary/40">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Our Services
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-primary-deep">
              Complete dental care, all in one place
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Comprehensive treatments designed around your comfort and health.
            </p>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="group h-full gradient-card rounded-2xl p-7 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/50">
                  <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
                    <s.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-primary-deep">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why" className="py-20 md:py-28">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-primary-deep">
              The BrightSmile difference
            </h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 100}>
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <b.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-primary-deep">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-28 bg-secondary/40">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-primary-deep">
              Smiles from our patients
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <div className="h-full bg-card rounded-2xl p-7 shadow-soft border border-border/50">
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-foreground/80 leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                    <div className="w-11 h-11 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-display font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display font-bold text-primary-deep">
                        {t.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment + Contact */}
      <section id="appointment" className="py-20 md:py-28">
        <div id="contact" className="container grid lg:grid-cols-2 gap-12">
          <Reveal>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Book Now
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-primary-deep">
              Schedule your visit
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Fill out the form and our team will confirm your appointment
              within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Full Name */}
              <div>
                <Label htmlFor="name" className="text-primary-deep font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  disabled={isLoading} // Disable input while loading
                  placeholder="Jane Doe"
                  className="mt-2 h-12 rounded-xl bg-secondary/50 border-border"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="email" className="text-primary-deep font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isLoading}
                    placeholder="jane@email.com"
                    className="mt-2 h-12 rounded-xl bg-secondary/50 border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-primary-deep font-semibold">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    disabled={isLoading}
                    placeholder="+1 (555) 000-0000"
                    className="mt-2 h-12 rounded-xl bg-secondary/50 border-border"
                  />
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <Label htmlFor="date" className="text-primary-deep font-semibold">
                  Preferred Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  disabled={isLoading}
                  className="mt-2 h-12 rounded-xl bg-secondary/50 border-border"
                />
              </div>

              {/* Submit Button with Loading State */}
              <Button
                type="submit"
                size="lg"
                disabled={isLoading} // Prevents multiple clicks
                className={`w-full h-12 rounded-xl gradient-hero border-0 shadow-soft transition-all text-base ${isLoading ? "opacity-80 cursor-not-allowed" : "hover:shadow-glow"
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Request Appointment"
                )}
              </Button>
            </form>
          </Reveal>

          <Reveal delay={150}>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Contact
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-primary-deep">
              Get in touch
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Reach out anytime — we're here to answer your questions.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  value: "123 Smile Avenue, Suite 200, San Francisco, CA 94103",
                },
                { icon: Phone, title: "Phone", value: "+1 (555) 234-5678" },
                { icon: Mail, title: "Email", value: "hello@brightsmile.com" },
                {
                  icon: Clock,
                  title: "Hours",
                  value: "Mon–Fri: 8AM – 7PM · Sat: 9AM – 4PM · Sun: Closed",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="flex gap-4 p-5 rounded-2xl bg-secondary/40 border border-border/50"
                >
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-primary-deep">
                      {c.title}
                    </div>
                    <div className="text-muted-foreground mt-1">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-deep text-primary-foreground py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                <Smile className="w-5 h-5" />
              </span>
              <span className="font-display font-bold text-lg">
                BrightSmile Dental Clinic
              </span>
            </div>

            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} BrightSmile Dental Clinic. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
