<script>
    // @ts-nocheck

    import DrawingCanvas from '$lib/DrawingCanvas.svelte';
    import { onMount } from 'svelte';

    export let drawingCanvas = undefined;

    let generatedImage;

    const famousPaintings = ['monalisa.jpg', 'starry_night.jpg', 'scream.webp', 'van-gough.avif'];

    function getAndDisplayFamousPainting() {
        const randomIndex = Math.floor(Math.random() * famousPaintings.length);
        const randomPaintingURL = famousPaintings[randomIndex];

        const famousPaintingImg = document.querySelector(
            '.famous-painting-image'
        );
        famousPaintingImg.src = `/painting-pictures/${randomPaintingURL}`;
    }

    onMount(() => {
        getAndDisplayFamousPainting();
    });

    function getSketchedImage() {
        console.log(drawingCanvas.toDataURL('image/png'));
        return drawingCanvas.toDataURL('image/png');
    }

    async function generateForgery() {
        const imageBlob = await (await fetch(getSketchedImage())).blob();

        const imageFile = new File([imageBlob], 'sketch.png', {
            type: imageBlob.type,
        });

        const res = await fetch(
            'http://localhost:3001/?' +
                new URLSearchParams({
                    prompt: 'hello',
                }),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'image/png',
                },
                body: imageFile,
            }
        );
        const imageData = await res.blob();
        generatedImage = URL.createObjectURL(imageData);
        console.log(generatedImage);

        console.log('Image uploaded successfully!');
    }
</script>

<!-- Art being stolen 🖼️ -->
<div class="famous-painting-container">
    <img
        class="famous-painting-image"
        src="./painting-pictures/monalisa.jpg"
        width="300px"
    />
</div>
<!-- Initial Sketch -->
<div style="display: flex; flex-direction: column; max-width: 25%;">
    <div>
        <DrawingCanvas bind:canvas={drawingCanvas} width={640} height={512} />
    </div>
    <button on:click={async () => console.log(await generateForgery())}
        >Generate</button
    >
</div>

<!-- Art Forgery (generated image) -->

{#if generatedImage}
    <img src={generatedImage} alt="generated art forgery" />
    <button on:click={() => {}}> Steal </button>
{/if}
