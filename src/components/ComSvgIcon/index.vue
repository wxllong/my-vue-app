<script setup lang="ts">

defineOptions({
  name: 'ComSvgIcon',
});

const props = withDefaults(defineProps<{
  name: string
  color?: string
  size?: string | number
}>(), {
  color: '#fff',
});

const symbolId = computed(() => `#icon-${props.name}`);
const style = computed(() => {
  return {
    width: typeof props.size === 'number' ? `${props.size / 16}rem` : props.size,
    height: typeof props.size === 'number' ? `${props.size / 16}rem` : props.size,
  };
});
</script>

<template>
  <svg aria-hidden="true" :style="style" class="text-base" :fill="color">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>
