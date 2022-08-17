import { defineStore } from 'pinia'

type StorageItemValue = null | string | string[]

export interface StorageItem {
    value: StorageItemValue
    isRequired: boolean
    isConditionSuccess: boolean | null
}

const useStore = defineStore('storage', {
    state: () => ({
        storage: {} as Record<string, StorageItem>
    }),

    actions: {
        setKey(key: string, value: StorageItem) {
            this.storage[key] = value
        },

        setKeyIfNotExist(key: string, value: StorageItem) {
            if (this.storage[key] === undefined) {
                this.setKey(key, value)
            }
        }
    }
})

export default useStore