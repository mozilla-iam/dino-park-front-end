<template>
  <ApolloQuery :query="profileList">
    <template slot-scope="{ result: { loading, data, error } }">
      <LoadingSpinner v-if="loading"></LoadingSpinner>
      <template v-else-if="error">An error occured</template>
      <template v-else-if="data">
        <main>
          <div class="intro">
            <h1>Dino Park</h1>
            <p>Welcome to the Mozilla directory</p>
            <p>This site lists all core individuals and groups that participate in the Mozilla Project. We call ourselves Mozillians and this is where we connect and share with one another.</p>
          </div>
          <PersonList v-if="data.profiles">
            <Person v-for="profile in data.profiles" v-bind="profile" :key="profile.index" modifier="person--wide"></Person>
          </PersonList> 
        </main>
      </template>
      <LoadingSpinner v-else></LoadingSpinner>
    </template>
  </ApolloQuery>
</template>

<script>
import Person from '@/components/Person.vue';
import PersonList from '@/components/PersonList.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { PROFILE_LIST } from '@/queries/profile';

export default {
  name: 'PageHome',
  components: {
    Person,
    PersonList,
    LoadingSpinner,
  },
  data() {
    return {
      profileList: PROFILE_LIST,
    };
  },
};
</script>

<style scoped>
  .intro {
    text-align: center;
    margin-bottom: 4em;
  }
  p:first-of-type {
    font-size: 1.5em;
  }
  main {
    max-width: 50em;
    margin: 0 auto;
  }
</style>
