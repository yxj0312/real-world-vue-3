<template>
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
import { ref } from 'vue'
export default {
  setup() {
    const capacity = ref(3)
    const attending = ref(['Tim', 'Bob', 'Joe'])

    function increaseCapacity() {
      // How we access value on a reactive reference
      capacity.value++
    }
    return { capacity, increaseCapacity, attending }
  }
}
</script>
