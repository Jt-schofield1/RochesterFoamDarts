"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/parties", label: "Parties & Events" },
  { href: "/weekly-games", label: "Weekly Games" },
  { href: "/game-modes", label: "Game Modes" },
  { href: "/waiver", label: "Waiver" },
]

const GIFT_CARD_URL = "https://www.rochesterfoamdartleague.com/checkout/giftcard?websiteId=55f5a47fe4b0bfc8befab492&giftCardProductId=62977014165fee684efeb647"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-lg">
              <Image
                src="/pictures/hero-logo.png"
                alt="Rochester Foam Dart League Logo"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <span className="hidden sm:block font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              RFDL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Gift Cards Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" asChild className="gap-2">
              <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer">
                <Gift className="w-4 h-4" />
                Gift Cards
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="gap-1">
              <a href={GIFT_CARD_URL} target="_blank" rel="noopener noreferrer">
                <Gift className="w-4 h-4" />
                <span className="hidden sm:inline">Gift Cards</span>
              </a>
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

