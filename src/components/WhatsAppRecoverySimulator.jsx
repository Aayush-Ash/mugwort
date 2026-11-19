import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  Clock, 
  Tag, 
  CheckCircle2, 
  ExternalLink, 
  AlertCircle, 
  Trash2, 
  Smartphone,
  RefreshCw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { whatsapp } from '../services/whatsappService';

export default function WhatsAppRecoverySimulator() {
  const { 
    isWhatsAppDrawerOpen, 
    setIsWhatsAppDrawerOpen, 
    customer, 
    selectedBundle, 
    applyCouponCode,
    openCheckoutWithBundle
  } = useShop();

  const [activeTab, setActiveTab] = useState('templates'); // 'templates' | 'logs'
  const [triggersList, setTriggersList] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const lead = whatsapp.getLead() || customer;

  useEffect(() => {
    if (isWhatsAppDrawerOpen) {
      setTriggersList(whatsapp.getTriggers());
    }
  }, [isWhatsAppDrawerOpen]);

  if (!isWhatsAppDrawerOpen) return null;

  const t15m = whatsapp.getTemplate15MinReminder(lead, selectedBundle);
  const t4h = whatsapp.getTemplate4HourOffer(lead, selectedBundle);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Simulate Trigger Dispatch
  const dispatchTrigger = (template) => {
    const event = whatsapp.recordTrigger({
      type: template.type,
      title: template.title,
      message: template.message,
      recipientPhone: lead?.phone || '9876543210',
      recipientName: lead?.name || 'Valued Buyer'
    });
    setTriggersList(whatsapp.getTriggers());
    showToast(`Dispatched ${template.title} via WhatsApp API!`);
  };

  const clearLogs = () => {
    whatsapp.clearTriggers();
    setTriggersList([]);
    showToast('Trigger logs cleared');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-emerald-500/40 rounded-3xl shadow-2xl p-5 sm:p-7 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Automated WhatsApp Recovery Engine
                <span className="text-[10px] bg-emerald-500 text-neutral-950 font-black px-2 py-0.5 rounded-full uppercase">
                  TSK-12 Active
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                15-Min Abandoned Cart Reminder &bull; 4-Hour RELIEF50 Coupon Nudge
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWhatsAppDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-2">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'templates'
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            Automated Trigger Templates (2)
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <span>Trigger History / Logs</span>
            <span className="bg-neutral-900 text-emerald-300 px-1.5 py-0.2 rounded-md font-mono text-[10px]">
              {triggersList.length}
            </span>
          </button>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="my-2 p-2.5 bg-emerald-950/90 border border-emerald-500/60 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4">
          
          {activeTab === 'templates' && (
            <div className="space-y-4">
              
              {/* Trigger 1: 15-Minute Reminder */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Trigger 1: 15-Minute Cart Reminder
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    Condition: Cart Inactivity &gt; 15 Mins
                  </span>
                </div>

                {/* WhatsApp Chat Bubble Mockup */}
                <div className="bg-[#0b141a] p-3.5 rounded-xl border border-neutral-800 font-sans text-xs text-neutral-200 leading-relaxed whitespace-pre-line relative">
                  <div className="absolute top-2 right-2 text-[10px] text-neutral-500 font-mono">
                    WhatsApp Business
                  </div>
                  {t15m.message}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => dispatchTrigger(t15m)}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Simulate 15-Min Trigger Now</span>
                  </button>

                  <a
                    href={whatsapp.createDirectWaLink(lead?.phone || '9876543210', t15m.rawText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline underline-offset-2"
                  >
                    <span>Test on Real WhatsApp Web/App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Trigger 2: 4-Hour RELIEF50 Offer */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Trigger 2: 4-Hour Exclusive ₹50 OFF (RELIEF50)
                    </span>
                  </div>
                  <span className="text-[10px] bg-amber-400/10 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                    CODE: RELIEF50
                  </span>
                </div>

                {/* WhatsApp Chat Bubble Mockup */}
                <div className="bg-[#0b141a] p-3.5 rounded-xl border border-neutral-800 font-sans text-xs text-neutral-200 leading-relaxed whitespace-pre-line relative">
                  <div className="absolute top-2 right-2 text-[10px] text-neutral-500 font-mono">
                    WhatsApp Business
                  </div>
                  {t4h.message}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatchTrigger(t4h)}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Simulate 4-Hour Trigger</span>
                    </button>

                    <button
                      onClick={() => {
                        applyCouponCode('RELIEF50');
                        setIsWhatsAppDrawerOpen(false);
                        openCheckoutWithBundle(2);
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold py-2 px-3 rounded-xl transition-colors cursor-pointer"
                    >
                      Claim RELIEF50 in Cart
                    </button>
                  </div>

                  <a
                    href={whatsapp.createDirectWaLink(lead?.phone || '9876543210', t4h.rawText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline underline-offset-2"
                  >
                    <span>Test on Real WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-1">
                <span>Webhook Dispatches & Sent Notifications ({triggersList.length})</span>
                {triggersList.length > 0 && (
                  <button
                    onClick={clearLogs}
                    className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear History
                  </button>
                )}
              </div>

              {triggersList.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-xs">
                  No automated triggers dispatched yet. Click "Simulate Trigger" above to test.
                </div>
              ) : (
                triggersList.map((log) => (
                  <div
                    key={log.id}
                    className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 font-mono">
                        {log.title}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {log.timestamp} &bull; {log.date}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      Recipient: <strong>{log.recipientName}</strong> (+91 {log.recipientPhone})
                    </p>
                    <div className="bg-neutral-900 p-2 rounded-lg text-[11px] text-neutral-400 font-mono truncate">
                      {log.message.replace(/\n/g, ' ')}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
