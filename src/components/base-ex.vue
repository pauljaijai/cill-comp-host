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
  'update:modelValue': [value: Props['modelValue']]
}>();
</script>

<style scoped lang="sass">
</style>
