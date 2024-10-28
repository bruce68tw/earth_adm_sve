<XgReadForm bind:this={form} progName='角色維護'>
  <div class="row">
      <XiText {vm} fid='Name' title='角色名稱' custCss />
      <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
  </div>

  <!-- create button -->
  <div class='xgb-box'>
      <XgCreate fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
  </div>

  <!-- datatable, set fnOnBtn if any -->
  <XgDatatable {crudR} {cols} bind:this={dt} />
</XgReadForm>

<!-- edit form -->
<XpRoleE {crudR} />

<script lang='ts'>
  import { onMount } from 'svelte';
  import type RitemDto from '@base/dto/RitemDto'; 
  import CrudRead from '@base/ts/CrudRead';
  import XgReadForm from '@base/lib/XgReadForm.svelte'; 
  import XgDatatable from '@base/lib/XgDatatable.svelte'; 
  import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
  import XgCreate from '@base/lib/XbCreate.svelte'; 
  import XiText from '@base/lib/XiText.svelte'; 
  import XpRoleE from './XpRoleE.svelte';
  import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'XpRole';
  let authStr = _XgProg.getAuthStr(ctrl);
  let rowAuths = _XgProg.getRowAuths(authStr);

  //3.query form view-model
  let vm = {
    Name: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'角色名稱', fid:'Name' }, 
    { title:'排序', fid:'Sort', sortFid:'Sort' }, 
    { title:'維護', fid:'_crud', data:'UDV', Status:rowAuths },
  ];

  //onMount
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));

</script>
