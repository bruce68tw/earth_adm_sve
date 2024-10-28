<XgReadForm bind:this={form} progName='捐贈單審核'>  
    <div class="row">
        <XiText {vm} fid='Id' title='捐贈單號' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiSelect {vm} fid='AuditStatus' title='審核狀態' rows={_Audit.auditStatus} />

    <!-- datatable, set fnOnBtn if any -->
    <div class='mt-3'></div>
    <XgDatatable {crudR} {cols} bind:this={dt} fnOnBtn={onBtn} />
</XgReadForm>  

<!-- edit modal -->
<DonateAuditE {crudR} />    

<script lang='ts'>
    import { onMount } from 'svelte';
    import type RitemDto from '@base/dto/RitemDto'; 
    import CrudRead from '@base/ts/CrudRead';
    import XgReadForm from '@base/lib/XgReadForm.svelte'; 
    import XgDatatable from '@base/lib/XgDatatable.svelte'; 
    import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
    import XiText from '@base/lib/XiText.svelte'; 
    import XiSelect from '@base/lib/XiSelect.svelte'; 
    import DonateAuditE from './DonateAuditE.svelte'; 
    import _XpCode from '@/ts/_XpCode';
    import _Xp from '@/ts/_Xp';
    import _Audit from '@/ts/_Audit';
    import _XgProg from '@base/ts/_XgProg';

  //auth variables
  const ctrl = 'DonateAudit';
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
    { title:'捐贈單號', fid:'Id' }, 
    { title:'捐贈說明', fid:'Title' }, 
    { title:'審核狀態', fid:'AuditStatus', sortFid:'AuditStatus', render:(row)=> _Audit.statusNameR(row)}, 
    { title:'審核時間', fid:'_swap', Status:rowAuths[0], render:(row)=> _Audit.swapBtnTime(row) }, 
    { title:'建檔時間', fid:'Created', sortFid:'Created' }, 
    { title:'維護', fid:'_crud', data:'V', Status:rowAuths },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));
 
  //審核
  function onBtn(data:string, row:any){
    crudR.onUpdateA(row.Id);
  }

</script>
