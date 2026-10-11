# Kalkulator inwestycji

Polska aplikacja webowa według PRD „Kalkulator wzrostu inwestycji i podziału budżetu”, wersja 1.0.

## Uruchomienie
Otwórz `index.html` w przeglądarce. Nie wymaga instalacji ani serwera. Alternatywnie: `python3 -m http.server 8000` i otwórz http://localhost:8000.

## Funkcje
- 1–10 kategorii, udziały z dokładnością 0,01%, miesięczne dopłaty i okres 1–600 miesięcy.
- Efektywne roczne stopy, miesięczne reinwestowanie, koszty zarządzania i uproszczony podatek końcowy.
- Wyniki netto, wkład kategorii do ROI, wykres, harmonogram i trzy edytowalne scenariusze.
- Eksport CSV UTF-8 z założeniami i harmonogramem; ochrona tekstu przed formułami.
- Opcjonalny zapis lokalny, bez zewnętrznych usług i analityki.

## Model
Dopłaty są na koniec miesiąca. Miesięczne mnożniki: `(1 + R)^(1/12)` oraz `(1 - F)^(1/12)`. Podatek: `max(wartość - wpłaty, 0) * stawka`. ROI to prosty wynik względem wszystkich wpłat, nie IRR. Dane startowe i stopy są demonstracyjne. Model używa liczb JavaScript bez miesięcznych zaokrągleń, z prezentacją do dwóch miejsc; nie jest księgą rachunkową.

## Sprawdzenie
`node model.test.js` — przypadki referencyjne z PRD, straty, podatek, koszty, walidacja udziałów, dopłaty i 600 miesięcy / 10 kategorii.

## Hosting
Pliki można udostępnić jako stronę statyczną. Aby użyć GitHub Pages, w Settings → Pages wybierz Deploy from a branch → main → /(root). Sam zapis kodu w repozytorium nie włącza hostingu.
