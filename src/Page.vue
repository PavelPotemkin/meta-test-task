<script setup lang="ts">
import Question from "./Question.vue";
import useStore, {StorageItem} from "./stores/store";
import {computed, reactive} from "vue";
import lodash from "lodash";

const store = useStore()

const props = defineProps<{
  questions: Question[]
}>()

const emit = defineEmits(['nextPage', 'prevPage'])

const isConditionsSuccess = computed(() => {
  return !props.questions.some(question => {
    if (question.required) {
      return !store.storage[question.key]
    }
  })
})

const checkCondition: Record<Conditional['fn'], (
    value: Conditional['arg'],
    ard: Conditional['arg']
) => boolean> = {
  neq(value, ard) {
    return value !== ard
  },
  gt(value, ard) {
    return value !== ard
  },
  eq(value, ard) {
    return value !== ard
  },
}

props.questions.forEach(question => {
  const {key} = question

  const itemValue = question.type === 'multiselect' ? [] : null

  const itemData: StorageItem = reactive({
    value: itemValue,
    isRequired: question.required || false,
    isConditionSuccess: computed(() => {
      if (!question.conditional) {
        return null
      }

      const item = lodash.get(store.storage, question.conditional.when)

      if (item.value === null) {
        return false
      }

      return checkCondition[question.conditional.fn](item.value, question.conditional.arg)
    })
  })

  store.setKeyIfNotExist(key, itemData)
})

const isPageValid = computed(() => {
  for (let i = 0; i < props.questions.length; i++) {
    const {key} = props.questions[i]

    if (
        store.storage[key].isConditionSuccess === null
            ? store.storage[key].isRequired
            : (store.storage[key].isConditionSuccess && store.storage[key].isRequired)
    ) {
      if (!store.storage[key].value) {
        return false
      }
    }
  }
  return true
})

const nextPage = () => {
  emit('nextPage')
}

const prevPage = () => {
  emit('prevPage')
}

</script>

<template>
  <div class="page">
    <div class="page__questions">
      <template
          v-for="question in questions"
          :key="question.key"
      >
        <Question
            v-if="[null, true].includes(store.storage[question.key].isConditionSuccess)"
            :values="question"
            :conditional="question.conditional"
        />
      </template>
    </div>

    <button style="width: fit-content" :disabled="!isPageValid" @click="nextPage">
      Дальше
    </button>

    <button style="width: fit-content" :disabled="!isPageValid" @click="prevPage">
      Назад
    </button>

    <pre>
      {{ store.storage }}
    </pre>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
