<XgEditModal {crudE} bind:this={modal} progName="聯絡記錄審核" width='900px' fnSetVm={()=> vm=vm} 
  showMode={false}>
    <XiRead value={vm.DonorName} title='捐贈人' {cols} />
    <XiTextarea {vm} fid='Note' title='聯絡內容' edit='' required {cols} rowsCount={3} />
    <XiText {vm} fid='Result' title='歸納結果' edit='' required {cols} />
    <XiText {vm} fid='AuditNote' title='審核意見' {cols} />
    <XiSelect {vm} fid='AuditStatus' title='審核狀態' rows={_XpCode.auditActs()} cols='3,2' required />

    <div class="row">
      <XiRead value={vm.AuditTime} title='審核時間' cols='3,3' custCss />
      <XiRead value={vm.CreatorName} title='建檔人員' cols='2,3' custCss />
    </div>
    <div class="row">
      <XiRead value={vm.SendTime} title='送審時間' cols='3,3' custCss />
      <XiRead value={vm.Created} title='建檔時間' cols='2,3' custCss />
    </div>
</XgEditModal>

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import CrudEdit from '@base/ts/CrudEdit';
  import XgEditModal from '@base/lib/XgEditModal.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import XiTextarea from '@base/lib/XiTextarea.svelte'; 
  import XiSelect from '@base/lib/XiSelect.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 
  import _Ajax from '@base/ts/_Ajax';
  import _XpCode from '@/ts/_XpCode';

  //property
  export let crudR:CrudRead;

  //variables
  const cols = "3,8";

  //2.master view-model
  let vm = {
    DonorName: '',
    Result: '',
    Note: '',
    AuditNote: '',
    AuditStatus: '',
    CreatorName: '?',
    Created: '?',
    SendTime: '',
    AuditTime: '',
  };
  let crudE = new CrudEdit(vm);

  let modal:XgEditModal;
  onMount(()=> crudE.init(crudR, modal));

</script>
