<XgModal bind:this={modal} title="選取活動單" size='width:720px; height:600px;'>
    <div class="row">
      <XiText {vm} fid='Id' title='活動單號' custCss />
      <XbsKmFun col='3' fnOnFind={onFind} fnOnSelect={onSelect} />
    </div>
    <XiText {vm} fid='Name' title='活動名稱' />

    <!-- query result list -->
    <table id="table1" class="table mb-0 mt-2 xg-table xgt-vscroll" cellspacing="0" style="width:100%">
        <thead><tr>
            <th>選取</th>
            <th>活動單號</th>
            <th>活動名稱</th>
        </tr></thead>
        <tbody style="height:372px">
          {#each rows as row}
            <tr>
              <td>
                <XgRadioValue value={row.Id} name='radio1' bind:group={actId} />
              </td>
              <td>{row.Id}</td>
              <td>{row.Name}</td>  
            </tr>
          {/each}
        </tbody>
    </table>
</XgModal>

<script lang='ts'>
  import XgModal from '@base/lib/XgModal.svelte';
  import XgRadioValue from '@base/lib/XgRadioValue.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import _Ajax from '@base/ts/_Ajax';
  import _Check from '@base/ts/_Check';
  import _Tool from '@base/ts/_Tool';
  import _Array from '@base/ts/_Array';
  import _VM from '@base/ts/_VM';
  import _Xp from '@/ts/_Xp';
  import XbsKmFun from '@base/lib/XbsKmFun.svelte';

  /**
   * onclick modal ok & close modal
   * - fnOnSelect(row:any)
   */
  export let fnOnSelect:Function;
  export let action:string;

  //ui variables
  let actId:string;
  //query result user rows
  let rows:any[] = []; 

  //2.form view-model
  let vm = {
    Id: '',
    Name: '',
  };
  _VM.init(vm);

  let modal:XgModal;
  export function open(){ modal.open(); }
  export function close(){ modal.close(); }

  async function onFind():Promise<void> {
    let jsons = await _Ajax.getJsonA(action, false, vm);
    rows = jsons || [];
    if (rows.length > 0) actId = rows[0].Id;
  }

  function onSelect(){
    let index = _Array.findIndex(rows, 'Id', actId);
    if (index >= 0){
      fnOnSelect(rows[index]);
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
  /* get remain width */
  #table1 th:nth-child(3), #table1 td:nth-child(3) {
      flex-grow: 1;
  }
</style>
