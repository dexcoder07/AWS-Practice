FROM nginx
COPY ./*.html /usr/share/nginx/html/
COPY ./*.css /usr/share/nginx/html/
COPY ./*.js /usr/share/nginx/html/
COPY ./*.svg /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf