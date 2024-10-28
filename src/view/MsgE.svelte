<XgEditForm {crudE} bind:this={form} progName="民眾留言維護" fnSetVm={()=>vm=vm} >
    <XiText {vm} fid='UserName' title='稱謂' required maxLen={30} {cols} />
    <XiText {vm} fid='Phone' title='電話' required maxLen={15} {cols} />
    <XiTextarea {vm} fid='Note' title='捐贈內容' required cols={cols2}
      maxLen={500} rowsCount={3} />

    <XiCheck {vm} fid='IsClose' title='資料狀態' label='結案' {cols} />
    <XiText {vm} fid='CloseReason' title='結案原因' maxLen={100} cols={cols2} />
    
    <div class="row">
      <XiRead value={vm.OwnerName} title='負責人' custCss />
      <XiRead value={vm.Created} title='建檔時間' custCss />
    </div>
    <div class="row">
      <XiRead value={vm.ReviserName} title='修改人員' custCss />
      <XiRead value={vm.Revised} title='修改時間' custCss />
    </div>

</XgEditForm>

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import CrudEdit from '@base/ts/CrudEdit';
  import XgEditForm from '@base/lib/XgEditForm.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import XiTextarea from '@base/lib/XiTextarea.svelte'; 
  import XiCheck from '@base/lib/XiCheck.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 
  import _Xp from '@/ts/_Xp';

  //property
  export let crudR:CrudRead;

  //variables
  const cols = "2,3";
  const cols2 = "2,6";

  //2.master view-model
  let vm = {
    Id: '',
    UserName: '',
    Phone: '',
    Note: '',
    IsClose: 0,
    CloseReason: '',
    OwnerName: '?',
    Created: '?',
    ReviserName: '?',
    Revised: '?',
  };
  let crudE = new CrudEdit(vm);

  let form:XgEditForm;
  onMount(()=> crudE.init(crudR, form));

</script>
