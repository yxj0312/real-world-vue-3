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
import { ref, computed } from 'vue'
export default {
  setup() {
    return useEventSpace()
  }
}

// composition function
function useEventSpace() {
  const capacity = ref(3)
  const attending = ref(['Tim', 'Bob', 'Joe'])

  // eslint-disable-next-line no-unused-vars
  const spacesLeft = computed(() => {
    return capacity.value - attending.value.length
  })

  function increaseCapacity() {
    // How we access value on a reactive reference
    capacity.value++
  }
  return { capacity, increaseCapacity, attending }
}
</script>
