Svelte Example Project
======================

A simple task list created with Svelte to learn the framework.

Contains:
- Routing
- State Management
- Api Calls (mocked with Json Server)

## Installation

Clone the project with git

```bash
git clone git@github.com:mnavarrocarter/svelte-task-list.git
```

Install the project dependencies:

```bash
npm ci
```

Start the fake api using json-server.

```bash
npm run dev-db
```

And then run the project:

```bash
npm run dev ```

## Architecture

Architecture is pretty simple. There's a sort of module (folder) containing all the tasks components. These are three:
1. `AddTask.svelte` contains the form an logic to create a Task.
2. `ListTasks.svelte` renders a list of tasks in the DOM.
3. `Task.svelte` represents a single task usually in the task list.

There's also a `tasks.js` file that holds the main business logic and contains the tasks store state. This file is crucial for the application. It extends the api provided by `writable` (svelte/store) by adding some methods that abstract working with the tasks state. The centralized state cannot be touched by any other actor, only read.

The views folder holds the views user for the router, wich are registered in the `App.svelte` component.