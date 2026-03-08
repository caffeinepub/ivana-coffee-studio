import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowDown,
  Cake,
  CheckCircle2,
  Coffee,
  Facebook,
  Heart,
  Instagram,
  Loader2,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ─── Fade-up animation variants ───────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: "easeOut" as const,
    },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

// ─── Offering Card ─────────────────────────────────────────────
interface OfferingCardProps {
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  ocid: string;
}

function OfferingCard({
  imageSrc,
  imageAlt,
  icon,
  title,
  description,
  delay,
  ocid,
}: OfferingCardProps) {
  return (
    <motion.div
      data-ocid={ocid}
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-warm hover:shadow-warm-lg transition-shadow duration-500"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Warm overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.06_50_/_0.55)] via-transparent to-transparent" />
        {/* Icon pill */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[oklch(0.97_0.018_75_/_0.92)] px-3 py-1.5 shadow-warm backdrop-blur-sm">
          <span className="text-[oklch(0.32_0.06_52)] [&>svg]:h-4 [&>svg]:w-4">
            {icon}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl font-semibold text-foreground leading-snug">
          {title}
        </h3>
        <p className="font-body text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Gold accent line on hover */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[oklch(0.72_0.14_68)] transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

// ─── Main App ──────────────────────────────────────────────────
export default function App() {
  const notifyRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { actor } = useActor();

  const {
    mutate: submitSignup,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useMutation({
    mutationFn: async ({
      name,
      email,
    }: {
      name: string;
      email: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.signup(name, email);
    },
    onSuccess: () => {
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    reset();
    submitSignup({ name: name.trim(), email: email.trim() });
  };

  const scrollToNotify = () => {
    notifyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        data-ocid="hero.section"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      >
        {/* Background image + layered overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/coffee-hero.dim_1200x700.jpg')",
          }}
          aria-hidden="true"
        />
        {/* Cinematic dark + warm gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.12 0.03 50 / 0.88) 0%, oklch(0.18 0.04 52 / 0.82) 40%, oklch(0.22 0.06 55 / 0.72) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <motion.div
          className="relative z-10 flex flex-col items-center px-6 py-20 text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Logo */}
          <motion.div variants={fadeUp} custom={0}>
            <img
              src="/assets/generated/ivana-logo-transparent.dim_300x300.png"
              alt="Ivana Coffee Studio Logo"
              className="mx-auto mb-6 h-24 w-24 drop-shadow-2xl sm:h-28 sm:w-28"
            />
          </motion.div>

          {/* Opening Soon badge */}
          <motion.div variants={fadeUp} custom={1} className="mb-6">
            <Badge
              className="gap-1.5 rounded-full border px-4 py-1.5 text-sm font-body font-medium tracking-widest uppercase"
              style={{
                background: "oklch(0.72 0.14 68 / 0.18)",
                borderColor: "oklch(0.72 0.14 68 / 0.6)",
                color: "oklch(0.9 0.1 70)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Opening Soon
            </Badge>
          </motion.div>

          {/* Brand name */}
          <motion.h1
            variants={fadeUp}
            custom={2}
            className="font-display text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ textShadow: "0 4px 32px oklch(0.12 0.04 48 / 0.5)" }}
          >
            Ivana
            <br />
            <span
              style={{
                color: "oklch(0.88 0.1 70)",
              }}
            >
              Coffee Studio
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-6 max-w-md font-body text-lg leading-relaxed text-white/80 sm:text-xl"
          >
            Crafted with love. Coming to Ranchi.
          </motion.p>

          {/* Location pill */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-4 flex items-center gap-1.5 font-body text-sm text-white/60"
          >
            <MapPin className="h-4 w-4" />
            Ranchi, Jharkhand
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} custom={5} className="mt-10">
            <Button
              data-ocid="hero.cta_button"
              onClick={scrollToNotify}
              size="lg"
              className="group gap-2 rounded-full px-8 py-3 font-body font-semibold tracking-wide shadow-gold-glow transition-all duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.14 68) 0%, oklch(0.65 0.12 55) 100%)",
                color: "oklch(0.16 0.04 48)",
              }}
            >
              Notify Me When We Open
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="h-8 w-5 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
            <div className="h-2 w-0.5 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* ─── OFFERINGS ────────────────────────────────────────── */}
      <section
        data-ocid="offerings.section"
        className="relative px-6 py-24 sm:py-32"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.968 0.018 75) 0%, oklch(0.95 0.022 73) 100%)",
        }}
      >
        {/* Decorative wave at top */}
        <div
          className="absolute inset-x-0 top-0 h-16 -translate-y-px"
          style={{
            background: "oklch(0.968 0.018 75)",
            clipPath: "ellipse(60% 100% at 50% 100%)",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-[oklch(0.55_0.08_52)]">
                What We Offer
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl"
            >
              Made With Passion,
              <br />
              <em
                className="not-italic"
                style={{ color: "oklch(0.45 0.07 55)" }}
              >
                Served With Care
              </em>
            </motion.h2>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-[oklch(0.72_0.14_68)]"
            />
          </motion.div>

          {/* Feature image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={0}
            className="mb-12 overflow-hidden rounded-3xl shadow-warm-lg"
          >
            <img
              src="/assets/generated/coffee-art-cakes-hero.dim_1200x800.jpg"
              alt="Specialty coffee with artisan cakes at Ivana Coffee Studio"
              className="h-80 w-full object-cover sm:h-96"
              loading="lazy"
            />
          </motion.div>

          {/* Cards grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <OfferingCard
              ocid="offerings.coffee.card"
              imageSrc="/assets/generated/specialty-coffee-art.dim_800x600.jpg"
              imageAlt="Specialty coffee with latte art at Ivana Coffee Studio"
              icon={<Coffee />}
              title="Specialty Coffee"
              description="Single-origin beans sourced from the finest estates, brewed to perfection. From silky flat whites to artisan pour-overs, every cup tells a story of terroir, craft, and ritual."
              delay={0}
            />
            <OfferingCard
              ocid="offerings.cakes.card"
              imageSrc="/assets/generated/homemade-pastries.dim_800x600.jpg"
              imageAlt="Homemade pastries and baked goods"
              icon={<Star />}
              title="Homemade Cakes & Pastries"
              description="Baked fresh every morning in our studio kitchen — flaky croissants, pillowy choux, seasonal tarts, and indulgent layered cakes. Pure, wholesome ingredients. Zero shortcuts."
              delay={1}
            />
            <OfferingCard
              ocid="offerings.custom_cake.card"
              imageSrc="/assets/generated/customized-cake.dim_800x600.jpg"
              imageAlt="Customized celebration cakes"
              icon={<Cake />}
              title="Customised Cakes"
              description="Your vision, our craftsmanship. We design bespoke celebration cakes for birthdays, weddings, and every milestone in between — tailored in flavour, design, and size."
              delay={2}
            />
          </div>
        </div>
      </section>

      {/* ─── ABOUT ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 py-24 sm:py-32"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.28 0.05 50) 0%, oklch(0.22 0.06 52) 60%, oklch(0.18 0.04 48) 100%)",
        }}
      >
        {/* Decorative coffee ring watermark */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-[0.06]"
          style={{
            border: "40px solid oklch(0.72 0.14 68)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-[0.04]"
          style={{
            border: "32px solid oklch(0.88 0.1 70)",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-[oklch(0.72_0.14_68)]">
              Our Story
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl"
          >
            A Cozy Corner for
            <br />
            Ranchi's Coffee Lovers
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 font-body text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Ivana Coffee Studio is born from a deep love for the ritual of
            coffee and the warmth of handmade baking. Nestled in the heart of
            Ranchi, we're crafting a space where specialty brews and homemade
            treats meet — a refuge for slow mornings, sweet celebrations, and
            every quiet moment in between.
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-4 font-body text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Whether you're a seasoned espresso enthusiast, a pastry devotee, or
            seeking a truly one-of-a-kind custom cake for life's special
            milestones — we're making something extraordinary, just for you.
          </motion.p>

          {/* Divider with icon */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <div className="h-px w-20 bg-[oklch(0.72_0.14_68_/_0.4)]" />
            <Heart
              className="h-5 w-5 fill-current"
              style={{ color: "oklch(0.72 0.14 68)" }}
            />
            <div className="h-px w-20 bg-[oklch(0.72_0.14_68_/_0.4)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── NOTIFY / EMAIL SIGNUP ────────────────────────────── */}
      <section
        data-ocid="notify.section"
        ref={notifyRef as React.RefObject<HTMLElement>}
        className="relative px-6 py-24 sm:py-32"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.95 0.022 73) 0%, oklch(0.968 0.018 75) 100%)",
        }}
      >
        {/* Decorative dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.32 0.06 52) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="relative mx-auto max-w-xl"
        >
          {/* Header */}
          <div className="mb-10 text-center">
            <motion.div variants={fadeUp} custom={0}>
              <Badge
                className="mb-4 gap-1.5 rounded-full border px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.15em]"
                style={{
                  background: "oklch(0.72 0.14 68 / 0.1)",
                  borderColor: "oklch(0.72 0.14 68 / 0.4)",
                  color: "oklch(0.45 0.07 55)",
                }}
              >
                <Coffee className="h-3 w-3" />
                Stay in the Know
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-display text-4xl font-semibold leading-snug text-foreground sm:text-5xl"
            >
              Be the First to Know
              <br />
              <em
                className="not-italic"
                style={{ color: "oklch(0.45 0.07 55)" }}
              >
                When We Open
              </em>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 font-body text-base leading-relaxed text-muted-foreground"
            >
              Drop your details below and we'll send you an exclusive heads-up
              the moment Ivana Coffee Studio opens its doors in Ranchi.
            </motion.p>
          </div>

          {/* Form / States */}
          <motion.div variants={fadeUp} custom={3}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  data-ocid="notify.success_state"
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4 rounded-2xl p-10 text-center shadow-warm"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.28 0.05 50) 0%, oklch(0.22 0.06 52) 100%)",
                  }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full shadow-gold-glow"
                    style={{ background: "oklch(0.72 0.14 68 / 0.2)" }}
                  >
                    <CheckCircle2
                      className="h-8 w-8"
                      style={{ color: "oklch(0.72 0.14 68)" }}
                    />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    You're on the list!
                  </h3>
                  <p className="font-body text-base text-white/70">
                    We'll be in touch as soon as we're ready to welcome you.
                    Thank you for your excitement — it means the world to us!
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={reset}
                    className="mt-2 rounded-full border-white/20 font-body text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    Sign Up Again
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 rounded-2xl bg-card p-8 shadow-warm"
                >
                  {/* Name input */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="notify-name"
                      className="font-body text-sm font-medium text-foreground"
                    >
                      Your Name
                    </label>
                    <Input
                      id="notify-name"
                      data-ocid="notify.name_input"
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={isPending}
                      className="rounded-xl border-border bg-background font-body text-foreground placeholder:text-muted-foreground focus-visible:ring-[oklch(0.55_0.07_60)]"
                    />
                  </div>

                  {/* Email input */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="notify-email"
                      className="font-body text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <Input
                      id="notify-email"
                      data-ocid="notify.email_input"
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isPending}
                      className="rounded-xl border-border bg-background font-body text-foreground placeholder:text-muted-foreground focus-visible:ring-[oklch(0.55_0.07_60)]"
                    />
                  </div>

                  {/* Error state */}
                  <AnimatePresence>
                    {isError && (
                      <motion.div
                        data-ocid="notify.error_state"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2.5"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
                        <span className="font-body text-sm text-destructive">
                          Oops! Something went wrong. Please try again.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit button */}
                  <Button
                    data-ocid="notify.submit_button"
                    type="submit"
                    size="lg"
                    disabled={isPending || !name.trim() || !email.trim()}
                    className="mt-1 gap-2 rounded-xl font-body font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
                    style={{
                      background: isPending
                        ? undefined
                        : "linear-gradient(135deg, oklch(0.32 0.06 52) 0%, oklch(0.28 0.05 50) 100%)",
                      color: "oklch(0.97 0.01 70)",
                    }}
                  >
                    {isPending ? (
                      <>
                        <Loader2
                          data-ocid="notify.loading_state"
                          className="h-4 w-4 animate-spin"
                        />
                        Saving your spot...
                      </>
                    ) : (
                      <>
                        <Coffee className="h-4 w-4" />
                        Notify Me
                      </>
                    )}
                  </Button>

                  <p className="text-center font-body text-xs text-muted-foreground">
                    No spam. We only reach out when something exciting happens.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SOCIAL ───────────────────────────────────────────── */}
      <section
        data-ocid="social.section"
        className="relative overflow-hidden px-6 py-24 sm:py-32"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.26 0.05 50) 0%, oklch(0.20 0.06 52) 60%, oklch(0.17 0.04 48) 100%)",
        }}
      >
        {/* Decorative rings */}
        <div
          className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full opacity-[0.05]"
          style={{ border: "48px solid oklch(0.72 0.14 68)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 -bottom-16 h-60 w-60 rounded-full opacity-[0.04]"
          style={{ border: "36px solid oklch(0.88 0.1 70)" }}
          aria-hidden="true"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="relative mx-auto max-w-2xl text-center"
        >
          {/* Label */}
          <motion.div variants={fadeUp} custom={0}>
            <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-[oklch(0.72_0.14_68)]">
              Find Us Online
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl"
          >
            Follow Our Journey
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 font-body text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Stay updated as we get closer to opening day — behind-the-scenes,
            sneak peeks, and sweet surprises await.
          </motion.p>

          {/* Social buttons */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            {/* Instagram */}
            <a
              data-ocid="social.instagram_button"
              href="https://instagram.com/ivanacoffeestudio"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-pink-400/40 hover:bg-gradient-to-r hover:from-[oklch(0.55_0.22_0)] hover:via-[oklch(0.5_0.25_320)] hover:to-[oklch(0.45_0.2_280)] sm:w-auto sm:min-w-[220px]"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
                style={{ background: "oklch(1 0 0 / 0.08)" }}
              >
                <Instagram className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-white" />
              </span>
              <span className="flex flex-col items-start">
                <span className="font-body text-base font-semibold text-white leading-none">
                  Instagram
                </span>
                <span className="font-body text-xs text-white/50 mt-0.5 transition-colors duration-300 group-hover:text-white/70">
                  @ivanacoffeestudio
                </span>
              </span>
            </a>

            {/* Facebook */}
            <a
              data-ocid="social.facebook_button"
              href="https://facebook.com/ivanacoffeestudio"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-400/40 hover:bg-[oklch(0.45_0.18_250)] sm:w-auto sm:min-w-[220px]"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
                style={{ background: "oklch(1 0 0 / 0.08)" }}
              >
                <Facebook className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-white" />
              </span>
              <span className="flex flex-col items-start">
                <span className="font-body text-base font-semibold text-white leading-none">
                  Facebook
                </span>
                <span className="font-body text-xs text-white/50 mt-0.5 transition-colors duration-300 group-hover:text-white/70">
                  @ivanacoffeestudio
                </span>
              </span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer
        data-ocid="footer.section"
        className="relative overflow-hidden px-6 py-14"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.2 0.05 50) 0%, oklch(0.16 0.04 48) 100%)",
        }}
      >
        {/* Decorative coffee beans pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.88 0.1 70) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8">
          {/* Logo + name */}
          <div className="flex flex-col items-center gap-3">
            <img
              src="/assets/generated/ivana-logo-transparent.dim_300x300.png"
              alt="Ivana Coffee Studio"
              className="h-14 w-14 opacity-90"
            />
            <h3
              className="font-display text-2xl font-semibold"
              style={{ color: "oklch(0.95 0.018 74)" }}
            >
              Ivana Coffee Studio
            </h3>
            <div className="flex items-center gap-1.5 font-body text-sm text-white/50">
              <MapPin className="h-3.5 w-3.5" />
              Ranchi, Jharkhand
            </div>
          </div>

          <Separator className="bg-white/10 w-32" />

          {/* Social links */}
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/ivanacoffeestudio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all duration-300 hover:border-[oklch(0.72_0.14_68_/_0.5)] hover:text-[oklch(0.88_0.1_70)] hover:bg-[oklch(0.72_0.14_68_/_0.1)]"
            >
              <Instagram className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://facebook.com/ivanacoffeestudio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all duration-300 hover:border-[oklch(0.72_0.14_68_/_0.5)] hover:text-[oklch(0.88_0.1_70)] hover:bg-[oklch(0.72_0.14_68_/_0.1)]"
            >
              <Facebook className="h-[18px] w-[18px]" />
            </a>
          </div>

          <Separator className="bg-white/10 w-48" />

          {/* Copyright + caffeine.ai attribution */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-body text-sm text-white/40">
              © {currentYear} Ivana Coffee Studio · Ranchi, Jharkhand
            </p>
            <p className="font-body text-xs text-white/25">
              Built with{" "}
              <Heart className="inline h-3 w-3 fill-current text-[oklch(0.72_0.14_68_/_0.6)]" />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-white/50 hover:underline transition-colors duration-200"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
