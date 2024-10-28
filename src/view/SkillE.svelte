<XgEditModal {crudE} bind:this={modal} progName="志工專長維護" fnSetVm={()=> vm=vm} >
    <XiText {vm} fid='Name' title='專長名稱' required maxLen={20} {cols} />
    <XiRead value={vm.CreatorName} title='建檔人員' {cols} />
    <XiRead value={vm.Created} title='建檔時間' {cols} />
</XgEditModal>

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import CrudEdit from '@base/ts/CrudEdit';
  import XgEditModal from '@base/lib/XgEditModal.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 

  //property
  export let crudR:CrudRead;

  //variables
  const cols = "3,8";

  //2.master view-model
  let vm = {
    Name: '',
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);

  let modal:XgEditModal;
  onMount(()=> crudE.init(crudR, modal));

</script>
