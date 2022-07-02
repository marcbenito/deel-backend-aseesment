# DEEL BACKEND TASK by Marc Benito

## Author notes


### Structure
- Decided a route distribution over a domain because the small size of the DB. All the tables are very coupled ( at least contract -- job) and doesn't have many sense to split into domain driven structure.
- Put the database layer service totally isolated of any express.js parameter dependency. Easy for unit testing.
- Mantained all the router routes in same file for easy reading. In bigger systems I would have splited the routes and put in the routes folder.

### Some considerations

- Decided to do complex queries ( admin queries ) thinking about performance instead of doing more simple queries and more lines of code. Even though the code is still clean and clear.
- Decided to do one of the complex queries raw query. For me reading raw sql is easier than reading complex sequelize queries.
- for the admin queries I decided to use the createdAt date. Payment date could be done much later than the job.
- Created another middleware to simulate admin access. Used the same idea: Adding a header to control if access is granted.
- Added lint and .eslintrc to avoid mistakes in the development. 
- All the comments added are for you. I tried to document my controversial decisions via comments.
- Added initial query to validate db connection and tables.

### Tests
- Due to time, I have prioritized doing some integration tests over simple frontend. Given the small amount of dependencies it was the faster option to test the code.
- you can execute npm run test to 
- Got a coverage of 87%. It seems very high but there's a lot of work to do.
### Next steps
 - Migrate to Typescript. The last projects I did were in typescript. I missed typing, it helps a lot to work faster and smart.
 - More work on parameter validation. I tried to deal with all data validation but probably the error messages in the responses could be improved. Next steps should be adding more tests.
 - Add logs for monitoring. Currently the API doesn't have any monitoring tool. we can use morgan or 
 - Prepare the system for production. For example removing the console.logs from the sequelize in case of environment == production.
 - Implement swagger documentation.
 - Avoid reloading the database in all the test suites.
 - More testing..



## Getting Set Up

  
The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

  

1. Start by cloning this repository.

  

1. In the repo root directory, run `npm install` to gather all dependencies.

  

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

  

1. Then run `npm start` which should start  the server.


## Test & lint

-  For testing:
    ```npm run test ```
- For coverage:
    ```npm run coverage```
- For lint:
    ```npm run lint ```


## APIs To Implement 


1. ***GET*** `/contracts/:id` - This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!

1. ***GET*** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

1. ***GET*** `/jobs/unpaid` -  Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.

1. ***POST*** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

1. ***POST*** `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

1. ***GET*** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.

1. ***GET*** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```

