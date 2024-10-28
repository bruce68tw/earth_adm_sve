<XgEditForm {crudE} bind:this={form} progName="系統功能維護" fnSetVm={setVm}>
  <XiRead value={vm.Code} title='功能代碼：' {cols} />
  <XiRead value={vm.Name} title='功能名稱：' {cols} />
  <XiRead value={vm.Url} title='Url：' {cols} />
  <XiRead value={vm.Sort} title='排序：' {cols} />
  <XiRead value={_Xp.yesNoName(vm.AuthRow)} title='資料權限範圍：' {cols} />
  <div class="row">
    <div class="col-md-2 xi-label">CRUD：</div>
    <div class="col-md-9 xi-input">
      <XgCheck checked={vm.FunCreate==1} label="新增" disabled />
      <XgCheck checked={vm.FunRead==1} label="查詢" disabled />
      <XgCheck checked={vm.FunUpdate==1} label="修改" disabled />
      <XgCheck checked={vm.FunDelete==1} label="刪除" disabled />
      <XgCheck checked={vm.FunPrint==1} label="列印" disabled />
      <XgCheck checked={vm.FunExport==1} label="匯出" disabled />
      <XgCheck checked={vm.FunView==1} label="檢視" disabled />
    </div>
  </div>

  <!-- XpRoleProg -->
  <div class='xgb-box mt-3'>
    <span class="xg-span-label">角色清單</span>
    <XbAddRow fnOnClick={()=> mRole.addRow()} />
  </div>
  <table class="table xg-table xgt-no-hline" cellspacing="0">
      <thead><tr>
          <XgTh title='角色' required />
          <XgTh title='新增' />
          <XgTh title='查詢' required />
          <XgTh title='修改' required />
          <XgTh title='刪除' required />
          <XgTh title='列印' required />
          <XgTh title='匯出' required />
          <XgTh title='檢視' required />
          <th>維護</th>
      </tr></thead>
      <tbody>
        {#each vmRoles as vm}
          <tr>
              <td><XiSelect {vm} fid='RoleId' rows={roles} required/></td>
              <td><XiCheck {vm} fid='FunCreate'/></td>
              <td><XiSelect {vm} fid='FunRead' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunUpdate' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunDelete' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunPrint' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunExport' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunView' rows={authRanges}/></td>
              <td><XblDelete fnOnClick={()=> mRole.deleteRow(vm.Id)}/></td>  
          </tr>
        {/each}
      </tbody>
  </table>
</XgEditForm>

<script lang='ts'>
    import { onMount } from 'svelte';  
    import type CrudRead from '@base/ts/CrudRead';
    import type IdStrDto from '@base/dto/IdStrDto';
    import CrudEdit from '@base/ts/CrudEdit';
    import EditMany from '@base/ts/EditMany';
    import XgEditForm from '@base/lib/XgEditForm.svelte';
    import XblDelete from '@base/lib/XblDelete.svelte';
    import XbAddRow from '@base/lib/XbAddRow.svelte';
    import XgTh from '@base/lib/XgTh.svelte';
    import XiRead from '@base/lib/XiRead.svelte';
    import XiSelect from '@base/lib/XiSelect.svelte';
    import XiCheck from '@base/lib/XiCheck.svelte';
    import XgCheck from '@base/lib/XgCheck.svelte';
    import _Fun from '@base/ts/_Fun';
    import _Check from '@base/ts/_Check';
    import _XpCode from '@/ts/_XpCode';
    import _Xp from '@/ts/_Xp';
    import _Json from '@base/ts/_Json';

  //property
  export let crudR:CrudRead;

  //ui variables
  const cols = "2,4";
  let roles:IdStrDto[] = [];

  //2.edit master view-model
  let vm = {
    Code: '',
    Name: '',
    AuthRow: 0,
    Url: '',
    Sort: '1',
    FunCreate: 0,
    FunRead: 0,
    FunUpdate: 0,
    FunDelete: 0,
    FunPrint: 0,
    FunExport: 0,
    FunView: 0,
  };
  let crudE = new CrudEdit(vm);
  //crudE.fnWhenSave = whenSave;
  
  //多筆:progRole
  let vmRoles:any[] = [];   //ui
  let mRole = new EditMany({
    RoleId: '',
    FunCreate: 1,
    FunRead: 1,
    FunUpdate: 1,
    FunDelete: 1,
    FunPrint: 1,
    FunExport: 1,
    FunView: 1,    
  }, vmRoles);

  //ui variables
  let authRanges = _XpCode.authRanges();

  //onMount
  let form:XgEditForm;
  onMount(async()=> {
    crudE.init(crudR, form, null, [mRole]);
    roles = await _XpCode.rolesA();
  });

  //on open edit form
  function setVm(){
    vm = vm;
    vmRoles = vmRoles;
  }

</script>
