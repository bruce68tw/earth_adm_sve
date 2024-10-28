{#if showMain}
  <!-- show donor -->
  <div in:fade={_Fun.FadeTime}>
    <DonorR fnOnSwap={onSwap} />
  </div>
{:else}
  <!-- show donorTalk -->
  <div in:fade={_Fun.FadeTime}>
    <DonorTalk fnOnSwap={onSwap} donor={donorRow} />
  </div>
{/if}

<script lang='ts'>
  import { fade } from 'svelte/transition';
  import DonorR from './DonorR.svelte';
  import DonorTalk from './DonorTalk.svelte';
  import _Fun from '@base/ts/_Fun';

  let showMain = true;
  let donorRow = {};

  async function onSwap(isMain:boolean=true, row={}):Promise<void> {
    if (!isMain) donorRow = row;
    showMain = isMain;
  }
</script>
