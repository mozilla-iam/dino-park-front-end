<template>
  <div class="org-node">
    <li>
      <input :id="`${prefix}-${id}`" type="checkbox">
      <span v-bind:class="{ 'org-node__leaf': (children.length === 0) }">
        <label :for="`${prefix}-${id}`">
          <a :href="`/profile/${data.user_id}`">
            {{ data.first_name }} {{ data.last_name }}
          </a>
        </label>
        <ul v-for="(child, index) in children" :key="index">
          <OrgNode :children="child.children" :data="child.data" :id="index" :prefix="`${prefix}-${id}`"></OrgNode>
        </ul>
      </span>
    </li>
  </div>
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

.org-node > li > input:checked + span::before {
  content: "▶";
  float: left;
}

.org-node span::before {
  content: "▼";
  float: left;
}

.org-node > li > input + span.org-node__leaf::before {
  content: "●";
  float: left;
}

.org-node input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  display: initial;
}

.org-node > li {
  list-style: none;
}

.org-node > li > input:checked + span ul {
  display: none;
}
</style>
