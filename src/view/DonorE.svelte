<XgEditModal {crudE} bind:this={form} progName="捐贈人管理" fnSetVm={()=> vm=vm}>
    <!-- 1.set edit fields -->
    <XiText {vm} fid='Name' title='姓名' required maxLen={20} {cols} />
    <XiText {vm} fid='Phone' title='電話' maxLen={10} {cols} />
    <XiText {vm} fid='Email' title='Email' maxLen={100} cols={cols2} />
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
  import _Ajax from '@base/ts/_Ajax';

  //property
  export let crudR:CrudRead;

  //variables
  //let show = false;
  const cols = "3,6";
  const cols2 = "3,8";

  //2.master view-model
  let vm = {
    Name: '',
    Phone: '',
    Email: '',
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);

  let form:XgEditModal;
  onMount(()=> crudE.init(crudR, form));

</script>
