const DB_NAME = "bys-upload-db";
const STORE_NAME = "uploads";
const KEY = "last-upload";
const DB_VERSION = 1;

type StoredUpload = {
  file: Blob;
  name: string;
  type: string;
  lastModified: number;
};

function isClient() {
  return typeof window !== "undefined" && typeof indexedDB !== "undefined";
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Could not open upload database."));
  });
}

export async function setPersistedUpload(file: File | null): Promise<void> {
  if (!isClient()) return;

  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      if (file) {
        const payload: StoredUpload = {
          file,
          name: file.name,
          type: file.type,
          lastModified: file.lastModified,
        };
        store.put(payload, KEY);
      } else {
        store.delete(KEY);
      }

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("Could not save upload."));
      tx.onabort = () => reject(tx.error ?? new Error("Upload save was aborted."));
    });
    db.close();
  } catch {
    // Ignore persistence failures (private mode/storage restrictions).
  }
}

export async function getPersistedUpload(): Promise<File | null> {
  if (!isClient()) return null;

  try {
    const db = await openDb();
    const stored = await new Promise<StoredUpload | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(KEY);

      request.onsuccess = () => resolve(request.result as StoredUpload | undefined);
      request.onerror = () => reject(request.error ?? new Error("Could not load upload."));
    });
    db.close();

    if (!stored?.file) return null;
    return new File([stored.file], stored.name, {
      type: stored.type || "application/pdf",
      lastModified: stored.lastModified || Date.now(),
    });
  } catch {
    return null;
  }
}
