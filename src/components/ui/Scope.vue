<template>
  <form :id="id" class="scope" method="GET" :action="action">
    <fieldset>
      <legend class="visually-hidden">{{ label }}</legend>
      <slot></slot>
      <div class="scope__choices">
        <div
          class="scope__choice"
          v-for="(choice, index) in choices"
          :key="`choice-${index}`"
        >
          <input
            :id="choice.id"
            type="radio"
            :name="name"
            :value="choice.value"
            v-model="value"
            @input="$emit('input', $event.target.value)"
          />
          <label :for="choice.id">
            <Icon
              v-if="choice.icon"
              :id="choice.icon"
              :width="16"
              :height="17"
            ></Icon>
            <span v-if="!choice.iconOnly">{{ choice.label }}</span>
            <span v-else class="visually-hidden">{{ choice.label }}</span>
          </label>
        </div>
      </div>
    </fieldset>
    <input type="submit" :value="label" class="visually-hidden" />
  </form>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'Scope',
  props: {
    id: String,
    label: String,
    action: String,
    choices: Array,
    value: String,
    name: String,
    icon: String,
    iconOnly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style>
.scope fieldset {
  border: 0;
  display: block;
  text-align: center;
  padding: 0;
  margin: 0;
}
.scope__choices {
  display: inline-flex;
  justify-content: center;
  margin-right: -1px; /* to mitigate hack to not have double borders */
}
.scope__choices:focus-within {
  outline: 1px solid var(--black);
}
.scope__choices input {
  position: absolute;
  opacity: 0;
}
.scope__choices label {
  background-color: var(--white);
  padding: 0.5em;
  color: var(--gray-60);
  border: 2px solid var(--gray-30);
  margin-left: -1px; /* hack to not have double borders */
  margin-right: -1px;
  transition: background-color 0.1s ease-in-out;
}
.scope__choices input:checked + label,
.scope__choices input:not(:checked) + label:hover {
  background-color: var(--blue-60);
  color: var(--white);
}
.scope__choice:first-of-type label {
  border-radius: var(--imageRadius) 0 0 var(--imageRadius);
}
.scope__choice:last-of-type label {
  border-radius: 0 var(--imageRadius) var(--imageRadius) 0;
}
.scope__choice span {
  padding-left: 1em;
  padding-right: 1em;
}
.scope + p {
  text-align: center;
}
</style>
