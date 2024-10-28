<XgEditForm {crudE} bind:this={form} progName="捐贈單維護" fnSetVm={setVm}>
    <div class="row">
      <XiRead value={vm.Id} title='捐贈單號' {cols} custCss />
      <FldSendAudit {vm} {cols} custCss />        
    </div>

    <XiKeyModal bind:this={fldDonorId} {vm} fid='DonorId' fname='DonorName' title='捐贈人' 
      required cols="2,2" fnOnOpen={()=> modalDonor.open()} />
    <XiText {vm} fid='Title' title='捐贈說明' required maxLen={100} cols="2,6" />
    <XiDate {vm} fid='PlanDate' title='預計到貨日' cols="2,2" required />
    <XiRead value={vm.AuditNote} title='審核意見' cols="2,6" />
    
    <div class="row">
      <XiRead value={_Audit.statusName(vm.AuditStatus)} title='審核狀態' {cols} custCss />
      <XiRead value={_Xp.inputStatusName(vm.InputStatus)} title='入庫狀態' {cols} custCss />
    </div>
    <div class="row">
      <XiRead value={vm.AuditTime} title='審核時間' {cols} custCss />
      <XiRead value={vm.CreatorName} title='建檔人員' {cols} custCss />
    </div>
    <div class="row">
      <XiRead value={vm.SendTime} title='送審時間' {cols} custCss />
      <XiRead value={vm.Created} title='建檔時間' {cols} custCss />
    </div>

    <!-- Items -->
    <div class='xgb-box mt-3'>
      <span class="xg-span-label">捐贈物品清單</span>
      <XbAddRow fnOnClick={()=> mItem.addRow()} disabled={isView} />
    </div>
    <table class="table xg-table xgt-no-hline" cellspacing="0">
        <thead><tr>
            <XgTh title='物品類別' required />
            <XgTh title='物品名稱' required />
            <th>單位</th>
            <XgTh title='捐贈數量' width='150px' required />
            <th style="width:100px">入庫數量</th>
            <th style="width:100px">實際庫存</th>
            <th style="width:100px">在途庫存</th>
            <th style="width:100px">預計出貨</th>
            <th>維護</th>
        </tr></thead>
        <tbody>
          {#each vmItems as vm}
            <tr>
                <td><XiSelect {vm} fid='TypeId' rows={itemTypes} fnOnChange={onChangeType} required /></td>
                <td><XiSelect {vm} fid='ItemId' rows={_Code.filterByExt(items, vm.TypeId)} fnOnChange={onChangeItem} required /></td>
                <td>{vm.Unit}</td>
                <td><XiInt {vm} fid='Amount' required /></td>
                <td>{vm.InputAmount}</td>
                <td>{vm.StockAmount}</td>
                <td>{vm.StockWayAmount}</td>
                <td>{vm.PlanAmount}</td>
                <td><XblDelete fnOnClick={()=> mItem.deleteRow(vm.Id)} disabled={isView}/></td>  
            </tr>
          {/each}
        </tbody>
    </table>    
</XgEditForm>

<!-- modal: getDonors -->
<ModalGetDonor bind:this={modalDonor} action='/Xp/GetDonors' fnOnOk={afterGetDonor} />

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import type IdStrDto from '@base/dto/IdStrDto';
  import type IdStrExtDto from '@base/dto/IdStrExtDto';
  import CrudEdit from '@base/ts/CrudEdit';
  import EditMany from '@base/ts/EditMany';
  import XgEditForm from '@base/lib/XgEditForm.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import XiDate from '@base/lib/XiDate.svelte'; 
  //import XiTextarea from '@base/lib/XiTextarea.svelte'; 
  import XiSelect from '@base/lib/XiSelect.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 
  import XiInt from '@base/lib/XiInt.svelte';
  import XbAddRow from '@base/lib/XbAddRow.svelte';
  import XblDelete from '@base/lib/XblDelete.svelte';
  import XgTh from '@base/lib/XgTh.svelte';
  import _Xp from '@/ts/_Xp';
  import _XpCode from '@/ts/_XpCode';
  import _Fun from '@base/ts/_Fun';
  import _Ajax from '@base/ts/_Ajax';
  import _Code from '@base/ts/_Code';
  import _Audit from '@/ts/_Audit';
  import XiKeyModal from '@base/lib/XiKeyModal.svelte';
  import ModalGetDonor from './ModalGetDonor.svelte';
  import FldSendAudit from './FldSendAudit.svelte';
    import _Json from '@base/ts/_Json';

  //property
  export let crudR:CrudRead;

  //ui variables  
  const cols = "2,3";
  let itemTypes:IdStrDto[] = [];
  let items:IdStrExtDto[] = [];   //dynamic filter
  $: isView = (crudE.mode == 'V');
  let modalDonor:ModalGetDonor;
  let fldDonorId:XiKeyModal;

  //2.master view-model
  let vm = {
    Id: '',
    DonorId: '',
    Title: '',
    PlanDate: '',
    _SendAudit: 0,  //important !!
    DonorName: '?',
    AuditNote: '?',
    AuditStatus: '?',
    AuditTime: '?',
    InputStatus: '?',
    SendTime: '?',
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);
  //crudE.fnWhenSave = whenSave;

  //多筆:items
  let vmItems:any[] = [];   //ui
  let mItem = new EditMany({
    ItemId: '',
    Amount: 0,
    InputAmount: '?',
    TypeId: '?',
    Unit: '?',
    StockAmount: '?',
    StockWayAmount: '?',
    PlanAmount: '?',
  }, vmItems);

  //onMount
  let form:XgEditForm;
  onMount(async()=> {
    crudE.init(crudR, form, null, [mItem]);
    itemTypes = await _XpCode.itemTypesA();
    items = await _XpCode.itemsA();
  });

  //on open edit form
  function setVm(){
    vm = vm;
    vmItems = vmItems;
  }

  //onchange item.TypeId
  function onChangeType(row:any){
    _Xp.resetItem(row);
    row.InputAmount = 0;
    vmItems = vmItems;
  }

  //onchange item.Id
  async function onChangeItem(row:any):Promise<void> {
    let item = await _Ajax.getJsonA('/Xp/GetItem', false, {id:row.ItemId});
    _Xp.setItem(row, item);
    row.InputAmount = 0;
    vmItems = vmItems;
  }

  //called by ModalGetDonor
  function afterGetDonor(donor:any){
    vm.DonorId = donor.Id;
    vm.DonorName = donor.Name;
    fldDonorId.onChange(vm.DonorId);
    vm = vm;
  }

</script>
