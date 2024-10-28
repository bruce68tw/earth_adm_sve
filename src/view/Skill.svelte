<XgReadForm bind:this={form} progName='志工專長維護'>    
    <!-- 1.set query fields -->
    <div class="row">
        <XiText {vm} fid='Name' title='專長名稱' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>

    <!-- create button -->
    <div class='xgb-box'>
        <XgCreate fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable {crudR} {cols} bind:this={dt} />
</XgReadForm>

<!-- edit modal -->
<SkillE {crudR} />

<script lang='ts'>
    import { onMount } from 'svelte';
    import type RitemDto from '@base/dto/RitemDto'; 
    import CrudRead from '@base/ts/CrudRead';
    import XgReadForm from '@base/lib/XgReadForm.svelte'; 
    import XgDatatable from '@base/lib/XgDatatable.svelte'; 
    import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
    import XgCreate from '@base/lib/XbCreate.svelte'; 
    import XiText from '@base/lib/XiText.svelte'; 
    import SkillE from './SkillE.svelte'; 
    import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'Skill';
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
    { title:'專長名稱', fid:'Name', sortFid:'Name' }, 
    { title:'建檔時間', fid:'Created' }, 
    { title:'維護', fid:'_crud', data:'UDV', Status:rowAuths },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));

</script>
