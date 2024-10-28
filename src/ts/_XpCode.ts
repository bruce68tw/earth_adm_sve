import type IdStrDto from '@base/dto/IdStrDto';
import type IdStrExtDto from '@base/dto/IdStrExtDto';
import _Ajax from '@base/ts/_Ajax';

//static class
export default class _XpCode {

    static async getJsonA(act:string):Promise<IdStrDto[]> {
        return await _Ajax.getJsonA(act) || [];
    } 

    static async itemTypesA():Promise<IdStrDto[]> {
        return await _XpCode.getJsonA('/XpCode/ItemTypes') ;
    } 

    //return IdStrExtDto[]
    static async itemsA():Promise<IdStrExtDto[]> {
        return await _Ajax.getJsonA('/XpCode/Items') || [];
    } 

    static async rolesA():Promise<IdStrDto[]> {
        return await _XpCode.getJsonA('/XpCode/Roles');
    }

    static async progsA():Promise<IdStrDto[]> {
        return await _XpCode.getJsonA('/XpCode/Progs');
    }

    static async skillsA():Promise<IdStrDto[]> {
        return await _XpCode.getJsonA('/XpCode/Skills');
    }

    /**
     * auditStatus, 後面不加s
     * @param mode C(create),A(audit),''(show all rows)
     * @returns IdStrDto[]
     */
    static auditStatus():IdStrDto[] {
        return [
            {Id:'0', Str:'未送審'},
            {Id:'1', Str:'審核中'},
            {Id:'Y', Str:'審核通過'},
            {Id:'N', Str:'拒絶'},
        ];
    } 

    //審核動作
    static auditActs():IdStrDto[] {
        return [
            {Id:'Y', Str:'同意'},
            {Id:'N', Str:'不同意'},
        ];
    }

    static authRanges():IdStrDto[] {
        return [
            {Id:'0', Str:'無'},
            {Id:'1', Str:'個人'},
            {Id:'9', Str:'全部'},
        ];
    }

    static yesNo():IdStrDto[] {
        return [
            {Id:'1', Str:'是'},
            {Id:'0', Str:'否'},
        ];
    }

    static inputStatus():IdStrDto[] {
        return [
            {Id:'Y', Str:'已入庫'},
            {Id:'N', Str:'未入庫'},
            {Id:'P', Str:'部分入庫'},
        ];
    }

    static closeStatus():IdStrDto[] {
        return [
            {Id:'0', Str:'未結案'},
            {Id:'1', Str:'已結案'},
        ];
    }

    static takeStatus():IdStrDto[] {
        return [
            {Id:'1', Str:'已領取'},
            {Id:'0', Str:'未領取'},
        ];
    }

    static msgTypes():IdStrDto[] {
        return [
            {Id:'1', Str:'捐贈'},
            {Id:'0', Str:'志工'},
        ];
    }
}