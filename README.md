# Pokémon Explorer

A modern, interactive Pokémon encyclopedia built with React and the PokéAPI. Browse, search, filter by type, and explore detailed stats, abilities, and moves for every Pokémon.

---

## Features

- **Search by Name** — Instantly find any Pokémon by typing its name and pressing Enter
- **Filter by Type** — Filter the grid by 11 Pokémon types (Fire, Water, Grass, Electric, and more)
- **Detailed Modal View** — Click any card to open a modal with:
  - **Overview** — Abilities, base stats summary, and first 6 moves
  - **Abilities** — Full abilities list with hidden ability badges
  - **Base Stats** — Animated stat bars with percentage visualisation
  - **Moves** — Complete move list in a responsive grid
- **Load More** — Paginate through the full Pokémon roster with an animated spinner
- **Empty State** — Friendly empty state when no Pokémon match a search
- **Error State** — Clear error screen with a retry button on API failures
- **Loading Skeleton** — Card-matching skeleton loaders during fetch
- **Type-based Theming** — Each Pokémon card and detail modal is tinted by primary type
- **Hero Image Gallery** — Auto-rotating hero section with manual prev/next navigation and thumbnail strip

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript 6](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| Routing | [React Router v8](https://reactrouter.com/) |
| Linting | ESLint + TypeScript ESLint |

---

## API Used

This project uses the free, open-source **[PokéAPI](https://pokeapi.co/)**.

| Endpoint |
|---|---|
| `GET /api/v2/pokemon?limit=20&offset=0` |
| `GET /api/v2/pokemon/:name` |
| `GET /api/v2/type/:type` |

---

## Installation

**Prerequisites:** Node.js 18+ and npm installed.

```bash
# 1. Clone the repository
git clone https://github.com/Chandrashekher1/PipelineAI---Assessment.git

# 2. Navigate into the project directory
cd PipelineAI---Assessment

# 3. Install dependencies
npm install
```

---

## Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

Other available commands:

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## Project Structure

```
src/
    ├── main.tsx                     # React DOM root render
    ├── App.tsx                      # React Router entry 
    │
    ├── pages/
    │   └── Home.tsx                 
    │
    ├── components/
    │   ├── Navbar.tsx               # Sticky navbar with logo + nav links
    │   ├── HeroSection.tsx          # Auto-rotating hero image gallery
    │   ├── EmptyState.tsx           # Shown when search returns no results
    │   ├── ErrorState.tsx           # Shown on API failure with retry button
    │   ├── LoadinSkelton.tsx        # Card-matching skeleton loaders
    │   │
    │   ├── Explorer/
    │   │   ├── Explore.tsx          # Root explorer — manages all state, load more
    │   │   ├── SearchBar.tsx        # Search input with Enter-key handler
    │   │   ├── TypeFilter.tsx       # Type pill filter buttons
    │   │   └── SortMenu.tsx         # Sort dropdown (placeholder)
    │   │
    │   └── pokemon/
    │       ├── PokemonCard.tsx      # Individual card (image, types, 6 stats)
    │       ├── PokemonGrid.tsx      # Responsive grid with loading / empty / error states
    │       └── PokemonDetailsModal.tsx  # 4-tab detail modal (Overview, Abilities, Stats, Moves)
    │
    ├── hooks/
    │   └── usePokemon.ts            # Custom hook: fetch, search, filter, paginate
    │
    ├── services/
    │   └── pokemonApi.ts            # Typed PokéAPI fetch functions
    │
    ├── types/
    │   └── pokemon.ts               # TypeScript interfaces for all API models
    │
    └── utils/
        ├── constants.ts             # Base API URL constants
        └── typeStyles.ts            # Type name → Tailwind class mappings
```

---

## Challenges Faced

### 1. PokéAPI Two-Step Fetching
The list endpoint (`/pokemon?limit=20`) only returns names and URLs, not full data. A second `Promise.all` was needed to fetch each Pokémon's details individually leading to careful state management to avoid waterfall renders and race conditions.

### 2. Type Filter Response Shape
The type endpoint (`/type/:type`) returns a nested structure `{ pokemon: [{ slot, pokemon: { name, url } }] }` rather than a flat list. This required careful destructuring and was initially causing 404s due to an incorrect endpoint path (`/pokemon/type/:type`).

### 3. Search 404 vs Genuine Error
The PokéAPI returns a `404` for unknown Pokémon names, which needed to be treated as "empty results" (`<EmptyState />`) rather than an error (`<ErrorState />`). This required specific catch logic to distinguish the two cases.


---

## Future Improvements

-  **Sort Options** — Sort the grid by name (A–Z), Pokédex number, or base stat total
-  **Evolution Chain** — Fetch and display the full evolution chain in the detail modal
-  **Autocomplete Search** — Show live suggestions as the user types using the Pokémon list
-  **Generation Filter** — Add a generation selector alongside the type filter
