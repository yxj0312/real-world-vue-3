
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

### How do we add a method?

We can't write capacity++ inside the function, because we can't increment an object.

This is a reactive reference, and not a primitive.

if we inspected capacity in the console in the console, that's a reference with a getter and a setter, and it also has this value.

```JavaScript
<template>
    <div>Capacity: {{ capacity }} </div>
    <button @click="increaseCapacity()">Increase Capacity</button>
</template>

<script>
import {ref} from "vue"
export default {
    setup() {
        const capacity = ref(3);

        function increaseCapacity() {
            // How we access value on a reactive reference
            capacity.value++
        }
        return { capacity, increaseCapacity}
    }
}
</script>
```

Why don't we need to call .value in the template?

When Vue finds a ref in the template it automatically exposes the inner value. So you should never need to call .value inside the template

### Computed Properties

```JavaScript
<template>
    <p>Space Left: {{ spacesLeft }} out of {{ capacity }}</p>
    <div>Capacity: {{ capacity }} </div>
    <button @click="increaseCapacity()">Increase Capacity</button>
</template>

<script>
import {ref , computed } from "vue"
export default {
    setup() {
        const capacity = ref(3);
        const attending = ref(['Tim', 'Bob', 'Joe'])

        const spacesLeft = computed(() => {
            return capacity.value -attending.value.length
        })

        function increaseCapacity() {
            // How we access value on a reactive reference
            capacity.value++
        }
        return { capacity, increaseCapacity}
    }
}
</script>
```

We create a new constant called spacesLeft, which sends into the computer function an anonymous function, which returns the result of taking capacity, and subtracting the number of people who are attending

Notice I have to use .value here since I'm dealing with two reactive references.

### Alternative Reactive Syntax

```JavaScript
<template>
  <p>Space Left: {{ event.spacesLeft }} out of {{ event.capacity }}</p>
  <div>Capacity: {{ event.capacity }}</div>
  <button @click="increaseCapacity()">Increase Capacity</button>
  <h2>Attending</h2>
  <ul>
    <li v-for="(name, index) in event.attending" :key="index">
      {{ name }}
    </li>
  </ul>
</template>

<script>
import { reactive, computed } from 'vue'
export default {
  setup() {
    const event = reactive({
      capacity: 4,
      attending: ['Tim', 'Bob', 'Joe'],
      // eslint-disable-next-line no-unused-vars
      spacesLeft: computed(() => {
        return event.capacity - event.attending.length
      })
    })

    function increaseCapacity() {
      // How we access value on a reactive reference
      event.capacity++
    }
    return { event, increaseCapacity }
  }
}
</script>

```

Can we destructure the event object?

use toRefs

```JavaScript
<template>
  <p>Space Left: {{ spacesLeft }} out of {{ capacity }}</p>
  <div>Capacity: {{ capacity }}</div>
  <button @click="increaseCapacity()">Increase Capacity</button>
  <h2>Attending</h2>
  <ul>
    <li v-for="(name, index) in attending" :key="index">
      {{ name }}
    </li>
  </ul>
</template>

<script>
import { reactive, computed, toRefs } from 'vue'
export default {
  setup() {
    const event = reactive({
      capacity: 4,
      attending: ['Tim', 'Bob', 'Joe'],
      // eslint-disable-next-line no-unused-vars
      spacesLeft: computed(() => {
        return event.capacity - event.attending.length
      })
    })

    function increaseCapacity() {
      // How we access value on a reactive reference
      event.capacity++
    }
    return { ...toRefs(event), increaseCapacity }
  }
}
</script>

```

Converts a reactive object to a plain object, where each property is a Reactive Reference pointing to the property on the original object.

if there's no function, we can simply ```return toRefs(event);```

### Modularizing

It's not clear, which objects are being injected by which composition function.

To solve this, we can create local objects for the data that our composition functions are sending in, and use those in the return objects

### LifeCycle

beforeCreate(): Called immediately after instance is initialized, before options are processed
created(): Called after the instance has been created
beforeMount(): Called right before mounting of the DOM begins
mounted(): Called when the instance has been mounted(browser updated)
beforeUpdate(): Called when reactive data has changed, before the DOM has been re-rendered
updated(): Called when reactive data has changed, and the DOM has been re-rendered.
beforeDestroy(): Called right before the Vue instance is destroyed.
destroyed(): Called after the Vue instance has been destroyed.

#### Newer Vue 2 LifeCycle Methods

activated() Used for <keep-alive>, when a component inside<keep-alive> is toggled on.
deactivated() Used for <keep-alive>, when a component inside<keep-alive> is toggled off.
errorCaptured() Called when an error from any descendent component is captured.

#### Vue3 Modifications

beforeDestroy()->beforeUnmount()
destroyed()->unmounted()

#### When using Composition API

we can create callback hooks inside setup() by adding "on" to the callback name

```javaScript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured
} from "vue";

export default {
  setup() {
    onBeforeMount(() => {
      console.log("Before Mount!");
    });
    onMounted(() => {
      console.log("Mounted!");
    });
    onBeforeUpdate(() => {
      console.log("Before Update!");
    });
    onUpdated(() => {
      console.log("Updated!");
    });
    onBeforeUnmount(() => {
      console.log("Before Unmount!");
    });
    onUnmounted(() => {
      console.log("Unmounted!");
    });
    onActivated(() => {
      console.log("Activated!");
    });
    onDeactivated(() => {
      console.log("Deactivated!");
    });
    onErrorCaptured(() => {
      console.log("Error Captured!");
    });
  }
};
```

You might notice that two hooks are missing. beforeCreate and created are not needed when using the Composition API. This is because beforeCreate() is called right before setup() and created() is called right after setup(). Thus, we simply put code inside setup() that would normally be in these hooks, such as API calls.

#### Two New Vue 3 LifeCycle Methods

There are two more additional watchers coming in Vue 3. These have not been implemented with the Vue 2 Composition API plugin (as I’m writing this), so you can’t play with them without using Vue 3 source.

onRenderTracked - called when a reactive dependency is first being accessed in the render function, during render. This dependency will now be tracked. This is helpful to see which dependencies are being tracked, for debugging.
onRenderTriggered - Called when a new render is triggered, allowing you to inspect what dependency triggered a component to re-re

### Watch

Let’s look at another simple example using our composition API. Here’s some code that has a simple search input box, uses the search text to call an API, and returns the number of events that match the input results.

```JavaScript
<template>
  <div>
    Search for <input v-model="searchInput" /> 
    <div>
      <p>Number of events: {{ results }}</p>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/composition-api";
import eventApi from "@/api/event.js";

export default {
  setup() {
    const searchInput = ref("");
    const results = ref(0);
    
    results.value = eventApi.getEventCount(searchInput.value);

    return { searchInput, results };
  }
};
</script>
```

As you can see, it doesn’t seem to be working. This is because our API calling code, specifically results.value = eventApi.getEventCount(searchInput.value); is only getting called once, during the first time setup() is run. It doesn’t know to fire again, when our searchInput gets updated.

#### Solution: **watchEffect**

To fix this we need to use watchEffect.

This will run our function on the next tick while reactively tracking its dependencies, and re-run it whenever the dependencies have changed. Like so:

```JavaScript
setup() {
  const searchInput = ref("");
  const results = ref(0);

  watchEffect(() => {
    results.value = eventApi.getEventCount(searchInput.value);
  });

  return { searchInput, results };
}
```

So the first time this gets run it uses reactivity to start tracking searchInput, and when it gets updated it will re-run our API call which will update results. Since results is used in our template our template will be re-rendered.

#### Watch syntax is for being specific

If I want to be more specific as to which source I want to watch for changes, I can use watch instead of watchEffect, like so:

```JavaScript
watch(searchInput, () => {
  ...
});
```

Only if searchInput is changed will it run again, even if other reactive objects are called

Also, if I need access to the new value and old value of the item being watched I can write:

```JavaScript
watch(searchInput, (newVal, oldVal) => {
  ...
});
```

### Watching Multiple Sources

If I want to watch two Reactive References I can send them inside an array:

```JavaScript
watch([firstName, lastName], () => {
  ...  
});
```

Now if either are changed, the code inside will re-run. I can also get access to both of their old and new values with:

```JavaScript
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  ...   
});
```

What if we use watch instead watchEffect in our example?

```JavaScript
<template>
  <div>
    Search for <input v-model="searchInput" /> 
    <div>
      <p>Number of events: {{ results }}</p>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "@vue/composition-api";
import eventApi from "@/api/event.js";

export default {
  setup() {
    const searchInput = ref("");
    const results = ref(0);
    
    watch(searchInput, () => {
      results.value = eventApi.getEventCount(searchInput.value);
    })

    return { searchInput, results };
  }
};
</script>
```

If we looked at this in the browser, we would notice number of events starts out as empty, and then it works as we type.

It started out as empty,because it didn't get run on initial load. In other words, Watch is lazy loaded by default.

If you want have it run on initial load,

```JavaScript
watch(searchInput, () => {
      results.value = eventApi.getEventCount(searchInput.value);
    }, { immediate:true })
```

So watch Effect only ever takes a single argument, which is the callback and watch has multiple arguments, including the reactive object we want to watch, and options if we want to configure it.

### Sharing State

When working with API calls, quite often there’s a lot of code and functionality that we might want to build around a call. Specifically things like loading state, error state, and try / catch blocks. Let’s look at this code and then extract it properly using the Composition API.

#### Example

```JavaScript
<template>
  <div>
    Search for <input v-model="searchInput" /> 
    <div>
      <p>Loading: {{ loading }}</p>
      <p>Error: {{ error }}</p>
      <p>Number of events: {{ results }}</p>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "@vue/composition-api";
import eventApi from "@/api/event.js";
export default {
  setup() {
    const searchInput = ref("");
    const results = ref(null);
    const loading = ref(false);
    const error = ref(null);
    async function loadData(search) {
      loading.value = true;
      error.value = null;
      results.value = null;
      try {
        results.value = await eventApi.getEventCount(search.value);
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    }
    watch(searchInput, () => {
      if (searchInput.value !== "") {
        loadData(searchInput);
      } else {
        results.value = null;
      }
    });
    return { searchInput, results, loading, error };
  }
};
</script>
```

This is a pretty common pattern in a Vue application where I have an API call and I need to account for the results, loading, and error state. How might I extract this to use the composition API? Well first I might create a new file and extract the common functionality.

#### Now with Shared State

/composables/use-promise.js

```JavaScript
import { ref } from "@vue/composition-api";
export default function usePromise(fn) { // fn is the actual API call
  const results = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const createPromise = async (...args) => { // Args is where we send in searchInput(Any arguments that should be sent into fn)
    loading.value = true;
    error.value = null;
    results.value = null;
    try {
      results.value = await fn(...args); // Passing through the SearchInput(call the function with the arguments sent in, here = value of the input)
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  return { results, loading, error, createPromise };
}
```

Some modifications:

- create a const called createPromise, which will contain an asynchronous anonymous function, which receives any arguments that our API call needs.

Now we can import the usePromise function. Then we'll create a new constant called getEvents = userPromise(search=>...)

in App.js

```JavaScript
<template>
  <div>
    Search for <input v-model="searchInput" /> 
    <div>
      <p>Loading: {{ getEvents.loading }}</p>
      <p>Error: {{ getEvents.error }}</p>
      <p>Number of events: {{ getEvents.results }}</p>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "@vue/composition-api";
import eventApi from "@/api/event.js";
import usePromise from "@/composables/use-promise";
export default {
  setup() {
    const searchInput = ref("");
    const getEvents = usePromise(search =>
      eventApi.getEventCount(search.value) // Send in the API call that will be wrapped in a promise
    );

    watch(searchInput, () => {
      if (searchInput.value !== "") {
        getEvents.createPromise(searchInput); // Call the promise with updated searchInput data
      } else {
        getEvents.results.value = null;
      }
    });
    return { searchInput, getEvents };
  }
};
</script>
```

Improving the Code

When I ran this by members of the Vue core team, they called attention to …getEvents. Specifically that I shouldn’t be destructuring the object. Without destructuring the data is namespaced under getEvents which makes it more encapsulated and clear where the data is coming from in the component using it. It might look like:

### Suspense

When we code up Vue apps we use API calls a lot to load in back-end data. When we are waiting for this API data to load, it’s a good user interface practice to let the user know that the data is loading. This is especially needed if the user has a slow internet connection.

Typically in Vue we’ve used lots of v-if and v-else statements to show one bit of html while we’re waiting for data to load and then switch it out once data is loaded. Things can get even more complex when we have multiple components doing API calls, and we want to wait until all data is loaded before displaying the page.

```JavaScript
<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
  ...
  </div>
</template>

// or 
const store = new Vuex.Store({
  state: {
    loadingStatus:
  }
})
```

However, Vue 3 comes with an alternative option inspired by React 16.6 called Suspense. This allows you to wait for any asynchronous work (like making a data API call) to complete before a component is displayed.

Suspense is a built in component that we can use to wrap two different templates, like so:

```JavaScript
<template>
  <Suspense>
    <template #default>
      <!-- Put component/components here, one or more of which makes an asychronous call -->
    </template>
    <template #fallback>
      <!-- What to display when loading -->
    </template>
  </Suspense>
</template>
```

When Suspense loads it will first attempt to render out what it finds in <template #default>. If at any point it finds a component with a setup function that returns a promise, or an Asynchronous Component (which is a new feature of Vue 3) it will instead render the <template #fallback> until all the promises have been resolved.

Let’s take a look at a very basic example:

```JavaScript
<template>
  <Suspense>
    <template #default>
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script>
import Event from "@/components/Event.vue";
export default {
  components: { Event },
};
</script>
```

Here you can see I’m loading my Event component. It looks similar to previous lessons:

/components/Event.js

```JavaScript
<template>
...
</template>
<script>
import useEventSpace from "@/composables/use-event-space";
export default {
  async setup() {
    const { capacity, attending, spacesLeft, increaseCapacity } = await useEventSpace();
    return { capacity, attending, spacesLeft, increaseCapacity };
  },
};
</script>
```

Notice in particular that my setup() method marked as async and my await useEventSpace() call. Obviously, there’s an API call inside the useEventSpace() function, that I’m going to wait to return.

Now when I load up the page I see the loading … message, until the API call promise is resolved, and then the resulting template is displayed.

#### Multiple Async Calls

What’s nice about Suspense is that I can have multiple asynchronous calls, and Suspense will wait for all of them to be resolved to display anything. So, if I put two Event. Now Suspense is going to wait for both of them to be resolved before showing up.

#### Deeply Nested Async Calls

What’s even more powerful is that I might have a deeply nested component that has an asynchronous call. Suspense will wait for all asynchronous calls to finish before loading the template. So you can have one loading screen on your app, that waits for multiple parts of your application to load.

#### What about errors?

It’s pretty common that you need a fallback if an API call doesn’t work properly, so we need some sort of error screen along with our loading screen. Luckily the Suspense syntax allows you to use it with a good old v-if, and we have a new onErrorCaptured lifecycle hook that we can use to listen for errors:

```JavaScript
<template>
  <div v-if="error">Uh oh .. {{ error }}</div>
  <Suspense v-else>
    <template #default>
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
<script>
import Event from "@/components/Event.vue";
import { ref, onErrorCaptured } from "vue";
export default {
  components: { Event },
  setup() {
    const error = ref(null);
    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });
    return { error };
  },
};
</script>
```

Notice the div at the top, and the v-else on the Suspense tag. Also notice the onErrorCaptured callback in the setup method. In case you’re wondering, returning true from onErrorCaptured is to prevent the error from propagating further. This way our user doesn’t get an error in their browser console.

#### Creating Skeleton Loading Screens

Using the Suspense tag makes creating things like Skeleton loading screens super simple. You know, like these:Your skeleton would go into your <template #fallback> and your rendered HTML would go into your <template #default>. Pretty simple!

### Teleport

Vue’s component architecture enables us to build our user interface into components that beautifully organize our business logic and presentation layer. However, there are some instances where one component has some html that needs to get rendered in an alternative location. For example:

1. Styles that require fixed or absolute positioning and z-index. For example, it’s a common pattern to place UI components (like modals) right before the </body> tag to ensure they are properly placed in front of all other parts of the webpage.

2. When our Vue application is running on a small part of our webpage (or a widget), sometimes we may want to move components to other locations in the DOM outside of our Vue app.

#### Solution

The solution Vue 3 provides is the Teleport component. Previously this was named “Portal”, but the name was changed to Teleport so not to conflict with the future <portal> element which might some day be a part of the HTML standard. The Teleport component allows us to specify template html (which may include child components) that we can send to another part of the DOM. I’m going to show you some very basic usage, and then show you how we might use this in something more advanced. Let’s start by adding a div tag outside of our Vue app, in our basic Vue CLI generated app:

/public/index.html

```JavaScript
     ...
    <div id="app"></div>
    <div id="end-of-body"></div>
  </body>
</html>
```

Then let’s try teleporting some text to this #end-of-body div from inside our Vue application to slightly outside the application.

```JavaScript
   <template>
    <teleport to="#end-of-body">
      This should be at the end.
    </teleport>
    <div>
      This should be at the top.
    </div>
  </template>
</html>
```

Notice the teleport line where we specify the div we want to move our template code to, and if we did this right, the text at the top should be moved to the bottom. Sure enough, it does:
