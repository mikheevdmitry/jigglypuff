const STORAGE = localStorage;

export default class Storage {
  static set(key, data) {
    data = JSON.stringify(data);
    STORAGE.setItem(key, data);
  }

  static get(key) {
    const data = STORAGE.getItem(key);
    return JSON.parse(data);
  }

  static clear() {
    STORAGE.clear();
  }
}
