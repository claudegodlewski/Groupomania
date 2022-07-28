<h1>Groupomania</h1>

<h2>Introduction</h2>

<p>Le projet consiste à construire un réseau social interne pour les employés de Groupomania.</p>

<br>

<h2>Stack</h2>

<p>L'application a été conçue avec la stack MEVN (MongoDB, Express, Vue.js, et Node.js).</p>
<p>Les données sont stockées via le service de DBaaS (base de données en tant que service) "MongoDB Atlas".</p>

<br>

<h2>Installation</h2>

<p><b>Etape 1</b>: clonez le projet</p>
<p>git clone https://github.com/claudegodlewski/Groupomania.git</p>

<br>

<p><b>Etape 2</b>: initialisez le frontend</p>
<p>cd Groupomania/frontend</p>
<p>npm install && npm install sass-loader -D && npm install node-sass -D && npm run serve</p>

<br>

<p><b>Etape 3</b>: initialisez le backend</p>
<p>cd Groupomania/backend</p>

<br>

<p>Créez un fichier appelé <b>.env</b> avec le contenu suivant:</p>

<p>User='Votre login sur MongoDB Atlas'</p>
<p>Password='Votre password sur MongoDB Atlas'</p>
<p>Cluster='Votre cluster sur MongoDB Atlas (exemple: "cluster0-pme76")'</p>
<p>secretToken='RANDOM_TOKEN_SECRET'</p>

<br>

<p>npm install && nodemon server</p>

<br>

<h2>Installation automatisée (facultatif)</h2>

<p>Si votre système d'information est <b>Debian</b>, vous pouvez utiliser le script suivant</b>:</p>
<a href="https://github.com/claudegodlewski/Misc/blob/main/P7installation" target="_blank">P7installation</a>

<br>

<h2>Spécifications fonctionnelles</h2>

<h3>Connexion</h3>

<p>Une page de connexion permettant à l’utilisateur de se connecter, ou bien</p>
de créer un compte s’il n’en possède pas.</p>
<p>Un utilisateur doit avoir la possibilité de se déconnecter.</p>
<p>La session de l’utilisateur persiste pendant qu’il est connecté.</p>
<p>Les données de connexion doivent être sécurisées.</p>

<h3>Accueil</h3>

<p>Messages listés de façon antéchronologique.</p>

<h3>Messages</h3>

<p>Un utilisateur doit pouvoir créer un message.</p>
<p>Un message doit pouvoir contenir du texte et une image.</p>
<p>Un utilisateur doit pouvoir modifier et supprimer ses messages.</p>

<h3>Likes</h3>

<p>Un utilisateur doit pouvoir aimer un message, une seule fois pour chaque message.</p>

<h3>Administration</h3>

<p>Créer un compte d'administrateur: pouvoir de modification et de suppression des messages.</p>
