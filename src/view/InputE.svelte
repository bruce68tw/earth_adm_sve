<XgEditForm {crudE} bind:this={form} progName="入庫單維護" fnSetVm={setVm}>
    <div class="row">
      <!--<XiRead value={vm.Id} title='入庫單號' {cols} custCss />-->
      <div class="col-md-2 xi-label">入庫單號</div>
      <div class="col-md-3">
        <div class="xi-read d-inline-block">{vm.Id}</div>
        {#if crudE.mode != 'C'}
          <!-- if 條件無作用 !! -->
          <button type='button' class='btn btn-primary' on:click={onTxA} disabled={!txStatus}>區塊鏈</button>
        {/if}
      </div>
    
      <FldSendAudit {vm} {cols} custCss />        
    </div>

    <XiText {vm} fid='Note' title='內容說明' maxLen={100} required cols="2,6" />
    <div class='row'>
      <XiKeyModal bind:this={fldDonateId} {vm} fid='DonateId' fname='DonateId'
        title='捐贈單' required fnOnOpen={()=> modalDonate.open()} cols="2,2" custCss />
      <div class='col-md-6 xg-tail'>{vm.DonateTitle}</div>
    </div>
  
    <div class="row">
      <XiRead value={vm.AuditNote} title='審核意見' {cols} custCss />
      <XiRead value={vm.SendTime} title='送審時間' {cols} custCss />
    </div>
    <div class="row">
      <XiRead value={_Audit.statusName(vm.AuditStatus)} title='審核狀態' {cols} custCss />
      <XiRead value={vm.CreatorName} title='建檔人員' {cols} custCss />
    </div>
    <div class="row">
      <XiRead value={vm.AuditTime} title='審核時間' {cols} custCss />
      <XiRead value={vm.Created} title='建檔時間' {cols} custCss />
    </div>

    <!-- Items -->
    <div class='xgb-box mt-3'>
      <span class="xg-span-label">入庫物品清單</span>
      <XbAddRow fnOnClick={()=> mItem.addRow()} disabled={isView} />
    </div>
    <table class="table xg-table xgt-no-hline" cellspacing="0">
        <thead><tr>
            <XgTh title='物品類別' required />
            <XgTh title='物品名稱' required />
            <th>單位</th>
            <XgTh title='入庫數量' width='150px' required />
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

<!-- modal: getDonors -->
<ModalGetDonate bind:this={modalDonate} action='/Xp/GetDonates' fnOnOk={afterGetDonate} />

<!-- modal: tx block -->
<ModalTx bind:this={modalTx} />

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import type IdStrDto from '@base/dto/IdStrDto';
  import type IdStrExtDto from '@base/dto/IdStrExtDto';
  import CrudEdit from '@base/ts/CrudEdit';
  import EditMany from '@base/ts/EditMany';
  import XgEditForm from '@base/lib/XgEditForm.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import XiSelect from '@base/lib/XiSelect.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 
  import XiInt from '@base/lib/XiInt.svelte';
  import XbAddRow from '@base/lib/XbAddRow.svelte';
  import XblDelete from '@base/lib/XblDelete.svelte';
  import XgTh from '@base/lib/XgTh.svelte';
  import XiKeyModal from '@base/lib/XiKeyModal.svelte';
  import ModalGetDonate from '@/view/ModalGetDonate.svelte';
  import FldSendAudit from './FldSendAudit.svelte';
  import ModalTx from './ModalTx.svelte';
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
  const cols = "2,3";
  let itemTypes:IdStrDto[] = [];
  let items:IdStrExtDto[] = [];   //dynamic filter
  $: isView = (crudE.mode == 'V');
  //Ether txStatus
  $: txStatus = (_Xp.isAudit(vm) && vm.TxUpTime != '');

  //modal & field
  let modalDonate:ModalGetDonate;
  let modalTx:ModalTx;
  let fldDonateId:XiKeyModal;

  //2.master view-model
  let vm = {
    Id: '',
    DonateId: '',
    Note: '',
    _SendAudit: 0,  //important !!
    DonateTitle: '?',
    AuditNote: '?',
    AuditStatus: '?',
    AuditTime: '?',
    SendTime: '?',
    CreatorName: '?',
    Created: '?',
    TxUpTime: '?',
    TxHash: '?',
    TxLog: '?',
  };
  let crudE = new CrudEdit(vm);
  //crudE.fnWhenSave = whenSave;

  //多筆:items
  let vmItems:any[] = [];   //ui
  let mItem = new EditMany({
    ItemId: '',
    Amount: 0,
    TypeId: '?',
    Unit: '?',
    StockAmount: '?',
    StockWayAmount: '?',
    PlanAmount: '?',
  }, vmItems);

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
    vmItems = vmItems;
  }

  //onchange item.Id
  async function onChangeItem(row:any):Promise<void> {
    let item = await _Ajax.getJsonA('/Xp/GetItem', false, {id:row.ItemId});
    _Xp.setItem(row, item);
    vmItems = vmItems;
  }

  //called by ModalGetDonor
  function afterGetDonate(row:any){
    vm.DonateId = row.Id;
    vm.DonateTitle = row.Title;
    fldDonateId.onChange(vm.DonateId);
    vm = vm;
  }  

  //onclick Tx
  async function onTxA():Promise<void>{
    //get db row
    let json = {
      TxHash: vm.TxHash,
      TxLog: vm.TxLog,
      TxLogSource: await _Ajax.getJsonA('/Input/GetTxLogSource', false, { key: vm.Id }),
    };
    modalTx.open(json);
  }
</script>
