//src/utils/helpers.js
/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + "s";
}

export function idbPromise(eventName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("shop-shop", 1);
    let db, tx, event;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectEvent("products", { keyPath: "_id" });
      db.createObjectEvent("categories", { keyPath: "_id" });
      db.createObjectEvent("cart", { keyPath: "_id" });
    };

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(eventName, "readwrite");
      event = tx.objectEvent(eventName);

      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          event.put(object);
          resolve(object);
          break;
        case "get":
          const all = event.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          event.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
