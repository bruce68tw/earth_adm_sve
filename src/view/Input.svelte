<XgReadForm bind:this={form} progName='入庫單維護'>  
    <div class="row">
        <XiText {vm} fid='Id' title='入庫單號' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiSelect {vm} fid='AuditStatus' title='審核狀態' rows={_Audit.auditStatus} />

    <!-- create button -->
    <div class='xgb-box'>
        <XgCreate fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable {crudR} {cols} bind:this={dt} fnOnBtn={onBtnA} />
</XgReadForm>  

<!-- edit modal -->
<InputE {crudR} />    

<script lang='ts'>
    import { onMount } from 'svelte';
    import type RitemDto from '@base/dto/RitemDto'; 
    import CrudRead from '@base/ts/CrudRead';
    import XgReadForm from '@base/lib/XgReadForm.svelte'; 
    import XgDatatable from '@base/lib/XgDatatable.svelte'; 
    import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
    import XgCreate from '@base/lib/XbCreate.svelte'; 
    import XiText from '@base/lib/XiText.svelte'; 
    import XiSelect from '@base/lib/XiSelect.svelte'; 
    import InputE from './InputE.svelte'; 
    import _Xp from '@/ts/_Xp';
    import _Audit from '@/ts/_Audit';
    import _Ajax from '@base/ts/_Ajax';
    import _Str from '@base/ts/_Str';
    import _Tool from '@base/ts/_Tool';
    import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'Input';
  let authStr = _XgProg.getAuthStr(ctrl);
  let rowAuths = _XgProg.getRowAuths(authStr);

  //3.query form view-model
  let vm = {
    Id: '',
    AuditStatus: ''
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'入庫單號', fid:'Id' }, 
    _Xp.dtAuditStatus(),
    { title:'送審時間', fid:'SendTime' }, 
    //_Xp.dtTxUpTime(),
    { title:'上鏈時間', fid:'_swap', Status:rowAuths[0], render:(row)=> 
      (!_Xp.hasEther || row.AuditStatus != 'Y') ? '' :
      row.TxUpTime == '' ? 'b:上鏈' : 'f:TxUpTime' },
    { title:'建檔人員', fid:'CreatorName' }, 
    { title:'維護', fid:'_crud', Status:rowAuths, render:(row)=> _Audit.crudFun(row) },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));
 
  //上鏈
  async function onBtnA(data:string, row:any):Promise<void> {
    let msg = await _Ajax.getStrA('/Input/UpBlock', false, {key:row.Id});
    await _Xp.dtCheckErrorA(dt, msg, '上傳區塊鏈完成。');
  }

</script>
