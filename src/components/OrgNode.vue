<template>
  <div class="org-node">
    <input :id="`${prefix}-${id}`" type="checkbox">
    <li v-bind:class="{ branch: children.length }">
      <div class="toggle">
        <label :for="`${prefix}-${id}`">
          <a :href="`/profile/${data.user_id}`">
            {{ data.first_name }} {{ data.last_name }}
          </a>
        </label>
        <ul v-for="(child, index) in children" :key="index">
          <OrgNode :children="child.children" :data="child.data" :id="index" :prefix="`${prefix}-${id}`"></OrgNode>
        </ul>
      </div>
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
  .org-node label {
    width: 100%;
  }

  .org-node label:hover {
      background-color: lightgray;
  }

  .org-node span {
      color: #4F7FA4;
  }

  .org-node input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
  }

  .org-node li {
      list-style: disc;
      display: list-item;
  }

  .org-node input:checked + li {
      list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAALCAYAAABCm8wlAAAAlklEQVQYlWPonDx/VXv7NEEGXKBz8oL/HZMXvGufuCANpwIY7pi0YHd7/zwlnAo6Jy/43zll4bv2SfPLcStANw2XgllL1r/bsvOwMYaCrikL/+85dPL/k6cvdj98+BLVhAUrNv2/fvvBu8dPn6O6oWvKwv8nzlxC6EIGy9Zu/3/v4eN3T548D8UaDk+evVz18OFDnCEJAEBcmet8woHKAAAAAElFTkSuQmCC);
  }

  .org-node li.branch {
      list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAApUlEQVQYlWNonzS/vHPygv+4cPuk+eUMj5+/KZ86bxVWBVPnrfr/+PmbcgYGBgaGE+evvMOm6MDRs+8YYODJ81ehC1ZuRlGwYOXm/09evk5jQAbX7zw4g6zoxLmrZxjQwcOXL5W2bt37v3Pygv9rNu/9//TlSxcMRQwMDAx37j+e2T9j6f8rN+6twqqAgYGB4eHDh4LX7jx49/DlSyWcimDWoosBAHcwjGsLIU2wAAAAAElFTkSuQmCC);
  }


  .org-node label + .toggle + ul {
      display: inline-block;
  }

  .org-node input:checked + li ul {
      display: none;
  }
</style>
