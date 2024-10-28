<XgReadForm bind:this={form} progName='物品維護'>    
    <!-- 1.set query fields -->
    <div class="row">
        {#await itemTypes then itemTypes}
          <XiSelect {vm} fid='TypeId' rows={itemTypes} title='類別名稱' custCss />
        {/await}
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiText {vm} fid='Name' title='物品名稱' />

    <!-- create button -->
    <div class='xgb-box'>
        <XgCreate fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable {crudR} {cols} bind:this={dt} />
</XgReadForm>

<!-- todo: edit modal 
{#await itemTypes then itemTypes}
{/await}
-->
<ItemE {crudR} itemTypes={itemTypes} />

<script lang='ts'>
  import { onMount } from 'svelte';
  import type RitemDto from '@base/dto/RitemDto'; 
  import type IdStrDto from '@base/dto/IdStrDto';
  import CrudRead from '@base/ts/CrudRead';
  import XgReadForm from '@base/lib/XgReadForm.svelte'; 
  import XgDatatable from '@base/lib/XgDatatable.svelte'; 
  import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
  import XgCreate from '@base/lib/XbCreate.svelte'; 
  import XiText from '@base/lib/XiText.svelte'; 
  import XiSelect from '@base/lib/XiSelect.svelte'; 
  import ItemE from './ItemE.svelte'; 
  import _XpCode from '@/ts/_XpCode';
  import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'Item';
  let authStr = _XgProg.getAuthStr(ctrl);
  let rowAuths = _XgProg.getRowAuths(authStr);
  let itemTypes:IdStrDto[];

  //3.query form view-model
  let vm = {
    TypeId: '',
    Name: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'類別名稱', fid:'TypeName', sortFid:'a.TypeId' }, 
    { title:'物品名稱', fid:'Name', sortFid:'a.Name' }, 
    { title:'單位', fid:'Unit' }, 
    { title:'計算數量', fid:'CountAmount' }, 
    { title:'前期餘額', fid:'PriorAmount' }, 
    { title:'實際庫存', fid:'StockAmount' }, 
    { title:'在途庫存', fid:'StockWayAmount' }, 
    { title:'預計出貨', fid:'PlanAmount' }, 
    { title:'排序', fid:'Sort', sortFid:'a.Sort' },
    { title:'資料狀態', fid:'Status', sortFid:'a.Status', render:(row)=> crudR.dtStatus(row)}, 
    { title:'維護', fid:'_crud', data:'UDV', Status:rowAuths },
  ];

  let form:XgReadForm;
  onMount(async()=> {
    itemTypes = await _XpCode.itemTypesA();
    await crudR.initA(form, dt);
  });

</script>
