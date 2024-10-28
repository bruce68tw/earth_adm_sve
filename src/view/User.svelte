<XgReadForm bind:this={form} progName='用戶管理'>    
    <!-- 1.set query fields -->
    <div class="row">
        <XiText {vm} fid='Account' title='帳號' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiText {vm} fid='Name' title='用戶名稱' />

    <div class='xgb-box'>
        <XgCreate fnOnClick={()=> crudR.onCreate()} disabled={!_XgProg.checkCreate(authStr)}/>
    </div>

    <!-- 2.set act, kid, fnOnBtn(if any) -->
    <XgDatatable {crudR} {cols} bind:this={dt} fnOnBtn={onBtnA}/>
</XgReadForm>

<UserE {crudR} />

<script lang='ts'>
    import { onMount } from 'svelte';
    import type RitemDto from '@base/dto/RitemDto'; 
    import CrudRead from '@base/ts/CrudRead';
    import XgReadForm from '@base/lib/XgReadForm.svelte'; 
    import XgDatatable from '@base/lib/XgDatatable.svelte'; 
    import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
    import XgCreate from '@base/lib/XbCreate.svelte'; 
    import XiText from '@base/lib/XiText.svelte'; 
    import UserE from './UserE.svelte'; 
    import _Ajax from '@base/ts/_Ajax';
    import _Tool from '@base/ts/_Tool';
    import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'User';
  let authStr = _XgProg.getAuthStr(ctrl);
  let rowAuths = _XgProg.getRowAuths(authStr);

  //4.query view-model
  let vm = {
    Account: '',
    Name: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //3.datatable & columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'帳號', fid:'Account', sortFid:'u.Account', tip:'內容為英數字' },
    { title:'用戶名稱', fid:'Name', sortFid:'u.Name' }, 
    { title:'資料狀態', fid:'Status', sortFid:'a.Status', render:(row)=> crudR.dtStatus(row)}, 
    { title:'清空密碼', fid:'_btn', data:'清空', Status:rowAuths[0]}, 
    { title:'維護', fid:'_crud', data:'UDV', width:'80px', Status:rowAuths},
  ];

  //system event, 只會在開啟查詢畫面載入一次
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));

  //清空密碼
  async function onBtnA(data:string, row:any):Promise<void> {
    let msg = await _Ajax.getStrA('/User/ResetPwd', false, {key:row.Id});
    if (msg === null) return;
    _Tool.msg(msg || '清空密碼完成。');
  }

</script>
