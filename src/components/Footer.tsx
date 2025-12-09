import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/parties", label: "Parties & Events" },
  { href: "/weekly-games", label: "Weekly Games" },
  { href: "/game-modes", label: "Game Modes" },
  { href: "/waiver", label: "Waiver" },
]

export default function Footer() {
  return (
    <footer className="bg-dart-charcoal border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                <Image
                  src="/pictures/hero-logo.png"
                  alt="Rochester Foam Dart League Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl text-foreground">
                FOAM DART NATION
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              The Rochester Foam Dart League offers Nerf birthday parties, weekly play, fundraisers, school programs, and special events in Rochester, Buffalo, and Syracuse.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:5857488087"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  (585) 748-8087
                </a>
              </li>
              <li>
                <a
                  href="mailto:parties@rochesterfoamdartleague.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  parties@rochesterfoamdartleague.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  75 Barrett Drive P.O. Box 65<br />
                  Webster, NY, 14580
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs text-center md:text-left">
              ROCHESTER FOAM DART LEAGUE (NO PHYSICAL LOCATION)<br />
              75 BARRETT DRIVE P.O. BOX 65, WEBSTER, NY, 14580<br />
              5857488087 | PARTIES@ROCHESTERFOAMDARTLEAGUE.COM
            </p>
            <p className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} Foam Dart Nation. All rights reserved.
            </p>
          </div>
          <p className="text-center text-muted-foreground/50 text-xs mt-4">
            Powered by Squarespace
          </p>
        </div>
      </div>
    </footer>
  )
}

