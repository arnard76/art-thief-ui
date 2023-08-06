<script>
  import Painting from "$lib/Painting.svelte";
  let images = [
    "/monalisa.jpg",
    "/scream.jpg",
    "/starry_night.jpg",
    "/guernica.jpg",
  ];
  images = images.map((image) => `/painting_picture${image}`);
</script>

<div class="gallery">
  <Painting src={images[0]} isVertical={true} />
  <Painting src={images[1]} isVertical={true} />
  <Painting src={images[2]} isVertical={false} />
  <Painting src={images[3]} isVertical={false} />
</div>

<style>
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
