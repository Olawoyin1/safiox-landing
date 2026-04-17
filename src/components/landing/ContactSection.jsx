import React from "react";

const ContactSection = () => (
  <section id="contact" className="py-20 px-8 bg-white">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Get in Touch</h2>
        <p className="text-gray-500 text-base max-w-md mx-auto">Have questions? We are here to help. Reach out to our team and we will get back to you as soon as possible.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg mb-6">Contact Information</h3>
          <div className="space-y-5 mb-8">
            {[
              { icon:<svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="1.5"/></svg>, label:"Email", lines:["support@Safiox.com"] },
              { icon:<svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="1.5"/></svg>, label:"Phone", lines:["+234 803 232 9999","Available 24/7"] },

            ].map((item,i)=>(
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                  {item.lines.map((l,j)=><div key={j} className="text-sm text-gray-500">{l}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="font-semibold text-gray-900 text-sm mb-2">Emergency Support</div>
            <p className="text-gray-500 text-sm mb-4">For immediate emergency assistance, please contact your local emergency services or use the panic button in the Safiox app.</p>
            <button onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })} className="border border-red-500 text-red-500 hover:bg-red-50 text-sm font-medium px-5 py-2 rounded-lg transition">Download App Now</button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg mb-6">Send us a Message</h3>
          <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
            {[["Name","text","Your name"],["Email","email","your@email.com"],["Subject","text","How can we help?"]].map(([label,type,ph])=>(
              <div key={label} className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <input type={type} placeholder={ph} className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none hover:border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition font-[inherit]"/>
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea rows="4" placeholder="Tell us more about your inquiry..." className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none hover:border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition resize-none font-[inherit]"></textarea>
            </div>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg text-sm transition">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
