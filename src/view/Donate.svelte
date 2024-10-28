<XgReadForm bind:this={form} progName='捐贈單維護'>  
    <div class="row">
        <XiText {vm} fid='Id' title='捐贈單號' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiText {vm} fid='DonorName' title='捐贈人姓名' />
    <XiText {vm} fid='DonorPhone' title='捐贈人電話' />
    <XiSelect {vm} fid='AuditStatus' title='審核狀態' rows={_Audit.auditStatus} />
    <XiSelect {vm} fid='InputStatus' title='入庫狀態' rows={_Xp.inputStatus} />

    <!-- create button -->
    <div class='xgb-box'>
        <XgCreate fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable {crudR} {cols} bind:this={dt} />
</XgReadForm>  

<!-- edit modal -->
<DonateE {crudR} />    

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
    import DonateE from './DonateE.svelte'; 
    import _XpCode from '@/ts/_XpCode';
    import _Xp from '@/ts/_Xp';
    import _Audit from '@/ts/_Audit';
    import _Code from '@base/ts/_Code';
    import _XgProg from '@base/ts/_XgProg';

  //auth variables
  const ctrl = 'Donate';
  let authStr = _XgProg.getAuthStr(ctrl);
  let rowAuths = _XgProg.getRowAuths(authStr);

  //3.query form view-model
  let vm = {
    Id: '',
    DonorName: '',
    DonorPhone: '',
    AuditStatus: '',
    InputStatus: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [    
    { title:'捐贈單號', fid:'Id' }, 
    { title:'捐贈說明', fid:'Title' }, 
    { title:'審核狀態', fid:'AuditStatus', sortFid:'AuditStatus', render:(row)=> _Audit.statusNameR(row)}, 
    { title:'入庫狀態', fid:'InputStatus', sortFid:'InputStatus', render:(row)=> _Xp.inputStatusName(row.InputStatus)}, 
    { title:'建檔人員', fid:'CreatorName' }, 
    { title:'維護', fid:'_crud', Status:rowAuths, render:(row)=> _Audit.crudFun(row) },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));

</script>
