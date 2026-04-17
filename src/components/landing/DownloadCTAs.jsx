import React from "react";

const DownloadCTAs = () => (
  <section id="download" className="py-20 px-8 md:px-16" style={{background:"radial-gradient(ellipse at center, #b91c1c 0%, #7f1d1d 60%, #450a0a 100%)"}}>
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="text-white">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-5">Download Now and Stay Protected</h2>
        <p className="text-white/80 text-base mb-8 max-w-md">Available on iOS and Android. Free to download with premium features for advanced safety needs.</p>
        <div className="flex gap-4 mb-10 flex-wrap">
          <button className="flex items-center gap-2 border border-white text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Download on App Store
          </button>
          <button className="flex items-center gap-2 border border-white text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-white/10 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.64.22.98.14l12.09-6.98-2.54-2.54-10.53 9.38zm-1.7-20.3C1.18 3.9 1 4.37 1 4.9v14.2c0 .53.18 1 .48 1.44l.08.07 7.96-7.96v-.19L1.56 4.39l-.08.07zm17.54 8.54l-2.29-1.32-2.83 2.83 2.83 2.83 2.31-1.33c.66-.38.66-1.01-.02-1.01zM4.16.24L16.25 7.22l-2.54 2.54L3.18.38C3.5.3 3.86.07 4.16.24z"/></svg>
            Get it on Google Play
          </button>
        </div>
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-white rounded-xl p-3 w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 21 21" className="w-full h-full" fill="#111">
              <rect x="0" y="0" width="9" height="9"/><rect x="12" y="0" width="9" height="9"/>
              <rect x="0" y="12" width="9" height="9"/><rect x="2" y="2" width="5" height="5" fill="white"/>
              <rect x="14" y="2" width="5" height="5" fill="white"/><rect x="2" y="14" width="5" height="5" fill="white"/>
              <rect x="12" y="12" width="3" height="3"/><rect x="16" y="12" width="3" height="3"/>
              <rect x="12" y="16" width="3" height="3"/><rect x="16" y="16" width="3" height="3"/>
            </svg>
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Scan to Download</div>
            <div className="text-white/70 text-xs mt-1">Point your camera at the QR code to download the app instantly</div>
          </div>
        </div>
        <div>
          <p className="text-white/60 text-xs mb-2">Device Compatibility</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-white/80">
            {["iOS 26 or later","Android 16 or later","iPad compatible","Tablet optimized"].map((item,i)=>(
              <span key={i} className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="rounded-3xl overflow-hidden shadow-2xl w-72 md:w-80">
          <img src="/Images/safiox.jpeg" alt="App on phone" className="w-full h-full object-cover"/>
        </div>
      </div>
    </div>
  </section>
);

export default DownloadCTAs;
