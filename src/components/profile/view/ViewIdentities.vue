<template>
  <div>
    <header class="profile__section-header">
      <h2>Identities</h2>
      <EditButton
        v-if="userOnOwnProfile"
        section="identities"
        sectionId="identities"
      ></EditButton>
    </header>
    <div class="profile__identities">
      <IconBlockList class="icon-block-list--multi-col">
        <IconBlock
          v-if="identities.hasGithub()"
          heading="GitHub"
          :subHeading="githubUsername && 'Verified'"
          icon="github"
        >
          <a :href="githubLink" target="_blank" rel="noreferrer noopener">{{
            githubUsername
          }}</a>
        </IconBlock>
        <IconBlock
          v-if="identities.hasBugzilla()"
          heading="Bugzilla"
          subHeading="Verified"
          icon="dino"
        >
          <a
            :href="identities.bugzillaProfile()"
            target="_blank"
            rel="noreferrer noopener"
            >{{ identities.bugzillaEmail() }}</a
          >
        </IconBlock>
      </IconBlockList>
    </div>
  </div>
</template>

<script>
import EditButton from '@/components/profile/edit/EditButton.vue';
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';

export default {
  name: 'ViewIdentities',
  props: {
    identities: Object,
    userOnOwnProfile: Boolean,
  },
  components: {
    EditButton,
    IconBlock,
    IconBlockList,
  },
  data() {
    this.update();
    return {
      githubUsername: null,
      githubLink: '#',
    };
  },
  methods: {
    update() {
      this.identities.fetchGithubUsername().then(({ username, link }) => {
        this.githubUsername = username;
        this.githubLink = link;
      });
    },
  },
  watch: {
    identities() {
      this.update();
    },
  },
};
</script>

<style>
.profile__identities .icon-block__heading {
  display: flex;
}
.profile__identities .icon-block__heading > span {
  margin-left: auto;
  margin-right: 0.5em;
  color: var(--green-80);
}
</style>
