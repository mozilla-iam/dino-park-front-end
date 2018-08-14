
<template>
  <ApolloQuery :query="profileList">
    <template slot-scope="{ result: { loading, data, error } }">
      <template v-if="loading">Loading...</template>
      <template v-else-if="error">An error occured</template>
      <template v-else-if="data">
        <main>
          <PersonList v-if="data.profiles">
            <Person v-for="profile in data.profiles" v-bind="profile"></Person>
          </PersonList>
        </main>
      </template>
      <template v-else>No result :(</template>
    </template>
  </ApolloQuery>
</template>

<script>
import Person from '@/components/Person';
import PersonList from '@/components/PersonList';
import { PROFILE_LIST } from '@/queries/profile';

export default {
  name: 'PageHome',
  components: {
    Person,
    PersonList
  },
  data() {
    return {
      profileList: PROFILE_LIST,
    };
  },
};
</script>
