# Väderapplikation, _slutprojekt i 1dv449_

## Inledning

Tanken från början var att göra en väderapplikation som knöt an till projektet i 1dv409 som fortgick parallelt. Idén var att skapa ett eget API som detta projektet skulle konsumera. Denna idé övergavs för att kunna använda https och därmed Service Workes. Genom att använda Service Workers går det väldigt enkelt att göra applikationen körbar även offline. Testa till exempel att gå in på undertecknads applikation från [RIA-kursen](https://www.figurkoder.se/) och stänga av internet genom att använda till exempel Chrome DevTools. Det går till och med att gå in på sidan eller uppdatera sidan offline!

Problemet som uppstod var att de API:er som tänktes utnyttjas inte fungerade över https och därmed kunde inte heller applikationen använda sig av https. Dessutom tillät inte YR:s API CORS. Detta gjorde att applikationen gick från att använda Geoname API och YR API till Geoname API och SMHI API till Google Places API och SMHI API till Google Places API, Geoname API och SMHI API. Hängde ni med?

Själva applikation använde sig av just applikationen från RIA-kursen som en boilerplate för att inte behöva börja från början med applikation. Applikationerna använder sig nämligen av samma teknik, React och Redux som byggs till en minifierad JavaScript-fil och körs enbart på klientsidan och hostas hos GH-pages. Det var när applikationen publicerades och den istället för att använda sig av webpack dev server istället kördes på klientsidan som upptäckten att YR inte tillåter CORS gjordes. CSS ramverket Bootstrap har används.

## Sekvensdiagram

För att förstå hur flödet ser ut i en Redux applikation kan man titta på följande bild, lånad från ett [blogginlägg från RIA-kursen](http://2dv607.oskarklintrot.se/redux-devtools/):

![Redux Workflow](pics/ReduxWorkflow.png)

Flödet är alltså enkelriktat och i applikationen används ett bibliotek för att knyta ihop React (som är motsvarande "View Provider" i bilden) med Redux. Detta biblioteket gör det dels möjligt för React-komponenterna att använda sig av Redux' actions samt Redux' store's state. När staten ändras i Redux' store uppdateras just de värdena i de React-komponenterna som prenumererar på de värdena i staten. När de ändras uppdateras React's virtural DOM som i sin tur ser till att enbart det som faktiskt har ändrats i browserns DOM uppdateras.

Nedan följer ett UML sekvensdiagram över hur det ser ut när en användare gör en lyckad förfrågan över hur vädret ser ut på en ort:

![UML Sequence Diagram](pics/UMLSequenceDiagram.png)

Det som kan vara värt att notera är att Geoname API enbart används, som det står i kommentaren, för att få tag i geonameId till orten. Detta id används för att kunna skapa en länk till prognosen hos SMHI. I flödet är det lätt att få intrycket att denna länk kommer att dyka upp oavsett om applikationen faktiskt lyckas hämta väderrapporten eller inte eftersom de två flöderna ser ut, och är, åtskiljda från varandra. Det finns dock en logik i komponenten som renderar väderrapporten att den inte ska rendera något om det inte gick att hämta väderrapporten. Eftersom väderrapporten är prioriterad kommer den alltid att skrivas ut om det gick att hämta vädret, även om det inte gick att hämta något geonameId. Det som händer då istället är att det skrivs ut en generell länk till SMHI:s startsida.

## Säkerhet och prestanda



## Offline-first

## Risker

## Egna reflektioner och funderingar

## Betygshöjande delar
