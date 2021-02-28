
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

## Vue 3 Composition API

The composition API Syntax is Additive. It's a second way to write components

### When to use the Composition API

1. TypeScript support
2. Component is too large and needs to be organized by feature
3. Need to reuse code across other components

### The Composition API Setup Method

The setup method executes before:

- Components
- Props
- Data
- Methods
- Computed Properties
- Lifecycle methods

Doesn't have access to "this"

The setup have two optional arguments:

- Props: it is reactive and can be watched

```JavaScript
import { watch } from "vue";

export default {
    props: {
        name: String
    },

    setup(props) {
        watch(() => {
            console.log(props.name)
        })
    }
}

```

- Context: we use context to access properties, that we previously accessed with this.

```JavaScript
export default {
    setup(props, context) {
        context.attrs;
        context.slots;
        context.parent;
        context.root;
        context.emit;
    }
}

```

### ref

```JavaScript
<template>
    <div>Capacity: {{ capacity }} </div>
</template>

<script>
import {ref} from "vue"
export default {
    setup() {
        const capacity = ref(3);
        return { capacity}
    }
}
</script>
```

ref create a reactive reference.

This wraps our primitive in an object,
allowing us to track changes.

previously data() was wrapping our primitives in an object

Note: With the composition API we can declare reactive objects that aren't associated with a component

Returns the variables and functions that our template will need. This is more verbose, but it also makes our component more maintainable.

- We can control what gets exposed.

- We can trace where a property is defined
