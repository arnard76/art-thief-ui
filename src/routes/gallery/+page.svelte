<script>
  let images = [
    "/monalisa.jpg",
    "/scream.jpg",
    "/starry_night.jpg",
    "/guernica.jpg",
  ];
  images = images.map((image) => `/painting_picture${image}`);

  let imageHeights = Array(images.length);
  let imageWidths = Array(images.length);
</script>

<div class="gallery">
  {#each images as image, i}
    <div class={imageWidths[i] > imageHeights[i] ? 'frame' : 'frame-vert'}>
      <img
        bind:naturalHeight={imageHeights[i]}
        bind:naturalWidth={imageWidths[i]}
        class="artwork"
        src={image}
        alt="artwork"
      />
    </div>
  {/each}
</div>

<style>
  .frame {
    background-image: url("/frame.jpg");
    background-size: cover;
    background-position: center;
    padding: 50px;
  }

  .frame-vert {
    background-image: url("/frame.jpg");
    background-size: cover;
    background-position: center;
    padding: 50px;
  }

  .artwork {
    max-height: 512px;
    max-width: 640px;
  }

  .gallery {
    background-image: url("/gallery_2.jpg");
    background-size: cover;
    background-position-y: center;

    height: calc(100vh) !important;
    display: flex;
    padding-left: 8rem;
    padding-right: 8rem;
    /* justify-content: center; */
    align-items: center;
    flex-direction: row;
    gap: 8rem;
    overflow-y: hidden;
  }
</style>
