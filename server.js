const mysql = require('mysql2')
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootroot',
      database: 'employeeTracker_db'
    },
    console.log(`Connected to the employeeTracker_db database.`)
  );
