// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);

import express from 'express';
import {PORT} from './config';
import {Dbcon} from './Services/Database';
import App from "./Services/ExpressApp";

const StartServer = async () => {
  const app = express();
  await Dbcon();
  await App(app);

  app.listen(PORT, ()=> {
    console.log(`server connected on port ${PORT}`)
  })
}

StartServer();
