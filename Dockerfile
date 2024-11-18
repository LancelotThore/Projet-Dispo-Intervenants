# Utiliser l'image Node.js officielle
FROM node:18

# Créer un répertoire de travail
WORKDIR /ProjectNext-intervenants

# Copier le reste des fichiers de l'application
COPY . .

# Installer les dépendances
RUN npm install

# Installer Next.js globalement
RUN npm install -g next

# Exposer le port sur lequel Next.js va écouter
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]