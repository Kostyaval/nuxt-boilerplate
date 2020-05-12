<template>
  <div class="container">
    <h1>Gloxie</h1>
    <img
      :src="require('../assets/images/mainphoto.jpg?resize&size=300')"
      alt=""
    />
    <img
      :src="require('../assets/images/mainphoto.jpg?resize&size=300?webp')"
      alt=""
    />
    <img
      :src="require('../assets/images/test.png?resize&size=300&webp')"
      alt=""
    />
    <img src="../assets/images/test.png?webp?resize&size=300" alt="" />
    <img src="../assets/images/test.png?webp&resize&size=300" alt="" />
    <svg-icon name="test/coffee"></svg-icon>
  </div>
</template>

<script>
export default {}
</script>

<style lang="sass">
/*Sample `apply` at-rules with Tailwind CSS */
</style>
