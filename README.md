# Wookie Bookstore

The goal of this project it so provide a simple bookstore app. This app relies on MongoDB to store data, provided either via docker-composer or MongoDB Atlas.

- [Usage](#usage)
- [Docker](#docker)
- [Testing](#testing)
- [Notes](#notes)

## Usage
0. Clone the repo
1. Install `node_modules`:
   ```
   yarn
   ```
2. Copy `.env.example` to `.env` and fill in the correct values
3. Build UI:
   ```
   yarn web:build
   ```
4. Start server:
   ```
   yarn start
   ```

## Docker
🚧 WIP 🚧

## Testing
Tests are described in `tests/` folder. Use the following command to perform all tests;
```
yarn test
```

## Notes
- REST response bodies can be converted to XML instead of JSON by sending desired format via `Accept` ~~or `Content-Type`~~ headers
