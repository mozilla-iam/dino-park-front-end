<template>
  <ShowMore
    buttonText="Contact Me"
    alternateButtonText="Contact Me"
    :expanded="false"
    buttonClass="button button--icon-end contact-me__button"
    :transition="true"
    :closeWhenClickedOutside="true"
    :moveFocus="false"
    :overflowBefore="false"
  >
    <template slot="overflow">
      <ul class="contact-me">
        <li class="contact-me__item">
          <a :href="`mailto:${primaryEmail}`" class="contact-me__pair">
            <Icon id="at-sign" :width="24" :height="24" />
            <span class="contact-me__key">Email Me</span>
            <span class="contact-me__value">{{ primaryEmail }}</span>
          </a>
        </li>
        <li
          v-for="(number, index) in displayedPhoneNumbers"
          :key="`p-${index}`"
          class="contact-me__item"
        >
          <a :href="`tel:${number.value}`" class="contact-me__pair">
            <Icon id="phone-forwarded" :width="24" :height="24" />
            <span class="contact-me__key">Call Me</span>
            <span class="contact-me__value">{{ number.value }}</span>
          </a>
        </li>
        <li
          v-for="(uri, index) in displayedUris"
          :key="`u-${index}`"
          class="contact-me__item"
        >
          <a v-if="uri.uri" :href="uri.uri" class="contact-me__pair">
            <Icon :id="uri.icon" :width="24" :height="24" />
            <span class="contact-me__key">Ping Me</span>
            <span class="contact-me__value"
              >{{ uri.value }} on {{ uri.text }}</span
            >
          </a>
          <span v-else class="contact-me__pair">
            <Icon :id="uri.icon" :width="24" :height="24" />
            <span class="contact-me__key">Ping Me</span>
            <span class="contact-me__value"
              >{{ uri.value }} on {{ uri.text }}</span
            >
          </span>
        </li>
      </ul>
    </template>
    <template slot="icon-expanded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </template>
    <template slot="icon-collapsed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </template>
  </ShowMore>
</template>

<script>
import AccountsMixin from '@/components/_mixins/AccountsMixin.vue';
import PhoneNumbersMixin from '@/components/_mixins/PhoneNumbersMixin.vue';
import Icon from '@/components/ui/Icon.vue';
import ShowMore from '@/components/_functional/ShowMore.vue';

export default {
  name: 'ContactMe',
  props: {
    primaryEmail: String,
    phoneNumbers: Object,
    uris: Object,
  },
  mixins: [PhoneNumbersMixin, AccountsMixin],
  components: {
    Icon,
    ShowMore,
  },
  computed: {
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
        .map(([key, value]) => {
          const { name, contact } = this.destructUriKey(key);
          const account = this.account([name, value]);
          return { contact, ...account };
        })
        .filter(({ contact }) => contact);
      return dispalyedUris;
    },
  },
};
</script>

<style>
.contact-me {
  background-color: var(--white);
  box-shadow: 0 0.125em 0.25em 0.125em rgba(210, 210, 210, 0.5);
  text-align: left;
  padding-left: 0;
  z-index: var(--layerAboveNav);
  position: absolute;
  top: 3.5em;
  left: 0;
  width: calc(100% + 4.5em);
  margin: 0 -2.25em;
  color: var(--gray-60);
}
@media (min-width: 57.5em) {
  .contact-me {
    left: 50%;
    width: 24em;
    margin: 0 0.5em 0 -12em;
  }
}
.contact-me::before {
  content: '';
  width: 1em;
  height: 1em;
  background-color: var(--white);
  position: absolute;
  left: 50%;
  margin-left: -0.5em;
  margin-top: -0.5em;
  transform: rotate(-45deg);
  box-shadow: 0 0 0.25em 0 var(--gray-30);
}
.contact-me__item {
  list-style: none;
  padding-left: 0;
  background-color: var(--white);
  position: relative;
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
