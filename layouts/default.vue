<template>
  <div class="container mx-auto max-w-4xl">
    <AppHeader></AppHeader>
    <main class="my-10">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
      rel: "stylesheet",
    },
  ],
});
</script>

<style>
body {
  font-family: 'Inter';
}

body{
  @apply dark:bg-gray-900 bg-white
}
</style>
