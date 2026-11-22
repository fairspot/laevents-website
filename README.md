# laevents-website

The company website for LA Events, served from GitHub Pages at https://laevents.dk.

It is plain HTML, CSS and JavaScript with no build step. GitHub Pages serves the `main` branch as-is.

## Files

- `index.html`: the front page (about, markets, FairSpot, team, contact)
- `privacy.html` and `accessibility.html`: the privacy note and the accessibility statement
- `404.html`: shown by GitHub Pages for unknown URLs
- `assets/css/style.css`: all styling
- `assets/js/translations.js`: the Danish text, one entry per `data-i18n` key
- `assets/js/i18n.js`: the EN/DA switch
- `robots.txt`, `sitemap.xml`, `.well-known/security.txt`: for crawlers and security contacts
- `.nojekyll`: stops GitHub Pages from running Jekyll, which would hide `.well-known`

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Editing text

English is written straight into the HTML. Every translated element has a `data-i18n="some.key"` attribute, and its Danish text is under the same key in `assets/js/translations.js`. When you change or add English text, update the Danish entry too. For attributes such as `alt`, use `data-i18n-attr="alt:some.key"`.

The language choice is saved in the browser. Add `?lang=da` to a URL to link straight to the Danish version.

## Founder photos

`assets/img/founders/ulrich.svg` and `martin.svg` are placeholders with initials. To use real photos, add square images (at least 320×320 px), for example `ulrich.jpg`, and change the `src` in `index.html`.

## Custom domain

When the DNS for laevents.dk points to GitHub Pages, set the custom domain under **Settings → Pages**. GitHub then commits a `CNAME` file containing `laevents.dk`. Turn on **Enforce HTTPS** once the certificate is ready. Update the `lastmod` dates in `sitemap.xml` when the pages change.
