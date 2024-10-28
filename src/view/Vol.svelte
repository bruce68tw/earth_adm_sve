<XgReadForm bind:this={form} progName='志工管理'>    
    <!-- 1.set query fields, onReset return vm才能同步view -->
    <div class="row">
        <XiText {vm} fid='Name' title='姓名' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiText {vm} fid='Phone' title='電話' />

    <!-- create button -->
    <div class='xgb-box'>
        <XgCreate fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
    </div>

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable {crudR} {cols} bind:this={dt} fnOnBtn={onBtnA} />
</XgReadForm>

<!-- edit modal -->
<VolE {crudR} />

<script lang='ts'>
  import { onMount } from 'svelte';
  import type RitemDto from '@base/dto/RitemDto'; 
  import CrudRead from '@base/ts/CrudRead';
  import XgReadForm from '@base/lib/XgReadForm.svelte'; 
  import XgDatatable from '@base/lib/XgDatatable.svelte'; 
  import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
  import XgCreate from '@base/lib/XbCreate.svelte'; 
  import XiText from '@base/lib/XiText.svelte'; 
  import VolE from './VolE.svelte'; 
  import _XgProg from '@base/ts/_XgProg';
  import _Xp from '@/ts/_Xp';
  import _Ajax from '@base/ts/_Ajax';
  import _Tool from '@base/ts/_Tool';

  const ctrl = 'Vol';
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
    { title:'姓名', fid:'Name', sortFid:'Name' }, 
    { title:'電話', fid:'Phone', sortFid:'Phone' }, 
    { title:'資料狀態', fid:'Status', sortFid:'Status', render:(row)=> crudR.dtStatus(row)}, 
    { title:'NFT序號', fid:'_swap', Status:rowAuths[0], render:(row)=> 
      (!_Xp.hasEther || row.Status != '1') ? '' :
      (row.NftTokenId == null || row.NftTokenId <= 0) ? 'b:產生NFT' : 'f:NftTokenId' },
    { title:'建檔時間', fid:'Created' }, 
    { title:'維護', fid:'_crud', data:'UDV', Status:rowAuths },
  ];

  //system event
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));

  //產生NFT
  async function onBtnA(data:string, row:any):Promise<void> {
    let msg = await _Ajax.getStrA('/Vol/GenNft', false, {key:row.Id}, true);
    await _Xp.dtCheckErrorA(dt, msg, '產生NFT完成。');
  }

</script>
