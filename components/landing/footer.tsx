import Link from "next/link"
import { Mail, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 font-sans">Queik</h3>
            <p className="text-white/60 text-sm">
              Your modern financial platform for wealth management and investment growth.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="#" className="hover:text-white transition-smooth">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-smooth">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-smooth">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="#" className="hover:text-white transition-smooth">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-smooth">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-smooth">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="#" className="hover:text-white transition-smooth">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-smooth">Terms</Link></li>
              <li><Link href="#" className="hover:text-white transition-smooth">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">© 2025 Queik. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="text-white/60 hover:text-white transition-smooth">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-white/60 hover:text-white transition-smooth">
              <Linkedin size={20} />
            </Link>
            <Link href="#" className="text-white/60 hover:text-white transition-smooth">
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
