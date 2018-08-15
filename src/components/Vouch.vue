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

<style>
  .vouch + .vouch,
  .vouch + div {
    margin-top: 1em;
  }
  .vouch blockquote {
    background-color: var( --lightGrey );
    border: 1px solid var( --midGrey );
    padding: 1em 1.5em;
    margin: 0 0 0 1em;
  }
  .vouch blockquote + .person {
    border-top: 1px; /* collapse borders */
  }
</style>
