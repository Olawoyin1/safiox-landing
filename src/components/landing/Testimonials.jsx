import React from "react";

const testimonials = [
  { stars:5, quote:"This app saved my sister's life during a robbery. The panic button sent her location to our family instantly, and the police arrived within minutes. I recommend it to everyone I know.", name:"Sarah Mitchell", role:"University Student", img:"https://i.pravatar.cc/40?img=47" },
  { stars:5, quote:"As a first responder, this dashboard gives us the real-time data we need. The live location tracking and incident analytics help us respond faster and more effectively.", name:"Officer Marcus Chen", role:"Emergency Responder", img:"https://i.pravatar.cc/40?img=12" },
  { stars:5, quote:"I feel so much safer walking home late at night. The voice trigger feature is incredible - I can alert my husband without even touching my phone. Peace of mind is priceless.", name:"Priya Sharma", role:"Working Professional", img:"https://i.pravatar.cc/40?img=32" },
  { stars:5, quote:"The demographic analytics help us understand patterns of violence and allocate resources where they're needed most. This platform is transforming how we approach community safety.", name:"Dr. James Rodriguez", role:"NGO Director", img:"https://i.pravatar.cc/40?img=15" },
  { stars:5, quote:"My teenage daughter uses this app whenever she's out with friends. The discreet mode and offline SMS support give me confidence that she can get help even in areas with poor reception.", name:"Amanda Lee", role:"Parent of Two", img:"https://i.pravatar.cc/40?img=44" },
  { stars:5, quote:"The predictive insights have been game-changing for our department. We can now deploy officers to high-risk areas proactively, preventing incidents before they happen.", name:"Chief Karen Williams", role:"Police Department", img:"https://i.pravatar.cc/40?img=25" },
];

const Testimonials = () => (
  <section id="testimonials" className="py-20 px-8 bg-white">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Trusted by Thousands</h2>
        <p className="text-gray-500 text-base">Real stories from real people who rely on our app for their safety every day</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex gap-1 mb-4 text-yellow-400">{"★".repeat(t.stars)}</div>
            <p className="text-gray-600 text-sm italic mb-6">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover"/>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-400">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
