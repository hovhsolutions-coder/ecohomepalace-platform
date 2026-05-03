'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/tracking';

export function ThanksTracking() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const service = searchParams.get('service');
    const city = searchParams.get('city');

    trackEvent('funnel_completed', {
      page: 'thanks',
      service: service || undefined,
      city: city || undefined,
    });
  }, [searchParams]);

  return null;
}
