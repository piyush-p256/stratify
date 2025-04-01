"use client"

import { HashLink as Link } from "react-router-hash-link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Logo from "../assets/Logo.png"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="Stratify Logo"
              className="h-10 w-auto"
            />
            <span className="ml-2 text-xl font-bold">Stratify</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              Home
            </Link>
            <Link smooth to="#how-it-works" className="text-gray-800 hover:text-gray-600">
              About
            </Link>
            {/* <Link to="/contact" className="text-gray-800 hover:text-gray-600">
              Contact
            </Link> */}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <Link to="/" className="block py-2 text-gray-800 hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link
              smooth
              to="#how-it-works"
              className="block py-2 text-gray-800 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {/* <Link
              to="/contact"
              className="block py-2 text-gray-800 hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link> */}
          </nav>
        )}
      </div>
    </header>
  )
}

