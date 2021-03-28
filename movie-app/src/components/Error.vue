<template>
  <div class="column items-center q-gutter-y-md" style="height: auto; margin-top: 40%;">
    <div class="col">
      <img src="../statics/image/error.png" height="120rem" width="120rem" />
    </div>
    <div class="col">
      <p class="text-grey-8">Sorry, something went wrong.</p>
    </div>
    <div class="col">
      <q-btn class="glossy" rounded color="deep-orange" label="Try Again" @click.prevent="$emit('clickedTryAgain')" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

