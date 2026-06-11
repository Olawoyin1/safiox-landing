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
            <nav className="absolute top-0 right-0 left-0 z-20 px-6 py-4">
                <div className="flex justify-between items-center mx-auto max-w-6xl">
                    <div className="flex flex-shrink-0 gap-2 items-center text-lg font-bold text-white">
                        <img src="/Images/safioxLogo.png" alt="Safiox Logo" className="w-7 h-7" />
                        Safiox
                    </div>

                    <div className="hidden gap-8 items-center text-sm font-medium text-white md:flex">
                        <a href="#features" className="transition-opacity hover:opacity-80">Features</a>
                        <a href="#dashboard" className="transition-opacity hover:opacity-80">Dashboard</a>
                        <a href="#testimonials" className="transition-opacity hover:opacity-80">Testimonials</a>
                        <a href="#download" className="transition-opacity hover:opacity-80">Download</a>
                        <a href="#contact" className="transition-opacity hover:opacity-80">Contact</a>
                    </div>

                    <div className="hidden items-center md:flex">
                        <button onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg transition hover:bg-red-700">Download App</button>
                    </div>

                    <button onClick={toggle} className="relative z-50 p-1 text-white md:hidden" aria-label="Toggle menu">
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
                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
                    <div className="flex gap-2 items-center text-lg font-bold text-gray-900">
                        <img src="/Images/safioxLogo.png" alt="Safiox Logo" className="w-7 h-7" />
                        Safiox
                    </div>
                    <button onClick={close} className="p-1 text-gray-400 transition hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col flex-1 gap-1 px-6 py-6">
                    {[['features','Features'],['dashboard','Dashboard'],['testimonials','Testimonials'],['download','Download'],['contact','Contact']].map(([id, label]) => (
                        <a key={id} href={`#${id}`} onClick={close} className="px-3 py-3 text-sm font-medium text-gray-700 rounded-lg transition hover:text-red-600 hover:bg-red-50">{label}</a>
                    ))}
                </nav>
                <div className="px-6 pb-8">
                    <button onClick={() => { close(); document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-5 py-3 w-full text-sm font-semibold text-white bg-red-600 rounded-lg transition hover:bg-red-700">Download App</button>
                </div>
            </div>
        </>
    );
};

export default LandingNav;
