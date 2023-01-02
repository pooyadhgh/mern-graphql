# MERN-GraphQL

![MERN-GrahphQL](https://raw.githubusercontent.com/pooyadhgh/mern-graphql/main/screenshots/desktop-view.png)

An application with GraphQL API, developed with Javascript in the backend with Epress.js and Typescript in frontend with React.js and Apollo client, connected to a MongoDB database. (MERN Stack)

### Features

- CRUD Operations in GraphQL API handled with [Apollo Client](https://www.apollographql.com/docs/) in frontend with React.js.
- Refetch queries as well as update Apollo cache itself in certain situations.
- Highly Accessible content.

### Overall Architecture

- The Backend and the Frontend are separated and run independently in different ports.
- For simplicity's sake, the `express-graphql` package is used in the backend to define api schemas, and `mongoose` is used to connect our Express.js app to MongoDB.
- In the front end, Hooks, utility functions, components, pages, and GraphQL files are provided in separate scalable directories.
- The frontend application is created with [Vite](https://vitejs.dev/) instead of Webpack. (See [Why](https://vitejs.dev/guide/why.html)) and [Vitest](https://vitest.dev/) is configured as the main test runner instead of `jest`, aligned with `react-testing-library`.

### Accessibility

- All elements are responsive to the viewport.
- Best practices are used to create the forms, labels, and inputs for keyboard-only, non-sighted users, or users who disable styles.
- Inputs have feedback while it is focused and proper label and placeholder to help users.
- Elements are organized to easily navigate with assistive technology, like screen readers and keyboards.
- Feedback (visual and text) is sent to the user in different situations.
- The page has a hierarchy of elements and section headings to navigate with a screen reader.
- All images have alt and title tags so screen readers can easily access and read tags.
- All interactive elements have on-focus styling, meaning they respond to the selection with the keyboard.
- Navigating with the tab key is working correctly.
- Enter and Escape keys are defined to work correctly while typing or selecting.

### Performance

![enter image description here](https://raw.githubusercontent.com/pooyadhgh/mern-graphql/main/screenshots/lighthouse.png)

All lighthouse metrics (Performance, Accessibility, Best Practices, and SEO) have 100 scores on both mobile and desktop.

## Usage

### Env Variables

Create a .env file in the root and add the following

```
PORT = 8000
NODE_ENV = 'development'
MONGODB_URI = 'your mongodb uri'
```

Create a .env file in the client root and add the following

```
VITE_API_URI = 'your backend graphql api uri'
```

### Install Dependencies

#### Backend

```
npm install
```

#### Frontend

```
cd client
npm install
```

### Run development mode

#### Server

```
npm run start:server:dev
```

#### Client

```
npm run start:client:dev
```

### Test Client

```
cd client
npm run test
```

## Build & Deploy Client

```
cd client
npm run build
```

## License

The MIT License
Copyright (c) 2022 Pooyadhgh
