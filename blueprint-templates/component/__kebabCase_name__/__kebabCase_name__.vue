<!-- <template></template> -->

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  modelValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Props['modelValue']): void;
}>();

defineSlots<{
  default?: () => unknown;
  item?: (props: { id: number }) => unknown;
}>();
</script>

<style scoped lang="sass">
</style>
