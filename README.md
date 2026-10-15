# Student Task Manager

A beginner-friendly, full-stack MERN application for managing daily
student tasks. This README is the project's development guide, covering
setup, backend development, frontend development, integration, testing,
GitHub workflow, and optional deployment.

> **Development approach:** Backend first → frontend second →
> integration and testing → optional deployment.
>
> **Version 1 scope:** One student, persistent tasks stored in MongoDB,
> and no registration or login system.

------------------------------------------------------------------------

## Table of Contents

1.  [Project Overview](#1-project-overview)
2.  [Goals and Version 1 Scope](#2-goals-and-version-1-scope)
3.  [Technology Stack](#3-technology-stack)
4.  [How the Application Works](#4-how-the-application-works)
5.  [Planned Project Structure](#5-planned-project-structure)
6.  [Task Data Model](#6-task-data-model)
7.  [API Requirements](#7-api-requirements)
8.  [Development Roadmap](#8-development-roadmap)
9.  [Git and GitHub Workflow](#9-git-and-github-workflow)
10. [Environment Variables and
    Secrets](#10-environment-variables-and-secrets)
11. [Testing Checklist](#11-testing-checklist)
12. [Definition of Done](#12-definition-of-done)
13. [Optional Deployment](#13-optional-deployment)
14. [Future Improvements](#14-future-improvements)
15. [Learning and Troubleshooting
    Notes](#15-learning-and-troubleshooting-notes)
16. [Project Status](#16-project-status)

------------------------------------------------------------------------

## 1. Project Overview

**Student Task Manager** helps a student create, view, edit, complete,
filter, and delete daily tasks.

Example tasks:

-   Complete Java assignment
-   Revise database notes
-   Practice JavaScript
-   Prepare for an upcoming exam

Previously saved tasks should appear when the student opens the app
again. The frontend requests tasks from the backend, and the backend
retrieves them from MongoDB.

### Problem Statement

Students may lose track of assignments, study goals, and unfinished work
when tasks are managed informally. This application provides one place
to organise daily tasks and see what remains to be done.

### Main User

Version 1 is designed for **one student using their own local
application**. It is not a multi-user service in Version 1.

------------------------------------------------------------------------

## 2. Goals and Version 1 Scope

### Must-have features

-   [ ] Create a task.
-   [ ] View saved tasks.
-   [ ] Edit an existing task.
-   [ ] Mark a task as completed or pending.
-   [ ] Delete a task.
-   [ ] Store tasks persistently in MongoDB.
-   [ ] Support title, description, priority, and status.
-   [ ] Filter tasks by status: All, Pending, and Completed.
-   [ ] Validate user input and show useful errors.
-   [ ] Show loading, empty, success, and error states in the frontend.

### Out of scope for Version 1

Do **not** add these unless the requirements change:

-   Registration and login
-   Passwords, JWT, or user roles
-   Email verification or password reset
-   Notifications and reminders
-   Multi-user task ownership
-   Offline-first synchronisation
-   Advanced analytics

Keep Version 1 small and complete. Extra features can be planned after
the core app works reliably.

### Important privacy note

"No login" does not mean "private." A locally running app is suitable
for the initial single-student version. If the backend is deployed
publicly without authentication or other access controls, other people
may be able to access or modify its task endpoints. Review access
control before any public deployment.

------------------------------------------------------------------------

## 3. Technology Stack

  -----------------------------------------------------------------------
  Layer                   Technology              Purpose
  ----------------------- ----------------------- -----------------------
  Frontend                React                   Build the user
                                                  interface

  Frontend tooling        Vite                    Create and run the
                                                  React development app

  Styling                 CSS                     Responsive layout and
                                                  visual design

  Backend runtime         Node.js                 Run JavaScript on the
                                                  server

  Backend framework       Express.js              Define API routes and
                                                  handle HTTP requests

  Database                MongoDB                 Persist task documents

  Database library        Mongoose                Define the task schema
                                                  and interact with
                                                  MongoDB

  Configuration           dotenv                  Load environment
                                                  variables during local
                                                  development

  Cross-origin requests   cors                    Configure
                                                  frontend-to-backend
                                                  requests during
                                                  development

  API testing             Postman                 Test backend endpoints
                                                  independently

  Version control         Git and GitHub          Track changes and
                                                  maintain project
                                                  history
  -----------------------------------------------------------------------

Use JavaScript for Version 1 to keep the learning path consistent.

------------------------------------------------------------------------

## 4. How the Application Works

The expected request flow is:

1.  The student opens the React dashboard.
2.  The frontend sends a `GET` request to the Express backend.
3.  The backend validates and processes the request.
4.  Mongoose queries MongoDB for saved tasks.
5.  The backend returns a response.
6.  React displays the tasks and calculates visible summary counts if
    needed.

When the student creates, updates, or deletes a task, the frontend sends
the corresponding request to the backend. After a successful response,
the frontend should update or refetch the task list.

### Main request methods

-   `GET`: retrieve tasks.
-   `POST`: create a task.
-   `PUT`: update a task, including its status.
-   `DELETE`: delete a task.

MongoDB is the **source of truth** for task data. Local Storage is not
required for storing tasks in Version 1. It may be used later for
non-sensitive UI preferences, such as a selected theme.

------------------------------------------------------------------------

## 5. Planned Project Structure

Create folders and files gradually as each phase requires them. Do not
create every file at the beginning just to match the tree.

``` text
student-task-manager/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── docs/
│   └── project-notes.md
├── .gitignore
└── README.md
```

### Folder responsibilities

#### Backend

  -----------------------------------------------------------------------
  Folder/file                         Responsibility
  ----------------------------------- -----------------------------------
  `config/`                           Database connection and
                                      configuration

  `controllers/`                      Handle requests and send responses

  `middleware/`                       Shared request processing and error
                                      handling

  `models/`                           Mongoose schemas and models

  `routes/`                           Map API endpoints to controller
                                      functions

  `services/`                         Optional business logic layer, if
                                      useful

  `utils/`                            Reusable helper functions

  `app.js`                            Configure Express, middleware, and
                                      routes

  `server.js`                         Load configuration, connect to the
                                      database, and start the server

  `tests/`                            Automated tests added as the
                                      project develops
  -----------------------------------------------------------------------

Keep the structure understandable. If a separate service layer feels
unnecessary for this small project, do not add complexity without a
reason.

#### Frontend

  -----------------------------------------------------------------------
  Folder                              Responsibility
  ----------------------------------- -----------------------------------
  `components/`                       Reusable UI parts such as task
                                      cards, forms, and filters

  `pages/`                            Page-level views such as the
                                      dashboard

  `services/`                         Functions that communicate with the
                                      backend API

  `hooks/`                            Reusable React hooks, if needed

  `utils/`                            Small helper functions

  `assets/`                           Local images and other static
                                      assets
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 6. Task Data Model

Each task should be stored as a MongoDB document with fields similar to
these:

  -----------------------------------------------------------------------
  Field                   Type                    Requirement
  ----------------------- ----------------------- -----------------------
  `_id`                   MongoDB ObjectId        Generated by MongoDB

  `title`                 String                  Required; trim
                                                  whitespace and reject
                                                  an empty value

  `description`           String                  Optional

  `priority`              String/enum             `Low`, `Medium`, or
                                                  `High`

  `status`                String/enum             `Pending` or
                                                  `Completed`; defaults
                                                  to `Pending`

  `createdAt`             Date                    Automatically recorded

  `updatedAt`             Date                    Updated when the task
                                                  changes
  -----------------------------------------------------------------------

Use Mongoose schema validation and timestamps. Keep field names and enum
values consistent between the database, API, and frontend.

### Validation decisions

-   A title is required.
-   A title containing only whitespace is invalid.
-   Priority must be one of the allowed values.
-   Status must be one of the allowed values.
-   Invalid task IDs should return a clear client error.
-   Requests for a valid but non-existent task should return a not-found
    response.
-   Description may be empty.
-   A due date is not required in Version 1; consider it later if
    needed.

------------------------------------------------------------------------

## 7. API Requirements

Use `/api/tasks` as the base path.

  Method     Endpoint           Purpose
  ---------- ------------------ -------------------------------
  `GET`      `/api/tasks`       Get all tasks
  `GET`      `/api/tasks/:id`   Get one task
  `POST`     `/api/tasks`       Create a task
  `PUT`      `/api/tasks/:id`   Update task details or status
  `DELETE`   `/api/tasks/:id`   Delete a task

### Filtering

The list endpoint should support status filtering using a query
parameter. The frontend may request all tasks, only pending tasks, or
only completed tasks. Priority filtering can be added without creating a
separate endpoint.

Choose the simplest maintainable approach first:

-   **Backend filtering:** useful when requesting only matching records
    from the database.
-   **Frontend filtering:** simple for a small list that has already
    been fetched.

The API can support query-based filtering when the backend phase reaches
that requirement.

### Response and status-code expectations

  -----------------------------------------------------------------------
  Status code                         Meaning
  ----------------------------------- -----------------------------------
  `200 OK`                            A read or update succeeded

  `201 Created`                       A task was created

  `204 No Content` or `200 OK`        A task was deleted; choose one
                                      approach and use it consistently

  `400 Bad Request`                   Invalid input or invalid identifier

  `404 Not Found`                     Requested task does not exist

  `500 Internal Server Error`         Unexpected server failure
  -----------------------------------------------------------------------

Use a consistent JSON response shape. Do not expose database
credentials, stack traces, or other sensitive server details to clients.

------------------------------------------------------------------------

## 8. Development Roadmap

**Chosen workflow:** Backend first → Frontend second → Integration →
Final testing → Optional deployment.

We are using this order deliberately because the main learning goal is
to understand Node.js, Express, MongoDB, REST APIs, and CRUD operations
before connecting a UI.

> **Important:** Do not start frontend implementation until the backend
> CRUD APIs have been tested in Postman. Before the frontend exists,
> Postman will act as the API client.

Finish and verify each phase before moving to the next. If a phase fails
its checkpoint, troubleshoot it before adding more features.

### Phase 0 --- Requirements and repository setup

-   [ ] Confirm Version 1 scope and keep authentication out.
-   [ ] Create the project folder and initialise a Git repository.
-   [ ] Create the root README and `.gitignore`.
-   [ ] Create `frontend/` and `backend/` directories.
-   [ ] Create a GitHub repository and connect it to the local
    repository.
-   [ ] Make the initial documentation/setup commit.

**Checkpoint:** The repository exists, its purpose is documented, and
secrets will not be committed.

### Phase 1 --- Backend foundation

-   [ ] Initialise the Node.js project inside `backend/`.
-   [ ] Install only the required backend dependencies.
-   [ ] Create the Express application.
-   [ ] Separate Express app configuration from server startup.
-   [ ] Add a basic health-check endpoint.
-   [ ] Start the server and verify the endpoint in Postman or a
    browser.
-   [ ] Add basic error handling.

**Checkpoint:** The backend starts reliably and the health-check
endpoint returns the expected response.

**Commit after this checkpoint:**

``` text
feat(backend): add Express server and health check
```

### Phase 2 --- MongoDB connection and task model

-   [ ] Choose MongoDB Atlas or a local MongoDB instance.
-   [ ] Add configuration through environment variables.
-   [ ] Connect using Mongoose.
-   [ ] Create the Task model and validation rules.
-   [ ] Verify that the server handles database connection failure
    clearly.
-   [ ] Confirm that no database credentials are tracked by Git.

**Checkpoint:** The backend can connect to MongoDB and the task schema
is ready.

### Phase 3 --- CRUD API development

Implement one capability at a time:

-   [ ] Create a task.
-   [ ] Retrieve all tasks.
-   [ ] Retrieve one task.
-   [ ] Update task fields.
-   [ ] Mark a task completed and allow it to return to pending.
-   [ ] Delete a task.
-   [ ] Add status filtering.
-   [ ] Validate input and handle invalid IDs, missing records, and
    database errors.

**Checkpoint:** Every endpoint works in Postman, including expected
failure cases. Test data survives a backend restart.

### Phase 4 --- Backend verification

**The frontend must wait until this phase is complete.**

-   [ ] Test valid and invalid request bodies.
-   [ ] Test a missing or blank title.
-   [ ] Test unsupported priority and status values.
-   [ ] Test invalid IDs and non-existent tasks.
-   [ ] Verify response status codes and response shapes.
-   [ ] Check that updates are persisted in MongoDB.
-   [ ] Restart the backend and confirm saved tasks still exist.
-   [ ] Add automated tests if feasible.
-   [ ] Document any known limitations.
-   [ ] Save a Postman collection or document the requests used for
    manual testing.

**Checkpoint:** Every required API works in Postman, including common
failure cases. Only after this checkpoint should frontend development
begin.

**Commit after this checkpoint:**

``` text
test(api): verify task CRUD endpoints
```

### Phase 5 --- Frontend foundation and UI

Start this phase **only after backend verification**.

-   [ ] Create the React app with Vite inside `frontend/`.
-   [ ] Remove unused starter content.
-   [ ] Plan the dashboard layout.
-   [ ] Create reusable task card, form, and filter components.
-   [ ] Build the add/edit form.
-   [ ] Show priority and status clearly.
-   [ ] Add delete and completion controls.
-   [ ] Make the UI responsive.
-   [ ] Add loading, empty, error, and success states.

**Checkpoint:** The dashboard UI is usable. Temporary sample data may be
used for layout work, but it must not be mistaken for persistent
database data.

**Commit after the UI milestone:**

``` text
feat(frontend): build task dashboard UI
```

### Phase 6 --- Frontend/backend integration

-   [ ] Configure the frontend API base URL using environment
    configuration.
-   [ ] Create a central API service layer.
-   [ ] Fetch tasks when the dashboard loads.
-   [ ] Connect task creation to the `POST` endpoint.
-   [ ] Connect edit and status changes to the `PUT` endpoint.
-   [ ] Connect deletion to the `DELETE` endpoint.
-   [ ] Connect status filters.
-   [ ] Handle network errors and failed requests.
-   [ ] Verify that tasks remain after refreshing the page.

**Checkpoint:** All Version 1 features work end-to-end with MongoDB as
the source of truth.

**Commit after integration is tested:**

``` text
feat(frontend): connect dashboard to task API
```

### Phase 7 --- Final quality checks

-   [ ] Test the complete user flow from a clean start.
-   [ ] Check mobile and desktop layouts.
-   [ ] Check browser console and server logs for errors.
-   [ ] Remove unused dependencies and temporary sample data.
-   [ ] Review validation, error messages, and accessibility basics.
-   [ ] Update README setup and usage instructions to match the actual
    implementation.
-   [ ] Verify Git status and confirm no secrets are staged.
-   [ ] Create the Version 1 completion commit/tag if desired.

**Checkpoint:** Version 1 is complete locally.

### Phase 8 --- Optional deployment

Deployment is optional for Version 1 and can be done later. See
[Optional Deployment](#13-optional-deployment).

------------------------------------------------------------------------

## 9. Git and GitHub Workflow

Git history should show meaningful development steps. Commit when a
small, coherent change is complete and tested---not after every
keystroke, and not only at the very end.

### Recommended commit points

  -------------------------------------------------------------------------------------------
  Milestone                           Example commit message
  ----------------------------------- -------------------------------------------------------
  Initial project documentation and   `docs: add project roadmap and requirements`
  structure                           

  Backend project initialised         `chore(backend): initialise Node and Express project`

  Express health check works          `feat(backend): add health check endpoint`

  Database connection works           `feat(backend): connect MongoDB with Mongoose`

  Task schema and validation work     `feat(backend): add task model and validation`

  Create/list APIs work               `feat(api): add task creation and listing`

  Update/delete APIs work             `feat(api): add task update and deletion`

  Filtering and error handling work   `feat(api): add task filtering and error handling`

  API tests or Postman documentation  `test(api): verify task endpoints`
  added                               

  React shell and layout completed    `feat(frontend): build dashboard layout`

  Task form and cards completed       `feat(frontend): add task form and task cards`

  API integration works               `feat(frontend): connect dashboard to task API`

  Responsive UI and UX states         `style(frontend): polish responsive dashboard`
  complete                            

  Documentation updated for working   `docs: update setup and usage instructions`
  app                                 

  Version 1 verified                  `chore: prepare version 1 release`
  -------------------------------------------------------------------------------------------

These are examples, not commits to make in advance. Commit only after
the described change exists and has been checked.

### Commit message convention

Use a simple Conventional Commits style:

``` text
type(scope): short description
```

Useful types:

-   `feat`: new functionality
-   `fix`: bug fix
-   `docs`: documentation
-   `style`: formatting or UI styling changes that do not change
    application logic
-   `refactor`: restructure code without changing behaviour
-   `test`: tests
-   `chore`: tooling, setup, or maintenance

### Daily workflow

1.  Check which files changed.
2.  Review the diff before committing.
3.  Run the relevant manual or automated tests.
4.  Make a focused commit with a meaningful message.
5.  Push commits to GitHub at the end of a work session or after a
    stable milestone.

For a solo learning project, working directly on `main` is acceptable if
commits remain small and stable. To practise a team workflow, use
short-lived branches such as `feat/task-crud` and merge them after
testing.

### Git safety rules

-   Never commit `.env` files or credentials.
-   Add `node_modules/`, build outputs, logs, and OS-generated files to
    `.gitignore`.
-   Commit `.env.example` files containing placeholder values only.
-   Check `git status` before every commit.
-   Never put database passwords, API keys, or private connection
    strings in README screenshots or GitHub issues.
-   If a secret is committed accidentally, removing it in a later commit
    is not enough: rotate or revoke the exposed secret immediately.

------------------------------------------------------------------------

## 10. Environment Variables and Secrets

Use environment variables for configuration that differs between
machines or environments.

### Backend settings

  Variable        Purpose
  --------------- ------------------------------------------------
  `PORT`          Backend server port
  `MONGODB_URI`   MongoDB connection string
  `NODE_ENV`      Environment, such as development or production

### Frontend setting

  Variable              Purpose
  --------------------- ----------------------
  `VITE_API_BASE_URL`   Backend API base URL

Create `.env.example` files with placeholder values and document how to
fill in local `.env` files. The actual `.env` files must be ignored by
Git.

> **Important:** Variables prefixed with `VITE_` are exposed to frontend
> code in the browser. Never put database credentials or private secrets
> in frontend environment variables.

For MongoDB Atlas, use a database user with an appropriate password and
restrict network access as much as your development setup allows. Do not
share the connection string publicly.

------------------------------------------------------------------------

## 11. Testing Checklist

### API tests in Postman

-   [ ] Health-check endpoint responds successfully.
-   [ ] Creating a valid task returns the created task.
-   [ ] Missing or blank title is rejected.
-   [ ] Invalid priority or status is rejected.
-   [ ] Listing tasks returns saved records.
-   [ ] Fetching a known ID returns the correct task.
-   [ ] Fetching an invalid ID returns a clear error.
-   [ ] Updating a task persists the change.
-   [ ] Completion changes status correctly.
-   [ ] Deleting a task removes it from later results.
-   [ ] Status filtering returns the expected records.
-   [ ] Database failures do not leak secrets or stack traces.

### End-to-end checks

-   [ ] Create a task from the UI.
-   [ ] Refresh the page and verify that it remains.
-   [ ] Mark a task completed and verify the status.
-   [ ] Filter completed and pending tasks.
-   [ ] Edit a task and verify the updated details.
-   [ ] Delete a task and verify that it disappears.
-   [ ] Verify empty-state, loading, and error messages.
-   [ ] Verify that the interface works on narrow and wide screens.

------------------------------------------------------------------------

## 12. Definition of Done

Version 1 is complete when:

-   [ ] The backend starts without errors.
-   [ ] MongoDB persistence works.
-   [ ] All required CRUD operations work.
-   [ ] Title, description, priority, and status are supported.
-   [ ] Pending/completed filtering works.
-   [ ] The frontend uses the real API rather than only sample data.
-   [ ] Tasks remain available after a browser refresh and server
    restart.
-   [ ] Validation and common error cases are handled.
-   [ ] No credentials or `.env` files are committed.
-   [ ] README instructions match the actual project.
-   [ ] GitHub contains a clean, understandable commit history.

Deployment is **not required** for this checklist to be satisfied.

------------------------------------------------------------------------

## 13. Optional Deployment

Deployment can happen after the local Version 1 is stable. Do not block
the core project on hosting.

Before deployment:

-   Choose a frontend host and a backend host that support the app's
    needs.
-   Use a managed MongoDB deployment if the database must be available
    remotely.
-   Set environment variables in the hosting provider's dashboard.
-   Configure production CORS to allow only the intended frontend
    origin.
-   Configure the frontend's API base URL for the deployed backend.
-   Test create, read, update, and delete flows on the deployed app.
-   Review logs, error handling, resource limits, and database access
    rules.

> **Security decision required before public deployment:** Version 1 has
> no login. Do not assume a publicly reachable task API is private. Add
> appropriate access control or keep the app private/local before
> exposing real personal data.

------------------------------------------------------------------------

## 14. Future Improvements

Only consider these after Version 1 works:

-   Due dates and overdue task indicators
-   Search and sorting
-   Weekly progress summaries
-   Dark/light theme preference
-   Pagination if the task list grows
-   Authentication and per-user task ownership for a multi-user version
-   Automated API and UI tests
-   Offline support with a deliberate synchronisation design

A feature should be added because it solves a clear user need---not
simply because another application has it.

------------------------------------------------------------------------

## 15. Learning and Troubleshooting Notes

### If the backend does not start

-   Read the first meaningful error in the terminal.
-   Check that dependencies were installed in the `backend/` directory.
-   Verify the configured port is available.
-   Confirm that the server entry point and package scripts match the
    project setup.

### If MongoDB does not connect

-   Verify `MONGODB_URI` is loaded from the backend environment.
-   Check Atlas credentials and network access, or confirm the local
    MongoDB service is running.
-   Do not paste credentials into public messages or commits.
-   Read the database error before changing unrelated code.

### If Postman works but the frontend fails

-   Check the frontend API base URL.
-   Confirm the backend is running.
-   Inspect the browser console and Network panel.
-   Check CORS configuration and request/response shapes.
-   Verify that frontend field names match the API and schema.

### Learning rule

For every feature, answer these questions before implementing it:

1.  What user requirement does this feature solve?
2.  Which layer owns the responsibility: frontend, backend, or database?
3.  How will I test that it works?
4.  What should happen if the request fails?
5.  Is this necessary for Version 1, or can it wait?

Build one small piece at a time, understand it, test it, then commit it.

------------------------------------------------------------------------

## 16. Project Status

-   [x] Requirements defined
-   [x] Version 1 scope defined
-   [x] Backend-first development plan defined
-   [ ] Backend implemented
-   [ ] Frontend implemented
-   [ ] Frontend/backend integration completed
-   [ ] Version 1 tested
-   [ ] Optional deployment completed

**Current next step:** Initialise the backend project and get a basic
Express server running. Do not start frontend implementation,
authentication, or frontend integration yet. First finish and test the
backend APIs in Postman.
