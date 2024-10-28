<XgReadForm bind:this={form} progName='活動單審核'>  
    <div class="row">
        <XiText {vm} fid='Name' title='活動名稱' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiSelect {vm} fid='AuditStatus' title='審核狀態' rows={_Audit.auditStatus} />

    <!-- datatable, set fnOnBtn if any -->
    <div class='mt-3'></div>
    <XgDatatable {crudR} {cols} bind:this={dt} fnOnBtn={onBtnA} />
</XgReadForm>  

<!-- edit modal -->
<ActAuditE {crudR} />    

<script lang='ts'>
  import { onMount } from 'svelte';
  import type RitemDto from '@base/dto/RitemDto'; 
  import CrudRead from '@base/ts/CrudRead';
  import XgReadForm from '@base/lib/XgReadForm.svelte'; 
  import XgDatatable from '@base/lib/XgDatatable.svelte'; 
  import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
  import XiText from '@base/lib/XiText.svelte'; 
  import XiSelect from '@base/lib/XiSelect.svelte'; 
  import ActAuditE from './ActAuditE.svelte'; 
  import _XpCode from '@/ts/_XpCode';
  import _Xp from '@/ts/_Xp';
  import _Audit from '@/ts/_Audit';
  import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'ActAudit';
  let rowAuths = _XgProg.getRowAuths(_XgProg.getAuthStr(ctrl));

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
    { title:'審核狀態', fid:'AuditStatus', sortFid:'AuditStatus', render:(row)=> _Audit.statusNameR(row)}, 
    { title:'審核時間', fid:'_swap', Status:rowAuths[0], render:(row)=> _Audit.swapBtnTime(row) }, 
    { title:'送審時間', fid:'SendTime' }, 
    //{ title:'建檔時間', fid:'Created', sortFid:'Created' }, 
    { title:'維護', fid:'_crud', data:'V', Status:rowAuths },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));
 
  async function onBtnA(data:string, row:any):Promise<void> {
    await crudR.onUpdateA(row.Id);
  }

</script>
