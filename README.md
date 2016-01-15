# Projekt i 1DV449
Eftersom mycket av kraven är snarlika kraven på projektet i 1DV409 kommer jag att göra en väderapplikation även i 1DV449. Tanken är att göra ett web API i ASP.NET som jag sen konsumerar dels i en ASP.NET MVC-applikation för att uppfylla kraven i 1DV409 och dels en klientbaseras React-applikation för att uppfylla kraven i 1DV449.

**Uppdatering:** Jag valde att inte göra ett API för att kunna köra applikationen utanför skolans VPN och för att kunna använda https och därmed Service Workers. Dock visade det sig att de API:erna jag ville använda varken tillät https eller CORS. Som tur är så är det ju roligare att skriva om kod och byta ut API:er än att implementera funktionalitet...

**Uppdatering 2016-01-15 13:14:** Jag hade helt glömt bort att inkludera körinstruktioner till applikationen! Jag har lagt till dem [nedan](#körinstruktioner) så vill ni testa att köra applikationen lokalt är det bara att följa dem.

# Rapport, presentation och url

Rapporten finns [här](doc/projektRapport.md), presentationen [här](https://youtu.be/9tRsUmutjQU) och applikationen är publicerad [här](http://weather.oskarklintrot.se/).

# Körinstruktioner

Efter att ha klonat repot, installera beroendena:
```
cd <repo folder>
npm install
```

Nu går det att köra applikationen på en lokal webpack dev server med live preview:
```
npm start
```
Servern finns på http://localhost:3000

För att bygga för produktion använd:
```
npm run build
```

Observera att all källkod finns under `src/`!
