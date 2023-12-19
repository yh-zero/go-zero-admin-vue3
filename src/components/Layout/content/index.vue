<template>
  <a-layout-content
    ><router-view v-slot="{ Component, route }">
      <KeepAlive v-if="route.meta.keepAlive">
        <component :key="route.fullPath" :is="Component"></component>
      </KeepAlive>
      <component
        v-else
        :key="route.fullPath"
        :is="Component"
      ></component> </router-view
  ></a-layout-content>
</template>

<script setup lang="ts"></script>

<style scoped></style>
