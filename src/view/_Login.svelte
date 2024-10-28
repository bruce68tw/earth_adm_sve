<section class='vh-100'>
  <div class='container py-5 h-100'>
    <div class='row d-flex align-items-center justify-content-center h-100'>
      <div class='col-md-4'>
        <img src='/farm.png' class='img-fluid' alt='logo' />
      </div>
      <div class='col-md-3 offset-xl-1'>
        <form id='form' novalidate>
          <h1>登入系統</h1>
          <XiText {vm} fid='account' title='Account' cols='12' labelTip='請輸入英數字' required/>
          <XiText {vm} fid='pwd' title='Password' cols='12' isPwd />
          <button type='button' on:click={onLoginA} class='btn btn-primary mt-2'>登入</button>
        </form>
      </div>
    </div>
  </div>
</section>

<script lang='ts'>
  import { LoginSt } from '@/store/LoginSt';
  import XiText from '@base/lib/XiText.svelte'; 
  import _Fun from '@base/ts/_Fun';
  import _Ajax from '@base/ts/_Ajax';
  import _VM from '@base/ts/_VM';
  import _Xp from '@/ts/_Xp';
  import _Str from '@base/ts/_Str';

  let vm = {
    fromUrl: '',
    account: 'aa',
    pwd: 'aa',
  };
  _VM.init(vm);

  //onMount(()=> { _Xp.initA()});
  
  async function onLoginA():Promise<void> {
    if (!_VM.validRow(vm)){
      vm = vm;
      return;
    } 

    //ajax call, 系統自動處理錯誤訊息
    let data = {account:vm.account, pwd:vm.pwd};
    let json = await _Ajax.getJsonA('/Login/Login', false, data);
    _Ajax.setToken(json.token);
    _Xp.userName = json.userName;
    _Fun.authStrs = json.authStrs;
    _Fun.hasPwd = _Str.notEmpty(vm.pwd);
    $LoginSt = true;
  }
</script>

<style>
  h1 {
      font-size: 1.5em;
      color: #525252;
      margin: 15px 0 20px 0;
  }
</style>