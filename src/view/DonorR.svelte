<XgReadForm bind:this={form} progName='捐贈人&聯絡記錄'> 
    <div class="row">
        <XiText {vm} fid='Name' title='捐贈人姓名' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiText {vm} fid='Phone' title='捐贈人電話' />

    <!-- create button -->
    <div class='xgb-box'>
        <XgCreate label='新增捐贈人' fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable {crudR} {cols} bind:this={dt} fnOnBtn={onBtn} />
</XgReadForm>

<!-- edit modal -->
<DonorE {crudR} />    

<script lang='ts'>
  import { onMount } from 'svelte';
  import type RitemDto from '@base/dto/RitemDto'; 
  import CrudRead from '@base/ts/CrudRead';
  import XgReadForm from '@base/lib/XgReadForm.svelte'; 
  import XgDatatable from '@base/lib/XgDatatable.svelte'; 
  import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
  import XgCreate from '@base/lib/XbCreate.svelte'; 
  import XiText from '@base/lib/XiText.svelte'; 
  import DonorE from './DonorE.svelte'; 
  import _XgProg from '@base/ts/_XgProg';

  //property
  export let fnOnSwap:Function;

  const ctrl = 'Donor';
  let authStr = _XgProg.getAuthStr(ctrl);
  let rowAuths = _XgProg.getRowAuths(authStr);

  //3.query form view-model
  let vm = {
    Name: '',
    Phone: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'捐贈人姓名', fid:'Name', sortFid:'Name' }, 
    { title:'捐贈人電話', fid:'Phone', sortFid:'Phone' }, 
    { title:'聯絡記錄', fid:'_btn', data:'開啟' }, 
    { title:'建檔時間', fid:'Created' }, 
    { title:'維護', fid:'_crud', data:'UDV', Status:rowAuths },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));

  function onBtn(data:string, row:any){
    fnOnSwap(false, row);  //show DonorTalk
  }
</script>
