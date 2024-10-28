<XgEditModal {crudE} bind:this={modal} progName="用戶管理" fnSetVm={setVm} fnJsonToChild={jsonToChild} width="600px">
    <!-- 1.set edit fields -->
    <XiText {vm} fid='Account' title='帳號' required {cols} />
    <XiText {vm} fid='Name' title='姓名' required {cols} />

    <!-- vmRoles(此為MUR: mode user-role, 表示多筆部分使用checkbox) -->
    <XgModeUR title='角色' rows={vmRoles} cols={cols2} />    

    <XiText {vm} fid='Phone' title='電話' required maxLen={10} {cols} />
    <XiText {vm} fid='Email' title='Email' maxLen={50} cols={cols2} />
    <XiCheck {vm} fid='Status' title='資料狀態' label="啟用" {cols} />
    <XiRead value={vm.CreatorName} title='建檔人員' {cols} />
    <XiRead value={vm.Created} title='建檔時間' {cols} />
</XgEditModal>

<script lang='ts'>
    import { onMount } from 'svelte';
    import type CrudRead from '@base/ts/CrudRead';
    import CrudEdit from '@base/ts/CrudEdit';
    import XgEditModal from '@base/lib/XgEditModal.svelte';
    import XiText from '@base/lib/XiText.svelte'; 
    import XiCheck from '@base/lib/XiCheck.svelte';
    import XiRead from '@base/lib/XiRead.svelte';
    import XgModeUR from '@base/lib/XgModeUR.svelte';
    import ModeUR from '@base/ts/ModeUR';
    import _Fun from '@base/ts/_Fun';
    import _XpCode from '@/ts/_XpCode';
    import type CheckDto from '@base/dto/CheckDto';
    import _Json from '@base/ts/_Json';

  //property
  export let crudR:CrudRead;  

  const cols = "3,5";
  const cols2 = "3,8";

  //2.edit view-model
  //userRoles 為MUR, 不必設定 EditMany
  let vm = {
    Account: '',
    Name: '',
    Phone: '',
    Email: '',
    Status: 1,
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);
  crudE.fnWhenSave = whenSave;

  //ModeUR
  let vmRoles:CheckDto[] = [];
  let modeUR = new ModeUR('RoleId', vmRoles);

  //串連 crudE/crudR、crudE/modal
  let modal:XgEditModal;
  onMount(async()=> {
    crudE.init(crudR, modal);

    //讀取 MUR roles 清單 for show checkbox
    vmRoles = modeUR.codesToVm(await _XpCode.rolesA());
  });

  function setVm() { 
    vm = vm;
    vmRoles = vmRoles;
  }

  function jsonToChild(json:any){
    vmRoles = modeUR.loadRows(crudE.mode, json.roles);
  }

  function whenSave(json:any):boolean {
    _Json.setChildJson(json, 0, modeUR.getUpdJson(crudE.key));
    return true;
  }

</script>
