# FITS Finance Frontend

FITS Finance frontend built with React, Vite, and the existing customer and
administration pages.

## Requirements

- Node.js 20.19 or newer
- npm

## Setup

Install dependencies and configure the backend URL:

```sh
npm ci
```

In PowerShell, create a local environment file if you do not already have one:

```powershell
Copy-Item .env.example .env
```

Set `VITE_API_URL` in `.env` to the backend URL, including `/api/` and the
trailing slash. The default assumes Laravel is running at
`http://localhost:8000`.

## Development

```sh
npm run dev
```

Vite starts the development server and enables fast refresh.

## Production

```sh
npm run build
npm run preview
```

The optimized static production build is written to `build/` without source
maps. To run the tests, use `npm test`.

Existing local `.env` files using `REACT_APP_API_URL` continue to work; new
setups should use `VITE_API_URL`.

The login flow uses `POST /api/login` and sends `personal_email` and `password`.
Authenticated requests attach the returned bearer token. Existing services for
users, NRC states and townships, categories, dealers, document types, customer
voices, FAQs, and services use matching FTI Finance API routes.

Some inherited features still call APIs that FTI Finance does not expose (for
example application, vehicle, region, and web-sync endpoints); those need
matching backend routes before they can be used with this backend.
