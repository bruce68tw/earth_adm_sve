<XgReadForm bind:this={form} progName='聯絡記錄審核'>      
    <div class="row">
        <XiText {vm} fid='DonorName' title='捐贈人姓名' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiSelect {vm} fid='AuditStatus' title='審核狀態' rows={_Audit.auditStatus} />
    <div class='mb-2'/>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable {crudR} {cols} bind:this={dt} fnOnBtn={onBtnA} style='margin-top:15px !important;' />

    <!-- edit modal -->
    <DonorTalkAuditE {crudR} />    
</XgReadForm>

<script lang='ts'>
    import { onMount } from 'svelte';
    import type RitemDto from '@base/dto/RitemDto'; 
    import CrudRead from '@base/ts/CrudRead';
    import XgReadForm from '@base/lib/XgReadForm.svelte'; 
    import XgDatatable from '@base/lib/XgDatatable.svelte'; 
    import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
    import XiText from '@base/lib/XiText.svelte'; 
    import XiSelect from '@base/lib/XiSelect.svelte'; 
    import DonorTalkAuditE from './DonorTalkAuditE.svelte'; 
    import _Array from '@base/ts/_Array';
    import _XpCode from '@/ts/_XpCode';
    import _Xp from '@/ts/_Xp';
    import _Audit from '@/ts/_Audit';
    import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'DonorTalkAudit';
  let rowAuths = _XgProg.getRowAuths(_XgProg.getAuthStr(ctrl));

  //let audits = _XpCode.auditStatuses();
  //3.query form view-model
  let vm = {
    DonorName: '',
    DonorPhone: '',
    AuditStatus: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'捐贈人', fid:'DonorName' }, 
    //{ title:'電話', fid:'DonorPhone' }, 
    { title:'歸納結果', fid:'Result' }, 
    { title:'審核狀態', fid:'AuditStatus', sortFid:'AuditStatus', render:(row)=> _Audit.statusNameR(row)}, 
    { title:'審核時間', fid:'_swap', Status:rowAuths[0], render:(row)=> _Audit.swapBtnTime(row) }, 
    { title:'建檔時間', fid:'Created', sortFid:'Created' }, 
    { title:'維護', fid:'_crud', data:'V', Status:rowAuths },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));
 
  async function onBtnA(data:string, row:any):Promise<void> {
    await crudR.onUpdateA(row.Id);
  }
</script>