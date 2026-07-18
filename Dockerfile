FROM nginx:alpine 
COPY dist/laboratorio-pwa/browser /usr/share/nginx/html
EXPOSE 80