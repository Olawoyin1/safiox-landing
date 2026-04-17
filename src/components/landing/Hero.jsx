import React from 'react';

const Hero = () => {
    return (
        <section className="hero-bg min-h-screen flex items-center px-5 md:px-16 pt-20 pb-12 md:pt-16 md:pb-0">
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-12 items-center">

                {/* Left: copy */}
                <div className="text-white text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs md:text-sm mb-5">
                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" fill="white" fillOpacity="0.7"/>
                        </svg>
                        Your Safety, Our Priority
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
                        Protect Yourself<br/>and Loved Ones
                    </h1>
                    <p className="text-white/80 text-sm md:text-base mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
                        Instant emergency response with one tap. Share your live location, trigger discreet alerts, and access help when you need it most—even offline.
                    </p>
                    <div className="flex gap-3 mb-6 md:mb-8 justify-center md:justify-start flex-wrap">
                        <button onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-red-600 font-semibold px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:bg-gray-100 transition text-sm md:text-base">Download App</button>
                        <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="border border-white text-white font-semibold px-5 py-2.5 md:px-6 md:py-3 rounded-lg hover:bg-white/10 transition text-sm md:text-base">Learn More</button>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6 text-white/70 text-xs md:text-sm justify-center md:justify-start flex-wrap">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                                <path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            24/7 Emergency Response
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" strokeWidth="1.5"/>
                            </svg>
                            100% Secure & Private
                        </span>
                    </div>
                </div>

                {/* Right: phone mockup */}
                <div className="flex justify-center items-end md:items-center mt-8 md:mt-0">
                    <div className="relative" style={{filter:'drop-shadow(0 32px 64px rgba(0,0,0,0.45)) drop-shadow(0 8px 24px rgba(0,0,0,0.3))', width:'min(260px, 74vw)'}}>
                        <div className="relative w-full" style={{aspectRatio:'9/19.5'}}>
                            <div className="absolute inset-0 rounded-[2.2rem] border-[6px] border-gray-800 bg-gray-900 overflow-hidden">
                                {/* Camera bar */}
                                <div className="absolute top-0 left-0 right-0 h-7 bg-gray-900 flex items-center justify-center z-20">
                                    <div className="w-3 h-3 rounded-full bg-gray-700 border border-gray-600"></div>
                                </div>
                                {/* Status bar */}
                                <div className="absolute top-7 left-0 right-0 h-5 bg-black/60 flex items-center justify-between px-4 z-20">
                                    <span className="text-white text-[9px] font-medium">9:41</span>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 16 12" fill="currentColor">
                                            <rect x="0" y="8" width="3" height="4" rx="0.5"/>
                                            <rect x="4.5" y="5" width="3" height="7" rx="0.5"/>
                                            <rect x="9" y="2" width="3" height="10" rx="0.5"/>
                                            <rect x="13.5" y="0" width="2.5" height="12" rx="0.5"/>
                                        </svg>
                                        <div className="flex items-center gap-0.5">
                                            <div className="w-5 h-2.5 border border-white rounded-sm relative">
                                                <div className="absolute inset-0.5 right-1 bg-white rounded-sm"></div>
                                            </div>
                                            <div className="w-0.5 h-1.5 bg-white rounded-r-sm"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Screen image */}
                                <div className="absolute inset-0" style={{marginTop:'48px', marginBottom:'40px'}}>
                                    <img src="/Images/hero.jpeg" alt="Safiox app screen" className="w-full h-full object-cover object-top"/>
                                </div>
                                {/* Bottom nav bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-900 flex items-center justify-around px-6 z-20">
                                    <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                    <div className="w-10 h-1 bg-gray-400 rounded-full"></div>
                                    <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round"/>
                                        <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round"/>
                                        <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round"/>
                                        <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round"/>
                                    </svg>
                                </div>
                            </div>
                            {/* Side buttons */}
                            <div className="absolute bg-gray-700 rounded-r-sm" style={{right:'-7px', top:'22%', width:'4px', height:'10%'}}></div>
                            <div className="absolute bg-gray-700 rounded-l-sm" style={{left:'-7px', top:'18%', width:'4px', height:'7%'}}></div>
                            <div className="absolute bg-gray-700 rounded-l-sm" style={{left:'-7px', top:'28%', width:'4px', height:'12%'}}></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
