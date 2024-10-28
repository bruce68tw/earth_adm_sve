<XgEditForm {crudE} bind:this={form} progName="捐贈單審核" showMode={false} fnSetVm={setVm} fnJsonToChild={jsonToChild}>
    <XiRead value={vm.Id} title='捐贈單號' {cols} />
    <XiText {vm} fid='DonorName' title='捐贈人' edit='' cols={cols2} />
    <XiText {vm} fid='Title' title='捐贈說明' edit='' {cols} />
    <XiText {vm} fid='PlanDate' title='預計到貨日' edit='' cols={cols2} />

    <XiText {vm} fid='AuditNote' title='審核意見' {cols} />
    <XiSelect {vm} fid='AuditStatus' title='審核狀態' required rows={_XpCode.auditActs()} cols='2,2' />
    
    <div class="row">
      <XiRead value={vm.AuditTime} title='審核時間' cols={cols2} custCss />
      <XiRead value={vm.CreatorName} title='建檔人員' cols={cols2} custCss />
    </div>
    <div class="row">
      <XiRead value={vm.SendTime} title='送審時間' cols={cols2} custCss />
      <XiRead value={vm.Created} title='建檔時間' cols={cols2} custCss />
    </div>

    <!-- ActItem -->
    <div class='xgb-box mt-3'>
      <span class="xg-span-label">捐贈物品清單</span>
    </div>
    <table class="table xg-table" cellspacing="0">
        <thead><tr>
            <th>物品類別</th>
            <th>物品名稱</th>
            <th>單位</th>
            <th style="width:100px">活動數量</th>
            <th style="width:100px">實際庫存</th>
            <th style="width:100px">在途庫存</th>
            <th style="width:100px">預計出貨</th>
        </tr></thead>
        <tbody>
          {#each vmItems || [] as vm}
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
  import XiText from '@base/lib/XiText.svelte'; 
  import XiSelect from '@base/lib/XiSelect.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 
  import _Xp from '@/ts/_Xp';
  import _XpCode from '@/ts/_XpCode';
  import _Json from '@base/ts/_Json';

  //property
  export let crudR:CrudRead;

  let cols = '2,6';
  let cols2 = '2,3';

  //2.master view-model
  let vm = {
    AuditNote: '',
    AuditStatus: '',
    Id: '',
    DonorName: '?',
    Title: '?',
    PlanDate: '?',
    CreatorName: '?',
    Created: '?',
    SendTime: '?',
    AuditTime: '?',
  };
  let crudE = new CrudEdit(vm);

  //多筆:items
  let vmItems:any[] = [];   //ui

  let form:XgEditForm;
  onMount(()=> crudE.init(crudR, form));

  //on open edit form
  function setVm(){
    vm = vm;
    vmItems = vmItems;
  }

  function jsonToChild(json:any){
    vmItems = _Json.getChildRows(vm, 0);
  }

</script>
