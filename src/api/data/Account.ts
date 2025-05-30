/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import { Int64 } from "thrift";
import * as thrift from "thrift";
import * as AccountDefineConf from "./AccountDefineConf";
import * as FileStorage from "./FileStorage";
export interface IAccountArgs {
    id?: string;
    createDate?: number | Int64;
    accountName?: string;
    main?: boolean;
    confidential?: boolean;
    encrypted?: boolean;
    accountCof?: Map<AccountDefineConf.AccountDefineConf, string>;
    storages?: Array<FileStorage.FileStorage>;
    accountGroupId?: string;
    orderNum?: number;
    extType?: string;
    authServiceId?: string;
    accountNameLoc?: Map<string, string>;
}
export class Account {
    public id?: string;
    public createDate?: Int64;
    public accountName?: string;
    public main?: boolean;
    public confidential?: boolean;
    public encrypted?: boolean;
    public accountCof?: Map<AccountDefineConf.AccountDefineConf, string>;
    public storages?: Array<FileStorage.FileStorage>;
    public accountGroupId?: string;
    public orderNum?: number;
    public extType?: string;
    public authServiceId?: string;
    public accountNameLoc?: Map<string, string>;
    constructor(args?: IAccountArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.createDate != null) {
            if (typeof args.createDate === "number") {
                this.createDate = new Int64(args.createDate);
            }
            else {
                this.createDate = args.createDate;
            }
        }
        if (args != null && args.accountName != null) {
            this.accountName = args.accountName;
        }
        if (args != null && args.main != null) {
            this.main = args.main;
        }
        if (args != null && args.confidential != null) {
            this.confidential = args.confidential;
        }
        if (args != null && args.encrypted != null) {
            this.encrypted = args.encrypted;
        }
        if (args != null && args.accountCof != null) {
            this.accountCof = args.accountCof;
        }
        if (args != null && args.storages != null) {
            this.storages = args.storages;
        }
        if (args != null && args.accountGroupId != null) {
            this.accountGroupId = args.accountGroupId;
        }
        if (args != null && args.orderNum != null) {
            this.orderNum = args.orderNum;
        }
        if (args != null && args.extType != null) {
            this.extType = args.extType;
        }
        if (args != null && args.authServiceId != null) {
            this.authServiceId = args.authServiceId;
        }
        if (args != null && args.accountNameLoc != null) {
            this.accountNameLoc = args.accountNameLoc;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("Account");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.createDate != null) {
            output.writeFieldBegin("createDate", thrift.Thrift.Type.I64, 2);
            output.writeI64(this.createDate);
            output.writeFieldEnd();
        }
        if (this.accountName != null) {
            output.writeFieldBegin("accountName", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.accountName);
            output.writeFieldEnd();
        }
        if (this.main != null) {
            output.writeFieldBegin("main", thrift.Thrift.Type.BOOL, 4);
            output.writeBool(this.main);
            output.writeFieldEnd();
        }
        if (this.confidential != null) {
            output.writeFieldBegin("confidential", thrift.Thrift.Type.BOOL, 5);
            output.writeBool(this.confidential);
            output.writeFieldEnd();
        }
        if (this.encrypted != null) {
            output.writeFieldBegin("encrypted", thrift.Thrift.Type.BOOL, 6);
            output.writeBool(this.encrypted);
            output.writeFieldEnd();
        }
        if (this.accountCof != null) {
            output.writeFieldBegin("accountCof", thrift.Thrift.Type.MAP, 7);
            output.writeMapBegin(thrift.Thrift.Type.I32, thrift.Thrift.Type.STRING, this.accountCof.size);
            this.accountCof.forEach((value_1: string, key_1: AccountDefineConf.AccountDefineConf): void => {
                output.writeI32(key_1);
                output.writeString(value_1);
            });
            output.writeMapEnd();
            output.writeFieldEnd();
        }
        if (this.storages != null) {
            output.writeFieldBegin("storages", thrift.Thrift.Type.LIST, 8);
            output.writeListBegin(thrift.Thrift.Type.STRUCT, this.storages.length);
            this.storages.forEach((value_2: FileStorage.FileStorage): void => {
                value_2.write(output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (this.accountGroupId != null) {
            output.writeFieldBegin("accountGroupId", thrift.Thrift.Type.STRING, 9);
            output.writeString(this.accountGroupId);
            output.writeFieldEnd();
        }
        if (this.orderNum != null) {
            output.writeFieldBegin("orderNum", thrift.Thrift.Type.I32, 10);
            output.writeI32(this.orderNum);
            output.writeFieldEnd();
        }
        if (this.extType != null) {
            output.writeFieldBegin("extType", thrift.Thrift.Type.STRING, 11);
            output.writeString(this.extType);
            output.writeFieldEnd();
        }
        if (this.authServiceId != null) {
            output.writeFieldBegin("authServiceId", thrift.Thrift.Type.STRING, 12);
            output.writeString(this.authServiceId);
            output.writeFieldEnd();
        }
        if (this.accountNameLoc != null) {
            output.writeFieldBegin("accountNameLoc", thrift.Thrift.Type.MAP, 13);
            output.writeMapBegin(thrift.Thrift.Type.STRING, thrift.Thrift.Type.STRING, this.accountNameLoc.size);
            this.accountNameLoc.forEach((value_3: string, key_2: string): void => {
                output.writeString(key_2);
                output.writeString(value_3);
            });
            output.writeMapEnd();
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): Account {
        input.readStructBegin();
        let _args: any = {};
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_4: string = input.readString();
                        _args.id = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.I64) {
                        const value_5: Int64 = input.readI64();
                        _args.createDate = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_6: string = input.readString();
                        _args.accountName = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_7: boolean = input.readBool();
                        _args.main = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_8: boolean = input.readBool();
                        _args.confidential = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_9: boolean = input.readBool();
                        _args.encrypted = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.Thrift.Type.MAP) {
                        const value_10: Map<AccountDefineConf.AccountDefineConf, string> = new Map<AccountDefineConf.AccountDefineConf, string>();
                        const metadata_1: thrift.TMap = input.readMapBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const key_3: AccountDefineConf.AccountDefineConf = input.readI32();
                            const value_11: string = input.readString();
                            value_10.set(key_3, value_11);
                        }
                        input.readMapEnd();
                        _args.accountCof = value_10;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_12: Array<FileStorage.FileStorage> = new Array<FileStorage.FileStorage>();
                        const metadata_2: thrift.TList = input.readListBegin();
                        const size_2: number = metadata_2.size;
                        for (let i_2: number = 0; i_2 < size_2; i_2++) {
                            const value_13: FileStorage.FileStorage = FileStorage.FileStorage.read(input);
                            value_12.push(value_13);
                        }
                        input.readListEnd();
                        _args.storages = value_12;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_14: string = input.readString();
                        _args.accountGroupId = value_14;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_15: number = input.readI32();
                        _args.orderNum = value_15;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 11:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_16: string = input.readString();
                        _args.extType = value_16;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 12:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_17: string = input.readString();
                        _args.authServiceId = value_17;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 13:
                    if (fieldType === thrift.Thrift.Type.MAP) {
                        const value_18: Map<string, string> = new Map<string, string>();
                        const metadata_3: thrift.TMap = input.readMapBegin();
                        const size_3: number = metadata_3.size;
                        for (let i_3: number = 0; i_3 < size_3; i_3++) {
                            const key_4: string = input.readString();
                            const value_19: string = input.readString();
                            value_18.set(key_4, value_19);
                        }
                        input.readMapEnd();
                        _args.accountNameLoc = value_18;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return new Account(_args);
    }
}
