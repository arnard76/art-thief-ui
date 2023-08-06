<script>
    // @ts-nocheck

    import DrawingCanvas from '$lib/DrawingCanvas.svelte';
    import { onMount } from 'svelte';
    import Button from '$lib/Button.svelte';

    export let drawingCanvas = undefined;

    let generatedImage;

    const famousPaintings = [
        'monalisa.jpg',
        'starry_night.jpg',
        'scream.webp',
        'van-gough.avif',
    ];
    let prompt;

    function getSketchedImage() {
        console.log(drawingCanvas.toDataURL('image/png'));
        return drawingCanvas.toDataURL('image/png');
    }

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

<div class="container">
    <!-- Art being stolen 🖼️ -->
    <div class="famous-painting-container">
        <img class="famous-painting-image" width="640px" height="512px" />
    </div>

    <!-- Initial Sketch -->
    <div class="canvas">
        <div>
            <DrawingCanvas
                bind:canvas={drawingCanvas}
                width={640}
                height={512}
            />
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

    <div class="forgery">
        {#if generatedImage}
            <img src={generatedImage} alt="generated art forgery" />
            <Button on:click={() => {}}>Steal</Button>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        overflow-x: scroll;
        white-space: nowrap;
        height: 100vh;
    }

    .canvas {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .canvas,
    .famous-painting-container,
    .forgery {
        flex-shrink: 0;
        width: 640px;
        height: 512px;
        margin-right: 20px;
    }

    .forgery {
        border: 1px solid black;
    }

    textarea {
        min-height: 24px;
    }
</style>
