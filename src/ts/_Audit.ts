import _Ajax from "@base/ts/_Ajax";
import _List from "@base/ts/_List";
import _Str from "@base/ts/_Str";
import _Tool from "@base/ts/_Tool";
import _Xp from "./_Xp";
import _XpCode from "./_XpCode";

/**
 * 與審核有關的函數
 */
export default class _Audit {

    static auditActs = _XpCode.auditActs();
    static auditStatus = _XpCode.auditStatus();

    /**
     * get audit status name
     * @param audits
     * @param data 
     * @returns 
     */
    /*
    static statusName(data:string):string {
        let name = _Code.findStr(_Audit.auditStatuses, data);
        return (data == 'Y') ? `<span class='xg-green'>${name}</span>` :
            (data == 'N') ? `<span class='xg-red'>${name}</span>` :
            name;
    } 
    */

    /**
     * get audit status name by row
     * @param status auditStatus
     * @returns string
     */
    static statusNameR(row:any):string {
        return this.statusName(row.AuditStatus, true)
    } 

    //get audit name by auditStatus
    static statusName(status:string, color=false):string {
        let name = _Code.findStr(_Audit.auditStatus, status);
        return !color ? name :
            (status == 'Y') ? `<span class='xg-green'>${name}</span>` :
            (status == 'N') ? `<span class='xg-red'>${name}</span>` : name;
    } 
    
    /**
     * _crud欄位 icon for 考慮審核狀態 row
     * @param row 
     * @returns 
     */
    static crudFun(row:any):string {
        return (row.AuditStatus == '0') ? 'UDV' : 'V';
    } 

    static swapBtnTime(row:any):string {
        return (row.AuditStatus == '1') ? 'b:審核' : 'f:AuditTime';
    }     

    /**
     * '送出' _btn 欄位按鈕
     * @param row 
     * @returns 
     */
    /*
    static btnSend(row:any):string {
        return (row.AuditStatus == '0') ? _Xp.btnSendAudit : '';
    } 
    */

    /**
     * 送出審核
     * @param row 
     * @returns ok or not
     */
    /*
    static async sendAuditA(act:string, key:string, dt:XgDatatable):Promise<void> {
        let msg = await _Ajax.getStrA(act, false, {key:key});
        if (_Str.isEmpty(msg)){
            await dt.reloadA(false);
            _Tool.msg('送出審核完成。');
        } else {
            _Tool.msg(msg);
        }
    } 
    */

} //class