<XgEditForm {crudE} bind:this={form} progName="志工管理" fnSetVm={setVm} fnJsonToChild={jsonToChild}>
  <XiText {vm} fid='Name' title='姓名' required maxLen={20} {cols} />

  <!-- skills(ModeUR) -->
  <XgModeUR title='專長' rows={vmSkills} cols={cols2} />

  <XiText {vm} fid='Phone' title='電話' maxLen={10} {cols} />
  <XiFile {vm} fid='PhotoFile' sid='t0_PhotoFile' bind:this={photoFile} crud={crudE} accept='.png,.jpg' 
    title='照片' labelTip='用於產生志工服務 NFT' {cols} />
  <XiText {vm} fid='EtherAddress' title='以太坊公鑰' labelTip='用於產生志工服務 NFT' maxLen={100} cols={cols2} />
  <XiText {vm} fid='Email' title='Email' maxLen={100} cols={cols2} />
  <XiText {vm} fid='Address' title='地址' maxLen={100} cols={cols2} />
  <XiCheck {vm} fid='Status' title='資料狀態' label="啟用" {cols} />
  <XiRead value={vm.CreatorName} title='建檔人員' {cols} />
  <XiRead value={vm.Created} title='建檔時間' {cols} />

  <!-- VolAct -->
  <div class='xgb-box mt-3'>
    <span class="xg-span-label">參與活動清單</span>
    <XbAddRow fnOnClick={()=> form2.open('C')} disabled={isView} />
  </div>
  <table class="table xg-table" cellspacing="0">
      <thead><tr>
          <XgTh title='活動單號' required />
          <th>活動名稱</th>
          <XgTh title='工作內容說明' required />
          <th>維護</th>
      </tr></thead>
      <tbody>
        {#each vmActs as vm}
          <tr>
              <td>{vm.ActId}</td>
              <td>{vm.ActName}</td>
              <td>{vm.Note}</td>
              <td>
                <XbsEditRowFun {vm} fnOnUpdate={onUpdateAct} fnOnView={onViewAct} fnOnDelete={onDeleteAct} {isView} />
              </td>  
          </tr>
        {/each}
      </tbody>  
  </table>
</XgEditForm>

<!-- edit modal -->
<VolE2 bind:this={form2} fnOnYes={onVolE2Yes} />

<script lang='ts'>
  import { onMount } from 'svelte';  
  import type CrudRead from '@base/ts/CrudRead';
  import type CheckDto from '@base/dto/CheckDto';
  import CrudEdit from '@base/ts/CrudEdit';
  import XiCheck from '@base/lib/XiCheck.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import XiFile from '@base/lib/XiFile.svelte'; 
  import XiRead from '@base/lib/XiRead.svelte'; 
  import XgModeUR from '@base/lib/XgModeUR.svelte';
  import XbAddRow from '@base/lib/XbAddRow.svelte';
  import XgTh from '@base/lib/XgTh.svelte';
  import XgEditForm from '@base/lib/XgEditForm.svelte';
  import EditMany from '@base/ts/EditMany';
  import VolE2 from './VolE2.svelte';
  import XbsEditRowFun from '@base/lib/XbsEditRowFun.svelte';
  import ModeUR from '@base/ts/ModeUR';
  import _Fun from '@base/ts/_Fun';
  import _VM from '@base/ts/_VM';
  import _XpCode from '@/ts/_XpCode';
  import _File from '@base/ts/_File';
  import _Json from '@base/ts/_Json';

  //property
  export let crudR:CrudRead;

  //ui variables  
  const cols = "2,3";
  const cols2 = "2,6";
  let photoFile:XiFile;
  $: isView = (crudE.mode == 'V');
  //now edit act row
  let nowActRow:any;

  //2.master view-model
  let vm = {
    Name: '',
    Phone: '',
    Email: '',
    Address: '',
    EtherAddress: '',
    PhotoFile: '',
    Status: 0,
    CreatorName: '?',
    Created: '?',
  };
  let crudE = new CrudEdit(vm);
  crudE.fnWhenSave = whenSave;

  //ModeUR
  let vmSkills:CheckDto[] = [];
  let modeUR = new ModeUR('SkillId', vmSkills);

  //多筆:items
  let vmActs:any[] = [];   //ui view-model
  let mAct = new EditMany({
    ActId: '',
    Note: '',
  }, vmActs);

  let form:XgEditForm;
  let form2:VolE2;
  onMount(async()=> { 
    crudE.init(crudR, form, [photoFile], [null, mAct]);

    //讀取 ModeUR roles 清單 for show checkbox
    vmSkills = modeUR.codesToVm(await _XpCode.skillsA());
  });

  //VolE2 onclick yes button
  export function onVolE2Yes(json:any) { 
    if (crudE.mode == 'C') mAct.addRow(json);
    else _VM.copyRowState(json, nowActRow);
    vmActs = vmActs;  //render UI
  }

  function setVm() { 
      vm = vm;
      vmActs = vmActs;
      vmSkills = vmSkills;
  }

  function jsonToChild(json:any){
      vmSkills = modeUR.loadRows(crudE.mode, json.skills);
  }

  /*
  function onAddItem(){
    //vmActs = mAct.addRow();
    form2.open('C', null);
  }
  */

  function onUpdateAct(json:any){
    nowActRow = json;
    form2.open('U', json);
  }
  function onViewAct(json:any){
    form2.open('V', json);
  }

  function onDeleteAct(json:any){
    if (mAct.deleteRow(json.Id)) vmActs = vmActs;
  }

  //加上child table
  function whenSave(json:any):boolean {
      _Json.setChildJson(json, 0, modeUR.getUpdJson(crudE.key));

      /*
      //files
      let fileJson = {};
      crudE.dataAddFiles(json, [photoFile], fileJson);
      crudE.jsonAddFileJson(json, fileJson);  //最後執行
      */
      return true;
  }
  
</script>