"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Gamepad2, Flag, Users, Heart, Skull, Shield, Target, UserCheck, Snowflake, Circle, Crown, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const gameModes = [
  {
    name: "Capture the Flag",
    description: "Classic team-based objective game. Capture the enemy flag while defending your own!",
    icon: Flag,
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Team Elimination",
    description: "Last team standing wins! Work together to eliminate all opposing players.",
    icon: Users,
    color: "from-red-500 to-red-700",
  },
  {
    name: "Medic",
    description: "Protect your team's medic who can revive eliminated teammates. Strategic teamwork is key!",
    icon: Heart,
    color: "from-pink-500 to-pink-700",
  },
  {
    name: "Citizens vs Zombies",
    description: "Survive the zombie apocalypse! Tagged players become zombies hunting the remaining survivors.",
    icon: Skull,
    color: "from-green-600 to-green-800",
  },
  {
    name: "Attack & Defend",
    description: "One team defends a position while the other attempts to capture it. Roles rotate each round.",
    icon: Shield,
    color: "from-orange-500 to-orange-700",
  },
  {
    name: "Accuracy Shootout",
    description: "Test your aim in target shooting challenges. Perfect for practicing your skills!",
    icon: Target,
    color: "from-purple-500 to-purple-700",
  },
  {
    name: "Rescue the VIP",
    description: "Escort your VIP to safety while the enemy team tries to stop you. High-stakes action!",
    icon: UserCheck,
    color: "from-yellow-500 to-yellow-700",
  },
  {
    name: "Freeze Tag",
    description: "Tag opponents to freeze them in place. Teammates can unfreeze each other. Stay mobile!",
    icon: Snowflake,
    color: "from-cyan-500 to-cyan-700",
  },
  {
    name: "Monster Ball Battle",
    description: "Chaotic free-for-all with special objectives. Fast-paced and unpredictable!",
    icon: Circle,
    color: "from-indigo-500 to-indigo-700",
  },
  {
    name: "King of the Hill",
    description: "Control the designated area to score points. Features electronic scoring for accuracy!",
    icon: Crown,
    color: "from-amber-500 to-amber-700",
  },
  {
    name: "Many More!",
    description: "We're always adding new game modes. Request your favorite or suggest something new!",
    icon: MoreHorizontal,
    color: "from-gray-500 to-gray-700",
  },
]

export default function GameModesPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/pictures/image (5).png"
            alt="Game Modes"
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
              <Gamepad2 className="w-12 h-12 text-dart-red" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              GAME MODES
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans">
              From classic team battles to unique custom modes—there&apos;s something for everyone!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Game Modes Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {gameModes.map((mode, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full card-hover overflow-hidden border-border group">
                  <div className={`bg-gradient-to-r ${mode.color} p-4 transition-all duration-300 group-hover:p-6`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <mode.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{mode.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-white/70 font-sans">{mode.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-dart-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              CUSTOM GAME MODES AVAILABLE
            </h2>
            <p className="text-white/70 mb-6 font-sans">
              Hosting a party or special event? We can customize game modes to fit your group size, age range, and preferences. Let us know what you&apos;re looking for!
            </p>
            <p className="text-dart-yellow font-semibold font-sans">
              King of the Hill features electronic scoring for accurate point tracking!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

