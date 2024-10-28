{#if $LoginSt}
  <Main/>
{:else}
  <Login/>
{/if}

<!-- 公用ui -->
<XgTool bind:this={xgTool} />

<script lang='ts'>
    //在這裡載入變動的 css 才可使用 @base
    import '@base/base.css';
    import '@base/datatables-1.11.5-bruce.css';

    import { onMount } from 'svelte';
    import { LoginSt } from '@/store/LoginSt';
    import Main from '@/view/_Main.svelte';
    import Login from '@/view/_Login.svelte';
    import XgTool from '@base/lib/XgTool.svelte';
    import _Tool from '@base/ts/_Tool';
    import _Fun from "@base/ts/_Fun";
    import _Str from '@base/ts/_Str';
    import _Xp from './ts/_Xp';

  let xgTool:XgTool;

  onMount(async()=> {
    //先執行初始化
    let json = await _Fun.initA(3);
    _Tool.init(xgTool);
    _Xp.txUrl = json.txUrl;
    _Xp.md5Url = json.md5Url;
    _Xp.hasEther = _Str.notEmpty(_Xp.txUrl);
  });
</script>