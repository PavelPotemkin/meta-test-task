<script setup lang="ts">
import useStore from "./stores/store";
import Radio from "./Radio.vue";
import Checkbox from "./Checkbox.vue";
import Multiselect from "./Multiselect.vue";
import TextField from "./TextField.vue";

const props = defineProps<{
  values: {
    label: InputQuestion['label']
    type: InputQuestion['type']
    values: InputQuestion['values']
    key: InputQuestion['key']
  }
  conditional?: Conditional
}>()

const store = useStore()
</script>

<template>
  <div class="question">
    <h4>
      {{ values.label }}
    </h4>

    <template v-if="values.type === 'radio'">
      <Radio
          v-for="value in values.values"
          v-model="store.storage[values.key].value"
          :key="value.value"
          :name="values.key"
          :label="value.label"
          :value="value.value"
      />
    </template>

    <template v-else-if="values.type === 'checkbox'">
      <Checkbox
          v-model="store.storage[values.key].value"
          :key="values.key"
          :name="values.key"
          :label="values.label"
      />
    </template>

    <template v-if="values.type === 'multiselect'">
      <Multiselect
          v-for="value in values.values"
          v-model="store.storage[values.key].value"
          :key="value.value"
          :name="values.key"
          :label="value.label"
          :value="value.value"
      />
    </template>

    <template v-else-if="values.type === 'textfield'">
      <TextField
          v-model="store.storage[values.key]"
          :key="values.value"
          :name="values.key"
          :label="values.label"
      />
    </template>

  </div>
</template>

<style scoped>
.question {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
}
</style>
