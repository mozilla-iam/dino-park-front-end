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
          <label :for="choice.id">{{ choice.label }}</label>
        </div>
      </div>
    </fieldset>
    <input type="submit" :value="label" class="visually-hidden" />
  </form>
</template>

<script>
export default {
  name: 'Scope',
  props: {
    id: String,
    label: String,
    action: String,
    choices: Array,
    value: String,
    name: String,
  },
};
</script>

<style>
.scope fieldset {
  border: 0;
  display: block;
  text-align: center;
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
  padding: 0.75em 1em;
  color: var(--gray-60);
  border: 1px solid var(--gray-40);
  margin-left: -1px; /* hack to not have double borders */
  margin-right: -1px;
}
.scope__choices input:checked + label {
  background-color: var(--blue-60);
  color: var(--white);
  border-color: var(--blue-60);
}
.scope__choice:first-of-type label {
  border-radius: 2em 0em 0 2em;
  padding-left: 1.5em;
}
.scope__choice:last-of-type label {
  border-radius: 0 2em 2em 0;
  padding-right: 1.5em;
}
.scope + p {
  text-align: center;
}
</style>
