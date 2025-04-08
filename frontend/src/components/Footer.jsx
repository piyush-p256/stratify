import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin } from "lucide-react"
import Logo from "../assets/Logo.png"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={Logo || "/placeholder.svg"} alt="Stratify Logo" className="h-8 w-auto" />
              <span className="text-lg font-bold text-purple-700">Stratify</span>
            </Link>
            <p className="text-gray-600 text-sm">AI-powered project planning and team management platform</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/get-started" className="text-gray-600 hover:text-purple-700 text-sm">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/project-setup" className="text-gray-600 hover:text-purple-700 text-sm">
                  Create Project
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-purple-700 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-purple-700 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-purple-700">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-700">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-700">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Stratify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
