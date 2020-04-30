# Travel Verse

## How to run the application's backend in your localhost?

1. Download and install NodeJS
2. Go to backend directory:
   ```bash
   cd backend
   ```
3. Install nodemon:
   ```bash
   npm install -g nodemon
   ```
4. Install all package devendecies:
   ```bash
   npm install
   ```
5. Create **.env** file inside backend's root directory and change the value.
   ```
   X_APP_NAME=Travel Verse
   X_APP_AUTHOR=Ralph Zapata

   X_APP_PORT=9999

   X_DB_HOST=localhost
   X_DB_PORT=3306
   X_DB_USER=
   X_DB_PASSWORD=
   X_DB_NAME=

   X_API_SECRET_KEY=
   X_API_ENCRYPT_ALGO=HS512
   X_API_EXPIRY=86400

   X_NEWS_API_URL=http://newsapi.org/v2
   X_NEWS_API_SECRET_KEY=

   X_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
   X_WEATHER_API_SECRET_KEY=

   X_GMAPS_API_URL=https://api.opentripmap.com/0.1/en/places
   X_GMAPS_API_SECRET_KEY=
   ```
   **Note**: it is critical to setup environmental variable
6. Run the following command to run the backend application:
   ```bash
   npm start
   ```

## How to run the application's frontend in your localhost?

1. Go to the the frontend directory
   ```bash
   cd frontend
   ```
2. Install all package dependencies
   ```bash
   npm install
   ```
3. Create **.env** file inside frontend's root directory.
   ```
   REACT_APP_API_URL=http://localhost:9000/api
   ```
   **Note**: it is critical to setup environmental variable
4. Start the application.
   **Important Note:** Make sure that the backend is running before running this application
   ```
   npm start
   ```

## License

[MIT](https://choosealicense.com/licenses/mit/)
