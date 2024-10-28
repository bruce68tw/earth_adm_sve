<XgEditModal {crudE} bind:this={modal} progName="捐贈人聯絡記錄" fnSetVm={()=> vm=vm} width='900px'>
    <FldSendAudit {vm} cols={cols2} /> 
    <XiTextarea {vm} fid='Note' title='聯絡內容' required maxLen={500} {cols} rowsCount={3} />
    <XiText {vm} fid='Result' title='歸納結果' required maxLen={100} {cols} />
    <XiRead value={vm.AuditNote} title='審核意見' {cols} />
    <XiRead value={_Audit.statusName(vm.AuditStatus)} title='審核狀態' {cols} />

    <div class="row">
      <XiRead value={vm.AuditTime} title='審核時間' cols={cols2} custCss />
      <XiRead value={vm.CreatorName} title='建檔人員' cols='2,3' custCss />
    </div>
    <div class="row">
      <XiRead value={vm.SendTime} title='送審時間' cols={cols2} custCss />
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
  import XiRead from '@base/lib/XiRead.svelte'; 
  import _Xp from '@/ts/_Xp';
  import _Audit from '@/ts/_Audit';
  import FldSendAudit from './FldSendAudit.svelte';

  //property
  export let crudR:CrudRead;
  export let donorId:string;

  //variables
  const cols = "3,8";
  const cols2 = "3,3";

  //2.master view-model
  let vm = {
    DonorId: donorId,
    Result: '',
    Note: '',
    _SendAudit: 0,  //important !!
    AuditNote: '?',
    AuditStatus: '',
    AuditTime: '?',
    SendTime: '?',
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);

  let modal:XgEditModal;
  onMount(()=> crudE.init(crudR, modal));

</script>
