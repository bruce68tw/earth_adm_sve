<XgEditForm {crudE} bind:this={form} progName="倉庫出貨" fnSetVm={setVm} fnJsonToChild={jsonToChild}
  showMode={false} saveLabel={crudE.mode=='U' ? '確定出貨' : ''} >
    <XiRead value={vm.Id} title='出貨單號' {cols} />
    <XiTextarea {vm} fid='Note' title='內容說明' edit='' cols="2,6" rowsCount={3} />
    <XiRead value={vm.ActId} title='來源活動單' {cols} />
    <XiRead value={_Date.dtsToUi2(vm.PlanTime)} title='預計出貨時間' {cols} />

    <div class="row">
      <XiRead value={vm.OutputTime} title='實際出貨時間' {cols} custCss />
      <XiRead value={vm.CreatorName} title='建檔人員' {cols} custCss />
    </div>
    <div class="row">
      <XiRead value={vm.CheckTime} title='確認時間' {cols} custCss />
      <XiRead value={vm.Created} title='建檔時間' {cols} custCss />
    </div>

    <!-- ActItem -->
    <div class='xgb-box mt-3'>
      <span class="xg-span-label">出貨單物品清單</span>
    </div>
    <table class="table xg-table" cellspacing="0">
        <thead><tr>
            <th>物品類別</th>
            <th>物品名稱</th>
            <th>單位</th>
            <th style="width:100px">出貨數量</th>
            <th style="width:100px">實際庫存</th>
            <th style="width:100px">在途庫存</th>
            <th style="width:100px">預計出貨</th>
        </tr></thead>
        <tbody>
          {#each vmItems as vm}
            <tr>
                <td>{vm.TypeName}</td>
                <td>{vm.ItemName}</td>
                <td>{vm.Unit}</td>
                <td>{vm.Amount}</td>
                <td>{vm.StockAmount}</td>
                <td>{vm.StockWayAmount}</td>
                <td>{vm.PlanAmount}</td>
            </tr>
          {/each}
        </tbody>
    </table>    
</XgEditForm>

<script lang='ts'>
    import { onMount } from 'svelte';  
    import type CrudRead from '@base/ts/CrudRead';
    import CrudEdit from '@base/ts/CrudEdit';
    import XgEditForm from '@base/lib/XgEditForm.svelte';
    import XiTextarea from '@base/lib/XiTextarea.svelte'; 
    import XiRead from '@base/lib/XiRead.svelte'; 
    import _Xp from '@/ts/_Xp';
    import _XpCode from '@/ts/_XpCode';
    import _Date from '@base/ts/_Date';
    import _VM from '@base/ts/_VM';
    import _Json from '@base/ts/_Json';
    import EditMany from '@base/ts/EditMany';

  //property
  export let crudR:CrudRead;

  let cols = "2,3";

  //2.master view-model
  let vm = {
    Id: '',
    OutputStatus: 0,
    ActId: '?',
    Block: '?',
    Note: '?',
    PlanTime: '?',
    OutputTime: '?',
    CheckTime: '?',
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);

  //多筆:items
  let vmItems:any[] = [];   //ui
  let mItem = new EditMany(null, vmItems);

  let form:XgEditForm;
  onMount(()=> crudE.init(crudR, form, null, [mItem]));

  //on open edit form
  function setVm(){
    vm = vm;
    vmItems = vmItems;
  }

  function jsonToChild(json:any){
    if (crudE.mode == 'U') _VM.setValue(vm, 'OutputStatus', 1);
  }

</script>
