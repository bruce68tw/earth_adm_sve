<XgEditForm {crudE} bind:this={form} progName="活動單維護" fnSetVm={setVm}>
    <div class="row">
      <XiRead value={vm.Id} title='活動單號' custCss />
      <FldSendAudit {vm} custCss />        
    </div>
    <XiText {vm} fid='Name' title='活動名稱' required maxLen={100} {cols} />
    <XiDate {vm} fid='StartDate' title='活動開始日' cols="2,2" required />
    <XiDate {vm} fid='EndDate' title='活動結束日' cols="2,2" required />
    <XiFile {vm} fid='ImageFile' sid='t0_ImageFile' bind:this={imageFile} crud={crudE} 
      accept='.png,.jpg' title='照片' {cols} />

    <XiTextarea {vm} fid='Note' title='內容說明' required {cols} maxLen={500} rowsCount={3} />
    <XiDt {vm} fid='PlanTime' title='預計出貨時間' required {cols} />
    <XiRead value={vm.AuditNote} title='審核意見' {cols} />
    
    <div class="row">
      <XiRead value={_Audit.statusName(vm.AuditStatus)} title='審核狀態' custCss />
      <XiRead value={vm.TranTime} title='轉出貨單時間' custCss />
    </div>
    <div class="row">
      <XiRead value={vm.AuditTime} title='審核時間' custCss />
      <XiRead value={vm.CreatorName} title='建檔人員' custCss />
    </div>
    <div class="row">
      <XiRead value={vm.SendTime} title='送審時間' custCss />
      <XiRead value={vm.Created} title='建檔時間' custCss />
    </div>

    <!-- ActItem -->
    <div class='xgb-box mt-3'>
      <span class="xg-span-label">所需物品清單</span>
      <XbAddRow fnOnClick={()=> mItem.addRow()} disabled={isView} />
    </div>
    <table class="table xg-table xgt-no-hline" cellspacing="0">
        <thead><tr>
            <XgTh title='物品類別' required />
            <XgTh title='物品名稱' required />
            <th>單位</th>
            <XgTh title='活動數量' width='150px' required />
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
                <td>{vm.StockAmount}</td>
                <td>{vm.StockWayAmount}</td>
                <td>{vm.PlanAmount}</td>
                <td><XblDelete fnOnClick={()=> mItem.deleteRow(vm.Id)} disabled={isView}/></td>  
            </tr>
          {/each}
        </tbody>
    </table>    
</XgEditForm>

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import type IdStrDto from '@base/dto/IdStrDto';
  import type IdStrExtDto from '@base/dto/IdStrExtDto';
  import CrudEdit from '@base/ts/CrudEdit';
  import EditMany from '@base/ts/EditMany';
  import XgEditForm from '@base/lib/XgEditForm.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import XiTextarea from '@base/lib/XiTextarea.svelte'; 
  import XiSelect from '@base/lib/XiSelect.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 
  import XiInt from '@base/lib/XiInt.svelte';
  import XiDate from '@base/lib/XiDate.svelte';
  import XiFile from '@base/lib/XiFile.svelte';
  import XbAddRow from '@base/lib/XbAddRow.svelte';
  import XblDelete from '@base/lib/XblDelete.svelte';
  import XgTh from '@base/lib/XgTh.svelte';
  import XiDt from '@base/lib/XiDt.svelte';
  import FldSendAudit from './FldSendAudit.svelte';
  import _Xp from '@/ts/_Xp';
  import _XpCode from '@/ts/_XpCode';
  import _Fun from '@base/ts/_Fun';
  import _Ajax from '@base/ts/_Ajax';
  import _Code from '@base/ts/_Code';
  import _Audit from '@/ts/_Audit';
  import _Json from '@base/ts/_Json';

  //property
  export let crudR:CrudRead;

  //ui variables  
  const cols = "2,6";
  let imageFile:XiFile;
  let itemTypes:IdStrDto[] = [];
  let items:IdStrExtDto[] = [];   //dynamic filter
  $: isView = (crudE.mode == 'V');

  //2.master view-model
  let vm = {
    Id: '',
    Name: '',
    Note: '',
    StartDate: '',
    EndDate: '',
    ImageFile: '',
    PlanTime: '',
    _SendAudit: 0,  //important !! 是否送審
    AuditNote: '?',
    SendTime: '?',
    AuditStatus: '?',
    AuditTime: '?',
    TranTime: '?',
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);
  //crudE.fnWhenSave = whenSave;

  //多筆:items
  let vmItems:any[] = [];   //ui view-model
  let mItem = new EditMany({
    ItemId: '',
    Amount: 1,
    TypeId: '?',
    Unit: '?',
    StockAmount: '?',
    StockWayAmount: '?',
    PlanAmount:  '?',
  }, vmItems);

  let form:XgEditForm;
  onMount(async()=> {
    crudE.init(crudR, form, [imageFile], [mItem]);
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
    vmItems = vmItems;
  }

  //onchange item.Id
  async function onChangeItem(row:any):Promise<void> {
    let item = await _Ajax.getJsonA('/Xp/GetItem', false, {id:row.ItemId});
    _Xp.setItem(row, item);
    vmItems = vmItems;
  }

</script>
