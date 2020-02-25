<template>
  <main class="group-terms">
    <a
      class="button group-terms__back-action"
      :href="backUrl"
      @click="handleBackClicked"
      v-if="!invitationShowTOSAccept"
    >
      <Icon id="chevron-left" :width="17" :height="17" />{{
        fluent('access-group_terms', 'back-action')
      }}
    </a>
    <section class="primary-area">
      <h1 class="group-terms__header">
        {{ fluent('access-group_terms', 'heading') }}
      </h1>
      <p>{{ termsContent }}</p>
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
        <Button class="button--primary" @click="handleSubmitClicked">{{
          fluent('access-group_terms', 'submit-changes')
        }}</Button>
      </footer>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'AccessGroup',
  components: {
    Icon,
    Button,
  },
  props: {
    groupname: String,
  },
  methods: {
    ...mapActions({
      acceptInvitation: 'userV2/acceptInvitation',
      rejectInvitation: 'userV2/rejectInvitation',
    }),
    handleBackClicked() {
      console.log('Back clicked');
    },
    handleSubmitClicked() {
      if (this.termsAccepted) {
        this.acceptTerms();
      } else {
        this.doNotAcceptTerms();
      }
    },
    acceptTerms() {
      this.acceptInvitation(
        this.getInvitationByName(this.$route.params.groupname)
      ).then(() => {
        this.$router.push({
          name: 'Access Group',
          query: {
            groupname: this.$route.query.groupname,
          },
        });
        this.$root.$emit('toast', {
          content: 'You accepted the terms for this group.',
        });
      });
    },
    doNotAcceptTerms() {
      this.rejectInvitation(
        this.getInvitationByName(this.$route.params.groupname)
      ).then(() => {
        this.$router.go(-1);
        this.$root.$emit('toast', {
          content: `You rejected the invite for group ${groupname}.`,
        });
      });
    },
  },
  data() {
    return {
      termsAccepted: true,
    };
  },
  computed: {
    ...mapGetters({
      accessGroup: 'accessGroup/getGroup',
      termsContent: 'accessGroup/getTerms',
      getInvitationByName: 'userV2/getInvitationByName',
    }),
    groupInvitation() {
      return this.getInvitationByName(this.accessGroup.name);
    },
    backUrl() {
      return this.$route.path.substr(0, this.$route.path.lastIndexOf('/'));
    },
    invitationShowTOSAccept() {
      if (!this.$route.query.accept) {
        return false;
      }
      return this.groupInvitation.requires_tos;
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
