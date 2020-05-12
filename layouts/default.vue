<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  computed: {
    meta() {
      return [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no'
        },
        { hid: 'description', name: 'description', content: 'Home' }
      ]
    }
  },

  head() {
    const canonical = `https://gloxie.com${this.$route.path
      .toLowerCase()
      .replace(/\/$/, '')}`
    return {
      meta: [...this.meta],
      script: [
        // {
        //   src:
        //     'https://markknol.github.io/console-log-viewer/console-log-viewer.js'
        // }
      ],
      link: [{ rel: 'canonical', href: canonical }]
    }
  }
}
</script>
<style></style>
