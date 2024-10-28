<!-- 沒有 Create, Delete 功能 -->
<XgReadForm bind:this={form} progName='盤點單維護'>  
    <div class="row">
        <XiText {vm} fid='Id' title='盤點單號' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable bind:this={dt} {crudR} {cols} fnOnBtn={onBtnA} />
</XgReadForm>  

<!-- edit modal -->
<StockE {crudR} />    

<script lang='ts'>
    import { onMount } from 'svelte';
    import type RitemDto from '@base/dto/RitemDto'; 
    import CrudRead from '@base/ts/CrudRead';
    import XgReadForm from '@base/lib/XgReadForm.svelte'; 
    import XgDatatable from '@base/lib/XgDatatable.svelte'; 
    import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
    import XiText from '@base/lib/XiText.svelte'; 
    import StockE from './StockE.svelte'; 
    import _XpCode from '@/ts/_XpCode';
    import _Xp from '@/ts/_Xp';
    import _Audit from '@/ts/_Audit';
    import _Ajax from '@base/ts/_Ajax';
    import _Str from '@base/ts/_Str';
    import _Tool from '@base/ts/_Tool';
    import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'Stock';
  let rowAuths = _XgProg.getRowAuths(_XgProg.getAuthStr(ctrl));

  //3.query form view-model
  let vm = {
    Id: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'盤點單號', fid:'Id', sortFid:'Id' }, 
    { title:'資料狀態', fid:'Status', sortFid:'a.Status', render:(row)=> crudR.dtStatus(row)}, 
    { title:'更新庫存', fid:'_swap', Status:rowAuths[0], render:(row)=> 
      (row.Status==1 && row.StockTime=='') ? 'b:更新' : 'f:StockTime' },
    { title:'建檔人員', fid:'CreatorName' }, 
    { title:'建檔日期', fid:'Created' }, 
    { title:'維護', fid:'_crud', Status:rowAuths, render:(row)=> row.Status==1 ? 'UV' : 'V' },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));

  //更新庫存Item.StockAmount
  async function onBtnA(data:string, row:any):Promise<void> {
    let msg = await _Ajax.getStrA('/Stock/UpdateItem', false, {key:row.Id});
    await _Xp.dtCheckErrorA(dt, msg, '更新庫存完成，系統已回復到非盤點狀態。');
  }
</script>