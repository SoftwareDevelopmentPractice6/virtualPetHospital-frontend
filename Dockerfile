FROM node:19.8.1
WORKDIR /docker/virtualPetHospital/frontend

COPY ./pet-hospital-ui /docker/virtualPetHospital/frontend
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]