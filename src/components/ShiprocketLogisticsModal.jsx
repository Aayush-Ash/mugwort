import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Package, 
  MapPin, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { shiprocket, COURIER_PARTNERS } from '../services/shiprocketService';
import { lookupPincode } from '../services/pincodeService';

export default function ShiprocketLogisticsModal() {
  const { 
    isShiprocketModalOpen, 
    setIsShiprocketModalOpen, 
    currentOrder, 
    activeTrackingShipment,
    setActiveTrackingShipment
  } = useShop();

  const [testPin, setTestPin] = useState('560001');
  const [pinResult, setPinResult] = useState(null);
  const [isSearchingPin, setIsSearchingPin] = useState(false);

  if (!isShiprocketModalOpen) return null;

  const shipment = activeTrackingShipment || (currentOrder?.shipment) || shiprocket.getAllShipments()[0] || {
    orderId: 'MUG-DEMO-982',
    awb: 'SR-BLU-492019482',
    courierPartner: 'Blue Dart Express (Air Priority)',
    status: 'MANIFESTED',
    provider: 'SHIPROCKET',
    destination: 'Bengaluru, Karnataka - 560001',
    estimatedDelivery: '2–3 Days',
    pickupLocation: 'Mugwort India Central Warehouse, Sector 34, Gurugram Hub, Haryana - 122001',
    events: [
      { status: 'ORDER_PLACED', title: 'Order Verified & Manifested', desc: 'Prepaid UPI confirmed. Linehaul air routing assigned.', time: 'Just now', done: true },
      { status: 'MANIFEST_GENERATED', title: 'AWB Generated via Shiprocket API', desc: 'AWB #SR-BLU-492019482 printed on package label', time: '1 min ago', done: true },
      { status: 'READY_FOR_PICKUP', title: 'Ready for Courier Bagging', desc: 'Airtight heat-sealed sachet safely packed', time: 'Within 4 hours', done: false },
      { status: 'IN_TRANSIT', title: 'In Transit to Regional Hub', desc: 'Moving towards destination hub', time: 'In 24-48 hours', done: false },
      { status: 'DELIVERED', title: 'Out for Doorstep Delivery', desc: 'Courier representative out for delivery', time: 'Est. 2-3 Days', done: false }
    ]
  };

  const handleTestPincodeLookup = async () => {
    setIsSearchingPin(true);
    const res = await lookupPincode(testPin);
    setPinResult(res);
    setIsSearchingPin(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-700 rounded-3xl shadow-2xl p-5 sm:p-7 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Shiprocket / NimbusPost Integration Hub
                <span className="text-[10px] bg-blue-500 text-neutral-950 font-black px-2 py-0.5 rounded-full uppercase">
                  Logistics Synced
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Automated AWB Generation &bull; Courier Allocation &bull; Real-time Pincode SLAs
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsShiprocketModalOpen(false)}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5">
          
          {/* Active AWB & Shipment Card */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-800 text-xs">
              <div>
                <span className="text-neutral-400">Logistics Provider: </span>
                <span className="font-bold text-blue-400 font-mono">SHIPROCKET API V2</span>
              </div>
              <div>
                <span className="text-neutral-400">AWB Tracking Number: </span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  {shipment.awb}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block text-[11px]">Assigned Courier</span>
                <strong className="text-white block mt-0.5">{shipment.courierPartner}</strong>
              </div>
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block text-[11px]">Dispatch Hub</span>
                <strong className="text-white block mt-0.5">Gurugram Central (Haryana)</strong>
              </div>
              <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                <span className="text-neutral-400 block text-[11px]">Estimated Transit</span>
                <strong className="text-amber-400 block mt-0.5">{shipment.estimatedDelivery}</strong>
              </div>
            </div>

            {/* Shipment Milestones Timeline */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Live Shipment Event Timeline:
              </h4>

              <div className="space-y-3">
                {shipment.events.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        event.done ? 'bg-emerald-500 text-neutral-950' : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                      }`}>
                        {event.done ? <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>
                      {idx < shipment.events.length - 1 && (
                        <div className={`w-0.5 h-6 ${event.done ? 'bg-emerald-500/60' : 'bg-neutral-800'}`} />
                      )}
                    </div>

                    <div className="text-xs flex-1 pb-1">
                      <div className="flex items-center justify-between">
                        <strong className={event.done ? 'text-white' : 'text-neutral-400'}>
                          {event.title}
                        </strong>
                        <span className="text-[10px] text-neutral-500 font-mono">{event.time}</span>
                      </div>
                      <p className="text-neutral-400 text-[11px] mt-0.5">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Pincode Serviceability Tester Tool (For evaluation/testing) */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              Pan-India Pincode Serviceability & Courier Rate Simulator
            </h4>

            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={testPin}
                onChange={(e) => setTestPin(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 6-digit Indian PIN (e.g. 560001, 110001, 400001)"
                className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs font-mono font-bold focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleTestPincodeLookup}
                disabled={isSearchingPin || testPin.length !== 6}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                {isSearchingPin ? 'Checking...' : 'Check SLA'}
              </button>
            </div>

            {/* Quick Test Pincode Chips */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="text-neutral-500">Quick Test:</span>
              {[
                { label: 'Delhi (110001)', pin: '110001' },
                { label: 'Mumbai (400001)', pin: '400001' },
                { label: 'Bengaluru (560001)', pin: '560001' },
                { label: 'Kolkata (700001)', pin: '700001' }
              ].map(item => (
                <button
                  key={item.pin}
                  onClick={() => {
                    setTestPin(item.pin);
                    lookupPincode(item.pin).then(setPinResult);
                  }}
                  className="text-blue-400 hover:underline bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Result details */}
            {pinResult && (
              <div className="bg-neutral-900/90 border border-blue-500/30 rounded-xl p-3 text-xs space-y-1">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>Destination: {pinResult.city}, {pinResult.state}</span>
                  <span className="text-emerald-400 font-mono">Serviceable (COD + Prepaid)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 pt-1">
                  <span>Logistics Zone: <strong>{pinResult.zone}</strong></span>
                  <span>Estimated Delivery: <strong className="text-amber-400">{pinResult.days}</strong></span>
                  <span>Primary Air Courier: <strong>Blue Dart Express</strong></span>
                  <span>COD Surface Courier: <strong>Delhivery Surface</strong></span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
