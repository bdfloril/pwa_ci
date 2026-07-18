console.log("=================================");
console.log("CUSTOM SW NUEVO FUNCIONANDO");
console.log("=================================");

self.addEventListener("install", () => {
    console.log("INSTALL");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {

    console.log("ACTIVATE");

    event.waitUntil(self.clients.claim());

});

self.addEventListener("fetch", (event) => {

    console.log("FETCH:", event.request.url);

});

self.addEventListener("message", (event) => {

    console.log("MENSAJE RECIBIDO");

    console.log(event.data);

});