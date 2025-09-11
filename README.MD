# Task Tracker CLI

A simple command-line interface (CLI) application for tracking tasks. This project is one of the recommended practice projects from the [Backend Developer Roadmap](https://roadmap.sh/projects/task-tracker)

## Overview

Task Tracker CLI is lightweight and easy to use. It helps you manage your tasks from the terminal — you can add, update, delete, and list tasks based on their status.

## Features

- Add, update, and delete tasks
- Mark tasks as in progress or done
- View all tasks
- View tasks by status:
  - Todo (not started)
  - In Progress (currently being worked on)
  - Done (completed)

## Installation

```bash
  # open the project
  cd task-tracker-cli

  # install dependencies
  npm install

  # initialize TypeScript and compile
  npx tsc --init
  npx tsc

  # use the CLI globally
  npm link
  task-cli add "breakfast"

  # or run it locally
  npm run task-cli add "breakfast"
```

## Usage

### Add a Task

```bash
task-cli add <description: string>
```

### Update a Task

```bash
task-cli update <id: string> <description:string>
```

### Delete a Task

```bash
task-cli delete <id: string>
```

### List All Tasks

```bash
task-cli list
```

### List Todo Tasks

```bash
task-cli list todo
```

### List In Progress Tasks

```bash
task-cli list in-progress
```

### List Done Tasks

```bash
task-cli list done
```
