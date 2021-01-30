
# Note

## Vue Router Essentials

### Server-side Routing

We call this “Server-Side Routing” because the client is making a request to the server on every URL change.

### Client-side Routing

In many cases, the view of our app that we need to show has already been loaded into the browser, so we don’t need to reach out to the server for it. Vue Router simply updates what part of the app that is currently being displayed.

In fact, with routing like this, our app is functioning as a Single Page Application.

### Single Page Applications

A Single Page Application (SPA) is a web app that loads from a single page and dynamically updates that page as the user interacts with the app.

In our case, everything is being loaded from the index.html file of our project.

In other words, the index.html file is the “single page” of our single page application, where all of the application code is mounted. So Vue Router enables client-side routing so we can navigate around and display different “views” of our app.

### API Calls with Axios

Fetch external data w/ API Call, We'll need:

- A mock database to pull data from: <https://my-json-server.typicode.com/>
- A tool for making API calls: Axios

Why Axios

- GET,POST,PUT, and DELETE requests
- Add authentication to each request
- Set timeouts if requests take too long
- Configure defaults for every request
- Intercept requests to create middleware
- Handle errors and cancel requests properly
- Properly serialize and deserialize requests & responses

Reorganizing our code into a service layer

While we’ve made great progress, there’s a problem with our code. Currently, we’re importing Axios into the EventList.vue component. But in the next lesson, we’re going to create a new component, which displays our event’s details. That new component will also need to make an API call. If we’re importing Axios into each component that needs it, we’re unnecessarily creating a new instance of Axios each time we do that. With API code woven throughout our application, this gets messy and makes our app harder to debug.

The Problem with our code

- Each component creates a new Axios instance
- Our API code is all over our application

Solution: Modularizing using a Service
