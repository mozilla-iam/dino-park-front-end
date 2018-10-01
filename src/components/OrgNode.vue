<template>
  <li :id="data.user_id" class="org-node">
    <input :id="`${prefix}-${id}`" type="checkbox">
    <span v-bind:class="['org-node__list', { 'org-node__leaf': (children.length === 0) }]">
      <label :for="`${prefix}-${id}`">
        <a :href="`/profile/${data.user_id}`">
          {{ data.first_name }} {{ data.last_name }}
        </a>
        <span class="org-node__title">{{ data.title }}</span>
        <span class="org-node__location">({{ data.location }})</span>
      </label>
      <ul v-for="(child, index) in children" :key="index">
        <OrgNode :children="child.children" :data="child.data" :id="index" :prefix="`${prefix}-${id}`"></OrgNode>
      </ul>
    </span>
  </li>
</template>

<script>
export default {
  name: 'OrgNode',
  props: {
    children: Array,
    data: Object,
    id: Number,
    prefix: String,
  },
};
</script>

<style>
.org-node span {
  width: 100%;
}

.org-node label:hover {
  background-color: lightgray;
}

.org-node > input:checked + span.org-node__list::before {
  content: "▶";
  float: left;
}

.org-node span.org-node__list::before {
  content: "▼";
  float: left;
}

.org-node > input + span.org-node__list.org-node__leaf::before {
  content: "●";
  float: left;
}

.org-node input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  display: initial;
}

.org-node {
  list-style: none;
}

.org-node > input:checked + span ul {
  display: none;
}
</style>
