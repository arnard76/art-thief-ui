<script>
  export let isVertical = false;
  export let src = '';
</script>

<div class={isVertical ? 'frame' : 'frame-vert'}>
  <img
    class="artwork"
    src={src}
    alt="artwork"
  />
</div>

<style>
  .frame {
    background-image: url("/frame.jpg");
    background-size: cover;
    background-position: center;
    padding: 50px;
  }

  .frame-vert {
    background-image: url("/frame_hor.jpg");
    background-size: cover;
    background-position: center;
    padding: 50px;
  }

  .artwork {
    max-height: 512px;
    max-width: 640px;
  }
</style>