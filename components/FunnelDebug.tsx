'use client';

import { useState, useEffect } from 'react';
import { getFunnelHistory, clearFunnelHistory, type TrackingData } from '@/lib/tracking';

export function FunnelDebug() {
  const [events, setEvents] = useState<TrackingData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setEvents(getFunnelHistory());
      
      // Refresh every 2 seconds
      const interval = setInterval(() => {
        setEvents(getFunnelHistory());
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const recentEvents = events.slice(-10).reverse();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#21c45d] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium hover:bg-[#16a34a] transition"
        >
          📊 Funnel Debug
        </button>
      ) : (
        <div className="bg-[#0f172a] border border-[rgba(255,255,255,0.1)] rounded-lg shadow-2xl w-96 max-h-[80vh] overflow-hidden">
          <div className="p-4 border-b border-[rgba(255,255,255,0.1)] flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Funnel Events (Last 10)</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  clearFunnelHistory();
                  setEvents([]);
                }}
                className="text-xs text-gray-400 hover:text-white transition"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {recentEvents.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No events yet</p>
            ) : (
              <div className="space-y-3">
                {recentEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-[rgba(255,255,255,0.05)] rounded-lg p-3 border border-[rgba(255,255,255,0.1)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#21c45d] text-xs font-mono font-semibold">
                        {event.event}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="text-gray-400">
                        <span className="text-gray-500">Session:</span> {event.session_id.slice(0, 8)}...
                      </div>
                      {event.page && (
                        <div className="text-gray-400">
                          <span className="text-gray-500">Page:</span> {event.page}
                        </div>
                      )}
                      {event.step !== undefined && (
                        <div className="text-gray-400">
                          <span className="text-gray-500">Step:</span> {event.step}
                        </div>
                      )}
                      {event.service && (
                        <div className="text-gray-400">
                          <span className="text-gray-500">Service:</span> {event.service}
                        </div>
                      )}
                      {event.city && (
                        <div className="text-gray-400">
                          <span className="text-gray-500">City:</span> {event.city}
                        </div>
                      )}
                      {event.country && (
                        <div className="text-gray-400">
                          <span className="text-gray-500">Country:</span> {event.country}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
