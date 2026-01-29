// src/services/analytics.js
import ReactGA from "react-ga4";

export function trackPageView(section) {
    ReactGA.send({
        hitType: "pageview",
        page: `/${section}`,
        title: section,
    });
}

export function trackEvent(name, properties = {}) {
    ReactGA.event(name, properties);
}
