<XgReadForm bind:this={form} progName='物品類別維護'>    
    <!-- 1.set query fields, onReset return vm才能同步view -->
    <div class="row">
        <XiText {vm} fid='Name' title='類別名稱' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>

    <!-- create button -->
    <div class='xgb-box'>
        <XgCreate fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable {crudR} {cols} bind:this={dt} />
</XgReadForm>  

<!-- edit modal -->
<ItemTypeE {crudR} />

<script lang='ts'>
  import { onMount } from 'svelte';
  import type RitemDto from '@base/dto/RitemDto'; 
  import CrudRead from '@base/ts/CrudRead';
  import XgReadForm from '@base/lib/XgReadForm.svelte'; 
  import XgDatatable from '@base/lib/XgDatatable.svelte'; 
  import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
  import XgCreate from '@base/lib/XbCreate.svelte'; 
  import XiText from '@base/lib/XiText.svelte'; 
  import ItemTypeE from './ItemTypeE.svelte'; 
  import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'ItemType';
  let authStr = _XgProg.getAuthStr(ctrl);
  let rowAuths = _XgProg.getRowAuths(authStr);

  //3.query form view-model
  let vm = {
    Name: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'類別名稱', fid:'Name', sortFid:'a.Name' }, 
    { title:'資料狀態', fid:'Status', sortFid:'a.Status', render:(row)=> crudR.dtStatus(row)}, 
    { title:'計量名稱', fid:'CountName' }, 
    { title:'排序', fid:'Sort', sortFid:'a.Sort' }, 
    { title:'建檔人員', fid:'CreatorName' }, 
    { title:'建檔時間', fid:'Created' }, 
    { title:'維護', fid:'_crud', data:'UDV', Status:rowAuths },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));

</script>
