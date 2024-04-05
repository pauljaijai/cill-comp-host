<!-- <template></template> -->

<script setup lang="ts">
import { VNode, ref } from 'vue';

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
  default?: () => VNode;
  item?: (props: { id: number }) => VNode;
}>();
</script>

<style scoped lang="sass">
</style>
