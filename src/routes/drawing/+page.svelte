<script>
  // @ts-nocheck

  import DrawingCanvas from "$lib/DrawingCanvas.svelte";

  export let drawingCanvas;
  $: console.log(drawingCanvas);

  $: img = drawingCanvas?.toDataURL("image/png");
  $: console.log(img);
</script>

<DrawingCanvas bind:drawingCanvas />

<button />
