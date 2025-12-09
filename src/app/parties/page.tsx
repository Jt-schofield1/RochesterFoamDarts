"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { PartyPopper, Star, Zap, Crown, Phone, Mail, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

const packages = [
  {
    icon: Star,
    name: "Basic Party Package",
    guests: "20 guests",
    features: [
      "2 staff members",
      "Battlefield setup",
      "Indoor/outdoor",
      "Full armory of Nerf Elite & Mega blasters",
      "Foam darts",
      "Safety glasses + jerseys",
      "Game modes: Capture the Flag, Medic, Freeze Tag, Zombies",
      "Up to 200 guests for large events",
      "Partnerships with local pizzerias",
    ],
    color: "from-blue-500 to-blue-700",
    popular: false,
  },
  {
    icon: Zap,
    name: "Rival Operator Package",
    guests: "20 guests",
    features: [
      "Everything in Basic Package",
      "High-performance Nerf Rival blasters",
      "100+ FPS",
      "Rival rounds",
      "Same game modes",
      "Up to 200 players",
    ],
    color: "from-dart-red to-red-800",
    popular: true,
  },
  {
    icon: Crown,
    name: "Dart Zone Pro Package",
    guests: "20 guests",
    features: [
      "Everything in Rival Package",
      "Dart Zone Pro blasters",
      "Short/half-length pro darts",
      "Recommended 14+",
      "150 FPS",
      "Comparable to paintball/airsoft",
    ],
    color: "from-yellow-500 to-yellow-700",
    popular: false,
  },
]

export default function PartiesPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    participants: "",
    package: "",
    comments: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = new FormData()
    form.append("firstName", formData.firstName)
    form.append("lastName", formData.lastName)
    form.append("phone", formData.phone)
    form.append("email", formData.email)
    form.append("participants", formData.participants)
    form.append("package", formData.package)
    form.append("comments", formData.comments)
    form.append("_subject", "New Party Inquiry from Website")

    try {
      await fetch("https://formspree.io/f/mwpgnwvb", {
        method: "POST",
        body: form,
        headers: {
          Accept: "application/json",
        },
      })
      setSubmitted(true)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pictures/image (4).png"
            alt="Party Setup"
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
              <PartyPopper className="w-12 h-12 text-dart-red" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              PARTIES & SPECIAL EVENTS
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans">
              The Rochester Foam Dart League can facilitate your next party or special event. We partner with sports facilities, recreation centers, and can set up at your home or park.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dart Zone Partnership */}
      <section className="py-12 bg-dart-charcoal border-y border-dart-red/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg text-white/80 mb-4 font-sans">Exclusive Partnership:</p>
            <a
              href="https://dartzoneblasters.com/foamdartnation/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-dart-yellow hover:text-yellow-400 transition-colors text-xl font-bold"
            >
              dartzoneblasters.com/foamdartnation/
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              PARTY PACKAGES
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto font-sans">
              Choose the perfect package for your event. All packages include professional staff, equipment, and setup.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {packages.map((pkg, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className={`h-full card-hover relative overflow-hidden ${pkg.popular ? 'border-dart-red border-2' : 'border-border'}`}>
                  {pkg.popular && (
                    <div className="absolute top-4 right-4 bg-dart-red text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader className={`bg-gradient-to-r ${pkg.color} p-6`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl">
                        <pkg.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">{pkg.name}</CardTitle>
                        <p className="text-white/80 text-sm font-sans">{pkg.guests}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/80 font-sans text-sm">
                          <Check className="w-5 h-5 text-dart-red flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Party Inquiry Form */}
      <section className="py-20 bg-dart-charcoal" id="inquiry">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              PARTY INQUIRY FORM
            </h2>
            <p className="text-lg text-white/70 font-sans">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <Card className="bg-green-500/20 border-green-500/50">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 bg-green-500/20 rounded-full mb-4">
                    <Check className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">Inquiry Submitted!</h3>
                  <p className="text-white/80 font-sans">
                    Thank you for your interest! We&apos;ll contact you soon to discuss your event.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
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
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="participants">Number of Participants *</Label>
                        <Select onValueChange={(value) => handleSelectChange("participants", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-16">0–16</SelectItem>
                            <SelectItem value="17-50">17–50</SelectItem>
                            <SelectItem value="51-100">51–100</SelectItem>
                            <SelectItem value="100+">100+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="package">Package Selected</Label>
                        <Select onValueChange={(value) => handleSelectChange("package", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select package" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic Party Package</SelectItem>
                            <SelectItem value="rival">Rival Operator Package</SelectItem>
                            <SelectItem value="pro">Dart Zone Pro Package</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comments">Comments / Questions</Label>
                      <Textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        placeholder="Tell us about your event, preferred date, location, etc."
                        rows={5}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              CONTACT US DIRECTLY
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="bg-card border-border card-hover">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 bg-dart-red/20 rounded-full mb-4">
                    <Phone className="w-8 h-8 text-dart-red" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Call Justin</h3>
                  <a
                    href="tel:5857488087"
                    className="text-dart-red hover:text-red-400 transition-colors text-lg font-sans"
                  >
                    (585) 748-8087
                  </a>
                </CardContent>
              </Card>
              <Card className="bg-card border-border card-hover">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 bg-dart-red/20 rounded-full mb-4">
                    <Mail className="w-8 h-8 text-dart-red" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <a
                    href="mailto:justin@rochesterfoamdartleague.com"
                    className="text-dart-red hover:text-red-400 transition-colors text-lg font-sans break-all"
                  >
                    justin@rochesterfoamdartleague.com
                  </a>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 red-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            DON&apos;T FORGET TO SIGN THE WAIVER!
          </h2>
          <p className="text-white/90 mb-6 font-sans">
            All participants must have a signed waiver before joining any event.
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-white text-dart-black hover:bg-white/90">
            <Link href="/waiver">Sign Waiver Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

