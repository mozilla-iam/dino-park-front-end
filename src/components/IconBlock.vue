<template>
  <li class="icon-block">
    <div v-if="heading" class="icon-block__heading">
      {{ heading }} <span v-if="subHeading">{{ subHeading }}</span>
    </div>
    <div
      v-if="icon"
      :class="`icon-block__icon icon-block__icon--${icon}`"
    ></div>
    <div
      v-else
      class="icon-block__icon icon-block__icon--letter"
      aria-hidden="true"
      role="presentation"
    >
      {{ subHeading ? subHeading[0] : heading[0] }}
    </div>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'IconBlock',
  props: {
    heading: String,
    subHeading: String,
    icon: String,
  },
};
</script>

<style>
.icon-block {
  border: 1px solid var(--gray-30);
  padding: 0.5em;
  list-style: none;
  display: flex; /* avoid breaking between columns */
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1em;
  padding-left: 1.5em;
  min-height: 3.5em;
  position: relative;
}
.icon-block__heading {
  font-size: 0.9em;
}
.icon-block__heading span {
  color: var(--gray-50);
  margin-left: 0.5em;
}
.icon-block__icon {
  width: 1.75em;
  height: 1.75em;
  background-color: var(--gray-30);
  position: absolute;
  left: -1em;
  top: 1em;
  border-radius: 100%;
  background-size: 1em;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url('../assets/images/icon-blocks/dino.svg');
}
.icon-block__icon--letter {
  text-align: center;
  line-height: 1.6;
  font-weight: 700;
  background-image: none;
}
.icon-block__icon--aim {
  background-image: url('../assets/images/icon-blocks/aim.svg');
}
.icon-block__icon--bitbucket {
  background-image: url('../assets/images/icon-blocks/bitbucket.svg');
}
.icon-block__icon--dino {
  background-image: url('../assets/images/icon-blocks/dino.svg');
}
.icon-block__icon--discord {
  background-image: url('../assets/images/icon-blocks/discord.svg');
}
.icon-block__icon--email {
  background-image: url('../assets/images/icon-blocks/email.svg');
}
.icon-block__icon--facebook {
  background-image: url('../assets/images/icon-blocks/facebook.svg');
}
.icon-block__icon--github {
  background-image: url('../assets/images/icon-blocks/github.svg');
}
.icon-block__icon--instagram {
  background-image: url('../assets/images/icon-blocks/instagram.svg');
}
.icon-block__icon--linkedin {
  background-image: url('../assets/images/icon-blocks/linkedin.svg');
}
.icon-block__icon--mozilla {
  background-image: url('../assets/images/icon-blocks/m.svg');
}
.icon-block__icon--mastodon {
  background-image: url('../assets/images/icon-blocks/mastodon.svg');
}
.icon-block__icon--phone {
  background-image: url('../assets/images/icon-blocks/phone.svg');
}
.icon-block__icon--skype {
  background-image: url('../assets/images/icon-blocks/skype.svg');
}
.icon-block__icon--slack {
  background-image: url('../assets/images/icon-blocks/slack.svg');
}
.icon-block__icon--slideshare {
  background-image: url('../assets/images/icon-blocks/slideshare.svg');
}
.icon-block__icon--telegram {
  background-image: url('../assets/images/icon-blocks/telegram.svg');
}
.icon-block__icon--transfex {
  background-image: url('../assets/images/icon-blocks/transfex.svg');
}
.icon-block__icon--twitter {
  background-image: url('../assets/images/icon-blocks/twitter.svg');
}
.icon-block__icon--xmppjabber {
  background-image: url('../assets/images/icon-blocks/xmppjabber.svg');
}
.icon-block__icon--yahoo {
  background-image: url('../assets/images/icon-blocks/yahoo.svg');
}
</style>
