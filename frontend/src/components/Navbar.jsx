"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import Logo from "../assets/Logo.png"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo || "/placeholder.svg"} alt="Stratify Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-purple-700">Stratify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-purple-700 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-700 font-medium">
              About
            </Link>
            <Link to="/get-started" className="text-gray-700 hover:text-purple-700 font-medium">
              Get Started
            </Link>
            <Link
              to="/project-setup"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
            >
              Create Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-purple-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/get-started"
                className="text-gray-700 hover:text-purple-700 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
              <Link
                to="/project-setup"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors inline-block w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
