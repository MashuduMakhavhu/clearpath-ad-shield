# ClearPath Ad Shield

A lightweight Chrome extension built with **JavaScript, HTML, and CSS** using **Manifest V3**. It blocks requests to a curated list of known advertising, tracking, pop-up, and redirect domains.

> **Project status:** Learning project. The built-in filter list is intentionally small and is not a replacement for a mature content blocker.

## Features

- Blocks requests to selected advertising and analytics domains using Chrome's `declarativeNetRequest` API.
- Includes a small set of known redirect and link-shortener domains.
- Popup UI to enable or pause filtering.
- Saves the user's protection setting with `chrome.storage`.
- Uses Manifest V3 and does not inject scripts into websites.
- No account, remote server, or personal-data collection is included.

## Tech stack

- JavaScript (ES6+)
- HTML5
- CSS3
- Chrome Extensions Manifest V3
- Chrome `declarativeNetRequest` and `storage` APIs

## Project structure

```text
clearpath-ad-shield/
├── manifest.json
├── rules.json
├── background.js
├── popup.html
├── popup.css
├── popup.js
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── .gitignore
└── README.md
```

## Install locally (Chrome)

1. Download or clone this repository.
2. Open `chrome://extensions` in Google Chrome.
3. Turn on **Developer mode**.
4. Select **Load unpacked**.
5. Choose the project folder containing `manifest.json`.
6. Pin **ClearPath Ad Shield** from the Extensions menu if you want quick access.
7. Open the popup and use the switch to pause or resume filtering.

After editing extension files, return to `chrome://extensions` and click the extension's **Reload** button.

## How it works

`rules.json` defines static network rules. Chrome evaluates these rules and blocks matching requests without the extension needing to inspect page contents. `background.js` manages whether the ruleset is enabled. The popup communicates with the service worker to read and change the setting.

The popup's “filter rules” number is the number of rules included in this starter ruleset, **not** a live count of blocked requests.

## Limitations

- It cannot block every ad. Ads served from the same domain as the page, first-party ads, and ads rendered directly into page content may not match these rules.
- Redirects from domains not included in `rules.json`, script-driven navigation, and browser-level or operating-system pop-ups may still occur.
- Blocking a domain can break legitimate page features. If a site stops working, pause the extension to test whether filtering is the cause.
- The domain list is a small starter list and will need maintenance and testing.
- This project does not currently include a live blocked-request counter, custom filter editor, allowlist, or automatic filter-list updates.
- Chrome Web Store publishing requires appropriate testing, listing details, and compliance with Google's current extension policies.

## Permissions

- `declarativeNetRequest`: lets Chrome evaluate the declared network filtering rules.
- `storage`: saves whether protection is enabled.

The extension does not request access to all website page contents, browsing history, or user accounts.

## Testing checklist

- [ ] Load the extension without errors from `chrome://extensions`.
- [ ] Confirm the popup reports protection as on by default.
- [ ] Toggle protection off and on, then close and reopen the popup to confirm the setting persists.
- [ ] Inspect the extension's service-worker errors from the extension details page.
- [ ] Test on sites you own or have permission to test.
- [ ] Confirm important site features still work when filtering is enabled.

## Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-change`.
3. Make and test your changes.
4. Commit: `git commit -m "Describe your change"`.
5. Push the branch and open a pull request.

When adding a rule, use a unique integer `id` in `rules.json` and test for unwanted breakage. Keep rules focused and explain why each new domain is included.

## Roadmap

- [ ] Add an allowlist for trusted websites.
- [ ] Add optional user-managed block domains.
- [ ] Add tests for rule configuration and popup behavior.
- [ ] Add a reviewed, updateable filter list.
- [ ] Add a real blocked-request counter with the necessary permissions and clear privacy documentation.

## License

This project is released under the MIT License. See [LICENSE](LICENSE).

---

Made as an educational browser-security project. Use responsibly and test carefully.
