<template>
  <div class="vouch">
    <blockquote>{{ content }}</blockquote>
    <Person v-bind="voucher" />
  </div>
</template>

<script>
import Person from '@/components/Person.vue';

export default {
  name: 'Vouch',
  components: {
    Person,
  },
  props: {
    content: String,
    voucher: Object,
  },
};
</script>

