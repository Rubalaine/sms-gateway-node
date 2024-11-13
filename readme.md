# SMS Gateway Node

This project is an SMS gateway built with Node.js, designed to run on Android smartphones. It enables seamless SMS management and can be used for various SMS-based applications.

## Requirements

- **Node.js**: Ensure Node.js is installed on the device.
- **SQL Database**: A compatible SQL database is required for data storage.
- **Termux and Termux API**: The Termux app and Termux API package must be installed on the Android device.

## Setup

1. Clone the repository and navigate into the project directory.

2. **Environment Configuration**:

   - Create a `.env` file based on the `example.env` file included in the project. Modify the necessary environment variables.

3. **Database Setup**:

   - Run the `pre:install` script to create the required database tables.

4. **Development Mode**:

   - Use the `dev` script to start the project in development mode.

5. **Production Mode**:
   - Use the `start` script to run the application.

## Scripts

- `pre:install`: Initializes the database tables.
- `dev`: Starts the project in development mode.
- `start`: Starts the application in production mode.

## License

This project is licensed under the ISC License.
