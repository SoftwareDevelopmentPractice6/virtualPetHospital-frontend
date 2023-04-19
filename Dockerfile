FROM node:19.8.1
WORKDIR /docker/virtualPetHospital/frontend

COPY . /docker/virtualPetHospital/frontend
WORKDIR /docker/virtualPetHospital/frontend/panorama-ui
RUN npm install

WORKDIR /docker/virtualPetHospital/frontend/pet-hospital-ui
RUN npm install

WORKDIR /docker/virtualPetHospital/frontend

RUN chmod 755 run_frontend.sh
EXPOSE 8080 9630

ENTRYPOINT ["./run_frontend.sh"]