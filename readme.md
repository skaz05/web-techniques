Salutare,

Acesta este proiectul meu la materia 'Tehnici Web', in cadrul FMI UB.
Site-ul este despre o firma de administrare a serverelor, ce include si servicii
de monitorizare, scalare si management automatizat de resurse, precum si vanzarea 
elementelor necesare (hardware, software, etc.) pentru un business.
In site se pot regasi urmatoarele pagini:
Pagini ale site-ului:
- index
    - aici sunt afisate produsele, este pagina catchy pe care o vede utilizatorul.
- side page
    - aici sunt descrise produsele mai detaliat
        > download link
        > mathML formula

- gallery
    - static:
        - contine imagini relevante pentru a afisa produsele oferite in actiune
    - dynamic:
        - aceleasi poze dar cu un profil dinamic, cu animatii
- products
    - listing-ul de produse tras din baza de date (incl. pret, categorie, descriere etc.)
    + in aceasta pagina se gasesc si filtre
- register
    - aici se poate crea user account
- pagini eroare:
    - error 403
    - error 404
    - general/generic error

+ site-uri inspiratie:
    - https://www.accenture.com/ro-en/services/software-engineering/devops
    - https://www.veritis.com/solutions/devops/
    - https://invozone.com/devops/
    - https://www.dataart.com/services/devops

-----------
[schema-cromatica] Schema de culori aleasa (pe tema light):

    --bg-color: #F2F2F2;
    --text-color: #333;
    --header-bg-color: #D0BDF4;
    --main-bg-color: #F8F9FA;
    --footer-bg-color: #E6E0F0;
    --link-color: #8A5CFF;
    --link-hover-color: #6A3BFF;
    --button-bg-color: #8A5CFF;
    --button-hover-bg-color: #6A3BFF;
    --border-color: #D1C8E2;
    --area_1_background_color: #F9F9F9;

    Am mers pe nuante de mov-alb-gri deoarece sunt usor de privit, lizibile si cu un aspect modern.

[layout-responsive] grid-ul a fost facut pe pagina main index
[stilizare-taburi] facut in side_page
[stilizare-linkuri] facut in css comun ('common.css')
[galerie-animata] facut cu efecte proprii
[galerie-statica] (*) facut cu efecte proprii, fara grila 5x3 cu 2x2 si 4x2 alb
[efect-css-reflexie-text] - incercat in main index page, dar n-a iesit asa bine
[efect-css-stilizare-hr] facut pe pagina main sub tabel
------------
// completari:
+ cap I - 
    link download  -- pus in side_page
    verificare erori -- verificat acelasi html de ultima oara -> fara erori acum (???)
+ javascript client
    etapa 6
+ model examen
    de aruncat un ochi


order:
etapa 6
etapa 2
cerinte bootstrap
model examen


stilizare-tabel
variante-meniu - scss