<!-- 只有執行功能 -->
<XgProgPath names={['設定盤點狀態']} />
<div class="xp-prog mt-3">
  {#if status}
    <div>
      目前系統正在進行盤點，您可以點擊畫面中的［取消盤點］按鈕來取消本次的盤點作業，
      系統將不會更新任何庫存資料，並且恢復全部功能供使用者操作。
    </div>
    <button type='button' class='btn btn-primary mt-2' on:click={onCancelA}>取消盤點</button>
  {:else}
    <div>
      目前系統不是在盤點狀態，您可以點擊畫面中的［開始盤點］按鈕來啟動盤點作業，當您清查物品的庫存數量後，
      請執行＂輸入盤點結果＂作業來填寫正確的物品數量，然後再次進入本功能將系統回復到一般狀態。
      在盤點狀態期間，大部分作業只提供查詢功能，無法異動資料。
    </div>
    <button type='button' class='btn btn-primary mt-2' on:click={onStartA}>開始盤點</button>
  {/if}
</div>
 
<script lang='ts'>
  import { onMount } from 'svelte';
  import XgProgPath from '@base/lib/XgProgPath.svelte';
  import _Ajax from '@base/ts/_Ajax';
  import _Tool from '@base/ts/_Tool';
  import _VM from '@base/ts/_VM';

  let status = false;
  onMount(async()=> {
    status = (await _Ajax.getStrA('/StockStatus/GetStatus', false, null)) == '1';
  });

  async function onStartA():Promise<void> {
    let msg = await _Ajax.getStrA('/StockStatus/SetStart', false, null);
    if (msg === null) return;    
    if (msg == '') status = true;
    _Tool.msg(msg || '成功設定為盤點狀態。');
  }

  async function onCancelA():Promise<void> {
    let msg = await _Ajax.getStrA('/StockStatus/Cancel', false, null);
    if (msg === null) return;    
    if (msg == '') status = false;
    _Tool.msg(msg || '已取消盤點作業。');
  }

</script>
