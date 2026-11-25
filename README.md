# SafDev

A messenger project built with React, TypeScript, FastAPI and PostgreSQL.

Registration, login, session restoration and logout are implemented. After login,
the application displays a demo chat. Contacts and messages are currently mock
and local data; they are not stored by the backend and reset on page reload.

## Requirements

These instructions use Bash on Ubuntu 24.04 or WSL 2 with Ubuntu.

- Git.
- Docker Engine with the Docker Compose plugin, or Docker Desktop with WSL integration. The Docker daemon must be running.
- Python 3.12 with venv support (`python3.12-venv` on Ubuntu).
- Node.js matching `Frontend/.nvmrc` (currently 20.19.5) and npm. The commands below use nvm to select it.

## 1. Clone the repository

```bash
git clone https://github.com/dalerjig/SafDev.git
cd SafDev
```

The remaining examples assume the repository is at `~/SafDev`.
Adjust the path if you cloned it elsewhere. For an existing checkout, skip cloning.

## 2. Configure the database

Create a file named `.env` in the repository root, next to `compose.yaml`:

```dotenv
POSTGRES_DB=safdev
POSTGRES_USER=safdev_user
POSTGRES_PASSWORD=replace-with-your-own-local-password
```

Replace the password placeholder before starting PostgreSQL. The same file is
read by Docker Compose and the backend. It is excluded from Git.

The backend defaults to `127.0.0.1:5432` and a session lifetime of seven days.
No database URL needs to be added to `alembic.ini`.

## 3. Start PostgreSQL

From the repository root:

```bash
docker compose up -d postgres
docker compose ps
```

Before applying migrations, check that PostgreSQL accepts connections:

```bash
docker compose exec postgres sh -c 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

Wait and repeat the readiness check if the database is still starting.
PostgreSQL 17 uses a named volume, `postgres_data`, to keep data across container restarts.

## 4. Set up the backend

```bash
cd ~/SafDev/Backend
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
alembic upgrade head
```

If Ubuntu reports that `ensurepip` is unavailable, install venv support and repeat
creation of the virtual environment:

```bash
sudo apt update
sudo apt install python3.12-venv
```

Apply the migrations included in the repository. Do not generate new migrations
just to start an existing checkout.

## 5. Run the backend

In a terminal with the backend environment activated:

```bash
cd ~/SafDev/Backend
source .venv/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Keep this terminal open.

- API documentation: http://localhost:8000/docs
- Application health endpoint: http://localhost:8000/health

The health endpoint checks that the application responds; it does not query the database.

## 6. Set up and run the frontend

Open another terminal:

```bash
cd ~/SafDev/Frontend
nvm install
nvm use
npm ci
npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
```

If nvm is not used, select the Node.js version from `.nvmrc` using your installed
version manager, then run the npm commands above.

Open **http://localhost:5173**. The current API URL in
`Frontend/src/shared/config/dev.ts` is `http://localhost:8000`. Use `localhost`
consistently for the browser and API so the session cookie works with this setup.

## Try the application

1. Open registration from the login screen.
2. Enter a display name (1–64 characters after trimming) and password (10–128 characters).
3. Save the generated six-digit public ID, then switch to login.
4. Log in with that ID and password to open the demo chat.
5. Refresh the page to restore the session, or use the logout button to end it.

An initial `401` from `GET /auth/me` is expected when there is no active session.
Registration creates an account but does not automatically log it in.

The backend allows credentialed requests from the configured local origins.
Changing a port or hostname also requires updating the API URL or
`Settings.trusted_origins`, as appropriate. Mutating auth requests require a
trusted `Origin` header; Swagger and the browser provide it, while manual tools
such as curl must include it explicitly.

## Start again after initial setup

Start the database from `~/SafDev` with `docker compose up -d postgres`.
Then run the backend and frontend commands from steps 5 and 6 in separate terminals.
You do not need to recreate the virtual environment or reinstall unchanged dependencies.
After pulling new changes, install updated dependencies as needed and run
`alembic upgrade head` from `Backend` before starting the application.

## Stop the project

Press `Ctrl+C` in each application terminal. To stop PostgreSQL, run from the
repository root:

```bash
docker compose stop postgres
```

Database data stays in the named volume. `docker compose down -v` deletes the
volume and its database data; it is not needed for a normal shutdown.

Changing `POSTGRES_USER`, `POSTGRES_PASSWORD` or `POSTGRES_DB` in `.env` does not
reconfigure an already initialized database volume. Keep the existing values
unless you also deliberately update the database configuration.

## Project layout

- `Frontend/` — React application, TypeStyle UI components and Zustand stores.
- `Backend/app/` — FastAPI routers, services, schemas, ORM models and dependencies.
- `Backend/migrations/` — Alembic database migrations.
- `compose.yaml` — local PostgreSQL service.

Docker Compose currently starts PostgreSQL only. These commands describe local
development; backend and frontend are started separately.
