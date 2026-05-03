/**
 * Funnel tracking utility for CRO optimization
 * Structured event tracking with session context
 */

export interface TrackingData {
  event: string;
  session_id: string;
  page?: string;
  step?: number;
  service?: string;
  city?: string;
  country?: string;
  homeType?: string;
  urgency?: string;
  budgetRange?: string;
  timestamp: string;
}

// Session management
let sessionId: string | null = null;

function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';
  
  if (!sessionId) {
    const stored = localStorage.getItem('funnel_session_id');
    if (stored) {
      sessionId = stored;
    } else {
      sessionId = crypto.randomUUID();
      localStorage.setItem('funnel_session_id', sessionId);
    }
  }
  
  return sessionId;
}

export function trackEvent(
  eventName: string,
  data?: {
    page?: string;
    step?: number;
    service?: string;
    city?: string;
    country?: string;
    homeType?: string;
    urgency?: string;
    budgetRange?: string;
  }
) {
  const event: TrackingData = {
    event: eventName,
    session_id: getSessionId(),
    timestamp: new Date().toISOString(),
    ...data,
  };

  console.log('[FUNNEL TRACKING]', JSON.stringify(event, null, 2));

  // Store in localStorage for debug view
  if (typeof window !== 'undefined') {
    const history = JSON.parse(localStorage.getItem('funnel_event_history') || '[]');
    history.push(event);
    // Keep only last 50 events
    if (history.length > 50) {
      history.shift();
    }
    localStorage.setItem('funnel_event_history', JSON.stringify(history));
  }
}

export function getFunnelHistory(): TrackingData[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('funnel_event_history') || '[]');
}

export function clearFunnelHistory() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('funnel_event_history');
  }
}

