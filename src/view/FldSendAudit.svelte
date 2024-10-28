<!-- 
  @component
  送審核 checkbox, 使用固定 title, fid
  vm 必須加入屬性 _SendAudit: 0
 -->
<XiCheck {vm} fid='_SendAudit' title='送審核' {edit} {cols} {custCss} />

<script lang='ts'>
  import XiCheck from '@base/lib/XiCheck.svelte';

  export let vm:any;
  export let edit = 'CU';  
  export let cols = '';
  export let custCss = false;  
</script>