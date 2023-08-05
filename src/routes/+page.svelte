<script>
  import Button from "$lib/Button.svelte";
  import "./styles.css";

  let startBtn;
  let showBox = false;

  const handleClick = () => {
    showBox = true;
  };
</script>

<svelte:head>
  <title>The Art Thief</title>
  <meta name="description" content="The Art Thief" />
</svelte:head>

<div class="button-container" bind:this={startBtn} on:click={handleClick}>
  <Button>Start</Button>
</div>

{#if showBox}
  <div class="button-container">
    <div class="box"></div>
  </div>
{/if}

<div class="background">
  <img src="./gameArt/landingPage.svg" alt="" srcset="" />
  <div class="black" />
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .box {
    width: 50%;
    height: 600px;
    background-color: rgba(91, 91, 91, 0.718);
  }

  .container {
    padding: 20px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }

  .background {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: -10;
    display: flex;
    justify-content: stretch;

    /* vertical-align: middle; */
  }

  .background > img {
    /* width: 100%; */
    object-fit: cover;
    /* align-items: center; */
    /* justify-self: center; */
    align-self: center;
  }

  .background > .black {
    background-color: black;
    width: 100%;
  }
</style>
