import React from "react";
import { Link } from "react-router-dom";

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 duration-300 block"
  >
    {children}
  </Link>
);

export const Footer = () => {
  return (
    <footer className="w-full px-4 md:px-6 pb-8 pt-0 relative z-20">
      <div className="max-w-7xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-[32px] overflow-hidden">
        <div className="p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-[0_0_15px_rgba(77,121,255,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 rounded-full"></div>
                <div className="absolute inset-[2px] bg-black rounded-full"></div>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                LBES
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Trading Strategy Engineering Platform
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Product</h4>
            <FooterLink to="/#how-it-works">How It Works</FooterLink>
            <FooterLink to="/pricing">Pricing</FooterLink>
            <FooterLink to="/examples">Examples</FooterLink>
            <FooterLink to="/#faq">FAQ</FooterLink>
          </div>

          {/* Links Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Legal</h4>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/terms-conditions">Terms of Service</FooterLink>
            <FooterLink to="/refund-policy">Refund Policy</FooterLink>
          </div>

          {/* Links Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Support</h4>
            <FooterLink to="/contact">Contact</FooterLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 p-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 bg-black/20">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LBES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
