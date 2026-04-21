/**
 * AnalyticsService - Simulated Analytics Engine for Javamastery
 * In a real production environment, this would push events to 
 * a service like Posthog, Mixpanel, or a Spring Boot API.
 */

class AnalyticsService {
  constructor() {
    this.logs = JSON.parse(localStorage.getItem('javamastery_events') || '[]');
  }

  logEvent(type, payload = {}) {
    const event = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type,
      ...payload
    };

    this.logs.push(event);
    localStorage.setItem('javamastery_events', JSON.stringify(this.logs.slice(-100))); // Keep last 100
    
    // In dev, show tactical feedback
    console.log(`%c[Analytics] ${type}`, 'color: #f89820; font-weight: bold;', payload);
  }

  trackLessonOpen(slug) {
    this.logEvent('LESSON_OPEN', { slug });
  }

  trackCompletion(type, id) {
    this.logEvent('COMPLETION', { category: type, id });
  }

  trackFailure(type, id, metadata = {}) {
    this.logEvent('FAILURE', { category: type, id, ...metadata });
  }

  trackSearch(query) {
    if (query.length > 2) {
      this.logEvent('SEARCH', { query });
    }
  }

  submitFeedback(data) {
    this.logEvent('FEEDBACK_SUBMITTED', data);
  }
}

export const analytics = new AnalyticsService();
