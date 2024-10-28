<XgEditForm {crudE} bind:this={form} progName="角色維護" fnSetVm={setVm} fnJsonToChild={jsonToChild} >
  <!-- 1.set edit fields -->
  <XiText {vm} fid='Name' title='角色名稱' required maxLen={20} cols='2,3' />
  <XiInt {vm} fid='Sort' title='排序' required cols="2,1" />

  <!-- ModeRU: XpUserRole -->
  <div class='xgb-box mt-3'>
    <span class='xg-span-label'>用戶清單</span>
    <button type="button" class="btn btn-primary" on:click={()=> modalUser.open()}>選取</button>
  </div>
  <table class="table xg-table" cellspacing="0">
      <thead><tr>
          <th>用戶帳號</th>
          <th>用戶姓名</th>
          <th>維護</th>
      </tr></thead>
      <tbody>
        {#each vmUsers as user}
          <tr>
            <td>{user.Account}</td>
            <td>{user.UserName}</td>
            <td><XblDelete fnOnClick={()=> vmUsers=modeRU.deleteRow(user.Id)} /></td>  
          </tr>
        {/each}
      </tbody>
  </table>

  <!-- XpRoleProg -->
  <div class='xgb-box mt-3'>
    <span class="xg-span-label">功能清單</span>
    <XbAddRow fnOnClick={()=> mProg.addRow()} />
  </div>
  <table class="table xg-table xgt-no-hline" cellspacing="0">
      <thead><tr>
          <XgTh title='功能' required />
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
        {#each vmProgs as vm}
          <tr>
              <td><XiSelect {vm} fid='ProgId' rows={progs} required/></td>
              <td><XiCheck {vm} fid='FunCreate'/></td>
              <td><XiSelect {vm} fid='FunRead' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunUpdate' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunDelete' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunPrint' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunExport' rows={authRanges}/></td>
              <td><XiSelect {vm} fid='FunView' rows={authRanges}/></td>
              <td><XblDelete fnOnClick={()=> mProg.deleteRow(vm.Id)}/></td>  
          </tr>
        {/each}
      </tbody>
  </table>
</XgEditForm>

<!-- modal: getUsers -->
<ModalGetUsers bind:this={modalUser} action='/XpRole/GetUsers' fnOnOk={afterGetUsers} />

<script lang='ts'>
    import { onMount } from 'svelte';  
    import type CrudRead from '@base/ts/CrudRead';
    import type IdStrDto from '@base/dto/IdStrDto';
    import CrudEdit from '@base/ts/CrudEdit';
    import EditMany from '@base/ts/EditMany';
    import XgEditForm from '@base/lib/XgEditForm.svelte';
    import ModalGetUsers from './ModalGetUsers.svelte';
    import XblDelete from '@base/lib/XblDelete.svelte';
    import XbAddRow from '@base/lib/XbAddRow.svelte';
    import XgTh from '@base/lib/XgTh.svelte';
    import XiText from '@base/lib/XiText.svelte'; 
    import XiSelect from '@base/lib/XiSelect.svelte';
    import XiCheck from '@base/lib/XiCheck.svelte';
    import XiInt from '@base/lib/XiInt.svelte';
    import ModeRU from '@base/ts/ModeRU';
    import _Fun from '@base/ts/_Fun';
    import _Check from '@base/ts/_Check';
    import _XpCode from '@/ts/_XpCode';
    import _Json from '@base/ts/_Json';

  //property
  export let crudR:CrudRead;

  //ui variables
  let progs:IdStrDto[] = [];
  let modalUser:ModalGetUsers;    
  let authRanges = _XpCode.authRanges();  //auth

  //2.edit master view-model
  let vm = {
    Name: '',
    Sort: 9,
  };
  let crudE = new CrudEdit(vm);
  crudE.fnWhenSave = whenSave;
  
  //多筆:roleUser(ModeRU)
  let vmUsers:any[] = [];           //UI資料: UserId(dataFid),UserName(UI),Account(UI)
  let modeRU = new ModeRU('UserId', vmUsers);

  //多筆:roleProg
  let vmProgs:any[] = [];   //ui
  let mProg = new EditMany({
    ProgId: '',
    FunCreate: 1,
    FunRead: 1,
    FunUpdate: 1,
    FunDelete: 1,
    FunPrint: 1,
    FunExport: 1,
    FunView: 1,    
  }, vmProgs);   //程式 & 初始值

  //onMount
  let form:XgEditForm;
  onMount(async()=> {
    crudE.init(crudR, form, null, [null, mProg]);
    progs = await _XpCode.progsA();
  });

  //on open edit form
  function setVm(){
    vm = vm;
    vmUsers = vmUsers;
    vmProgs = vmProgs;
  }

  function jsonToChild(json:any){
    vmUsers = modeRU.loadRows(_Json.getChildRows(json, 0), crudE.mode);
  }

  //after get users, 資料 XpRoleGetUsers -> XpRoleE
  //called by XpRoleGetUsers
  function afterGetUsers(users:any[]){
      for (let user of users){
        //append if not existed XpRoleE, Id,RoleId由系統自動填入
        if (!_Check.rowExisted(vmUsers, 'UserId', user.Id)){
          vmUsers.push({
            Id: modeRU.getNewNo(),   //for delete row
            UserId: user.Id,
            UserName: user.Name,
            Account: user.Account,
          });
        }
      }

      //re-assign for update ui !!
      vmUsers = vmUsers;
  }

  function whenSave(json:any):boolean {
    _Json.setChildJson(json, 0, modeRU.getUpdJson());
    return true;
  }

</script>
