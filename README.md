This is a simple API built with Node.js, Express, and MongoDB that manages transactions. The API allows users to create and view transactions. It also integrates with MongoDB for data persistence, providing features such as sequential transactionId and userId.

Features:
1)Create transactions
2)Fetch transaction details
3)Handle users and transactions using MongoDB
4)Sequentially generate userId and transactionId

Technologies Used:
1)Node.js - JavaScript runtime for server-side development
2)Express - Web framework for Node.js
3)MongoDB - NoSQL database for storing transaction and user data
4)Mongoose - ODM for MongoDB in Node.js
5)Cors - Middleware for handling Cross-Origin Resource Sharing (CORS)


API Endpoints:
1. Create a Transaction
URL: /api/transactions/
Method: POST
Request Body:
{
  "user": 1,
  "amount": 100,
  "type": "credit",
  "date": "2024-11-21T12:00:00Z"
}
Response:
{
  "transactionId": 1,
  "user": 1,
  "amount": 100,
  "type": "credit",
  "date": "2024-11-21T12:00:00Z"
}
2. Fetch All Transactions
URL: /api/transactions/
Method: GET
Response:

[
   {
    "transactionId": 1,
    "user": 1,
    "amount": 100,
    "type": "credit",
    "date": "2024-11-21T12:00:00Z"
  }
]
