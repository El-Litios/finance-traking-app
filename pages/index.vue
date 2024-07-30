<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu :options="transactionViewOptions" v-model="selectedView"></USelectMenu>
    </div>
  </section>  
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
    <Trend color="green" title="InCome" :amount="4000" :last-amount="2200" :loading="false"></Trend>
    <Trend color="red" title="Expense" :amount="4000" :last-amount="2200" :loading="false"></Trend>
    <Trend color="green" title="Investments" :amount="4000" :last-amount="2200" :loading="false"></Trend>
    <Trend color="red" title="Savings" :amount="4000" :last-amount="4200" :loading="false"></Trend>
  </section>

  <section>
    <div v-for="(transactionsOnDay, date) in transactionGrupedByDate" :key="date">
      <DailyTransaction :date="(date as any)" :transactions="transactionsOnDay"></DailyTransaction>
      <Transaction v-for="transaction in transactionsOnDay" :key="transaction.id" :transaction="transaction"></Transaction>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Transaction from '~/components/transaction.vue';
import {transactionViewOptions} from '~/constants';
import type { Transactions } from '~/types';

const selectedView = ref(transactionViewOptions[1]);

const supabase = useSupabaseClient();

const transactions = ref<Transactions[]>([]);

const { data, status } = await  useAsyncData<Transactions[]>('transactions', async () => {
  const { data, error } = await supabase.from('transactions').select();

  if(error) return []

  return data;
})


transactions.value = data.value || [];

const transactionGrupedByDate = computed(() => {
  let grouped: any = {}

  for (const transaction of transactions.value) {
    const date = new Date(transaction.created_at).toISOString().split('T')[0];
    
    if(!grouped[date]){
      grouped[date] = []
    }

    grouped[date].push(transaction)
    
  }

  return grouped
});


</script>

<style>

</style>