# Ado-auth
Projet de Pré-TPI 2020 à l'ETML - Valentin Kaelin

## Installation

Dépendance globale à installer :
- [Node.js](https://nodejs.org/en/download/)

Après avoir installé Node sur votre machine, vérifiez que l'installation s'est bien déroulée en testant les 2 commandes suivantes:

```bash
> node -v
> npm -v
```

Les deux commandes doivent vous retourner respectivement les versions de Node et NPM.  
Si les commandes ne fonctionnent pas, essayez de relancer votre console.  
Si cela ne fonctionne toujours pas, il vous faut ajouter le dossier d'installation de Node.js à vos variables d'environnements.

### Mettre en place l'environnement de développement
Avant de commencer, il vous faut lancer UwAmp avec vos serveurs Apache et MySQL.

Il vous faut ensuite créer une base de données via l'interface PHPmyadmin nommée **adoauth** dans notre cas.

Positionnez-vous à l'emplacement souhaité pour cloner le projet sur votre ordinateur.
```bash
> git clone https://github.com/vkaelin/ado-auth.git
> cd ado-auth/client
> npm install

# Puis

> cd ../server
> npm i -g @adonisjs/cli
> npm install
> copy .env.example .env
```

La configuration de base du fichier **.env** devrait suffire à établir la connexion à la base de données.

Cependant, si vous voulez changer les valeurs par défaut, vous pouvez modifier les valeurs **DB_DATABASE** (pour le nom de la base de données), **DB_USER** et **DB_PASSWORD** (pour le nom et mot de passe de l'utilisateur).

Apres avoir modifié les informations de la base de données, il faut la remplir de contenu fictif à l'aide des commandes suivantes, toujours dans le dossier **server**:

```bash
> adonis key:generate
> adonis migration:run
> adonis seed
```

Il faut ensuite modifier le fichier `hosts` de Windows qui se trouve au chemin suivant: `C:\Windows\System32\drivers\etc`  
Les lignes à ajouter:

```
127.0.0.1 api.retrack.com.localhost
127.0.0.1 retrack.com.localhost
```

### Lancer l'application
Pour lancer l'application, il vous faut 2 consoles ouvertes simultanément, une pour la partie frontend de l'application et l'autre pour le serveur.
```bash
> cd client
> npm run serve

# Et dans la deuxième console:

> cd server
> npm run start
```

L'application est ensuite accessible à l'adresse suivante: [retrack.com.localhost:8080](http://retrack.com.localhost:8080/)

L'api du serveur est accessible à l'adresse suivante: [api.retrack.com.localhost:3333](http://api.retrack.com.localhost:3333/)

Voici les identifiants pour se connecter sur le site:
```
email: johndoe@gmail.com
mot de passe: 1234
```

Le compte dispose de quelques projects avec des tâches fictives. Il est possible de créer une facture pour l'un de ces projets (seul le projet **NBA Website** contient des tâches).
