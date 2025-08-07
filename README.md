# 🍕 Pizza Store - Nowoczesna Aplikacja E-commerce (SPA)

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-%2361DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-4.9.4-%233178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Redux_Toolkit-1.9.1-%23764ABC?logo=redux" alt="Redux Toolkit">
  <img src="https://img.shields.io/badge/SCSS-1.56.2-%23CC6699?logo=sass" alt="SCSS">
  <img src="https://img.shields.io/badge/PayPal-Integration-%2300457C?logo=paypal" alt="PayPal">
</div>

## 🚀 Wprowadzenie

Pizza Store to w pełni funkcjonalna aplikacja internetowa typu Single-Page Application (SPA) symulująca sklep z pizzą. Projekt demonstruje zastosowanie nowoczesnych praktyk i narzędzi w ekosystemie React:

- Zarządzanie stanem za pomocą Redux Toolkit
- Silne typowanie z TypeScript
- Dynamiczne ładowanie komponentów
- Integracja z zewnętrznymi usługami płatności

Aplikacja zaprojektowana z myślą o **wydajności**, **skalowalności** i **łatwości utrzymania kodu**.

## ✨ Kluczowe Funkcjonalności

- **Dynamiczne Wyszukiwanie i Filtrowanie**  
  Wyszukiwanie pizz po nazwie z optymalizacją przez `lodash.debounce`
- **Kategorie i Sortowanie**  
  Filtrowanie po kategoriach (mięsne, wegetariańskie) i sortowanie (cena, popularność, nazwa)
- **Zarządzanie Koszykiem**  
  Dodawanie/usuwanie produktów, modyfikacja ilości
- **Synchronizacja Stanu**  
  Stan koszyka i filtrów synchronizowany z URL i localStorage
- **Code Splitting**  
  Dynamiczne ładowanie stron (React.lazy + Suspense)
- **Szkielety Ładowania**  
  Animowane placeholdery podczas ładowania danych
- **Płatności PayPal**  
  Integracja z systemem płatności
- **Responsywny Interfejs**  
  Dostosowany do wszystkich rozmiarów ekranów

## 🏗️ Architektura i Technologie

### 1. Zarządzanie Stanem - Redux Toolkit
Stan aplikacji podzielony na trzy logiczne części:

| Slice          | Funkcjonalność                                                                 |
|----------------|--------------------------------------------------------------------------------|
| `pizzaSlice`   | Przechowywanie stanu pobranych pizz i statusu żądania (`loading/success/error`) |
| `filterSlice`  | Zarządzanie UI: kategorie, sortowanie, paginacja, wyszukiwanie (synchronizacja z URL) |
| `cartSlice`    | Logika koszyka z persistencją w localStorage i dynamicznym przeliczaniem cen |

### 2. Routing i Optymalizacja
- **React Router v6** do nawigacji
- **Dynamiczne importy** (React.lazy) dla stron:
  ```tsx
  const Home = React.lazy(() => import('./pages/Home'))
  const Cart = React.lazy(() => import('./pages/Cart'))
  ```
- **Suspense** dla płynnych przejść:
  ```tsx
  <Suspense fallback={<Loader />}>
    <Routes>...</Routes>
  </Suspense>
  ```

### 3. Integracja Płatności PayPal
```tsx
<PayPalScriptProvider options={{ "client-id": "test" }}>
  <PayPalButtons
    createOrder={(data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: { value: totalPrice }
        }]
      })
    }}
    onApprove={async (data, actions) => {
      await actions.order.capture()
      // Finalizacja zamówienia
    }}
  />
</PayPalScriptProvider>
```

### 4. Konfiguracja TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "include": ["src", "src/@types"]
  }
}
```

## 📂 Struktura Projektu

```
.
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── pizzaDB.json
│   ├── components/
│   │   ├── PizzaBlock/
│   │   ├── PayPal/
│   │   ├── Search/
│   │   └── index.ts
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── pages/
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── cart/
│   │   │   ├── filter/
│   │   │   └── pizzaSlice.ts
│   │   └── store.ts
│   ├── scss/
│   └── utils/
├── package.json
└── tsconfig.json
```

## 🛠️ Zależności

| Paczka                   | Wersja  | Funkcjonalność                     |
|--------------------------|---------|------------------------------------|
| react                    | 18.2.0  | Biblioteka UI                      |
| typescript               | 4.9.4   | Statyczne typowanie                |
| @reduxjs/toolkit         | 1.9.1   | Zarządzanie stanem                 |
| react-router-dom         | 6.5.0   | Routing                            |
| @paypal/react-paypal-js  | 7.8.2   | Integracja płatności               |
| sass                     | 1.56.2  | Preprocesor CSS                    |
| lodash.debounce          | 4.0.8   | Optymalizacja wyszukiwania         |
| react-content-loader     | 6.2.0   | Szkielety ładowania                |

## 🔮 Potencjalne Ulepszenia

1. **Backend**  
   Zastąpienie mock-API prawdziwym backendem (Node.js + Express)
2. **Testy Automatyczne**  
   Rozbudowa testów jednostkowych (Jest + React Testing Library)
3. **Uwierzytelnianie**  
   System logowania/rejestracji użytkowników
4. **Optymalizacja Mediów**  
   Leniwe ładowanie obrazów + format WebP
5. **Dostępność (A11y)**  
   Implementacja ARIA i nawigacji klawiszowej
