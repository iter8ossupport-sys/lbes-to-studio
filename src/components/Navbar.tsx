import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavLink = ({
  children,
  href = "#",
  to,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
}) => {
  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 shadow-xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={closeMobileMenu}
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-[0_0_15px_rgba(77,121,255,0.6)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 rounded-full animate-spin [animation-duration:10s]"></div>
            <div className="absolute inset-[2px] bg-black rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
            </div>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            LBES
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/#how-it-works">How It Works</NavLink>
          <NavLink to="/examples">Examples</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/#faq">FAQ</NavLink>
          <NavLink to="/login">Login</NavLink>
          {/* Desktop CTA */}
          <GradientBorder
            gradient="from-orange-500 via-red-500 to-orange-600"
            containerClassName="rounded-full p-[1px]"
          >
            <Link
              to="/interview"
              className="flex items-center px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-colors group shadow-md"
            >
              <RollingText text="Start Your Strategy" />
            </Link>
          </GradientBorder>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 pt-20 pb-8"
          >
            <NavLink to="/#how-it-works" onClick={closeMobileMenu}>
              How It Works
            </NavLink>
            <NavLink to="/examples" onClick={closeMobileMenu}>
              Examples
            </NavLink>
            <NavLink to="/pricing" onClick={closeMobileMenu}>
              Pricing
            </NavLink>
            <NavLink to="/#faq" onClick={closeMobileMenu}>
              FAQ
            </NavLink>
            <NavLink to="/login" onClick={closeMobileMenu}>
              Login
            </NavLink>
            {/* Mobile CTA */}
            <GradientBorder
              gradient="from-orange-500 via-red-500 to-orange-600"
              containerClassName="rounded-full p-[1px]"
            >
              <Link
                to="/interview"
                onClick={closeMobileMenu}
                className="flex items-center px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition-colors group shadow-md"
              >
                <RollingText text="Start Your Strategy" />
              </Link>
            </GradientBorder>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
