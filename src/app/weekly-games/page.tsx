"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, ExternalLink, DollarSign, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

const locations = [
  {
    city: "Rochester",
    day: "Saturdays",
    time: "1:30–2:30 PM",
    locations: [
      { season: "Summer", venue: "Rothfuss Park" },
      { season: "Oct–Apr", venue: "Sports Garden" },
    ],
    color: "from-dart-red to-red-800",
  },
  {
    city: "Buffalo",
    day: "Sundays",
    time: "12–1 PM",
    locations: [
      { season: "Year-round", venue: "Sahlens Sports Park" },
    ],
    color: "from-blue-500 to-blue-700",
  },
  {
    city: "Syracuse",
    day: "TBD",
    time: "TBD",
    locations: [
      { season: "TBD", venue: "Champions for Life Center" },
    ],
    color: "from-yellow-500 to-yellow-700",
  },
]

const rules = [
  { icon: Users, text: "Ages 5+" },
  { icon: DollarSign, text: "$20/player" },
  { icon: Shield, text: "Blasters & darts provided" },
  { icon: Shield, text: "Wear safety glasses" },
]

export default function WeeklyGamesPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pictures/image (2).png"
            alt="Weekly Nerf Games"
            fill
            className="object-cover"
            priority
          />
          <div className="hero-gradient absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex p-4 bg-dart-red/20 rounded-2xl mb-6">
              <Calendar className="w-12 h-12 text-dart-red" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              WEEKLY GAMES
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans">
              Join us for weekly public Nerf battles! No commitment required—just show up and play!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price & Info Banner */}
      <section className="py-8 red-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="text-lg font-bold">Ages 5+</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              <span className="text-lg font-bold">$20 per player</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              <span className="text-lg font-bold">All equipment provided</span>
            </div>
          </div>
        </div>
      </section>

      {/* General Rules */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              WHAT&apos;S INCLUDED
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-sans">
              Everything you need for an epic foam dart battle experience!
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              "Safety glasses",
              "Jerseys",
              "Blasters",
              "Nerf Rival darts",
              "Nerf Elite darts",
              "Nerf Mega darts",
              "Dartzone Pro darts",
              "Professional supervision",
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-card border-border card-hover text-center">
                  <CardContent className="p-6">
                    <div className="inline-flex p-3 bg-dart-red/20 rounded-xl mb-4">
                      <Shield className="w-6 h-6 text-dart-red" />
                    </div>
                    <p className="text-white font-semibold font-sans">{item}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xl text-white/80 font-sans mb-4">
              We provide the ultimate family fun on or off the turf!
            </p>
            <p className="text-white/60 font-sans">
              Check Facebook for the latest updates and schedule changes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-dart-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              LOCATIONS & SCHEDULE
            </h2>
            <p className="text-lg text-white/70 font-sans">
              Find a game near you in Rochester, Buffalo, or Syracuse!
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {locations.map((location, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full card-hover overflow-hidden border-border">
                  <CardHeader className={`bg-gradient-to-r ${location.color} p-6`}>
                    <CardTitle className="text-3xl text-white text-center">
                      {location.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <Calendar className="w-5 h-5 text-dart-red flex-shrink-0" />
                      <span className="font-sans">{location.day}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Clock className="w-5 h-5 text-dart-red flex-shrink-0" />
                      <span className="font-sans">{location.time}</span>
                    </div>
                    <div className="border-t border-border pt-4">
                      {location.locations.map((loc, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-white/80 mb-2">
                          <MapPin className="w-5 h-5 text-dart-red flex-shrink-0 mt-0.5" />
                          <div className="font-sans">
                            <span className="text-dart-yellow font-semibold">{loc.season}:</span>{" "}
                            {loc.venue}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facebook CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              STAY UPDATED
            </h2>
            <p className="text-white/70 mb-8 font-sans">
              Follow our regional Facebook pages for the latest schedule updates, cancellations, and special events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="gap-2">
                <a
                  href="https://www.facebook.com/rochesterfoamdartleague"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rochester on Facebook
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waiver CTA */}
      <section className="py-16 red-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            SIGN THE WAIVER BEFORE YOU PLAY
          </h2>
          <p className="text-white/90 mb-6 font-sans">
            All participants must have a signed waiver. Save time by signing online before your first game!
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-white text-dart-black hover:bg-white/90">
            <Link href="/waiver">Sign Waiver Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

