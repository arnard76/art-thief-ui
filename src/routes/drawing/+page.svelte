<script>
  // @ts-nocheck

  import DrawingCanvas from "$lib/DrawingCanvas.svelte";

  export let drawingCanvas = undefined;

  let files;

  let sketchImage;
  $: image = files?.length && files[0];

  function getSketchedImage() {
    console.log(drawingCanvas.toDataURL("image/png"));
    // return new File([drawingCanvas.toDataURL("image/input")], "sketch.png", {
    //   type: "image/png",
    // });
    // return new Blob([drawingCanvas?.toDataURL("image/png")], {
    //   type: "image/png",
    // });
    return drawingCanvas.toDataURL("image/png");
  }

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  async function generateForgery() {
    // const sketchedImage = getSketchedImage();

    // console.log(await getSketchedImage().arrayBuffer());
    // console.log(await image.arrayBuffer());

    // const base64 = await convertBase64(sketchedImage);

    const imageBlob = await (await fetch(getSketchedImage())).blob();

    const imageFile = new File([imageBlob], "sketch.png", {
      type: imageBlob.type,
    });

    sketchImage.src = drawingCanvas.toDataURL("image/png");
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

    console.log(res.request);

    console.log("Image uploaded successfully!");
  }
</script>

<!-- Art being stolen 🖼️ -->

<!-- Initial Sketch -->
<DrawingCanvas bind:canvas={drawingCanvas} width={640} height={512} />
<input type="file" name="" id="" bind:files />
<button
  on:click={async () =>
    console.log(
      // getSketchedImage(),
      // typeof getSketchedImage(),
      await generateForgery()
    )}>Generate image</button
>

<!-- Art Forgery (generated image) -->
