<template>
  <ShowMore
    v-if="notEmpty"
    :buttonText="fluent('profile_contact-me')"
    :alternateButtonText="fluent('profile_contact-me')"
    buttonClass="button button--icon-end contact-me__button"
    :transition="false"
    :closeWhenClickedOutside="true"
    :closeOnUpdate="true"
    :moveFocus="false"
    :overflowBefore="false"
    :updateIndicator="primaryEmail"
  >
    <template slot="overflow">
      <Popover
        class="contact-me"
        layer="var(--layerContactMe)"
        :initialMaxWidth="310"
        :floating="false"
      >
        <div v-if="primaryEmail" class="contact-me__item">
          <a :href="`mailto:${primaryEmail}`" class="contact-me__pair">
            <Icon id="at-sign" :width="24" :height="24" />
            <span class="contact-me__value">{{ primaryEmail }}</span>
          </a>
        </div>
        <div v-if="displayedSecondaryEmail" class="contact-me__item">
          <a
            :href="`mailto:${displayedSecondaryEmail}`"
            class="contact-me__pair"
          >
            <Icon id="at-sign" :width="24" :height="24" />
            <span class="contact-me__value">{{ displayedSecondaryEmail }}</span>
          </a>
        </div>
        <div
          v-for="(number, index) in displayedPhoneNumbers"
          :key="`p-${index}`"
          class="contact-me__item"
        >
          <a :href="`tel:${number.value}`" class="contact-me__pair">
            <Icon id="phone-forwarded" :width="24" :height="24" />
            <span class="contact-me__value">{{ number.value }}</span>
          </a>
        </div>
        <div
          v-for="(uri, index) in displayedUris"
          :key="`u-${index}`"
          class="contact-me__item"
        >
          <a
            v-if="uri.uri"
            :href="uri.uri"
            class="contact-me__pair"
            :title="uri.text"
          >
            <Icon :id="uri.icon" :width="24" :height="24" />
            <span class="contact-me__value">{{ uri.value }}</span>
            <span class="visually-hidden">{{
              fluent({
                id: 'profile_contact-me',
                attr: 'on',
                args: { service: uri.text },
              })
            }}</span>
          </a>
          <span v-else class="contact-me__pair" :title="uri.text">
            <Icon :id="uri.icon" :width="24" :height="24" />
            <span class="contact-me__value">{{ uri.value }}</span>
            <span class="visually-hidden">{{
              fluent({
                id: 'profile_contact-me',
                attr: 'on',
                args: { service: uri.text },
              })
            }}</span>
          </span>
        </div>
      </Popover>
    </template>
    <template slot="icon-expanded">
      <Icon id="chevron-up" :width="16" :height="16" />
    </template>
    <template slot="icon-collapsed">
      <Icon id="chevron-down" :width="16" :height="16" />
    </template>
  </ShowMore>
</template>

<script>
import AccountsMixin from '@/components/_mixins/AccountsMixin.vue';
import PhoneNumbersMixin from '@/components/_mixins/PhoneNumbersMixin.vue';
import Icon from '@/components/ui/Icon.vue';
import Popover from '@/components/ui/Popover.vue';
import ShowMore from '@/components/_functional/ShowMore.vue';

export default {
  name: 'ContactMe',
  props: {
    identities: {
      type: Object,
      default: null,
    },
    primaryEmail: String,
    phoneNumbers: Object,
    uris: Object,
  },
  mixins: [PhoneNumbersMixin, AccountsMixin],
  components: {
    Icon,
    Popover,
    ShowMore,
  },
  computed: {
    displayedSecondaryEmail() {
      if (!this.identities) {
        return '';
      }
      return this.identities.custom1PrimaryEmail.value;
    },
    displayedPhoneNumbers() {
      const { values: numbers } = this.phoneNumbers || {};
      const dispalyedNumbers = Object.entries(numbers || {})
        .map(([key, value]) => {
          const { view, contact } = this.destructPhoneKey(key);
          return { view, contact, value };
        })
        .filter(({ contact }) => contact);
      return dispalyedNumbers;
    },
    displayedUris() {
      const { values: uris } = this.uris || {};
      const dispalyedUris = Object.entries(uris || {})
        .filter(([k]) => this.isAccountKey(k))
        .map(([key, value]) => {
          const { name, contact } = this.destructUriKey(key);
          const account = this.account([name, value]);
          return { contact, ...account };
        })
        .filter(({ contact }) => contact);
      return dispalyedUris;
    },
    notEmpty() {
      return (
        this.displayedPhoneNumbers.length > 0 ||
        this.displayedUris.length > 0 ||
        this.displayedSecondaryEmail ||
        this.primaryEmail
      );
    },
  },
};
</script>

<style>
.contact-me__item {
  list-style: none;
  padding-left: 0;
  background-color: var(--white);
  position: relative;
  overflow: hidden;
}
.contact-me__item:nth-child(even) {
  background-color: var(--gray-10);
}
.contact-me__pair {
  display: flex;
  text-decoration: none;
  color: inherit;
  padding: 0.5em;
  min-width: 20em;
  align-items: center;
  font-size: 1.125em;
  position: relative;
}
.contact-me__pair:hover {
  background-color: var(--gray-20);
}
.contact-me__pair:focus {
  z-index: var(--layerOne);
}
.focus-styles .contact-me__pair:focus .contact-me__value {
  box-shadow: var(--focusOutlineShadow);
}
.contact-me__key {
  flex: none;
  width: 30%;
  padding-right: 1em;
  font-family: 'Zilla Slab', sans-serif;
}
.contact-me__value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
a > .contact-me__value {
  color: var(--blue-60);
}
.contact-me__button {
  margin: 0 auto;
  margin-bottom: 2em;
}
.contact-me svg {
  color: var(--gray-60);
  transform: scale(0.75);
  margin-right: 0.5em;
}
</style>
