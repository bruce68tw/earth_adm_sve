<XgReadForm bind:this={form} progName='民眾留言維護'>  
    <div class="row">
        <XiText {vm} fid='UserName' title='稱謂' custCss />
        <XbFindTbar {crudR} funs='FR' fnOnReset={()=> vm=crudR.getReset()} />
    </div>
    <XiText {vm} fid='Phone' title='電話' />
    <XiSelect {vm} fid='IsClose' title='資料狀態' rows={_Xp.closeStatus} />
    <XiSelect {vm} fid='_TakeStatus' title='領取狀態' rows={_Xp.takeStatus} />

    <!-- datatable, set fnOnBtn if any -->
    <XgDatatable bind:this={dt} {crudR} {cols} fnOnBtn={onBtnA} />
</XgReadForm>  

<!-- edit modal -->
<MsgE {crudR} />    

<script lang='ts'>
  import { onMount } from 'svelte';
  import type RitemDto from '@base/dto/RitemDto'; 
  import CrudRead from '@base/ts/CrudRead';
  import XgReadForm from '@base/lib/XgReadForm.svelte'; 
  import XgDatatable from '@base/lib/XgDatatable.svelte'; 
  import XbFindTbar from '@base/lib/XbsFindTbar.svelte'; 
  import XiText from '@base/lib/XiText.svelte'; 
  import XiSelect from '@base/lib/XiSelect.svelte'; 
  import MsgE from './MsgE.svelte'; 
  import _XpCode from '@/ts/_XpCode';
  import _Xp from '@/ts/_Xp';
  import _Audit from '@/ts/_Audit';
  import _Ajax from '@base/ts/_Ajax';
  import _Str from '@base/ts/_Str';
  import _Tool from '@base/ts/_Tool';
  import _XgProg from '@base/ts/_XgProg';

  const ctrl = 'Msg';
  let authStr = _XgProg.getAuthStr(ctrl);
  let rowAuths = _XgProg.getRowAuths(authStr);

  //3.query form view-model
  let vm = {
    UserName: '',
    Phone: '',
    IsClose: '',
    _TakeStatus: '',
  };
  let crudR = new CrudRead(ctrl, vm);  //controller name

  //2.query result columns
  let dt:XgDatatable;
  let cols:RitemDto[] = [
    { title:'留言種類', sortFid:'IsDonate', render:(row)=> _Xp.msgTypeName(row.IsDonate) }, 
    { title:'稱謂', fid:'UserName' }, 
    { title:'電話', fid:'Phone' }, 
    //必須有修改row的權限
    { title:'負責人', fid:'_swap', sortFid:'Owner', Status:rowAuths[0], render:(row)=>
      _Str.isEmpty(row.Owner) ? 'b:領取' : 'f:OwnerName'
    },
    { title:'資料狀態', sortFid:'IsClose', render:(row)=> _Xp.closeStatusName(row.IsClose)}, 
    { title:'建檔日期', fid:'Created' }, 
    //已結案(V), 未領取(V), 已領取(UV), 修改時在後端檢查row權限
    { title:'維護', fid:'_crud', Status:rowAuths, render:(row)=>
      (row.IsClose == 1) ? 'V' :
        _Str.isEmpty(row.Owner) ? 'V' : 'UV'
    },
  ];

  //onMount
  let form:XgReadForm;
  onMount(()=> crudR.initA(form, dt));
 
  //領取
  async function onBtnA(data:string, row:any):Promise<void> {
    let msg = await _Ajax.getStrA('/Msg/Take', false, {key:row.Id});
    await _Xp.dtCheckErrorA(dt, msg, '領取成功。');
  }

</script>
