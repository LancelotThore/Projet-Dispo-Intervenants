## 13/12/2024
    - Itération 10 : Protection de l'accès au dashboard d’administration
    
    - Itération 12 : Visualisation des disponibilités pour l’intervenant identifié 
    mais problème pour les semaines où il y a des exceptions toutes les données de la semaine sont remplacées même les jours de la semaine où il y n'y a rien de préciser par exemple :
    
    {
        "default": [{
            "days": "lundi, mardi, mercredi, jeudi, vendredi",
            "from": "8:00",
            "to": "19:30"
        }],
        "S51": [{
            "days": "lundi, mercredi",
            "from": "9:00",
            "to": "11:30"
        }]
    }
    lundi et mercredi ont les bonnes informations mais le mardi, jeudi et vendredi sont vides

## 06/11/2024
    - Itération 7 : Création de la page Gestion des intervenants - édition
    - Itération 8 : Création de la page Gestion des intervenants - régénérer la clé
    - Itération 11 : Accès par clé

## 29/11/2024
    - Itération 2 : Création du dashboard (vide) d’administration
    - Itération 4 : Création de la page Gestion des intervenants - lecture
    - Itération 5 : Création de la page Gestion des intervenants - suppression
    - Itération 6 : Création de la page Gestion des intervenants - ajout
    - Itération 9 : [BDD] Ajout des administrateurs
    
## 22/11/2024
    - Itération 0 : Mise en place de l’environnement de développement
    - Itération 1 : Configuration du projet Next.js
    - Itération 3 : [BDD] Ajouts des intervenants


# .env
    AUTH_SECRET=your-secret-key

# Generate key
    openssl rand -base64 32