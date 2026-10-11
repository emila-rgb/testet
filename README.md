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

## GitHub Pages

Aplikacja używa względnych ścieżek do skryptów, więc działa pod adresem projektu /testet/ bez dodatkowego builda.

1. Otwórz https://github.com/emila-rgb/testet/settings/pages
2. W Build and deployment → Source wybierz **GitHub Actions**.
3. W Actions wybierz **Publish GitHub Pages** → **Run workflow** → **main** → **Run workflow**.

Po poprawnym wdrożeniu strona będzie dostępna pod adresem https://emila-rgb.github.io/testet/

Workflow publikuje tylko index.html, app.js, model.js i .nojekyll. Przed publikacją uruchamia testy obliczeń i sprawdza składnię JavaScript. Kolejne zmiany na main automatycznie uruchamiają publikację.

Alternatywnie, dla publikacji bez własnego workflow: Settings → Pages → Deploy from a branch → main → /(root) → Save. W takim wariancie usuń własny workflow, aby używać jednej ścieżki wdrożenia.
