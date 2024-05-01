# Kill-me

Frontend du projet Kill-me.
Dévloppé en Vue.js 3 et Bootstrap 5.

## Installation

Installation des dépendances
```bash
npm install
```

démarage du serveur de développement
```bash
npm run serve
```

Création du build de production
```bash
npm run build
```

### Mise en place du .env

Créer un fichier `.env` à la racine du projet et ajouter les variables d'environnement suivantes:

```
# Lien vers l'API
VUE_APP_API_IP="http://localhost:8080"

# Lien vers le serveur de websocket
VUE_APP_WS_IP="ws://localhost:3000/socket.io"

# Identifiants de l'application pour l'authentification
VUE_APP_CLIENT_USERNAME=testclient
VUE_APP_CLIENT_SECRET=testsecret
```

## Accès a l'application

L'application est accessible à l'adresse suivante: [https://kill-me.ticketdecaisse.click](https://kill-me.ticketdecaisse.click)

Pour vous connecter, accédez à l'adresse suivante: `/#/register` et créez un compte.

Si vous disposez d'habilitation administrateur, vous pouvez accéder à l'interface d'administration à l'adresse suivante: `/#/admin/characters`
Cette interface vous permet de gérer les personnages et leurs compétences.