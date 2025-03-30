import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing!');
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, { autocapture: true });
};

export const trackPageView = (url) => {
  if (!MIXPANEL_TOKEN) return;
  
  mixpanel.track('Page View', { page: url });
};
