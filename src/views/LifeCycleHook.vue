<template>
  <div>123</div>
</template>

<script>
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
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('Before Mount!')
    })
    onMounted(() => {
      console.log('Mounted!')
    })
    onBeforeUpdate(() => {
      console.log('Before Update!')
    })
    onUpdated(() => {
      console.log('Updated!')
    })
    onBeforeUnmount(() => {
      console.log('Before Unmount!')
    })
    onUnmounted(() => {
      console.log('Unmounted!')
    })
    onActivated(() => {
      console.log('Activated!')
    })
    onDeactivated(() => {
      console.log('Deactivated!')
    })
    onErrorCaptured(() => {
      console.log('Error Captured!')
    })
  }
}
</script>
