<!-- 沒有 Create, Delete 功能 -->
<XgReadForm bind:this={form} progName='系統功能維護'>
  <div class="row">
      <XiText {vm} fid='Code' title='功能代碼' custCss />
      <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
  </div>
  <XiText {vm} fid='Name' title='功能名稱' />
  <div class='mb-2'/>

  <!-- datatable, set fnOnBtn if any -->
  <XgDatatable {crudR} {cols} bind:this={dt} />
</XgReadForm>

<!-- edit form -->
<XpProgE {crudR} />

<script lang='ts'>
    import { onMount } from 'svelte';
    import type RitemDto from '@base/dto/RitemDto'; 
    import CrudRead from '@base/ts/CrudRead';
    import XgReadForm from '@base/lib/XgReadForm.svelte'; 
    import XgDatatable from '@base/lib/XgDatatable.svelte'; 
    import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
    import XiText from '@base/lib/XiText.svelte'; 
    import XpProgE from './XpProgE.svelte';
    import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'XpProg';
  let rowAuths = _XgProg.getRowAuths(_XgProg.getAuthStr(ctrl));

  //3.query form view-model
  let vm = {
    Code: '',
    Name: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'功能代碼', fid:'Code', sortFid:'Code' }, 
    { title:'功能名稱', fid:'Name', sortFid:'Name' }, 
    { title:'Url', fid:'Url' }, 
    { title:'排序', fid:'Sort', sortFid:'Sort' }, 
    { title:'維護', fid:'_crud', data:'UV', Status:rowAuths },
  ];

  //onMount
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));

</script>
