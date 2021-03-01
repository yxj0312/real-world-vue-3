<template>
  <div>Capacity: {{ capacity }}</div>
  <button @click="increaseCapacity()">Increase Capacity</button>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const capacity = ref(3)

    function increaseCapacity() {
      // How we access value on a reactive reference
      capacity.value++
    }
    return { capacity, increaseCapacity }
  }
}
</script>
