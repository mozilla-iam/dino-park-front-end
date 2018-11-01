<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :width="width" :height="height" :viewport="'0 0 ' + width + ' ' + height" aria-hidden="true" role="presentation">
    <template v-if="id === 'user'">
      <path fill="currentColor" d="M20.2 18.3v1.8c0 .54-.36.9-.9.9s-.9-.36-.9-.9v-1.8c0-1.53-1.17-2.7-2.7-2.7H8.5c-1.53 0-2.7 1.17-2.7 2.7v1.8c0 .54-.36.9-.9.9s-.9-.36-.9-.9v-1.8c0-2.52 1.98-4.5 4.5-4.5h7.2c2.52 0 4.5 1.98 4.5 4.5zM7.6 7.5C7.6 4.98 9.58 3 12.1 3s4.5 1.98 4.5 4.5-1.98 4.5-4.5 4.5-4.5-1.98-4.5-4.5zm1.8 0c0 1.53 1.17 2.7 2.7 2.7 1.53 0 2.7-1.17 2.7-2.7 0-1.53-1.17-2.7-2.7-2.7-1.53 0-2.7 1.17-2.7 2.7z"/>
    </template>
    <template v-else-if="id === 'dashboard'">
      <path fill="currentColor" d="M13 12.228c1.725.45 3 2.035 3 3.922 0 2.237-1.79 4.05-4 4.05s-4-1.813-4-4.05a4.043 4.043 0 0 1 3-3.922V9.063c0-.56.448-1.013 1-1.013s1 .453 1 1.012v3.166zM12 4c4.97 0 9 4.08 9 9.113 0 .559-.448 1.012-1 1.012s-1-.453-1-1.012c0-3.915-3.134-7.088-7-7.088s-7 3.173-7 7.088c0 .559-.448 1.012-1 1.012s-1-.453-1-1.012C3 8.08 7.03 4 12 4zm0 10.125c-1.105 0-2 .907-2 2.025 0 1.118.895 2.025 2 2.025s2-.907 2-2.025c0-1.118-.895-2.025-2-2.025z"/>
    </template>
    <template v-else-if="id === 'bell'">
      <path fill="currentColor" d="M14.127 19.773A2.466 2.466 0 0 1 12 21c-.41 0-.818-.082-1.227-.327a2.377 2.377 0 0 1-.9-.9c-.246-.41-.082-.9.327-1.146.41-.245.9-.082 1.145.328.082.081.164.245.328.327.409.245.9.082 1.145-.327.246-.41.737-.491 1.146-.328.409.164.409.737.163 1.146zM21 16.09c0 .49-.327.818-.818.818H3.818c-.49 0-.818-.327-.818-.818 0-.491.327-.818.818-.818.9 0 1.637-.737 1.637-1.637v-4.09C5.455 5.945 8.4 3 12 3s6.545 2.945 6.545 6.545v4.091c0 .9.737 1.637 1.637 1.637.49 0 .818.327.818.818zm-3.682-.818a3.724 3.724 0 0 1-.409-1.637v-4.09c0-2.7-2.209-4.91-4.909-4.91-2.7 0-4.91 2.21-4.91 4.91v4.09c0 .573-.163 1.146-.408 1.637h10.636z"/>
    </template>
    <template v-else-if="id === 'sliders'">
      <path fill="currentColor" d="M5.25 11V5.75c0-.45.3-.75.75-.75s.75.3.75.75V11c0 .45-.3.75-.75.75s-.75-.3-.75-.75zm6.75.75c-.45 0-.75.3-.75.75v6.75c0 .45.3.75.75.75s.75-.3.75-.75V12.5c0-.45-.3-.75-.75-.75zm6 1.5c.45 0 .75-.3.75-.75V5.75c0-.45-.3-.75-.75-.75s-.75.3-.75.75v6.75c0 .45.3.75.75.75zm-9.75 0h-4.5c-.45 0-.75.3-.75.75s.3.75.75.75h1.5v4.5c0 .45.3.75.75.75s.75-.3.75-.75v-4.5h1.5c.45 0 .75-.3.75-.75s-.3-.75-.75-.75zm6-4.5h-1.5v-3c0-.45-.3-.75-.75-.75s-.75.3-.75.75v3h-1.5c-.45 0-.75.3-.75.75s.3.75.75.75h4.5c.45 0 .75-.3.75-.75s-.3-.75-.75-.75zm6 6h-4.5c-.45 0-.75.3-.75.75s.3.75.75.75h1.5v3c0 .45.3.75.75.75s.75-.3.75-.75v-3h1.5c.45 0 .75-.3.75-.75s-.3-.75-.75-.75z"/>
    </template>
    <template v-else-if="id === 'toggle-right'">
      <path fill="currentColor" d="M15 6H9c-3.3 0-6 2.7-6 6s2.7 6 6 6h6c3.3 0 6-2.7 6-6s-2.7-6-6-6zm0 10.5H9A4.513 4.513 0 0 1 4.5 12c0-2.475 2.025-4.5 4.5-4.5h6c2.475 0 4.5 2.025 4.5 4.5s-2.025 4.5-4.5 4.5zM15 9c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm0 4.5c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5z"/>
    </template>
    <template v-else-if="id === 'log-out'">
      <path fill="currentColor" d="M11.373 20.182c0 .49-.328.818-.82.818H6.459C5.065 21 4 19.936 4 18.545V5.455C4 4.064 5.065 3 6.458 3h4.096c.491 0 .819.327.819.818 0 .491-.328.818-.82.818H6.459c-.492 0-.82.328-.82.819v13.09c0 .491.328.819.82.819h4.096c.491 0 .819.327.819.818zm8.93-7.855c.081-.163.081-.409 0-.654-.083-.082-.083-.164-.165-.246l-3.276-3.272a.793.793 0 0 0-1.147 0 .79.79 0 0 0 0 1.145l1.884 1.882H9.734c-.491 0-.819.327-.819.818 0 .49.328.818.82.818h7.864L15.715 14.7a.79.79 0 0 0 0 1.145c.163.164.41.246.573.246.164 0 .41-.082.574-.246l3.276-3.272c.082-.082.164-.164.164-.246z"/>
    </template>
    <template v-else-if="id === 'chevron-up'">
      <polyline points="18 15 12 9 6 15" stroke="currentColor" stroke-width="2" stroke-line-ap="round" fill="none" stroke-linejoin="round"/>
    </template>
    <template v-else-if="id === 'chevron-down'">
      <polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2" stroke-line-ap="round" fill="none" stroke-linejoin="round"/>
    </template>
    <template v-else-if="id === 'chevron-right'">
      <polyline points="9 18 15 12 9 6" stroke="currentColor" stroke-width="2" stroke-line-ap="round" fill="none" stroke-linejoin="round"/>
    </template>
    <template v-else-if="id === 'org-chart'">
      <path d="M11.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 2a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm7 8a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.5 7a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3 7h1v1H3V7zm0 2h1v1H3V9zm1 3h-.5a.5.5 0 0 1-.5-.5V11h1v1zm1 0v-1h1v1H5zm2 0v-1h1v1H7zm4 2h1v1h-1v-1zm0 2h1v1h-1v-1zm1 3h-.5a.5.5 0 0 1-.5-.5V18h1v1zm1 0v-1h1v1h-1z" fill="currentColor" fill-rule="nonzero" />
    </template>
    <template v-else-if="id === 'at-sign'">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="id === 'crown'">
      <path id="a" d="M20.085 19.099a1.05 1.05 0 0 1 1.046 1.05c0 .572-.508 1.051-1.087 1.051H1.846A1.053 1.053 0 0 1 .8 20.15c0-.577.472-1.051 1.046-1.051h18.239zM19.46 1.133c.72-.617 1.74-.269 1.74.735v14.196c0 .568-.46 1.03-1.026 1.03H1.891a1.029 1.029 0 0 1-1.026-1.03V1.827c0-.98 1.058-1.328 1.75-.73l3.76 3.362 3.823-3.369c.425-.388.976-.384 1.435-.002l3.936 3.482 3.89-3.437zm-.312 3.172l-2.852 2.436c-.4.401-1.051.401-1.442.008l-3.936-3.482-3.824 3.371c-.34.323-.995.366-1.44.003L2.917 4.287v10.746h16.231V4.305z" fill="currentColor" />
    </template>
    <template v-else-if="id === 'book'">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  />
    </template>
    <template v-else-if="id === 'bookmark'">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="id === 'user-check'">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="8.5" cy="7" r="4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <polyline points="17 11 19 13 23 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="id === 'mail'">
      <path d="m9 17.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666zm4.605-9.505a2.883 2.883 0 0 1 -.49.426 93.757 93.757 0 0 0 -2.437 1.689c-.411.303-.92.675-1.454.675h-.01c-.533 0-1.042-.372-1.453-.675-.798-.583-1.62-1.136-2.433-1.69a2.737 2.737 0 0 1 -.495-.425v3.887c0 .43.353.783.784.783h7.205c.43 0 .783-.352.783-.783zm0-1.743a.789.789 0 0 0 -.783-.783h-7.205c-.524 0-.784.41-.784.89 0 .446.495 1 .842 1.234.759.529 1.528 1.057 2.286 1.59.318.221.857.672 1.253.672h.01c.397 0 .935-.45 1.253-.671.76-.534 1.528-1.062 2.291-1.59.431-.3.837-.794.837-1.342z" fill="currentColor" fill-rule="evenodd"/>
    </template>
    <template v-else-if="id === 'privacy'">
      <path id="a" d="M9 .667a8.333 8.333 0 1 1 0 16.667A8.333 8.333 0 0 1 9 .667zm3.509 12.34V7.744h-.906v-.968c0-1.433-1.168-2.6-2.603-2.6a2.605 2.605 0 0 0-2.602 2.6v.968h-.907v5.263h7.018zM9 5.317c.806 0 1.461.654 1.461 1.46v.967H7.54v-.967c0-.806.656-1.46 1.461-1.46z" fill="currentColor" fill-rule="evenodd" />
    </template>
    <template v-else-if="id === 'legal'">
      <path id="a" d="M13.982 6.425l-5.745 6.719a.136.136 0 0 1-.189.015l-3.825-3.15a.128.128 0 0 1-.017-.182l1.183-1.383a.134.134 0 0 1 .186-.015l2.317 1.907 4.479-5.237a.134.134 0 0 1 .186-.016l1.41 1.16a.126.126 0 0 1 .015.182M9 .667a8.334 8.334 0 1 0 0 16.667A8.334 8.334 0 0 0 9 .667" fill="currentColor" fill-rule="evenodd" />
    </template>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    width: Number,
    height: Number,
    id: String,
  },
};
</script>
