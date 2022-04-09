# Navodila za naložitev
1. Naložite si Node.js (https://nodejs.org/en/)
2. Klonirajte repozitorij
3. V command promptu zaženite ukaz "npm install"
4. Nato zaženite ukaz "npm audit fix"
5. In še zadnji ukaz "npm start" ki bo zagnal server na http://localhost:8080
6. Probajte če deluje strežnik z http://localhost:8080/users


# Navodila za uporabo
## User

1. GET  /users
Vrne podatke o vseh uporabnikih.

2. GET /users/:id 
Vrne podatke o uporabniku, ki ima ta id.
Če ne obstaja vrne status 404 in sporočilo o napaki.
Uporabimo ga v primeru, če se bo v aplikaciji shranjeval le ID uporabnika, drugače pa verjetno nima nobenega pomena.

3. POST /users
Ustvari uporabnika in vrne njegove podatke ter status 201.
Če že obstaja uporabnik s takim imenom vrne status 400 in sporočilo o napaki.
V telo je treba vstaviti "username","email" in "password".
Uporabimo ga pri registraciji.

4. POST /users/login
Preveri če obstaja uporabnik s takšnim imenom in geslom.
Če obstaja vrne status 200 in podatke o uporabniku.
Če ne obstaja vrne status 400 in sporočilo o napaki.
Uporabimo ga pri prijavi.

## Storage

1. GET  /storage \
Vrne podatke o vseh zalogah.\

2. GET /storage/:id \
Vrne podatke o zalogi, ki je v lasti uporabnika s tem id-jem.\
Če ne obstaja vrne status 404 in sporočilo o napaki.\
Uporabimo ga kadar želimo pridobiti oz. prikazati zalogo prijavljenega uporabnika.\
Predvidevam da bo id prijavljenega uporabnika globalno shranjen v aplikaciji. In s tem id-jem boš lahko dostopal do uporabnikove zaloge.\

3. PUT /storage/add/:id\
V zalogo, ki je v lasti uporabnika s tem id-jem, dodamo količino ene sestavine.\
V telo je treba vstaviti "ingredient_name" (to je ime sestavine) in "ingredient_size" (ki je v obliki "{število} {merska enota}")\
Vrne status 404 in sporočilo o napaki, če ne najde zaloge.\
Vrne status 400 in sporočilo o napaki, če število v "ingredient_size" ni pozitivno.\
Vrne status 200 in zalogo, če je sestavina bila uspešno dodana.\
Uporabimo kadar dodajamo sestavino v zalogo.\

4. PUT /storage/reduce_manual/:id\
V zalogo, ki je v lasti uporabnika s tem id-jem, zmanjšamo količino ene sestavine.\
V telo je treba vstaviti "ingredient_name" (to je ime sestavine) in "ingredient_size" (ki je v obliki "{število} {merska enota}")\
Vrne status 404 in sporočilo o napaki, če ne najde zaloge.\
Vrne status 400 in sporočilo o napaki, če število v "ingredient_size" ni pozitivno ali če je razlika negativna.\
Vrne status 200 in zalogo, če je sestavina bila uspešno zmanjšana.\
Uporabimo kadar ročno zmanjšamo količino sestavine v zalogi. Ne vem če boš lahko v aplikaciji ročno odstranjeval sestavine, ampak sem vseeno za vsak slućaj napisal.\


## Recipe
