<XgModal bind:this={modal} title="區塊鏈資料" size='width:820px; height:480px;'>
  <div class="row mt-2">
    <div class="col-md-2 xi-label">
      <a href='{_Xp.txUrl}{vm.TxHash}' target="_blank" rel="noreferrer">交易Hash</a>
    </div>
    <div class="col-md-10 xi-input">
      <input value={vm.TxHash} type='text' class='form-control' readonly />
    </div>
  </div>
  <div class="row">
    <div class="col-md-2 xi-label">交易Log</div>
    <div class="col-md-10 xi-input">
      <input value={vm.TxLog} type='text' class='form-control' readonly />
    </div>
  </div>
  <div class="row">
    <div class="col-md-2 xi-label">資料內容</div>
    <div class="col-md-7 xi-input">
      <textarea value={vm.TxLogSource} rows={8} class='form-control mb-2' readonly />      
      <a href='{_Xp.md5Url}' target="_blank" rel="noreferrer">資料內容MD5驗証</a>
    </div>
  </div>
</XgModal>

<script lang='ts'>
    import XgModal from '@base/lib/XgModal.svelte';
    import _Xp from '@/ts/_Xp';

  //2.form view-model
  let vm = {
    TxHash: '',
    TxLog: '',
    TxLogSource: '',
  };
  //_VM.init(vm);

  let modal:XgModal;
  export function open(json:any){ 
    vm = json;
    modal.open(); 
  }
  export function close(){ modal.close(); }

</script>