import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(prev => {
            document.body.style.overflow = prev ? '' : 'hidden';
            return !prev;
        });
    };

    const close = () => {
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold text-lg flex-shrink-0">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="white" fillOpacity="0.9"/>
                            <path d="M9 12l2 2 4-4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Safiox
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium">
                        <a href="#features" className="hover:opacity-80 transition-opacity">Features</a>
                        <a href="#dashboard" className="hover:opacity-80 transition-opacity">Dashboard</a>
                        <a href="#testimonials" className="hover:opacity-80 transition-opacity">Testimonials</a>
                        <a href="#download" className="hover:opacity-80 transition-opacity">Download</a>
                        <a href="#contact" className="hover:opacity-80 transition-opacity">Contact</a>
                    </div>

                    <div className="hidden md:flex items-center">
                        <button onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })} className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">Download App</button>
                    </div>

                    <button onClick={toggle} className="md:hidden text-white p-1 z-50 relative" aria-label="Toggle menu">
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={close}
            />

            {/* Drawer */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-white z-40 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="#dc2626" fillOpacity="0.9"/>
                            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Safiox
                    </div>
                    <button onClick={close} className="text-gray-400 hover:text-gray-700 transition p-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
                    {[['features','Features'],['dashboard','Dashboard'],['testimonials','Testimonials'],['download','Download'],['contact','Contact']].map(([id, label]) => (
                        <a key={id} href={`#${id}`} onClick={close} className="text-gray-700 hover:text-red-600 hover:bg-red-50 font-medium text-sm px-3 py-3 rounded-lg transition">{label}</a>
                    ))}
                </nav>
                <div className="px-6 pb-8">
                    <button onClick={() => { close(); document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-lg transition text-sm">Download App</button>
                </div>
            </div>
        </>
    );
};

export default LandingNav;
