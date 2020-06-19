# Multi-Categories Catalog

## Project Description
This is a single page application bootstrapped with [create-react-app](https://github.com/facebook/create-react-app). For the backend, the application uses [Catalog Restful API](https://github.com/uendno/catalog_restful_api), written by Robert. 
The purpose of the project is to practice building a single page application with ReactJS and to incorporate the app with available APIs. 
**Progress**: The application has not achieved 80% test coverage, and much work needs to be done to improve user interface. 

## Installation Instruction
### For backend
Please follow the [original instructions](https://github.com/uendno/catalog_restful_api/blob/master/README.md) to install and run the Catalog Restful API. 
*Note*: The backend needs to be run when starting the application, using command
```
python run.py
```

### For frontend
All dependencies should already be included in `package.json`
Run `npm install` to install `node-modules`

In the project directory, you can run:

#### `npm run start:local`
Runs the app in the local mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits. You will also see any lint errors or warnings in the console.
To config the local environment variables, please edit in /.env/.env.local.

#### `npm run start:dev`
Runs the app in development mode on [http://localhost:8000](http://localhost:8000). 
To config the environment variables, please edit in /.env/.env.development.

#### `npm run test:cov`
Launches the test runner in the interactive watch mode, showing test coverage. 

#### `npm start` `npm run build` `npm test` `npm run eject`
These commands are also available from [create-react-app](https://github.com/facebook/create-react-app)

## Reference:
Some of the code is adapted or taken from online sources, especially for CSS.

## Acknowledgement:
The application could not be completed without the instructions and guidance from my mentor.




