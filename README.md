
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
