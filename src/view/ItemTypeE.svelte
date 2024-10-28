<XgEditModal {crudE} bind:this={form} progName="物品類別維護" fnSetVm={()=> vm=vm}>
    <!-- 1.set edit fields -->
    <XiText {vm} fid='Name' title='類別名稱' required maxLen={20} {cols} />
    <XiText {vm} fid='CountName' title='計量名稱' required maxLen={20} {cols} />
    <XiInt {vm} fid='Sort' title='排序' required cols="3,2" />
    <XiCheck {vm} fid='Status' title='資料狀態' label="啟用" {cols} />
    <XiRead value={vm.CreatorName} title='建檔人員' {cols} />
    <XiRead value={vm.Created} title='建檔時間' {cols} />
</XgEditModal>

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import CrudEdit from '@base/ts/CrudEdit';
  import XgEditModal from '@base/lib/XgEditModal.svelte';
  import XiCheck from '@base/lib/XiCheck.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 
  import XiInt from '@base/lib/XiInt.svelte';

  //property
  export let crudR:CrudRead;

  //variables
  const cols = '3,8';

  //2.master view-model
  let vm = {
    Name: '',
    CountName: '',
    Status: 1,
    Sort: 9,
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);

  let form:XgEditModal;
  onMount(()=> crudE.init(crudR, form));

</script>
