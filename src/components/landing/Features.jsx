import React from 'react';

const bgMap = { red:'bg-red-100', blue:'bg-blue-100', purple:'bg-purple-100', green:'bg-green-100', orange:'bg-orange-100', indigo:'bg-indigo-100', pink:'bg-pink-100', yellow:'bg-yellow-100', teal:'bg-teal-100' };

const features = [
  { color:'red', title:'Panic Button', desc:'One-tap emergency alert sends your location and distress signal to your trusted contacts and local authorities instantly.' },
  { color:'blue', title:'Live Location Sharing', desc:'Share your real-time location with selected contacts. They can track your movements and ensure you reach safely.' },
  { color:'purple', title:'Voice Trigger Alerts', desc:"Activate emergency protocols hands-free with customizable voice commands like 'Help me' or your secret phrase." },
  { color:'green', title:'Discreet Exit Mode', desc:'Quickly disguise the app as a calculator or clock to use discreetly in dangerous situations without drawing attention.' },
  { color:'orange', title:'Safe Zone Navigation', desc:'Find the nearest police stations, hospitals, and safe zones with turn-by-turn navigation in real-time.' },
  { color:'indigo', title:'Offline SMS Support', desc:'Send emergency SMS alerts even without internet connection using cellular networks for maximum reliability.' },
  { color:'pink', title:'Community Support', desc:'Connect with verified safety volunteers and community responders nearby who can provide immediate assistance during emergencies.' },
  { color:'yellow', title:'Live Safety Feed', desc:'Stay informed with real-time safety updates, incident reports, and community alerts from your area to avoid dangerous zones.' },
  { color:'teal', title:'CCTV Connectivity', desc:'Integrate with existing CCTV systems and security cameras to provide visual evidence and real-time monitoring during emergencies.' },
];

const FeatureIcon = ({ color }) => {
  const icons = {
    red: <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="1.5"/><path d="M12 8v4m0 4h.01" strokeWidth="2" strokeLinecap="round"/></svg>,
    blue: <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
    purple: <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeWidth="1.5"/></svg>,
    green: <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" strokeWidth="1.5"/></svg>,
    orange: <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeWidth="1.5"/></svg>,
    indigo: <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    pink: <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.5"/></svg>,
    yellow: <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    teal: <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeWidth="1.5"/></svg>,
  };
  return icons[color] || null;
};

const Features = () => (
  <section id="features" className="bg-gray-50 py-20 px-8">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Powerful Features for Your Safety</h2>
        <p className="text-gray-500 text-base max-w-md mx-auto">Comprehensive tools designed to keep you protected in any emergency situation</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className={`w-10 h-10 ${bgMap[f.color]} rounded-xl flex items-center justify-center mb-4`}>
              <FeatureIcon color={f.color} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
