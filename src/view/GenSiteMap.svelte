<XgProgPath names={['產生SiteMap.xml檔案']} />
<div class="mt-3">
  <XiText {vm} fid='Domain' title='ActDetail Url' maxLen={50} required labelTip='ex: http://127.0.0.1:7137/ActDetail' />
  <div class='row col-md-5 justify-content-end'>
      <button type='button' class='btn btn-primary mt-2 xg-w100' on:click={onRunA}>產生檔案</button>
  </div>
</div>
 
<script lang='ts'>
    import XgProgPath from '@base/lib/XgProgPath.svelte';
    import XiText from '@base/lib/XiText.svelte'; 
    import _Ajax from '@base/ts/_Ajax';
    import _Tool from '@base/ts/_Tool';
    import _VM from '@base/ts/_VM';
    import _Fun from '@base/ts/_Fun';

  //3.query form view-model
  let vm = {
    Domain: '',
  };
  _VM.init(vm);
  //_VM.resetExt(vm, 'C');

  async function onRunA():Promise<void> {
    //check input
    if (!_VM.validRow(vm)){
      vm = vm;
      return;
    } 

    let data = {domain:vm.Domain};
    await _Ajax.respTextFileA('/GenSiteMap/Run', 'sitemap.xml', false, data);
  }

</script>
