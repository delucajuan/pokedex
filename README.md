# Pokédex Web Application

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Author](#author)

## Description

This project is a responsive Pokédex web application designed for exploring all existing Pokémon and their characteristics. It is built with React and Next.js on the frontend, while the backend uses Node.js with Express, functioning as a Backend For Frontend (BFF) by consuming data from the official [Pokémon API](https://pokeapi.co/).

## Features

- Browse all available Pokémon.
- Filter Pokémon by type or search by name.
- Display comprehensive details for each Pokémon.
- Light and dark mode options.

## Technologies Used

- **Frontend:** React, Next.js, Material UI, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **API:** PokéAPI
- **Containerization:** Docker

## Prerequisites

- Ensure that Docker is installed and running on your system. You can download Docker from the [official Docker website](https://www.docker.com/products/docker-desktop) or follow the installation instructions in the [Docker documentation](https://docs.docker.com/get-docker/).

## Installation

### Using Docker

1. Clone this repository:

   ```bash
   git clone https://github.com/delucajuan/pokedex.git
   cd pokedex
   ```

2. Build and run the containers:

   ```bash
   docker-compose up --build
   ```

3. The application will be accessible at [http://localhost:3000](http://localhost:3000) and the backend API documentation at [http://localhost:5001/api-docs/](http://localhost:5001/api-docs/).

### Development Setup

Additionally, if you want to develop or customize the application, install dependencies for both the backend and frontend:

```bash
cd backend
npm install
cd ../frontend
npm install
```

## Author

Developed by [Juan De Luca](https://github.com/delucajuan).
