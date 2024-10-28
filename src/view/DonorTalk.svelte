<!-- DonorTalk 為 DonorR 的子畫面, 權限prog為 Donor -->
<XgReadForm bind:this={form} progName={`捐贈人聯絡記錄-${donor.Name}`}> 
  <!--
  <XgProgPath names={[`捐贈人聯絡記錄-${donor.Name}`]} block />
  -->
  <div class="xg-prog mt-3">
      <!-- create button, 需要 update 權限 -->
      <div class='xgb-box'>
          <XgCreate label='新增記錄' fnOnClick={()=> crudR.onCreate()} disabled={!rowAuths[0]}/>
          <button class='btn btn-primary' on:click={()=> fnOnSwap('R')}>回功能畫面</button>
      </div>

      <!-- datatable, set fnOnBtn if any -->
      <XgDatatable {crudR} {cols} bind:this={dt} />
  </div>  
</XgReadForm>

<!-- edit modal -->
<DonorTalkE {crudR} donorId={donor.Id} />    

<script lang='ts'>
  import { onMount } from 'svelte';
  import type RitemDto from '@base/dto/RitemDto'; 
  import CrudRead from '@base/ts/CrudRead';
  import XgDatatable from '@base/lib/XgDatatable.svelte'; 
  import XgCreate from '@base/lib/XbCreate.svelte'; 
  import DonorTalkE from './DonorTalkE.svelte'; 
  import XgReadForm from '@base/lib/XgReadForm.svelte';
  import _XpCode from '@/ts/_XpCode';
  import _Xp from '@/ts/_Xp';
  import _Audit from '@/ts/_Audit';
  import _XgProg from '@base/ts/_XgProg';

  //property
  export let fnOnSwap:Function;
  export let donor:any;   //donor row

  //ctrl is Donor not DonorTalk !!
  let rowAuths = _XgProg.getRowAuths(_XgProg.getAuthStr('Donor'));

  /*
  //3.query form view-model
  let vm = {
    DonorId: key,
  };
  */
  let crudR = new CrudRead('DonorTalk', null);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'歸納結果', fid:'Result' }, 
    { title:'審核狀態', fid:'AuditStatus', sortFid:'a.AuditStatus', render:(row)=> _Audit.statusNameR(row)}, 
    //{ title:'送審時間', fid:'SendTime' }, 
    //{ title:'審核時間', fid:'AuditTime' }, 
    { title:'建檔人員', fid:'CreatorName' },
    { title:'建檔時間', fid:'Created', sortFid:'a.Created' },
    //crud權限為[upd,upd,view] 
    { title:'維護', fid:'_crud', Status:[rowAuths[0],rowAuths[0],rowAuths[2]], render:(row)=> _Audit.crudFun(row) },
  ];

  //findJson為固定
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt, { DonorId: donor.Id }));
 
  /*
  export async function onOpen(key:string):Promise<void> {
    //alert(`data=${data}, key=${key}`);
    vm.DonorId = key;
    await crudR.onFind();
  }
  */

</script>
