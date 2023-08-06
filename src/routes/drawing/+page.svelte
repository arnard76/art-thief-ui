<script>
  // @ts-nocheck

  import DrawingCanvas from "$lib/DrawingCanvas.svelte";
  import Button from "$lib/Button.svelte";
  import { goto } from "$app/navigation";
  import currentArtworks, { selectedImage } from "$lib/stolenImages";

  export let drawingCanvas = undefined;

  let generatedImage;
  const imageToStealPath = $selectedImage;

  let prompt;

  function getSketchedImage() {
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
          prompt,
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

    console.log("Image uploaded successfully!");
  }
</script>

<!-- Art being stolen 🖼️ -->

<!-- Initial Sketch -->
<div style="display: flex; flex-direction: column; max-width: 25%;">
  <div>
    <DrawingCanvas bind:canvas={drawingCanvas} width={640} height={512} />
  </div>

  <textarea
    type="text"
    name="prompt"
    placeholder="forgery should include ..."
    bind:value={prompt}
  />
  <Button on:click={async () => console.log(await generateForgery())}
    >Generate</Button
  >
</div>

<!-- Art Forgery (generated image) -->

{#if generatedImage}
  <img src={generatedImage} alt="generated art forgery" />
  <Button
    on:click={() => {
      goto("/gallery");
      currentArtworks.updateArtwork(imageToStealPath, {path: generatedImage, vertical: false});
    }}>Steal</Button
  >
{/if}

<style>
  * {
    font-size: 0.5em;
  }

  textarea {
    margin: 0.5em 0;
  }
</style>
