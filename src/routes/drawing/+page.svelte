<script>
  // @ts-nocheck

  import DrawingCanvas from "$lib/DrawingCanvas.svelte";
  import Button from "$lib/Button.svelte";

  export let drawingCanvas = undefined;

  let generatedImage;

  function getSketchedImage() {
    console.log(drawingCanvas.toDataURL("image/png"));
    return drawingCanvas.toDataURL("image/png");
  }

  async function generateForgery() {
    const imageBlob = await (await fetch(getSketchedImage())).blob();

    const imageFile = new File([imageBlob], "sketch.png", {
      type: imageBlob.type,
    });

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
        body: imageFile,
      }
    );
    const imageData = await res.blob();
    generatedImage = URL.createObjectURL(imageData);
    console.log(generatedImage);

    console.log("Image uploaded successfully!");
  }
</script>

<!-- Art being stolen 🖼️ -->

<!-- Initial Sketch -->
<div style="display: flex; flex-direction: column; max-width: 25%;">
  <div>
    <DrawingCanvas bind:canvas={drawingCanvas} width={640} height={512} />
  </div>
  <Button on:click={async () => console.log(await generateForgery())}
    >Generate</Button
  >
</div>

<!-- Art Forgery (generated image) -->

{#if generatedImage}
  <img src={generatedImage} alt="generated art forgery" />
  <Button on:click={() => {}}>Steal</Button>
{/if}
