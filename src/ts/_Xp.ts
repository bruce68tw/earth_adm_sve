import type XgDatatable from '@base/lib/XgDatatable.svelte';
import _Code from '@base/ts/_Code';
import _Fun from '@base/ts/_Fun'
import _XpCode from './_XpCode';
import _Audit from './_Audit';
import _Tool from '@base/ts/_Tool';
import _Str from '@base/ts/_Str';

//static class
export default class _Xp {
    //static readonly systemName = 'Earth 救助系統';
    static readonly btnSendAudit = '送出';

    //get from config
    static md5Url = '';         //md5 checker url
    static txUrl = '';          //ether block viewer url
    static hasEther = false;    //是否有以太坊、NFT功能

    static userName = '';
    static yesNo = _XpCode.yesNo();
    static inputStatus = _XpCode.inputStatus();
    static closeStatus = _XpCode.closeStatus();
    static takeStatus = _XpCode.takeStatus();
    static msgTypes = _XpCode.msgTypes();
    
    static yesNoName(value:any):string {        
        return _Code.findStr(_Xp.yesNo, value.toString());
    }
    static statusName(status:number):string {        
        return (status == 1) ? '正常' : '停用';
    }
    
    static inputStatusName(status:string):string {        
        return _Code.findStr(_Xp.inputStatus, status);
    }
    static closeStatusName(status:string):string {        
        return _Code.findStr(_Xp.closeStatus, status);
    }
    static msgTypeName(type:string):string {        
        return _Code.findStr(_Xp.msgTypes, type);
    }

    /*
    //get audits by isNew
    static getAuditsByNew(isNew:boolean):IdStrDto[] {
        return _XpCode.auditStatuses(isNew ? 'C' : '');
    }
    */
   
    /**
     * get edit funs by isNew & auditStatus
     * @param isNew 
     * @param auditStatus 
     * @returns 
     */
    static getFunsByNew(isNew:boolean, auditStatus:string):string {
        return (isNew || auditStatus == '0') ? 'CU' : 'C';
    }
    
    //onchange item.TypeId
    static resetItem(row:any){
        row.ItemId = '';
        row.Unit = '';
        row.StockAmount = 0;
        row.StockWayAmount = 0;
        row.PlanAmount = 0;
    }
    static setItem(row:any, item:any){
        row.Unit = item.Unit;
        row.StockAmount = item.StockAmount;
        row.StockWayAmount = item.StockWayAmount;
        row.PlanAmount = item.PlanAmount;
    }

    static isAudit(row:any):boolean {
        return (row.AuditStatus == 'Y');
    }
    static notAudit(row:any):boolean {
        return !_Xp.isAudit(row);
    }

    static dtAuditStatus():any {
        return { Title:'審核狀態', Fid:'AuditStatus', SortFid:'AuditStatus', 
            Render:(row)=> _Audit.statusNameR(row)};
    }

    /**
     * XgDatatable check error result, reload if ok.
     * @param dt 
     * @param error 
     * @param msgOk 
     * @returns 
     */
    static async dtCheckErrorA(dt:XgDatatable, error:string, msgOk:string):Promise<void> {
        if (error === null) return;
        if (error == ''){
            await dt.reloadA(false);
            _Tool.msg(msgOk);
        } else {
            _Tool.msg(error);
        }
    }

    /*
    //上鏈時間, 配合db欄位名稱TxUpTime
    static dtTxUpTime():any {
        return { title:'上鏈時間', fid:'_swap', render:(row)=> 
            (!_Xp.hasBlock || row.AuditStatus != 'Y') ? '' :
            row.TxUpTime == '' ? 'b:上鏈' : 'f:TxUpTime' };
    }
    */
}