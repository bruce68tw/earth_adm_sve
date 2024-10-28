<XgEditForm {crudE} bind:this={form} progName="盤點單維護" fnSetVm={setVm}>
    <XiRead value={vm.Id} title='盤點單號' />   
    <XiRead value={_Xp.statusName(vm.Status)} title='資料狀態' />
    <div class="row">
      <XiRead value={vm.CreatorName} title='建檔人員' custCss />
      <XiRead value={vm.Created} title='建檔時間' custCss />
    </div>

    <!-- ActItem -->
    <div class='xgb-box mt-3'>
      <span class="xg-span-label">盤點物品清單</span>
    </div>
    <table class="table xg-table xgt-no-hline" cellspacing="0">
        <thead><tr>
            <XgTh title='物品類別' />
            <XgTh title='物品名稱' />
            <th>單位</th>
            <XgTh title='盤點數量' width='150px' required />
            <th style="width:150px">庫存數量</th>
        </tr></thead>
        <tbody>
          {#each vmItems as vm}
            <tr>
                <td>{vm.TypeName}</td>
                <td>{vm.ItemName}</td>
                <td>{vm.Unit}</td>
                <td><XiInt {vm} fid='Amount' required /></td>
                <td>{vm.OldAmount}</td>
            </tr>
          {/each}
        </tbody>
    </table>    
</XgEditForm>

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import CrudEdit from '@base/ts/CrudEdit';
  import EditMany from '@base/ts/EditMany';
  import XgEditForm from '@base/lib/XgEditForm.svelte';
  import XiRead from '@base/lib/XiRead.svelte'; 
  import XiInt from '@base/lib/XiInt.svelte';
  import XgTh from '@base/lib/XgTh.svelte';
  import _Xp from '@/ts/_Xp';
  import _XpCode from '@/ts/_XpCode';
  import _Fun from '@base/ts/_Fun';
  import _Ajax from '@base/ts/_Ajax';
  import _Code from '@base/ts/_Code';
  import _Audit from '@/ts/_Audit';
  import _Json from '@base/ts/_Json';

  //property
  export let crudR:CrudRead;

  //variables
  //const cols = "2,6";

  //2.master view-model
  let vm = {
    Id: '',
    Status: 0,
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);
  //crudE.fnWhenSave = whenSave;

  //多筆:items
  let vmItems:any[] = [];   //ui view-model
  let mItem = new EditMany({
    ItemName: '?',
    Amount: 1,
    TypeName: '?',
    Unit: '?',
    OldAmount: '?',
  }, vmItems);

  let form:XgEditForm;
  onMount(()=> crudE.init(crudR, form, null, [mItem]));

  //on open edit form
  function setVm(){
    vm = vm;
    vmItems = vmItems;
  }

  /*
  function whenSave(json:any):boolean {
    if (!mItem.validRows()) return false;

    //json[_Fun.FidChilds] = [mItem.getUpdJson()];
    return true;
  }
  */
</script>
