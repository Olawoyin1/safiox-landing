import React, { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

Chart.register(...registerables);

// ── Offline Tab ──
const OfflineTab = () => (
  <div>
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 text-base">Offline Emergency Protocol</h3>
      <p className="text-gray-400 text-sm">Reliable SMS-based alerts when internet connectivity is unavailable</p>
    </div>
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[["98.7%","SMS Delivery Rate","bg-blue-50"],["<3s","Average Response Time","bg-green-50"],["24/7","Network Availability","bg-indigo-50"]].map(([val,label,bg],i)=>(
        <div key={i} className={`${bg} rounded-2xl p-6 text-center`}>
          <div className="text-3xl font-bold text-gray-900 mb-2">{val}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      ))}
    </div>
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <h4 className="font-semibold text-gray-900 mb-5">How Offline Mode Works</h4>
      <div className="space-y-4">
        {["User triggers panic button without internet connection","App sends SMS with GPS coordinates to emergency contacts","Contacts receive location and can dispatch help immediately"].map((step,i)=>(
          <div key={i} className="flex items-center gap-4">
            <span className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i+1}</span>
            <span className="text-gray-700 text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Emergency Tab ──
const EmergencyTab = () => {
  const darkBarRef = useRef(null);
  const darkLineRef = useRef(null);
  const barRef = useRef(null);
  const darkBarChart = useRef(null);
  const darkLineChart = useRef(null);
  const barChart = useRef(null);

  useEffect(() => {
    darkBarChart.current = new Chart(darkBarRef.current, {
      type:"bar",
      data:{ labels:Array(14).fill(""), datasets:[{ data:[30,55,80,65,90,70,85,60,75,50,65,80,55,70], backgroundColor:"#22d3ee", borderRadius:2, barThickness:6 }] },
      options:{ responsive:true, animation:false, plugins:{legend:{display:false},tooltip:{enabled:false}}, scales:{x:{display:false},y:{display:false}} }
    });
    darkLineChart.current = new Chart(darkLineRef.current, {
      type:"line",
      data:{ labels:Array(11).fill(""), datasets:[
        { data:[40,55,35,60,45,70,50,65,40,55,45], borderColor:"#f472b6", backgroundColor:"transparent", pointRadius:0, tension:0.4, borderWidth:1.5 },
        { data:[20,30,25,40,30,50,35,45,30,40,35], borderColor:"#34d399", backgroundColor:"transparent", pointRadius:0, tension:0.4, borderWidth:1.5 },
        { data:[60,50,65,45,70,55,75,60,70,55,65], borderColor:"#60a5fa", backgroundColor:"transparent", pointRadius:0, tension:0.4, borderWidth:1.5 }
      ]},
      options:{ responsive:true, animation:false, plugins:{legend:{display:false},tooltip:{enabled:false}}, scales:{x:{display:false},y:{display:false}} }
    });
    barChart.current = new Chart(barRef.current, {
      type:"bar",
      data:{ labels:["Jan","Feb","Mar","Apr","May","Jun"], datasets:[
        { label:"Alerts Received", data:[45,52,48,61,55,68], backgroundColor:"#ef4444", borderRadius:3, barPercentage:0.45 },
        { label:"Successfully Resolved", data:[41,49,45,58,51,65], backgroundColor:"#22c55e", borderRadius:3, barPercentage:0.45 }
      ]},
      options:{ responsive:true, plugins:{legend:{display:false}}, scales:{ x:{grid:{display:false},border:{display:false}}, y:{beginAtZero:true,max:80,ticks:{stepSize:20},grid:{color:"#f3f4f6"},border:{display:false}} } }
    });
    return () => { darkBarChart.current?.destroy(); darkLineChart.current?.destroy(); barChart.current?.destroy(); };
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="border border-gray-200 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 text-base mb-1">Active Emergency Dashboard</h3>
        <p className="text-gray-400 text-sm mb-4">Monitor and respond to live emergency situations in real-time</p>
        <div className="bg-gray-900 rounded-xl overflow-hidden" style={{height:"220px"}}>
          <div className="p-3 h-full flex flex-col gap-2">
            <div className="flex items-center justify-between text-gray-400 text-xs border-b border-gray-700 pb-2">
              <span className="text-white text-xs font-medium">USING: LAST 7 DAYS USING MEDIAN</span>
              <div className="flex gap-2"><span className="w-4 h-4 bg-gray-700 rounded-sm"></span><span className="w-4 h-4 bg-gray-700 rounded-sm"></span></div>
            </div>
            <div className="flex gap-2 flex-1">
              <div className="flex-1 relative"><canvas ref={darkBarRef}></canvas></div>
              <div className="flex-1 relative"><canvas ref={darkLineRef}></canvas></div>
            </div>
            <div className="grid grid-cols-5 gap-1 border-t border-gray-700 pt-2">
              {[["0.7s","Latency","text-cyan-400"],["2.7Mpvs","Throughput","text-pink-400"],["40.8%","Error Rate","text-white"],["479K","Requests","text-white"],["17min","Avg Time","text-white"]].map(([v,l,c],i)=>(
                <div key={i} className="text-center"><div className={`${c} text-xs font-bold`}>{v}</div><div className="text-gray-500 text-[10px]">{l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 text-base mb-1">Monthly Alert Statistics</h3>
        <p className="text-gray-400 text-sm mb-4">Track emergency alerts and resolution rates</p>
        <canvas ref={barRef} height="190"></canvas>
        <div className="flex gap-6 mt-4 justify-center text-xs text-gray-600">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block"></span>Alerts Received</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block"></span>Successfully Resolved</span>
        </div>
      </div>
    </div>
  );
};

// ── Predictive Tab ──
const PredictiveTab = () => {
  const lineRef = useRef(null);
  const lineChart = useRef(null);

  useEffect(() => {
    lineChart.current = new Chart(lineRef.current, {
      type:"line",
      data:{ labels:["00:00","04:00","08:00","12:00","16:00","20:00"], datasets:[{ data:[13,6,8,14,21,28], borderColor:"#ef4444", backgroundColor:"transparent", pointBackgroundColor:"white", pointBorderColor:"#ef4444", pointBorderWidth:2, pointRadius:5, tension:0.35 }] },
      options:{ responsive:true, plugins:{legend:{display:false}}, scales:{ x:{grid:{color:"#e5e7eb",borderDash:[4,4]},border:{display:false}}, y:{beginAtZero:true,max:28,ticks:{stepSize:7},grid:{color:"#e5e7eb",borderDash:[4,4]},border:{display:false}} } }
    });
    return () => lineChart.current?.destroy();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="border border-gray-200 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 text-base mb-1">Crime & Safety Pattern Analysis</h3>
        <p className="text-gray-400 text-sm mb-4">AI-powered insights to predict and prevent incidents</p>
        <canvas ref={lineRef} height="210"></canvas>
        <div className="flex items-center gap-2 mt-3 text-xs text-red-500">
          <span className="inline-block w-4 h-px bg-red-500"></span>
          <span className="w-2 h-2 rounded-full border border-red-500 inline-block"></span>
          Incidents per Hour
        </div>
      </div>
      <div className="border border-gray-200 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 text-base mb-1">Risk Assessment Heat Map</h3>
        <p className="text-gray-400 text-sm mb-4">Identify high-risk zones and optimize response strategies</p>
        <div className="rounded-xl overflow-hidden" style={{height:"240px",zIndex:0}}>
          <MapContainer center={[51.5,10.5]} zoom={4} style={{height:"100%",width:"100%"}} zoomControl={true} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors"/>
          </MapContainer>
        </div>
        <div className="flex gap-8 mt-4 justify-center text-xs text-gray-600">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block"></span>Low Risk</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block"></span>Medium Risk</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block"></span>High Risk</span>
        </div>
      </div>
    </div>
  );
};

// ── Main DashboardTabs ──
const tabs = [
  { id:"emergency", label:"Emergency Services" },
  { id:"offline",   label:"Offline Mode" },
  { id:"predictive",label:"Predictive Insights" },
];

const DashboardTabs = () => {
  const [active, setActive] = useState("offline");
  return (
    <section id="dashboard" className="py-20 px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Comprehensive Dashboard & Analytics</h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">Real-time insights and powerful tools for emergency responders, NGOs, and safety organizations</p>
        </div>
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setActive(t.id)} className={`px-6 py-2 text-sm font-medium rounded-full transition ${active===t.id?"bg-white shadow text-gray-800":"text-gray-500"}`}>{t.label}</button>
            ))}
          </div>
        </div>
        {active==="offline"    && <OfflineTab/>}
        {active==="emergency"  && <EmergencyTab/>}
        {active==="predictive" && <PredictiveTab/>}
      </div>
    </section>
  );
};

export default DashboardTabs;
