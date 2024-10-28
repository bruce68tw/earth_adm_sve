<XgProgPath names={['設定密碼']} />
<div class="xp-prog">
  <XiText {vm} fid='OldPwd' title='舊密碼' maxLen={30} isPwd />
  <XiText {vm} fid='NewPwd' title='新密碼' maxLen={30} isPwd required />
  <XiText {vm} fid='NewPwd2' title='確認新密碼' maxLen={30} isPwd required />
</div>
<div class='text-center'>
    <button type='button' class='btn btn-primary' on:click={onSave}>
      儲存
      <i class='ico-save'></i>
    </button>
</div>
 
<script lang='ts'>
  //import { onMount } from 'svelte';
  import XgProgPath from '@base/lib/XgProgPath.svelte';
  import XiText from '@base/lib/XiText.svelte'; 
  import _Ajax from '@base/ts/_Ajax';
  import _Tool from '@base/ts/_Tool';
  import _VM from '@base/ts/_VM';

  //3.query form view-model
  let vm = {
    OldPwd: '',
    NewPwd: '',
    NewPwd2: '',
  };
  _VM.resetExt(vm, 'C');

  async function onSave():Promise<void> {
    //check input
    if (!_VM.validRow(vm)) return;
    if (vm.NewPwd != vm.NewPwd2){
      _Tool.msg('兩次新密碼必須相同。');
      return;
    }

    let data = {oldPwd:vm.OldPwd, newPwd:vm.NewPwd};
    let msg = await _Ajax.getStrA('/SetPwd/Save', false, data);
    if (msg !== null)
      _Tool.msg(msg || '儲存成功。');
  }

</script>
