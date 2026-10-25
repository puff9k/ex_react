IA : vu que j'ai qu'une seule mission, les attendus idéaux seraient :
					Faire un maximum avec l'IA pour être plus efficace, avec comme seule condition d'être capable de comprendre, modifier et refaire parfaitement, pour avoir un niveau de modification personnalisée qui n'est pas compromis du tout

Raison : probabilité élevée que quand j'écrive du code et demande une review à l'IA, il me sorte quelque chose de plus optimal | Mais quand le code grossira, il sera moins efficace, d'où l'utilité d'absolument tout connaître

expliquer avec le repo git :
Header et Footer comme des directives AngularJs, comme fonction à exporter. Importés dans src/app/layout.tsx, qui sera à son tour importé dans tous les fichiers avec header / footer
-> imbrication de composants les uns dans les autres, chacun importe et s'exporte

Next : routing -> chaque dossier de src/app est l'url, affiche le fichier dans le dossier, permet routes dynamiques
!!! Aucune config de route à faire : l'architecture des dossiers suffit. Dossier entre crochets pour url dynamique

Noms réservés next.js :
layout.tsx : cadre autour des pages, par exemple header et footer
loading.tsx : affiché pendant que la page attend ses données
error.tsx : affiché si erreur pendant le rendu
not-found.tsx : 404
route.ts : route d'api qui renvoie des données et non une page
autres fichiers à la racine src/app, comme les .css, ne créent pas de routes, sont importées par composants

css : globals.css, appliqué partout, puis les *.modules.css, importés par les composants
Next gère aussi composants soit serveur, soit client. Serveur = pas de click, acces bdd. Sinon "use client"
Exemple : header.tsx : serveur, affiche seulement liens. Form.tsx : gère l'état du formulaire
Règle : max de code côté serveur

Prisma : bdd, remplace php
prisma/schema.prisma : décrit la base : genere scripts de création
prisma.ts : crée une connexion à la bdd exportable (comme php)
src/lib/messages.ts : fonctions utilitaires get
api sert aux ressources externes, comme un autre site
