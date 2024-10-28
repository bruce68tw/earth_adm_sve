<XgModal bind:this={modal} title="選取捐贈單" size='width:720px; height:600px;'>
    <div class="row">
        <div class="col-md-3 text-end xi-label">預計到貨日</div>
        <div class="col-md-9">
            <XiDate {vm} fid='PlanDate' inBlock />
            <span>~</span>
            <XiDate {vm} fid='PlanDate2' inBlock />
        </div>
    </div>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-9">
          <XiCheck {vm} fid='MyData' label="我的捐贈單" />
      </div>
    </div>
    <div class="row mb-1">
      <div class="col-md-3"></div>
      <div class="col-md-6">
          <XiCheck {vm} fid='InputStatus' label="未入庫或部分入庫捐贈單" />
      </div>
      <div class="col-md-3 mt-2">
        <button type="button" class="btn btn-success" on:click={onFind}>查詢</button>
        <button type="button" class="btn btn-primary" on:click={onModalOk}>選取</button>
      </div>
    </div>

    <!-- query result list -->
    <table id="table1" class="table mb-0 xg-table xgt-vscroll" cellspacing="0" style="width:100%">
        <thead><tr>
            <th>選取</th>
            <th>捐贈單號</th>
            <th>內容</th>
            <th>入庫狀態</th>
            <th>建檔人員</th>
        </tr></thead>
        <!-- match tplItemTr -->
        <tbody style="height:336px">
          {#each rows as row}
            <tr>
              <td>
                <XgRadioValue value={row.Id} name='radio1' bind:group={donateId} />
              </td>
              <td>{row.Id}</td>
              <td>{row.Title}</td>
              <td>{_Xp.inputStatusName(row.InputStatus)}</td>  
              <td>{row.Name}</td>  
            </tr>
          {/each}
        </tbody>
    </table>
</XgModal>

<script lang='ts'>
  import XgModal from '@base/lib/XgModal.svelte';
  import XgRadioValue from '@base/lib/XgRadioValue.svelte';
  import XiDate from '@base/lib/XiDate.svelte'; 
  import XiCheck from '@base/lib/XiCheck.svelte';
  import _Ajax from '@base/ts/_Ajax';
  import _Check from '@base/ts/_Check';
  import _Tool from '@base/ts/_Tool';
  import _Array from '@base/ts/_Array';
  import _VM from '@base/ts/_VM';
  import _Xp from '@/ts/_Xp';

  /**
   * onclick modal ok & close modal
   * - fnOnOk(row:any)
   */
  export let fnOnOk:Function;
  export let action:string;

  //ui variables
  let donateId:string;
  //query result user rows
  let rows:any[] = []; 

  //2.form view-model
  let vm = {
    PlanDate: '',
    PlanDate2: '',
    MyData: 1,
    InputStatus: 1,
  };
  _VM.init(vm);

  let modal:XgModal;
  export function open(){ modal.open(); }
  export function close(){ modal.close(); }

  async function onFind():Promise<void> {
    //let data = { name:vm.Name, phone:vm.Phone };
    let jsons = await _Ajax.getJsonA(action, false, vm);
    rows = jsons || [];
    if (rows.length > 0) donateId = rows[0].Id;
  }

  function onModalOk(){
    let index = _Array.findIndex(rows, 'Id', donateId);
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
      flex-basis: 160px;
  }
  #table1 th:nth-child(3), #table1 td:nth-child(3) {
      flex-basis: 150px;
  }
  #table1 th:nth-child(4), #table1 td:nth-child(4) {
      flex-basis: 100px;
  }
  /* get remain width */
  #table1 th:nth-child(5), #table1 td:nth-child(5) {
      flex-grow: 1;
  }
</style>
