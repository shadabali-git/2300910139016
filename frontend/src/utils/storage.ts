export interface UrlData {
  original: string;
  shortCode: string;
  createdAt: number;
}

const STORAGE_KEY = "YaMerriShortKeyHai";

function load(): Record<string, UrlData> {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

function save(data: Record<string, UrlData>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default {
  saveURL(shortCode: string, urlData: UrlData) {
    const data = load();
    data[shortCode] = urlData;
    save(data);
  },

  getURL(shortCode: string): UrlData | null {
    const data = load();
    return data[shortCode] || null;
  },

  getAll(): UrlData[] {
    return Object.values(load());
  },
};
