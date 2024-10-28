<!-- d-flex flex-column for 內容上下排序, class name 使用 xg0- for 在 _color.css 設定顏色,字型大小 -->
<div class='d-flex flex-column' style="height:100%">
    <!-- 上方列 -->
    <nav class="navbar navbar-expand xg0-top">
        <!-- 縮放功能表 icon -->
        <a href={null} class="sidebar-toggle text-light mr-3" on:click={onToggleMenu} 
            style="cursor:pointer; margin-right:10px;">
            <span class="navbar-toggler-icon"></span>
        </a>

        <!-- 左上: 系統名稱 -->
        <div class="navbar-brand">{_Fun.apName}</div>

        <!-- 右上 icon, 用戶名 -->
        <div class="navbar-collapse collapse" style="justify-content:flex-end;">
            <ul class="navbar-nav ml-auto">
                <!-- home icon -->
                <li>
                    <a class="nav-link" use:link href='/'>
                        <i class="ico-home"></i>
                    </a>
                </li>

                <!-- 用戶名稱 -->
                <li class='x-user'>{_Xp.userName}</li>

                <!-- logout icon -->
                <li>
                    <a href={null} class="nav-link" title="Logout" on:click={onLogout}>
                        <i class="ico-exit"></i>
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- flex-grow-1 for 展開剩下高度, d-flex flex-row for 內容左右排序 -->
    <div class="flex-grow-1 d-flex flex-row">
        <!-- left menu -->
        <XgLeftMenu show={showMenu} items={items} />

        <!-- work area -->
        <div class="xg0-right" style="width:100%">
            <Router {routes} />
        </div>
    </div>
</div>

<script lang='ts'>
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';
  import { LoginSt } from '@/store/LoginSt';
  //import { ApNameSt } from '@base/store/ApNameSt';
  import type MenuDto from '@base/dto/MenuDto';
  import Router from 'svelte-spa-router';
  import XgLeftMenu from '@base/lib/XgLeftMenu.svelte';
  
  //功能項目
  import Home from '@/view/_Home.svelte';
  import ItemType from '@/view/ItemType.svelte';
  import Item from '@/view/Item.svelte';
  import Skill from '@/view/Skill.svelte';
  import House from '@/view/House.svelte';
  import Vol from '@/view/Vol.svelte';
  
  import Msg from '@/view/Msg.svelte';
  import Donor from '@/view/Donor.svelte';
  import Donate from '@/view/Donate.svelte';  
  import DonateAudit from '@/view/DonateAudit.svelte';    
  import DonorTalkAudit from '@/view/DonorTalkAudit.svelte';

  import Act from '@/view/Act.svelte';  
  import ActAudit from '@/view/ActAudit.svelte';    
  import Input from '@/view/Input.svelte';   
  import InputAudit from '@/view/InputAudit.svelte';   
  import Output from '@/view/Output.svelte';   
  import OutputCheck from '@/view/OutputCheck.svelte';     
  import StockStatus from '@/view/StockStatus.svelte';     
  import Stock from '@/view/Stock.svelte';     
  
  import User from '@/view/User.svelte';
  import XpRole from '@/view/XpRole.svelte';
  import XpProg from '@/view/XpProg.svelte';
  import SetPwd from '@/view/SetPwd.svelte';
  import GenSiteMap from '@/view/GenSiteMap.svelte';  

  import _Xp from '@/ts/_Xp';
  import _Ajax from '@base/ts/_Ajax';
  import _Str from '@base/ts/_Str';
  import _LeftMenu from '@base/ts/_LeftMenu';
  import _Fun from '@base/ts/_Fun';

  //variables
  let showMenu = true;

  //routes
  let routes = {
    '/': Home,   //default page
    '/ItemType': ItemType,
    '/Item': Item,
    '/Skill': Skill,
    '/House': House,    
    '/Vol': Vol,    
    
    '/Msg': Msg,    
    '/Donor': Donor,    
    '/Donate': Donate,    
    '/DonateAudit': DonateAudit,    
    '/DonorTalkAudit': DonorTalkAudit,    
    '/Act': Act,
    '/ActAudit': ActAudit,
    '/Input': Input,    
    '/InputAudit': InputAudit,    
    '/Output': Output,    
    '/OutputCheck': OutputCheck,    
    '/StockStatus': StockStatus,    
    '/Stock': Stock,        

    '/User': User,
    '/XpRole': XpRole,
    '/XpProg': XpProg,
    '/SetPwd': SetPwd,
    '/GenSiteMap': GenSiteMap,    
  };

  //all menu items
  let items:MenuDto[] = _Fun.hasPwd ? [
    { Name:'基本資料', Items:[
        { Name:'物品類別維護', Url:'/ItemType' },
        { Name:'物品維護', Url:'/Item' },
        { Name:'志工專長維護', Url:'/Skill' },
        { Name:'志工管理', Url:'/Vol' },
        { Name:'倉庫維護', Url:'/House' },    
    ]},
    { Name:'捐贈作業',  Items:[        
        { Name:'民眾留言維護', Url:'/Msg' },
        { Name:'捐贈人管理', Url:'/Donor' },
        { Name:'捐贈單維護', Url:'/Donate' },
        { Name:'捐贈單審核', Url:'/DonateAudit' },
        { Name:'聯絡記錄審核', Url:'/DonorTalkAudit' },
    ]},
    { Name:'活動單作業',  Items:[
        { Name:'活動單維護', Url:'/Act' },
        { Name:'活動單審核', Url:'/ActAudit' },
    ]},
    { Name:'入庫作業',  Items:[
        { Name:'入庫單維護', Url:'/Input' },
        { Name:'入庫單審核', Url:'/InputAudit' },
    ]},
    { Name:'出貨作業',  Items:[
        { Name:'倉庫出貨', Url:'/Output' },
        { Name:'出貨後確認', Url:'/OutputCheck' },
    ]},
    { Name:'庫存作業',  Items:[
        { Name:'設定盤點狀態', Url:'/StockStatus' },
        { Name:'盤點單維護', Url:'/Stock' },
    ]},
    { Name:'報表作業',  Items:[
        { Name:'物品需求統計', Url:'/RptItemAct' },
        { Name:'物品捐贈統計', Url:'/RptItemDonate' },
        //{ Name:'物品短缺統計', Url:'/RptItemShort' },
    ]},
    { Name:'系統管理',  Items:[
        { Name:'用戶管理', Url:'/User' },
        { Name:'角色維護', Url:'/XpRole' },
        { Name:'系統功能維護', Url:'/XpProg' },
        { Name:'設定密碼', Url:'/SetPwd' },
        { Name:'產生SiteMap檔案', Url:'/GenSiteMap' },
    ]},
  ] : 
  [
    { Name:'系統管理',  Items:[
        { Name:'設定密碼', Url:'/SetPwd' },
    ]}
  ];

  //filter menu
  onMount(()=> { 
    if (_Fun.hasPwd)
        items = _LeftMenu.filterByAuth(items, _Fun.authStrs);
  });
    
  function onToggleMenu() {
    showMenu = !showMenu;
  }

  function onLogout() {
    history.pushState({}, '', '/');
    $LoginSt = false;
  }
  
</script>