<XgReadForm bind:this={form} progName='出貨後確認'>  
    <div class="row">
        <XiText {vm} fid='Id' title='出貨單號' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <div class='mt-3'></div>
    <XgDatatable {crudR} {cols} bind:this={dt} fnOnBtn={onBtnA} />
</XgReadForm>  

<!-- edit modal -->
<OutputCheckE {crudR} />    

<script lang='ts'>
    import { onMount } from 'svelte';
    import type RitemDto from '@base/dto/RitemDto'; 
    import CrudRead from '@base/ts/CrudRead';
    import XgReadForm from '@base/lib/XgReadForm.svelte'; 
    import XgDatatable from '@base/lib/XgDatatable.svelte'; 
    import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
    import XiText from '@base/lib/XiText.svelte'; 
    import OutputCheckE from './OutputCheckE.svelte'; 
    import _XpCode from '@/ts/_XpCode';
    import _Xp from '@/ts/_Xp';
    import _Date from '@base/ts/_Date';
    import _Ajax from '@base/ts/_Ajax';
    import _Tool from '@base/ts/_Tool';
    import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'OutputCheck';
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
    { title:'實際出貨時間', fid:'OutputTime' }, 
    { title:'確認時間', fid:'_swap', Status:rowAuths[0], render:(row)=> 
      (row.OutputStatus==1 && row.CheckTime=='') ? 'b:確認': 'f:CheckTime' }, 
    { title:'確認人員', fid:'CheckerName' }, 
    { title:'上鏈時間', fid:'_swap', Status:rowAuths[0], render:(row)=> 
      (!_Xp.hasEther || row.OutputStatus==0 || row.CheckTime=='') ? '' :
      row.TxUpTime == '' ? 'b:上鏈' : 'f:TxUpTime' },
    { title:'建檔人員', fid:'CreatorName' }, 
    { title:'維護', fid:'_crud', data:'V' },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));
 
  //包含2個按鈕
  async function onBtnA(data:string, row:any):Promise<void> {
    if (data == '確認'){
      await crudR.onUpdateA(row.Id);
    } else if(data == '上鏈'){
      let msg = await _Ajax.getStrA('/OutputCheck/UpBlock', false, {key:row.Id});
      await _Xp.dtCheckErrorA(dt, msg, '上傳區塊鏈完成。');
    }
  }

</script>
