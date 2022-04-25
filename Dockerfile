FROM node:14

COPY proxy.mjs .
EXPOSE 9090

CMD [ "node", "proxy.mjs" ]
