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
    <Transaction></Transaction>
    <Transaction></Transaction>
    <Transaction></Transaction>
  </section>
</template>

<script lang="ts" setup>
import {transactionViewOptions} from '~/constants';

const selectedView = ref(transactionViewOptions[1]);
</script>

<style>

</style>