"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Target, PartyPopper, Calendar, Shield, Crosshair, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("email", email)
    formData.append("_subject", "New Newsletter Signup")

    try {
      await fetch("https://formspree.io/f/mwpgnwvb", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
      setSubmitted(true)
      setEmail("")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pictures/image (1).png"
            alt="Foam Dart Battle"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-gradient absolute inset-0" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <Image
                  src="/pictures/hero-logo.png"
                  alt="Rochester Foam Dart League Logo"
                  width={200}
                  height={200}
                  className="drop-shadow-[0_0_30px_rgba(230,40,40,0.5)] rounded-2xl"
                />
              </motion.div>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-wider">
              FOAM DART NATION
            </h1>
            <p className="text-xl sm:text-2xl text-dart-red font-bold mb-6">
              Est. 2015
            </p>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed font-sans">
              The Rochester Foam Dart League offers Nerf birthday parties, weekly play, fundraisers, school programs, and special events in <span className="text-dart-red font-semibold">Rochester</span>, <span className="text-dart-red font-semibold">Buffalo</span>, and <span className="text-dart-red font-semibold">Syracuse</span>.
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 font-sans">
              We are the only company to partner directly with a major blaster brand <span className="text-dart-yellow font-bold">Dart Zone blasters</span>! We bring the highest professionalism and expertise directly to you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 animate-pulse-glow">
                <Link href="/parties">Book Your Party</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="/weekly-games">Weekly Games</Link>
              </Button>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Weekly Games Section */}
      <section className="py-20 bg-dart-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/pictures/image (2).png"
                  alt="Weekly Nerf Games"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-dart-red/20 rounded-xl">
                  <Calendar className="w-8 h-8 text-dart-red" />
                </div>
                <span className="text-dart-red font-bold uppercase tracking-wider">Weekly Games</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                WEEKLY GAMES
              </h2>
              <p className="text-lg text-white/80 mb-6 font-sans">
                Weekly public Nerf battles for ages 5+, <span className="text-dart-yellow font-bold">$20 per player</span>. Come play commitment-free!
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Safety glasses",
                  "Jerseys",
                  "Blasters",
                  "Nerf Rival, Elite, Mega, Dartzone Pro darts",
                  "Epic Nerf battles on or off the turf",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/70 font-sans">
                    <Crosshair className="w-5 h-5 text-dart-red flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link href="/weekly-games">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Birthday Parties Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-dart-red/20 rounded-xl">
                  <PartyPopper className="w-8 h-8 text-dart-red" />
                </div>
                <span className="text-dart-red font-bold uppercase tracking-wider">Special Events</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                BIRTHDAY PARTIES & SPECIAL EVENTS
              </h2>
              <p className="text-lg text-white/80 mb-6 font-sans">
                The Rochester Foam Dart League can facilitate your next party or special event! We work with all ages and skill levels.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Birthday parties",
                  "Corporate events",
                  "School programs",
                  "Fundraisers",
                  "Outdoor/indoor mobile experiences",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/70 font-sans">
                    <Target className="w-5 h-5 text-dart-red flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white/70 mb-8 font-sans">
                Includes bunkers, blasters, safety gear, full staff, and event management.
              </p>
              <Button size="lg" asChild>
                <Link href="/parties">View Party Packages</Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/pictures/image (3).png"
                  alt="Birthday Party Nerf Battle"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dart-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              WHY CHOOSE US
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-sans">
              Experience the ultimate foam dart battles with the best equipment and professional staff.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "Safety glasses, jerseys, and professional supervision at every event.",
              },
              {
                icon: Target,
                title: "Top Equipment",
                description: "Official Dart Zone partnership with premium blasters and gear.",
              },
              {
                icon: Users,
                title: "All Ages Welcome",
                description: "Events designed for ages 5+ with skill-appropriate game modes.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full card-hover bg-card border-border">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex p-4 bg-dart-red/20 rounded-2xl mb-6">
                      <feature.icon className="w-10 h-10 text-dart-red" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/70 font-sans">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dart-red via-transparent to-transparent" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              NEWSLETTER
            </h2>
            <p className="text-lg text-white/70 mb-8 font-sans">
              Sign up to receive updates, events, giveaways, fundraisers, and new gear reviews.
            </p>
            <p className="text-sm text-white/50 mb-8 font-sans">
              Newsletter sends 1–2 messages monthly. We respect your privacy and will not spam your email account.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-500/20 border border-green-500/50 rounded-xl"
              >
                <p className="text-green-400 text-lg font-semibold">Thank you for subscribing!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 red-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              READY TO BATTLE?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-sans">
              Book your party or join our weekly games today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg bg-white text-dart-black hover:bg-white/90">
                <Link href="/parties">Book a Party</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg border-white text-white hover:bg-white hover:text-dart-black">
                <Link href="/waiver">Sign Waiver</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

