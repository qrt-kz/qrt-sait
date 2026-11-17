# qrt.kz сайты

Беттер `pages/*.njk`, мәтіндер `_data/*.json`, жаңалықтар `news/kz`, `news/ru`.
Eleventy оларды `_site/` бумасына дайын HTML етіп жинайды.

- Басқару панелі: https://app.pagescms.org → GitHub арқылы кіру → `qrt-kz/qrt-sait` (баптауы `.pages.yml`)
- Жергілікті жинау: `npm ci && npx @11ty/eleventy` (қарау: `npx @11ty/eleventy --serve`)
- Сынақ нұсқасы: https://qrt-kz.github.io/qrt-sait/ (`.github/workflows/pages.yml`, noindex)

## Cloudflare Pages (qrt.kz) — программистке / для программиста
1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → `qrt-kz/qrt-sait`.
2. Build command: `npx @11ty/eleventy` · Build output directory: `_site` · Environment variable: `NODE_VERSION=22`.
3. Custom domains → `qrt.kz` и `www.qrt.kz` (DNS уже в Cloudflare).
4. После проверки — отключить старый сервер (nginx) для qrt.kz.
Каждое сохранение в панели = коммит в `main` → Cloudflare сам пересобирает сайт за 1–2 минуты.
