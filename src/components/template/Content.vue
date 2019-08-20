<template>
  <div class="content">
      <router-view/>
  </div>
</template>

<script>
export default {
    name: ''
}
</script>

<style>
    .content{
        grid-area: content;
        background: #efefef;
        padding: 20px;
    }
</style>