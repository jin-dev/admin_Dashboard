## Installation

1. yarn
2. yarn start
3. go to localhost:3000 and start your work

### Basic usage

```bash
# dev server with hot reload at http://localhost:3000
$ npm start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

## Data Structure

Here is the core parts for this homework

```
JinWoo-Park-Homework (with Core UI)
├── public/          #static files
│   └── index.html   #html template
│
├── src/             #project root
│   ├── components/       #components
|   ├── services/  # structed API call managements
│   ├── views/       #views source
|   |    ├── adminMenu # pages for only the admin (Homework parts)
|   |    ├── employeeMenu  #pages for only the approved(permission : 1) employees (Homework parts)
    |    ├── pages
    |    |  ├── Main #a main for user type selection (Homework parts)
│   ├── types/       #typescript config
│   ├── App.tsx --   #Main routes config with skeleton codes for log-in processor
│   ├── polyfill.js
│   ├── index.tsx
│   ├── routes.tsx    #sub routes config
│
│
└── package.json
└── tsconfig.json
└── webpack.config.js
```
