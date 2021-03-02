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
