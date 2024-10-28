<XgModal bind:this={modal} title="選取捐贈人" size='width:560px; height:575px;'>
    <div class="row mt-2 mb-1">
        <div class="col-md-2 text-end">姓名</div>
        <div class="col-md-5">
            <input bind:value={vm.Name} type='text' class='form-control' />
        </div>
        <div class="col-md-4 text-end">
            <button type="button" class="btn btn-success" on:click={onFind}>查詢</button>
            <button type="button" class="btn btn-primary" on:click={onModalOk}>選取</button>
        </div>
    </div>
    <div class="row mb-1">
        <div class="col-md-2 text-end">電話</div>
        <div class="col-md-5">
            <input bind:value={vm.Phone} type='text' class='form-control' />
        </div>
    </div>

    <!-- query result list -->
    <table id="table1" class="table mb-0 xg-table xgt-vscroll" cellspacing="0" style="width:100%">
        <thead><tr>
            <th>選取</th>
            <th>姓名</th>
            <th>電話</th>
        </tr></thead>
        <!-- match tplItemTr -->
        <tbody style="height:340px">
          {#each rows as row}
            <tr>
              <td>
                <XgRadioValue value={row.Id} name='radio1' bind:group={donorId} />
              </td>
              <td>{row.Name}</td>
              <td>{row.Phone}</td>  
            </tr>
          {/each}
        </tbody>
    </table>
</XgModal>

<script lang='ts'>
  //import { onMount } from 'svelte';  
  import XgModal from '@base/lib/XgModal.svelte';
  import _Ajax from '@base/ts/_Ajax';
  import _Check from '@base/ts/_Check';
  import _Tool from '@base/ts/_Tool';
  import XgRadioValue from '@base/lib/XgRadioValue.svelte';
  import _Array from '@base/ts/_Array';

  /**
   * onclick modal ok & close modal
   * - fnOnOk(row:any)
   */
  export let fnOnOk:Function;

  export let action:string;

  //ui variables
  let donorId:string;
  //query result user rows
  let rows:any[] = []; 

  //2.form view-model
  let vm = {
    Name: '',
    Phone: '',
  };

  let modal:XgModal;
  export function open(){ modal.open(); }
  export function close(){ modal.close(); }

  async function onFind():Promise<void> {
    let data = { name:vm.Name, phone:vm.Phone };
    let jsons = await _Ajax.getJsonA(action, false, data);
    rows = jsons || [];
    if (rows.length > 0) donorId = rows[0].Id;
  }

  function onModalOk(){
    let index = _Array.findIndex(rows, 'Id', donorId);
    if (index >= 0){
      fnOnOk(rows[index]);
      modal.close();
    }
  }
</script>

<style>
  /* set scroll table column width(base 1) */
  #table1 th:nth-child(1), #table1 td:nth-child(1) {
      flex-basis: 80px;
  }
  #table1 th:nth-child(2), #table1 td:nth-child(2) {
      flex-basis: 220px;
  }
  /* get remain width */
  #table1 th:nth-child(3), #table1 td:nth-child(3) {
      flex-grow: 1;
  }
</style>
