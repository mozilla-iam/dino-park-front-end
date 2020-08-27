<template>
  <main class="group-terms">
    <AccessGroupTOSAcceptanceNotification v-if="invitationShowTOSAccept" />
    <RouterLink
      class="button group-terms__back-action"
      :to="{
        name: 'Access Group',
        params: {
          groupname: $route.params.groupname,
        },
      }"
      v-if="!invitationShowTOSAccept"
    >
      <Icon
        class="group-terms__back-icon"
        id="chevron-left"
        :width="17"
        :height="17"
      />
      {{ fluent('access-group_terms', 'back-action') }}
    </RouterLink>
    <section class="primary-area">
      <h1 class="group-terms__header">
        {{ fluent('access-group_terms', 'heading') }}
      </h1>
      <p v-html="formattedTerms"></p>
      <footer class="group-terms__form" v-if="invitationShowTOSAccept">
        <div class="form-action-row">
          <input
            type="radio"
            class="form-action-row__input"
            :value="true"
            v-model="termsAccepted"
          />
          {{ fluent('access-group_terms', 'do-accept') }}
        </div>
        <div class="form-action-row">
          <input
            type="radio"
            class="form-action-row__input"
            :value="false"
            v-model="termsAccepted"
          />
          {{ fluent('access-group_terms', 'do-not-accept') }}
        </div>
        <Button class="button--primary" @click="handleSubmitClicked">
          {{ fluent('access-group_terms', 'submit-changes') }}
        </Button>
      </footer>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import {
  GroupInvitationViewModel,
  GroupViewModel,
  MembershipModel,
} from '@/view_models/AccessGroupViewModel.js';
import { parseMarkdown } from '@/assets/js/component-utils';
import AccessGroupTOSAcceptanceNotification from '@/components/access_group/AccessGroupTOSAcceptanceNotification.vue';

export default {
  name: 'AccessGroup',
  components: {
    AccessGroupTOSAcceptanceNotification,
    Button,
    Icon,
  },
  props: {
    groupname: String,
  },
  async mounted() {
    this.setLoading();

    this.terms =
      (await this.accessGroupApi.execute({
        path: 'terms/get',
        endpointArguments: [this.groupname],
      })) || '';
    this.groupInvitation = await this.getInvitationByName(this.groupname);

    this.completeLoading();
  },
  methods: {
    ...mapActions({
      setLoading: 'setLoading',
      completeLoading: 'completeLoading',
    }),
    async rejectInvitation(invite) {
      await this.accessGroupApi.execute({
        path: 'selfInvitations/delete',
        endpointArguments: [invite.groupName],
      });
    },
    async acceptInvitation(invite) {
      await this.accessGroupApi.execute({
        path: 'selfInvitations/post',
        endpointArguments: [invite.groupName],
      });
    },
    async getInvitationByName(groupName) {
      const invitations = (
        await this.accessGroupApi.execute({
          path: 'selfInvitations/get',
        })
      ).map((invite) => new GroupInvitationViewModel(invite));

      for (const invite of invitations) {
        if (invite.groupName === groupName) {
          return invite;
        }
      }
      return null;
    },
    handleSubmitClicked() {
      if (this.termsAccepted) {
        this.acceptTerms();
      } else {
        this.doNotAcceptTerms();
      }
    },
    async acceptTerms() {
      this.setLoading();
      await this.acceptInvitation(this.groupInvitation);

      this.tinyNotification('access-group-terms-accepted');
      this.completeLoading();
      this.$router.push({
        name: 'Access Group',
        query: {
          groupname: this.$route.query.groupname,
        },
      });
    },
    async doNotAcceptTerms() {
      this.setLoading();
      await this.rejectInvitation(this.groupInvitation);

      this.tinyNotification(
        'access-group-terms-rejected',
        this.$route.params.groupname,
      );
      this.completeLoading();
      this.$router.push({
        name: 'Access Group',
        query: {
          groupname: this.$route.query.groupname,
        },
      });
    },
  },
  data() {
    return {
      termsAccepted: true,
      terms: '',
      groupInvitation: {},
    };
  },
  computed: {
    backUrl() {
      return this.$route.path.substr(0, this.$route.path.lastIndexOf('/'));
    },
    formattedTerms() {
      return parseMarkdown(this.terms);
    },
    invitationShowTOSAccept() {
      if (!this.$route.query.accept || !this.groupInvitation) {
        return false;
      }
      return this.groupInvitation.requiresTos;
    },
  },
};
</script>

<style>
@media (min-width: 57.5em) {
  .access-group-container .container {
    max-width: 70em;
  }
}

.group-terms {
  margin-top: 2em;
}

.group-terms .group-terms__back-action {
  background-color: var(--gray-30);
  color: var(--black);
  display: inline-block;
  margin-bottom: 2em;
}

.group-terms .group-terms__back-icon {
  vertical-align: bottom;
}

.group-terms .primary-area {
  background: var(--white);
  box-shadow: var(--shadowCard);
  padding: 2em;
}

.group-terms .group-terms__header {
  margin-top: 0.25em;
  font-size: 3em;
}

.group-terms .group-terms__form {
  margin-top: 2em;
}

.group-terms__form .form-action-row {
  margin: 1em 0;
}
</style>
