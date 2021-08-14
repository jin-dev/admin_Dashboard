
## Installation

1. Clone the Repo
2. yarn
3. yarn start
4. go to localhost:3000 and start your work

### Basic usage

``` bash
# dev server with hot reload at http://localhost:3000
$ npm start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
ut-admin-react (with Core UI)
├── public/          #static files
│   └── index.html   #html template
│
├── src/             #project root
│   ├── assets/      #assets - js icons object
│   ├── components/       #components
│   ├── scss/        #user scss/css source
|   ├── services/  # structed API call managements
│   ├── views/       #views source
|   |    ├── _navigation.js  #sidebar config
|   |    ├── ...(pages)  #view pages        
│   ├── atom/       #React Recoil(state management) - beta
|   ├── context/    #React Context API(state management2) - beta    
│   ├── hooks/       #React Hooks
│   ├── types/       #typescript config
│   ├── App.tsx --   #Main routes config with skeleton codes for log-in processor
│   ├── App.test.js
│   ├── polyfill.js
│   ├── index.tsx
│   ├── routes.tsx    #sub routes config
│   
│
└── package.json
└── tsconfig.json
└── webpack.config.js
```