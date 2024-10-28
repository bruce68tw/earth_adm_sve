<XgEditModal {crudE} bind:this={form} progName="物品維護" fnSetVm={()=> vm=vm} width='900px'>
    <!-- 1.set edit fields -->
    <XiSelect {vm} fid='TypeId' title='類別名稱' rows={itemTypes} required {cols} />
    <XiText {vm} fid='Name' title='物品名稱' required maxLen={20} {cols} />
    <XiText {vm} fid='Unit' title='單位' required maxLen={20} cols="3,2" />
    <XiInt {vm} fid='CountAmount' title='計算數量' required cols="3,2" />
    <XiInt {vm} fid='Sort' title='排序' required cols="3,2" />
    <XiCheck {vm} fid='Status' title='資料狀態' label="啟用" cols={col33} />

    <div class='row'>
      <XiInt {vm} fid='PriorAmount' title='前期餘額' edit='C' cols={col33} custCss />
      <XiInt {vm} fid='StockWayAmount' title='在途庫存' edit='' cols={col23} custCss />
    </div>
    <div class='row'>
      <XiInt {vm} fid='StockAmount' title='實際庫存' edit='C' cols={col33} custCss />
      <XiInt {vm} fid='PlanAmount' title='預計出貨' edit='' cols={col23} custCss />
    </div>
    <div class='row'>
      <XiRead value={vm.CreatorName} title='建檔人員' cols={col33} custCss />
      <XiRead value={vm.Created} title='建檔時間' cols={col23} custCss />
    <div>
</XgEditModal>

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import type IdStrDto from '@base/dto/IdStrDto';
  import CrudEdit from '@base/ts/CrudEdit';
  import XgEditModal from '@base/lib/XgEditModal.svelte';
  import XiCheck from '@base/lib/XiCheck.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import XiInt from '@base/lib/XiInt.svelte'; 
  import XiSelect from '@base/lib/XiSelect.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 

  //property
  export let crudR:CrudRead;
  export let itemTypes:IdStrDto[];

  //variables
  const cols = "3,6";
  const col23 = "2,3";
  const col33 = "3,3";

  //2.master view-model
  let vm = {
    TypeId: '',
    Name: '',
    Unit: '',
    CountAmount: 0,
    PriorAmount: 0,
    StockAmount: 0,
    StockWayAmount: 0,
    PlanAmount: 0,
    Sort: 9,
    Status: 0,
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);

  let form:XgEditModal;
  onMount(()=> crudE.init(crudR, form));

</script>
