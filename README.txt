Lucid Blocks — GitHub Pages launcher

1. Create a public GitHub repository, for example lucid-player.
2. Extract this ZIP. Upload the CONTENTS of the github-launcher folder to the repository root, including index.html, asset-worker.js and all engine files. Do not upload this ZIP as the only repository file.
3. Repository Settings > Pages > Deploy from a branch > main > /(root) > Save.
4. Open https://YOUR-USERNAME.github.io/lucid-player/ in its own tab. The first visit registers the engine support service worker and reloads once.
5. Select current browser game-data part1 + part2, or the merged game ZIP, and Play. Do not select the original Windows distribution.

JSBin: paste the contents of JSBin_Launcher.html into the HTML panel, enter your GitHub Pages URL in Output, and click Play. It opens a separate tab.

Game data is loaded locally and is not included in this hosting package. No account credentials are embedded. Keyboard and mouse required. This experimental port has graphics differences from desktop. Gameplay was tested in the preceding browser build; this GitHub hosting adaptation requires checking after deployment.

Service workers must be enabled. This is regular hosting compatibility, not a guarantee of access on managed school networks.

Validation: Chrome 155 local static-server test under a /repo/ path, with no server isolation headers: automatic reload completed, crossOriginIsolated true, SharedArrayBuffer available, engine init successful. Full gameplay was not repeated for this hosting adaptation. Live GitHub Pages deployment has not been performed.
