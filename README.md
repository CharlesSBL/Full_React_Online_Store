
🍕 Pizza Store - Nowoczesna Aplikacja E-commerce (SPA)

![alt text](https://img.shields.io/badge/React-18.2.0-%2361DAFB?logo=react)


![alt text](https://img.shields.io/badge/TypeScript-4.9.4-%233178C6?logo=typescript)


![alt text](https://img.shields.io/badge/Redux_Toolkit-1.9.1-%23764ABC?logo=redux)


![alt text](https://img.shields.io/badge/SCSS-1.56.2-%23CC6699?logo=sass)


![alt text](https://img.shields.io/badge/PayPal-Integration-%2300457C?logo=paypal)

🚀 Wprowadzenie

Pizza Store to w pełni funkcjonalna aplikacja internetowa typu Single-Page Application (SPA) symulująca sklep z pizzą. Projekt ten demonstruje zastosowanie nowoczesnych praktyk i narzędzi w ekosystemie React, takich jak zarządzanie stanem za pomocą Redux Toolkit, silne typowanie z TypeScript, dynamiczne ładowanie komponentów oraz integrację z zewnętrznymi usługami płatności.

Aplikacja została zaprojektowana z myślą o wydajności, skalowalności i łatwości w utrzymaniu kodu.

✨ Kluczowe Funkcjonalności

Dynamiczne Wyszukiwanie i Filtrowanie: Użytkownicy mogą wyszukiwać pizze po nazwie, a zapytania są optymalizowane dzięki lodash.debounce.

Kategorie i Sortowanie: Możliwość filtrowania produktów po kategoriach (np. mięsne, wegetariańskie) oraz sortowania według ceny, popularności i nazwy.

Zarządzanie Koszykiem: Pełna obsługa koszyka z możliwością dodawania, usuwania i modyfikowania liczby produktów.

Synchronizacja Stanu: Stan koszyka oraz filtry są synchronizowane z parametrami URL i localStorage, co zapewnia spójne doświadczenie użytkownika nawet po odświeżeniu strony.

Code Splitting: Strony aplikacji (Home, Cart, FullPizza) są ładowane dynamicznie (React.lazy i Suspense), co znacząco skraca czas ładowania początkowego.

Szkielety (Skeletons): Podczas ładowania danych z API, interfejs użytkownika wyświetla animowane "szkielety" komponentów, poprawiając User Experience.

Płatności PayPal: Integracja z systemem płatności PayPal za pomocą biblioteki @paypal/react-paypal-js do finalizacji transakcji.

Responsywność: Interfejs jest dostosowany do różnych rozmiarów ekranów.

🏗️ Dogłębna Analiza Architektury i Technologii
1. Zarządzanie Stanem - Redux Toolkit

Centralnym punktem logiki biznesowej jest magazyn Redux, zaimplementowany przy użyciu Redux Toolkit, co upraszcza konfigurację i redukuje ilość kodu boilerplate. Stan aplikacji został podzielony na trzy logiczne części (slices):

pizzaSlice.ts: Odpowiada za przechowywanie stanu pobranych pizz, w tym listy produktów oraz statusu żądania (loading, success, error). Wykorzystuje createAsyncThunk (fetchPizzas) do asynchronicznego pobierania danych z API, automatycznie zarządzając stanami pending, fulfilled i rejected.

filterSlice.ts: Zarządza stanem interfejsu użytkownika, takim jak aktywna kategoria, typ sortowania, aktualna strona paginacji oraz wartość w polu wyszukiwania. Zmiany w tym stanie są synchronizowane z parametrami URL za pomocą biblioteki qs.

cartSlice.ts: Odpowiada za stan koszyka. Zawiera logikę dodawania, usuwania i modyfikowania produktów. Po każdej zmianie stan koszyka jest serializowany do formatu JSON i zapisywany w localStorage, co zapewnia persystencję danych. Całkowita cena jest dynamicznie przeliczana i przechowywana w stanie.

2. Routing i Optymalizacja Wydajności

Aplikacja wykorzystuje React Router v6 do nawigacji. Kluczową cechą jest implementacja Code Splitting:

React.lazy: Główne komponenty stron (Home, Cart, FullPizza, NotFound) są importowane dynamicznie. Dzięki temu kod każdej strony jest ładowany w osobnym "kawałku" (chunk) dopiero w momencie, gdy użytkownik przechodzi do danej ścieżki.

Suspense: Otacza dynamicznie ładowane komponenty, wyświetlając wskaźnik ładowania (np. <div>Loading...</div>), co zapobiega "mruganiu" interfejsu i zapewnia płynne przejścia.

Ta strategia znacząco zmniejsza rozmiar początkowego pakietu JavaScript, co prowadzi do szybszego czasu Time to Interactive (TTI).

3. Integracja Płatności PayPal

Płatności realizowane są przez komponent <Paypal />, który wykorzystuje bibliotekę @paypal/react-paypal-js.

<PayPalScriptProvider />: Komponent ten jest dostawcą kontekstu, który zarządza ładowaniem skryptu PayPal JS SDK z odpowiednimi opcjami (w tym client-id).

<PayPalButtons />: Komponent renderujący przyciski płatności. Jego kluczowe właściwości to:

createOrder: Funkcja wywoływana, gdy użytkownik klika przycisk płatności. Tworzy ona zamówienie, przekazując do PayPal informacje takie jak opis i całkowita kwota (totalPrice pobierana z Redux).

onApprove: Funkcja wywoływana po pomyślnym zatwierdzeniu płatności przez użytkownika. Przechwytuje ona transakcję (actions.order.capture()) i finalizuje proces.

onError i onCancel: Obsługują scenariusze błędów i anulowania płatności.

4. Konfiguracja TypeScript (tsconfig.json)

Konfiguracja TypeScript została dostosowana do nowoczesnego środowiska React:

"strict": true: Włącza wszystkie rygorystyczne opcje sprawdzania typów, co minimalizuje ryzyko błędów w czasie wykonania i poprawia jakość kodu.

"jsx": "react-jsx": Umożliwia korzystanie z nowego JSX Transform od React 17+, eliminując potrzebę importowania React w każdym pliku z JSX.

"moduleResolution": "node": Naśladuje strategię rozwiązywania modułów z Node.js, co jest standardem w projektach opartych o NPM.

"include": ["src", "src/@types"]: Informuje kompilator, aby uwzględniał pliki z folderu src oraz niestandardowe definicje typów (np. dla importu plików .svg czy .scss).

📂 Struktura Projektu - Omówienie
code
Code
download
content_copy
expand_less

.
├── README.md
├── build/                  # Wynikowe pliki po procesie budowania (produkcja)
├── public/                 # Statyczne zasoby publiczne
│   └── index.html          # Główny plik HTML aplikacji
├── src/
│   ├── App.tsx             # Główny komponent aplikacji, zarządza routingiem
│   ├── assets/             # Zasoby (obrazy, ikony, pliki .json)
│   │   └── pizzaDB.json    # Lokalna "baza danych" z produktami
│   ├── components/         # Komponenty reużywalne
│   │   ├── PizzaBlock/     # Karta produktu (pizza) wraz ze szkieletem
│   │   ├── PayPal/         # Komponenty związane z płatnością PayPal
│   │   ├── Search/         # Komponent wyszukiwarki
│   │   └── index.ts        # Re-eksport wszystkich komponentów dla czystszych importów
│   ├── layouts/
│   │   └── MainLayout.tsx  # Główny layout strony (zawiera Header i Outlet dla podstron)
│   ├── pages/              # Komponenty-strony (np. Home, Cart)
│   ├── redux/
│   │   ├── slices/         # Logika "plastrów" stanu (slices)
│   │   │   ├── cart/       # Slice, typy i selektory dla koszyka
│   │   │   ├── filter/     # Slice, typy i selektory dla filtrów
│   │   │   └── pizzaSlice.ts # Slice dla produktów (pizz)
│   │   └── store.ts        # Konfiguracja głównego magazynu (store)
│   ├── scss/               # Globalne style i zmienne SCSS
│   └── utils/              # Funkcje pomocnicze (np. obliczanie ceny, obsługa localStorage)
├── package.json            # Definicje projektu i zależności
└── tsconfig.json           # Konfiguracja kompilatora TypeScript
🛠️ Kluczowe Zależności i Ich Rola
Paczka	Wersja	Opis
react	18.2.0	Biblioteka do budowania interfejsów użytkownika.
typescript	4.9.4	Język dodający statyczne typowanie do JavaScript.
@reduxjs/toolkit	1.9.1	Oficjalny, zalecany zestaw narzędzi do efektywnego zarządzania stanem w Redux.
react-redux	8.0.5	Oficjalne powiązania React z Redux.
react-router-dom	6.5.0	Biblioteka do implementacji routingu w aplikacjach React.
axios	1.2.2	Klient HTTP oparty na Promise do wykonywania zapytań do API.
@paypal/react-paypal-js	7.8.2	Oficjalna biblioteka React ułatwiająca integrację z PayPal JS SDK.
sass	1.56.2	Preprocesor CSS dodający zaawansowane funkcje, takie jak zmienne, zagnieżdżanie i mixiny.
qs	6.11.0	Biblioteka do parsowania i formatowania parametrów zapytań URL (query strings).
lodash.debounce	4.0.8	Funkcja do opóźniania wywoływania funkcji, używana w wyszukiwarce do optymalizacji.
react-content-loader	6.2.0	Umożliwia tworzenie animowanych szkieletów (skeleton screens) podczas ładowania danych.
clsx	1.2.1	Narzędzie do warunkowego budowania ciągów klas CSS.
🔮 Potencjalne Ulepszenia i Dalszy Rozwój

Backend: Zastąpienie mock-API (np. mockapi.io) prawdziwym backendem (np. Node.js + Express) do zarządzania produktami, zamówieniami i użytkownikami.

Testy: Rozbudowa testów jednostkowych i integracyjnych (np. za pomocą Jest i React Testing Library) w celu zapewnienia stabilności aplikacji.

Uwierzytelnianie: Dodanie systemu logowania i rejestracji użytkowników, co pozwoli na przechowywanie historii zamówień.

Optymalizacja Obrazów: Wdrożenie leniwego ładowania obrazów oraz serwowanie ich w nowoczesnych formatach (np. WebP) w celu poprawy wydajności.

Dostępność (Accessibility): Poprawa dostępności aplikacji poprzez stosowanie odpowiednich atrybutów ARIA i zapewnienie nawigacji za pomocą klawiatury.