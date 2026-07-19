# TymoMoc

Kolorowa strona edukacyjna dla dzieci w wieku 8 i 9 lat. Zawiera misje z matematyki, języka polskiego, angielskiego i wiedzy o świecie, system XP oraz synchronizację postępu przez Cloudflare D1.

## Struktura

- `public/` — strona, style, skrypty i grafiki
- `src/index.js` — Cloudflare Worker z API `/api/progress`
- `migrations/` — schemat bazy D1
- `wrangler.jsonc` — konfiguracja wdrożenia Cloudflare

## Zapis wyników

Strona najpierw zapisuje wyniki lokalnie w przeglądarce. Po jednorazowym wpisaniu rodzinnego kodu synchronizacji wysyła je również do D1. W publicznym repozytorium znajduje się tylko skrót SHA-256 kodu, a nie sam kod.

## Wdrożenie

Repozytorium jest podłączone do Cloudflare Workers Builds. Każdy `git push` do gałęzi `main` uruchamia automatyczne wdrożenie. Baza `tymomoc-db` jest dostępna w Workerze pod bindingiem `DB`, a pliki statyczne pod bindingiem `ASSETS`.

Schemat tabeli jest tworzony automatycznie przy pierwszym wywołaniu API. Migrację można też wykonać ręcznie poleceniem:

```powershell
npx wrangler d1 migrations apply tymomoc-db --remote
```

## Uruchomienie lokalne

Po zainstalowaniu Wranglera:

```powershell
npx wrangler dev
```
