<script>
  import Button from "$lib/Button.svelte";
  import "./styles.css";
</script>

<svelte:head>
  <title>The Art Thief</title>
  <meta name="description" content="The Art Thief" />
</svelte:head>

<div class="button-container">
  <Button>Start</Button>
</div>

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

  .container {
    padding: 20px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    padding: 30px 0;
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
