import axiosInstance from "../axios/AxiosInstance";

const publicVapidKey =
  "BOs8YqvNu4T2WtVG-33AMpVHF43Cga7TtOCUxKp1sGTYRF5D9L9VXgLXGg4dWoPXde1PsjjOxA2qjAtGeRkdg6s";

// Check for service worker
export const addNotification = async() => {
   
            if ("serviceWorker" in navigator) {
                send().catch(err => console.error(err));
              }
}


// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/service-worker.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");

  // Send Push Notification
  console.log("Sending Push...");
  let res = await axiosInstance.post("http://localhost:5000/web-push/subscribe", 
   {
        from:"web",
        subscription
    }
  ).catch((err)=>{console.log(err)});
  console.log("Push Sent...",res);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
