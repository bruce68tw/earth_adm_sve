<XgReadForm bind:this={form} progName='倉庫出貨'>  
    <div class="row">
        <XiText {vm} fid='Id' title='出貨單號' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <div class='mt-3'></div>
    <XgDatatable {crudR} {cols} bind:this={dt} fnOnBtn={onBtn} />
</XgReadForm>  

<!-- edit modal -->
<OutputE {crudR} />    

<script lang='ts'>
    import { onMount } from 'svelte';
    import type RitemDto from '@base/dto/RitemDto'; 
    import CrudRead from '@base/ts/CrudRead';
    import XgReadForm from '@base/lib/XgReadForm.svelte'; 
    import XgDatatable from '@base/lib/XgDatatable.svelte'; 
    import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
    import XiText from '@base/lib/XiText.svelte'; 
    import OutputE from './OutputE.svelte'; 
    import _XpCode from '@/ts/_XpCode';
    import _Xp from '@/ts/_Xp';
    import _Date from '@base/ts/_Date';
    import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'Output';
  let rowAuths = _XgProg.getRowAuths(_XgProg.getAuthStr(ctrl));

  //3.query form view-model
  let vm = {
    Id: '',
  };
  let crudR = new CrudRead(ctrl, vm);

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'出貨單號', fid:'Id', sortFid:'Id' }, 
    { title:'預計出貨時間', render:(row)=> _Date.dtsToUi2(row.PlanTime), sortFid:'PlanTime' }, 
    { title:'實際出貨時間', fid:'_swap', Status:rowAuths[0], render:(row)=> row.OutputStatus==1 ? 'f:OutputTime' : 'b:出貨' }, 
    { title:'確認時間', fid:'CheckTime' }, 
    { title:'建檔人員', fid:'CreatorName' }, 
    { title:'維護', fid:'_crud', data:'V', Status:rowAuths },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));
 
  //出貨
  function onBtn(data:string, row:any){
    crudR.onUpdateA(row.Id);
  }

</script>
