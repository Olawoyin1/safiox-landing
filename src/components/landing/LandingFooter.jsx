import React from "react";

const LandingFooter = () => (
  <footer className="bg-gray-900 text-white pt-16 pb-8 px-8">
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-4">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="#3b82f6" fillOpacity="0.9"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Safiox
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">Empowering individuals and communities with cutting-edge safety technology for instant emergency response.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {["About Us","Features","How It Works","Pricing","Safety Tips","Blog"].map(l=>(
              <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {["Privacy Policy","Terms of Service","Cookie Policy","Data Protection","GDPR Compliance"].map(l=>(
              <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Partners</h4>
          <div className="flex gap-2 mb-5">
            <span className="border border-gray-600 text-gray-300 text-xs px-3 py-1 rounded-full">UN Women</span>
            <span className="border border-gray-600 text-gray-300 text-xs px-3 py-1 rounded-full">Red Cross</span>
          </div>
          <h4 className="font-semibold text-white mb-2">For Organizations</h4>
          <p className="text-gray-400 text-sm mb-3">Partner with Safiox to protect your community.</p>
          <a href="#" className="text-red-400 hover:text-red-300 text-sm font-medium transition">Learn More →</a>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; 2026 Safiox. All rights reserved. Protecting lives, one alert at a time.
      </div>
    </div>
  </footer>
);

export default LandingFooter;
