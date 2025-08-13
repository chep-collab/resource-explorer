

```markdown
# 🧪 Rick & Morty Resource Explorer

A fast, responsive React app built with Next.js and TypeScript to explore characters from the Rick & Morty API. Users can search, filter, sort, favorite, and view detailed info—all synced to the URL for a shareable experience.

---

## 🚀 Live Preview

> _Add your Vercel link here once deployed._



## 🛠️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Query (@tanstack/react-query)**
- **Rick & Morty API**



## 📦 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/resource-explorer.git
cd resource-explorer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000)



## ✨ Features

- 🔍 Debounced search with URL sync (`?name=rick`)
- 🧪 Filters: status, species, favorites
- ↕️ Sort: name A–Z / Z–A
- ⭐ Favorite toggle (list + detail view)
- 🧠 Persistent favorites via `localStorage`
- 📄 Detail view at `/characters/:id`
- 📝 Note form with validation
- ⚡ Pagination with graceful empty states
- 🔄 Cancel in-flight requests with `AbortController`
- 🧠 Client caching via React Query



## 🧱 Architecture Notes

- **App Router** used for routing and code splitting.
- **Hooks** like `useCharacters` and `useFavorites` encapsulate logic.
- **URL is the source of truth** for all filters, search, sort, and pagination.
- **Favorites** are stored in `localStorage` and synced across views.
- **React Query** handles caching, background refetching, and error states.



## ⚖️ Trade-Offs & Decisions

- Skipped virtualized list since dataset is small (<100 items).
- Theme toggle not implemented to prioritize core UX features.
- Scroll restoration not handled due to App Router limitations.
- E2E testing omitted due to time constraints, but structure supports it.



## 🧩 What I'd Ship Next

If I had more time, I’d add:
- 🌗 Theme toggle with Tailwind’s dark mode + localStorage
- 🧪 Basic E2E test with Playwright or Cypress
- 🔁 Scroll position restoration on back/forward
- ♿ Improved accessibility (keyboard nav, ARIA labels)



## 📚 API Reference

Using [Rick & Morty API](https://rickandmortyapi.com/documentation)  
Endpoints:
- `/character`
- `/character/:id`










