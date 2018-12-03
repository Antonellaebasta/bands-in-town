This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Description

I have created 3 main Components: BandSearch, BandDetail and SelectCity - the last one is the optional feature (filter the events by city).
For large scale projects is better to separate the logic, containers, from the UI, components, but for this tiny application I decided to don't follow this best practice because there isn't a complex logic behind.
To fetch the data from the API I used a Promise.all to get the data of artist and his related events.
To persist the last entered Band, and keep it untill the page session ends, I used sessionStorage.

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br>


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
