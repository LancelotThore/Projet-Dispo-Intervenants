## 20/12/2024
    - Itération 13 : Ajouter une disponibilité
    - Itération 14 : Supprimer une disponibilité
    - Itération 15 : Edition d’une disponibilité
    - Itération 16 : Disponibilités par défaut
    - Itération 17 : Gestion des disponibilités des intervenants par l’administrateur
    - Itération 18 : Export JSON
    - Itération 19 : Upgrade : la date
    - Itération 20 : Les semaines à saisir - upgrade BDD
    - Itération 21 : Import

## 13/12/2024
    - Itération 10 : Protection de l'accès au dashboard d’administration
    - Itération 12 : Visualisation des disponibilités pour l’intervenant identifié

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

# Format pour import à mettre dans un fichier json
    [
        {
            "intervenant": "marc.tanguy@unilim.fr",
            "workweek": {
                "S37": 4,
                "S38": 8,
                "S39": 12,
                "S40": 16,
                "S41": 2,
                "S4": 5,
                "S5": 8,
                "S8": 12
            }
        },
        {
            "intervenant": "yannick.boudon@unilim.fr",
            "workweek": {
                "S37": 4,
                "S38": 8,
                "S49": 12,
                "S40": 16,
                "S41": 2,
                "S42": 5,
                "S5": 8,
                "S6": 12
            }
        },
        {
            "intervenant": "test@test",
            "workweek": {
                "S37": 4,
                "S38": 8,
                "S39": 12,
                "S40": 16,
                "S41": 2,
                "S4": 5,
                "S5": 8,
                "S6": 12
            }
        }
    ]