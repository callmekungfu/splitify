export class LS {
  static put(key: string, item: any) {
    const str = JSON.stringify(item);
    localStorage.setItem(key, str);
  }

  static get<T = any>(key: string): T {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
