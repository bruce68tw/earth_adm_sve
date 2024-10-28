<!-- 設定活動單與工作內容 -->
<XgEditModal {crudE} bind:this={modal} progName="設定活動單與工作內容" width='900px' fnSetVm={()=> vm=vm} 
      showMode={false} fnOnYes={onYes}>
    <XiKeyModal bind:this={fldActId} {vm} fid='ActId' fname='ActId' title='活動單號' 
      fnOnOpen={()=> modalAct.open()} required cols='3,4' />

    <XiRead value={vm.ActName} title='活動名稱' {cols} />
    <XiTextarea {vm} fid='Note' title='工作內容' rowsCount={5} maxLen={500} required {cols} />
</XgEditModal>

<!-- modal: getDonors -->
<ModalGetAct bind:this={modalAct} action='/Xp/GetActs' fnOnSelect={onSelectAct} />

<script lang='ts'>
  import { onMount } from 'svelte';  
  import ModalGetAct from './ModalGetAct.svelte'; 
  import XgEditModal from '@base/lib/XgEditModal.svelte';
  import XiTextarea from '@base/lib/XiTextarea.svelte';
  import XiRead from '@base/lib/XiRead.svelte';
  import XiKeyModal from '@base/lib/XiKeyModal.svelte';
  import _VM from '@base/ts/_VM';
  import CrudEdit from '@base/ts/CrudEdit';

  //property
  export let fnOnYes:Function;

  //ui variables
  const cols = "3,8";
  //modal & field
  let modalAct:ModalGetAct;
  let fldActId:XiKeyModal;

  //2.master view-model
  let vm = {
    ActId: '',
    ActName: '?',
    Note: '',
  };
  let crudE = new CrudEdit(vm);

  let modal:XgEditModal;
  onMount(()=> crudE.init(null, modal));

  //包含crudEdit onCreate,onUpdateA,onViewA 功能
  export function open(nowMode:string, json:any = null){ 
    if (nowMode == 'C')
      crudE.onCreate();
    else  //U and V
      crudE.openByModeUV(nowMode, json.Id, json);

    //vm = vm;  //for render UI
  }

  function onYes(){ 
    if (!_VM.validRow(vm)) return false;

    modal.close();
    fnOnYes(vm);
  }

  //called by ModalGetDonor
  function onSelectAct(row:any){
    vm.ActId = row.Id;
    vm.ActName = row.Name;
    fldActId.onChange(vm.ActId);
    vm = vm;
  }
</script>
