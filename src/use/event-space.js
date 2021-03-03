import { ref, computed } from 'vue'

export default function useEventSpace() {
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
