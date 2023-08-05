<script>
  // @ts-nocheck

  import DrawingCanvas from "$lib/DrawingCanvas.svelte";

  export let drawingCanvas = undefined;

  function getSketchedImage() {
    return new File(
      [new Blob([drawingCanvas.toDataURL("image/png")], { type: "image/png" })],
      "sketch.png"
    );
    // return new Blob([drawingCanvas?.toDataURL("image/png")], {
    //   type: "image/png",
    // });
  }

  async function generateForgery() {
    const res = await fetch(
      "http://localhost:3001/?" +
        new URLSearchParams({
          prompt: "hello",
        }),
      {
        method: "POST",
        headers: {
          "Content-Type": "image/png",
        },
        body: getSketchedImage(),
      }
    );

    console.log(res.request);
    console.log("Image uploaded successfully!");
  }
</script>

<!-- Art being stolen 🖼️ -->

<!-- Initial Sketch -->
<DrawingCanvas bind:canvas={drawingCanvas} width={640} height={512} />

<button
  on:click={async () =>
    console.log(
      getSketchedImage(),
      typeof getSketchedImage(),
      await generateForgery()
    )}>Generate image</button
>

<!-- Art Forgery (generated image) -->
