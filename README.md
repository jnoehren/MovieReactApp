# IMDB React/Express App

Simple React/Express app that show data from an IMDb dataset that is stored in NoSQL Mongo collections. Express is used to create a RESTful API to return the information in those collections for React to display.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

* React, React Scripts & React Dom:  
```
  npm install --save react react-scripts react-dom
```
* Express: 
```
  npm install --save express
```
* MongoDB: Follow the installation instructions here (https://docs.mongodb.com/manual/installation/)

* Nodemon: 
```
  npm install nodemon
```

### Installing & Set Up

**1. Insert Data into Mongo Collections** 

To do this you will need to naviate in a terminal to your mongodb/bin directory is. Once here type the following commands:
```
mongod --dirpathperdb --dbpath {your_path}\mongodb\data\db --logpath {your_path}\mongodb\log\mongo.log --logappend --rest --install
net start MongoDB
mongo
```
This should set your log and data path, then set MongoDB to start running in the background finally open up the mongo terminal. In the mongo terminal type the following commands:
```
use movieinfo
db.createCollection('movie');
db.createCollection('actor');
```
Finally you will need to copy the contents of (MovieReactApp/movie-app/format_data/actor_table.json) and (MovieReactApp/movie-app/format_data/movie_table.json) into the appropriate collections in mongo. Like so:
```
db.movie.insert( {pasted movie_table.json} );
db.actor.insert( {pasted actor_table.json} );
```
This may take a minute because the JSON files are very large

**2. Running the Project**

Since this project uses both Express and React on different Ports you will to open two terminals to run each. The first terminal you will navigate to the rest-api directory and type the following command:
```
nodemon
```
This will start the express server on port 3001. To check that the information is getting fetched successfully open a web browser and look up
```
localhost:3001/api/movies
localhost:3001/api/actors
```
Both should return the data from Mongo in JSON format. The second terminal you will need to naviate to the movie-app directory and run the command
```
npm start
```
This will start the React app on port 3000. To check if this worked type into a web browser
```
localhost:3000
```
This should display the web application

## Authors

**Jeffrey Noehren**

