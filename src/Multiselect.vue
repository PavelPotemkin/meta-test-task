<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  modelValue: string[]
  name: string
  label: string
  value: string
}>()

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

</script>

<template>
  <label>
    <input
        v-model="model"
        type="checkbox"
        :name="name"
        :value="value"
    >

    <span>
      {{ label }}
    </span>
  </label>
</template>
