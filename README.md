# the social network api

Description
The social network api: Where users can share thoughts, interact with friends' posts, and manage friend lists. Developed from scratch using Express.js, MongoDB, and Mongoose, this application provides the backend for handling user data, thoughts, reactions, and friend lists.


Routes
- User Routes: Manage users with GET, POST, PUT, and DELETE methods.
- Thought Routes: Create, update, view, and delete thoughts with the ability to interact with them.
- Reaction Routes: Add and remove reactions on thoughts.
- Friendship Routes: Add and remove friends from a user's friend list.

Technologies 
- Express.js: For routing and handling HTTP requests.
- MongoDB: NoSQL database for storing user and thought data.
- Mongoose: ODM to interact with MongoDB and define models.
- Node.js: Backend JavaScript runtime.
- Typescript

Demo
You can view the demo video of the application through the following link or in the "Demo Video" Folder:
[Demo Video](https://drive.google.com/file/d/1WV45TwIYChF0vJLy7Vnwmqh5gdfPzgY9/view?usp=sharing)

Table of Contents
- Installation
- Usage
- Credits
- License

Installation
1. Clone this repository to your local machine:
    git clone https://github.com/MarkSian/the-social-network-api
2. cd into the project directory
3. Install dependencies:
    execute npm install
4. Set up MongoDB:
    - Make sure you have MongoDB installed, or use MongoDB Atlas for a cloud database.
    - If using MongoDB Compass, ensure the database is seeded correctly.
5. Start the server:
    npm run build followed by npm run start
6. Use Insomnia or Postman to test the API routes for users, thoughts, reactions, and friendships.

Usage
After installation and server startup, you can use Insomnia to interact with the API. Routes include:
- GET, POST, PUT, DELETE for users and thoughts.
- POST, DELETE for reactions and friends.

Credits
Contributors
- Mark Sianipar: [GitHub Profile](https://github.com/MarkSian)

Resources
- [MongoDB Documentation](https://www.mongodb.com/docs/v5.0/reference/method/cursor.toArray/)
- [Mongoose Documentation](https://mongoosejs.com/)

License
This project is licensed under the MIT License.
