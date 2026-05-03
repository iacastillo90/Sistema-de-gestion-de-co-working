/**
 * Utility for safe localStorage access.
 * Handles cases where localStorage might be blocked or throws errors (e.g. private mode).
 */

export const storage = {
  get(key, defaultValue = null) {
    try {
      const value = window.localStorage.getItem(key);
      if (value === null) return defaultValue;
      
      // Attempt to parse as JSON if it looks like an object/array
      if (value.startsWith('{') || value.startsWith('[')) {
        return JSON.parse(value);
      }
      return value;
    } catch (error) {
      console.warn(`Error reading from localStorage: ${key}`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      window.localStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage: ${key}`, error);
      return false;
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing from localStorage: ${key}`, error);
      return false;
    }
  },

  clear() {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Error clearing localStorage', error);
      return false;
    }
  }
};
