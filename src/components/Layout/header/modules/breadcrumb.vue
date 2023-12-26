<template>
  <div class="h-[56px] flex items-center">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item v-for="(route, index) in $route.matched" :key="index">
        {{ route.meta.title }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
