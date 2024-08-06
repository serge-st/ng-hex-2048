<p align="center">
  <img src="./.github/images/angular_wordmark_gradient.png" alt="Angular Logo" />
</p>

# Hexagonal 2048

### Description:

Initially, the idea was taken from the Evolution TypeScript bootcamp task.

Massive thanks to **Amit Patel** from **Red Blob Games** for creating this [amazing article](https://www.redblobgames.com/grids/hexagons/) that helped a ton!

This repo contains the client side of my implementation of the Hexagonal 2048 game.

If you are interested in the server-side implementation, please visit [ng-hex-2048-server](https://github.com/serge-st/ng-hex-2048-server)

### Additional information:

As a `React` developer, I decided to take on this challenge and see if I could build this app at all, as well as test my learning skills and build it using `Angular`.

I wanted it to be a pure web-based game, intending to use `HTML` elements to draw the shapes and basic `CSS` transitions to make the game more appealing to the eye.

Usually, `HTML` is used to display something like:

```html
<h1>This is a header</h1>
<p>This is a paragraph</p>
```

Here `HTML` is used to display hexagons on a grid, where each hexagon is a separate `HTML` element:

![Hexagon HTML](./.github/images//hex_html.png)

To move the game forward the application uses HTML requests, just like any other web app.

```js
fetch('http://localhost:3000/hex-grid-management/1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify([]),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

Received data is then set into the app state. After the next move is made, a new data array (containing the latest user move and modified hexagons) is created and sent to the server in the body. In turn, the server returns an array of new hexagons to be added to the grid.

This process goes on until the user manages to merge hexagons enough times to get at least one of them to have the value of `2048`.

If none of the hexagons have the value of `2048`` and no more moves are left - the game is lost.

### Installation:

```bash
pnpm install --frozen-lockfile
```

### Running the app:

```bash
pnpm start
```

🤓 Please note that it expects [ng-hex-2048-server](https://github.com/serge-st/ng-hex-2048-server) running on `localhost:3000`

---

**Author:** [Serge Stecenko](https://www.linkedin.com/in/serge-stecenko/)

**Link:** The game is available on my website: [hex2048.stetsen.co](https://hex2048.stetsen.co/)
