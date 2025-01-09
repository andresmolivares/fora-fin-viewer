<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

// feel free to update this with an svg directory of your choice
const svgIcon = defineAsyncComponent(() => import(`../assets/svg/${props.name}.svg`));
</script>

<template>
  <component :is="svgIcon" class="fill-current" />
</template>
