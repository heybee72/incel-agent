<template>
  <v-card class="pad-20">
    <slot></slot>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped>
.pad-20 {
  padding: 20px 80px;
  margin-bottom: 30px;
}
.danger-text {
  color: red;
  font-size: 12px;
}
</style>