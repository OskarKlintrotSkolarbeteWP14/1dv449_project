# Väderapplikation, _slutprojekt i 1dv449_

## Inledning

Tanken från början var att göra en väderapplikation som knöt an till projektet i 1dv409 som fortgick parallelt. Idén var att skapa ett eget API som detta projektet skulle konsumera. Denna idé övergavs för att kunna använda https och därmed Service Workes. Genom att använda Service Workers går det väldigt enkelt att göra applikationen körbar även offline. Testa till exempel att gå in på undertecknads applikation från [RIA-kursen](https://www.figurkoder.se/) och stänga av internet genom att använda till exempel Chrome DevTools. Det går till och med att gå in på sidan eller uppdatera sidan offline!

Problemet som uppstod var att de API:er som tänktes utnyttjas inte fungerade över https och därmed kunde inte heller applikationen använda sig av https. Dessutom tillät inte YR:s API CORS. Detta gjorde att applikationen gick från att använda Geoname API och YR API till Geoname API och SMHI API till Google Places API och SMHI API till Google Places API, Geoname API och SMHI API. Hängde ni med?

Själva applikation använde sig av just applikationen från RIA-kursen som en boilerplate för att inte behöva börja från början med applikation. Applikationerna använder sig nämligen av samma teknik, React och Redux som byggs till en minifierad JavaScript-fil och körs enbart på klientsidan och hostas hos GH-pages. Det var när applikationen publicerades och den istället för att använda sig av webpack dev server istället kördes på klientsidan som upptäckten att YR inte tillåter CORS gjordes. CSS ramverket Bootstrap har används.

## Sekvensdiagram

För att förstå hur flödet ser ut i en Redux applikation kan man titta på följande bild, lånad från ett [blogginlägg från RIA-kursen](http://2dv607.oskarklintrot.se/redux-devtools/):

![Redux Workflow](pics/ReduxWorkflow.png)

Flödet är alltså enkelriktat och i applikationen används ett bibliotek för att knyta ihop React (som är motsvarande "View Provider" i bilden) med Redux. Detta biblioteket gör det dels möjligt för React-komponenterna att använda sig av Redux' actions samt Redux' store's state. När staten ändras i Redux' store uppdateras just de värdena i de React-komponenterna som prenumererar på de värdena i staten. När de ändras uppdateras React's virtual DOM som i sin tur ser till att enbart det som faktiskt har ändrats i browserns DOM uppdateras.

Nedan följer ett UML sekvensdiagram över hur det ser ut när en användare gör en lyckad förfrågan över hur vädret ser ut på en ort:

![UML Sequence Diagram](pics/UMLSequenceDiagram.png)

Det som kan vara värt att notera är att Geoname API enbart används, som det står i kommentaren, för att få tag i geonameId till orten. Detta id används för att kunna skapa en länk till prognosen hos SMHI. I flödet är det lätt att få intrycket att denna länk kommer att dyka upp oavsett om applikationen faktiskt lyckas hämta väderrapporten eller inte eftersom de två flöderna ser ut, och är, åtskiljda från varandra. Det finns dock en logik i komponenten som renderar väderrapporten att den inte ska rendera något om det inte gick att hämta väderrapporten. Eftersom väderrapporten är prioriterad kommer den alltid att skrivas ut om det gick att hämta vädret, även om det inte gick att hämta något geonameId. Det som händer då istället är att det skrivs ut en generell länk till SMHI:s startsida.

## Säkerhet och prestanda

### CSS först, JS sist

### Minifierade filer

Alla CSS filer borde vara minifierade till en [1], vilket tyvärr inte är fallet. Detta på grund av tidsbrist till att lära mig hur det fungerar att minifiera med hjälp av webpack, som jag använder för att bygga sidan. Dock används den minifierade versionen av Bootstrap. När det gäller Javascript-filerna är allt minifierat till en enda boundle för att minska HTTP-anropen och minska storleken på filerna [1].

### Caching

#### Localstorage

När en användare söker efter vädret i applikation cachas responsen i browserns localstorage. Detta göra att nästa gång användaren söker efter vädret på en ort som den redan har sökt för hämtas datan istället från localstorage, vilket går snabbare samt reducerar antalet requests till SMHI:s API [1].

#### Cloudeflare

Besöker man sidan genom http://weather.oskarklintrot.se/ hämtas en cachad version från Cloudeflare från någon av deras 74 datacenter stora CDN, vilket även det gör att sidan kan laddas snabbare [1].

### Virtual DOM

React använder sig av deras så kallade Virtual DOM. Det fungerar genom att alla ändringar som görs i applikationen skrivs till deras virtuella DOM istället för browserns DOM. Sedan jämförs innehållet i den virtuella DOM:en med browserns DOM och enbart det som skiljer uppdateras. Detta går snabbare än att hela tiden uppdatera hela browserns DOM [2].

### Escaping/Sanatizing

Något som är värt att nämna kring säkerhet och React som är viktigt när det gäller att använda API:er är att React själv sköter escaping/sanatizing av datan från API:erna (och all annan data som ska renderas som inte är skrivet i JSX i själva komponenten) innan den skrivs ut till klienten [3]. Har alltså exempelvis SMHI:s API blivit hackat och någon försöker göra en XSS genom att lägga in script i deras API kommer den datan inte göra någon skada, förutom att det kommer att se märkligt ut när temperaturen istället består av Javascript kod.

## Offline-first

## Risker

## Egna reflektioner och funderingar

## Betygshöjande delar

## Referenser

[1] Steve Souders, _High Performance Web Sites_. Sebastopol, CA: O'Reilly, 2007.

[2] Facebook, _Advanced Performance_. 2016. Available: https://facebook.github.io/react/docs/advanced-performance.html. Accessed 15 Jan 2016

[3] Facebook, "Adding Markdown," in _Tutorial_, 2016. Available: http://facebook.github.io/react/docs/tutorial.html#adding-markdown. Accessed 15 Jan 2016
