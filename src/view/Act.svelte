<XgReadForm bind:this={form} progName='活動單維護'>  
    <div class="row">
        <XiText {vm} fid='Name' title='活動名稱' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiSelect {vm} fid='AuditStatus' title='審核狀態' rows={_Audit.auditStatus} />

    <!-- create button -->
    <div class='xgb-box'>
        <XgCreate fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable bind:this={dt} {crudR} {cols} fnOnBtn={onBtnA} />
</XgReadForm>  

<!-- edit modal -->
<ActE {crudR} />    

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
  import ActE from './ActE.svelte'; 
  import _XpCode from '@/ts/_XpCode';
  import _Xp from '@/ts/_Xp';
  import _Audit from '@/ts/_Audit';
  import _Ajax from '@base/ts/_Ajax';
  import _Str from '@base/ts/_Str';
  import _Tool from '@base/ts/_Tool';
  import _XgProg from '@base/ts/_XgProg';

  //auth variables
  const ctrl = 'Act';
  let authStr = _XgProg.getAuthStr(ctrl);
  let rowAuths = _XgProg.getRowAuths(authStr);

  //3.query form view-model
  let vm = {
    Name: '',
    AuditStatus: ''
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'活動單號', fid:'Id', sortFid:'Id' }, 
    { title:'活動名稱', fid:'Name' }, 
    _Xp.dtAuditStatus(),
    //必須有修改row的權限
    { title:'轉出貨單', fid:'_swap', Status:rowAuths[0], render:(row:any)=>{
      return _Xp.notAudit(row) ? '' : 
        (row.TranStatus==1) ? 'f:TranTime' : 'b:轉出';
    }},
    { title:'建檔人員', fid:'CreatorName' }, 
    { title:'維護', fid:'_crud', Status:rowAuths, render:(row:any)=> _Audit.crudFun(row) },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> { crudR.initA(form, dt)});
 
  //轉出貨單
  async function onBtnA(data:string, row:any):Promise<void> {
    let msg = await _Ajax.getStrA('/Act/TranOutput', false, {key:row.Id});
    await _Xp.dtCheckErrorA(dt, msg, '轉出貨單完成。');
  }

</script>
