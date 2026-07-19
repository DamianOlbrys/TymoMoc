# TymoMoc

Kolorowa strona edukacyjna dla dzieci w wieku 8 i 9 lat. Zawiera po 500 pytań w każdej z 7 kategorii i dla każdego wieku (7000 pytań łącznie), 500 haseł motywacyjnych, cele dzienne, historię nauki, poziomy kategorii oraz synchronizację przez Cloudflare D1.

## Struktura

- `public/` — strona, style, skrypty i grafiki
- `src/index.js` — Cloudflare Worker z API postępu, kont Google i panelu administratora
- `migrations/` — schemat bazy D1
- `wrangler.jsonc` — konfiguracja wdrożenia Cloudflare

## Zapis wyników

Strona najpierw zapisuje wyniki lokalnie w przeglądarce. Po zalogowaniu wyniki są przypisane do użytkownika i synchronizowane z D1. Dotychczasowy rodzinny kod synchronizacji nadal działa dla zgodności ze starszą wersją.

Nowe konto Google otrzymuje status `pending`. Dopiero administrator `damianolbrys5@gmail.com` może je zaakceptować. Administrator może też zablokować konto; aktywne sesje takiego użytkownika są wtedy usuwane.

## Logowanie Google

W Google Cloud utwórz identyfikator **OAuth Client ID** typu **Web application** i dodaj do dozwolonych źródeł JavaScript:

```text
https://tymomoc2.damianolbrys5.workers.dev
```

Następnie ustaw zmienną `GOOGLE_CLIENT_ID` w Workerze `tymomoc2`. Sekret klienta nie jest używany przez ten przepływ logowania.

## Wdrożenie

Konfiguracja `wrangler.jsonc` wdraża frontend i API razem jako Worker `tymomoc2`. Pliki statyczne pochodzą z katalogu `public/`, a baza `tymomoc-db` jest dostępna pod bindingiem `DB`.

Schemat tabeli jest tworzony automatycznie przy pierwszym wywołaniu API. Migrację można też wykonać ręcznie poleceniem:

```powershell
npx wrangler d1 migrations apply tymomoc-db --remote
npx wrangler deploy
```

## Uruchomienie lokalne

Po zainstalowaniu Wranglera:

```powershell
npx wrangler dev
```

## Automatyczne wdrożenie z GitHub

- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.`

Repozytorium `tymomoc2` zachowuje w katalogu głównym lustrzaną kopię plików frontendu z `public/`, ponieważ istniejąca integracja Cloudflare publikuje katalog `.`. Każdy `git push` do gałęzi `main` uruchamia automatyczne wdrożenie.
