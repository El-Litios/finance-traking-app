<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <UIcon :name="icon" :class="[iconColor]"></UIcon>
        <div>{{ transaction.description }}</div>
      </div>
      <div>
        <UBadge color="white">{{ transaction.category }}</UBadge>
      </div>
    </div>
    <div class="flex items-center justify-end space-x-1">
      <div>{{ currency }}</div>
      <div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="white"
            variant="ghost"
            trailing-icon="i-heroicons-ellipsis-horizontal"
            :loading="isLoading"
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Transactions } from "~/types";

const props = defineProps({
  transaction: {
    type: Object as PropType<Transactions>,
    default: {},
  },
});

const supabase = useSupabaseClient();
const toast = useToast();

const { currency } = useCurrency(props.transaction.amount);

const isIncome = computed(() => props.transaction.type === "Income");
const icon = computed(() =>
  isIncome.value ? "i-heroicons-arrow-up-right" : "i-heroicons-arrow-down-right"
);
const iconColor = computed(() =>
  isIncome.value ? "text-green-600" : "text-red-600"
);

const isLoading = ref(false);

const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("edit"),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => deleteTransaction(),
    },
  ],
];

const deleteTransaction = async () => {
  isLoading.value = true;
  try {
    await supabase.from("transactions").delete().eq("id", props.transaction.id);
    toast.add({
      title: 'Trasaction deleted',
      icon: 'i-heroicons-check-circle',
      color: 'green'
    })
  } catch (error) {
    toast.add({
      title: 'Trasaction deleted',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red'
    })
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
