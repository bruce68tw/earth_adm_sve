<!-- 檔名後面有s表示多選 -->
<XgModal bind:this={modal} title="選取用戶" size='width:560px; height:545px;'>
    <div class="row mt-2 mb-1" >
        <div class="col-md-2 text-end">帳號</div>
        <div class="col-md-5">
            <input bind:value={vm.Account} type='text' class='form-control' />
        </div>
        <div class="col-md-4 text-end">
            <button type="button" class="btn btn-success" on:click={onFindUserA}>查詢</button>
            <button type="button" class="btn btn-primary" on:click={onModalOk}>選取</button>
        </div>
    </div>

    <!-- query result list -->
    <table id="table1" class="table mb-0 xg-table xgt-vscroll" cellspacing="0" style="width:100%">
        <thead><tr>
            <th>選取</th>
            <th>帳號</th>
            <th>用戶名稱</th>
        </tr></thead>
        <!-- match tplItemTr -->
        <tbody style="height:340px">
          {#each users || [] as user}
            <tr>
              <td>
                <XgCheck bind:checked={user.Checked} />
              </td>
              <td>{user.Account}</td>
              <td>{user.Name}</td>  
            </tr>
          {/each}
        </tbody>
    </table>
</XgModal>

<script lang='ts'>
  //import { onMount } from 'svelte';  
  import XgModal from '@base/lib/XgModal.svelte';
  import XgCheck from '@base/lib/XgCheck.svelte';
  import _Ajax from '@base/ts/_Ajax';
  import _Check from '@base/ts/_Check';
  import _Tool from '@base/ts/_Tool';

  /**
   * onclick modal ok & close modal
   */
  export let fnOnOk:Function;

  export let action:string;

  //2.form view-model
  let vm = {
    Account: '',
  };

  //query result user rows
  let users:any[] = []; 

  let modal:XgModal;
  export function open(){ modal.open(); }
  export function close(){ modal.close(); }

  async function onFindUserA():Promise<any> {
    let data = { account: vm.Account };
    users = _Check.addCheckedFid(await _Ajax.getJsonA(action, false, data));
  }

  function onModalOk(){
    let rows = _Check.getCheckedRows(users);
    if (rows.length == 0){
      _Tool.msg('請先選取資料。');
      return;
    }

    fnOnOk(rows);
    modal.close();
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
