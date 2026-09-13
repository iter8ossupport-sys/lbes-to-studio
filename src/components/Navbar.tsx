import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GradientBorder } from "./ui/GradientBorder";
import { RollingText } from "./ui/RollingText";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

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
  const { user, loading, signOut } = useAuth();

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
          <div className="relative w-9 h-9 rounded-xl border border-white/20 bg-gradient-to-br from-blue-500 via-indigo-500 to-orange-500 p-[1px] shadow-[0_0_18px_rgba(59,130,246,0.35)]">
            <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center">
              <span className="text-white text-sm font-black tracking-tight">L</span>
            </div>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">LBES</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/#how-it-works">How It Works</NavLink>
          <NavLink to="/examples">Examples</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/#faq">FAQ</NavLink>
          <NavLink to={user ? "/settings" : "/login"}>{loading ? "Account" : user ? "Account" : "Login"}</NavLink>
          {user && <button onClick={() => void signOut()} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Sign out</button>}
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
            <NavLink to={user ? "/settings" : "/login"} onClick={closeMobileMenu}>
              {user ? "Account" : "Login"}
            </NavLink>
            {user && <button onClick={() => { void signOut(); closeMobileMenu(); }} className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Sign out</button>}
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
