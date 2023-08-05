<script>
  // @ts-nocheck

  import DrawingCanvas from "$lib/DrawingCanvas.svelte";

  export let drawingCanvas = undefined;

  function getSketchedImage() {
    return drawingCanvas?.toDataURL("image/png");
  }

  $: img = drawingCanvas?.toDataURL("image/png");
  $: console.log(img);
</script>

<DrawingCanvas bind:canvas={drawingCanvas} width={640} height={512} />

<button />
