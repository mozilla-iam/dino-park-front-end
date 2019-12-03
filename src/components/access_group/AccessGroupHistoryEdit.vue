<template>
  <section class="edit-history-container">
    <AccessGroupEditPanel title="History log" :full="true">
      <template v-slot:content>
        <div class="history-log-container">
          <SearchForm
            class="history-log__search"
            v-on:clear-query="clearSearchHandler"
            :searchFormHandler="searchFormHandler"
            searchFormLabel="Search Members by Name"
          ></SearchForm>
          <table class="history-log__table">
            <tbody class="history-log__content">
              <tr class="history-log__row">
                <td>
                  12 September 2019
                </td>
                <td>13:45</td>
                <td>
                  <a href="#">Ohta Kin</a> accepted the invitation to join the
                  group from <a href="#">Tatiana Gagelman</a>
                </td>
              </tr>
              <tr class="history-log__row">
                <td>
                  12 September 2019
                </td>
                <td>13:45</td>
                <td>
                  <a href="#">Tatiana Gagelman</a> sent a group invitation to
                  <a href="#">Ohta Kin</a>
                </td>
              </tr>
              <tr class="history-log__row">
                <td>
                  11 September 2019
                </td>
                <td>13:45</td>
                <td>
                  <a href="#">Uzoma Buchi</a> rejected the invitation from
                  <a href="#">Luvleen Lawrence</a>
                </td>
              </tr>
            </tbody>
          </table>
          <Button class="history-log__load-more">Load more entries</Button>
        </div>
      </template>
    </AccessGroupEditPanel>
  </section>
</template>

<script>
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';

export default {
  name: 'AccessGroupHistoryEdit',
  components: {
    TextInput,
    TextArea,
    Button,
    Icon,
    SearchForm,
    AccessGroupEditPanel,
  },
  props: [],
  mounted() {},
  data() {
    return {
      groupData: '',
      groupDescriptionData: '',
      groupTermsData: '',
    };
  },
  methods: {
    searchFormHandler(search) {},
    clearSearchHandler() {},
  },
  computed: {},
};
</script>

<style>
.edit-history {
  padding: 1em;
}

.history-log-container .history-log__search {
  margin: 0 auto 1em;
}

.history-log__table {
  border-collapse: collapse;
  width: 100%;
}

.history-log__table .history-log__row:nth-child(odd) {
  background: var(--gray-20);
}

.history-log__row td {
  padding: 0.5em;
}

.history-log-container .history-log__load-more {
  margin: 1em auto;
  background-color: var(--gray-30);
  color: var(--black);
}
</style>
