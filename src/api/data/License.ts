/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import { Int64 } from "thrift";
import * as thrift from "thrift";
import * as __ROOT_NAMESPACE__ from "./";
export interface ILicenseArgs {
    validFrom?: number | Int64;
    validTo?: number | Int64;
    key?: string;
    accountGroup?: __ROOT_NAMESPACE__.AccountGroup;
    account?: __ROOT_NAMESPACE__.Account;
    user?: __ROOT_NAMESPACE__.UserOrGroup;
    autoAssignment?: boolean;
    autoAssignmentOrder?: number;
    userCount?: number;
    personal?: boolean;
    availableUserCount?: number;
}
export class License {
    public validFrom?: Int64;
    public validTo?: Int64;
    public key?: string;
    public accountGroup?: __ROOT_NAMESPACE__.AccountGroup;
    public account?: __ROOT_NAMESPACE__.Account;
    public user?: __ROOT_NAMESPACE__.UserOrGroup;
    public autoAssignment?: boolean;
    public autoAssignmentOrder?: number;
    public userCount?: number;
    public personal?: boolean;
    public availableUserCount?: number;
    constructor(args?: ILicenseArgs) {
        if (args != null && args.validFrom != null) {
            if (typeof args.validFrom === "number") {
                this.validFrom = new Int64(args.validFrom);
            }
            else {
                this.validFrom = args.validFrom;
            }
        }
        if (args != null && args.validTo != null) {
            if (typeof args.validTo === "number") {
                this.validTo = new Int64(args.validTo);
            }
            else {
                this.validTo = args.validTo;
            }
        }
        if (args != null && args.key != null) {
            this.key = args.key;
        }
        if (args != null && args.accountGroup != null) {
            this.accountGroup = args.accountGroup;
        }
        if (args != null && args.account != null) {
            this.account = args.account;
        }
        if (args != null && args.user != null) {
            this.user = args.user;
        }
        if (args != null && args.autoAssignment != null) {
            this.autoAssignment = args.autoAssignment;
        }
        if (args != null && args.autoAssignmentOrder != null) {
            this.autoAssignmentOrder = args.autoAssignmentOrder;
        }
        if (args != null && args.userCount != null) {
            this.userCount = args.userCount;
        }
        if (args != null && args.personal != null) {
            this.personal = args.personal;
        }
        if (args != null && args.availableUserCount != null) {
            this.availableUserCount = args.availableUserCount;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("License");
        if (this.validFrom != null) {
            output.writeFieldBegin("validFrom", thrift.Thrift.Type.I64, 1);
            output.writeI64(this.validFrom);
            output.writeFieldEnd();
        }
        if (this.validTo != null) {
            output.writeFieldBegin("validTo", thrift.Thrift.Type.I64, 2);
            output.writeI64(this.validTo);
            output.writeFieldEnd();
        }
        if (this.key != null) {
            output.writeFieldBegin("key", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.key);
            output.writeFieldEnd();
        }
        if (this.accountGroup != null) {
            output.writeFieldBegin("accountGroup", thrift.Thrift.Type.STRUCT, 4);
            this.accountGroup.write(output);
            output.writeFieldEnd();
        }
        if (this.account != null) {
            output.writeFieldBegin("account", thrift.Thrift.Type.STRUCT, 5);
            this.account.write(output);
            output.writeFieldEnd();
        }
        if (this.user != null) {
            output.writeFieldBegin("user", thrift.Thrift.Type.STRUCT, 6);
            this.user.write(output);
            output.writeFieldEnd();
        }
        if (this.autoAssignment != null) {
            output.writeFieldBegin("autoAssignment", thrift.Thrift.Type.BOOL, 7);
            output.writeBool(this.autoAssignment);
            output.writeFieldEnd();
        }
        if (this.autoAssignmentOrder != null) {
            output.writeFieldBegin("autoAssignmentOrder", thrift.Thrift.Type.I32, 8);
            output.writeI32(this.autoAssignmentOrder);
            output.writeFieldEnd();
        }
        if (this.userCount != null) {
            output.writeFieldBegin("userCount", thrift.Thrift.Type.I32, 9);
            output.writeI32(this.userCount);
            output.writeFieldEnd();
        }
        if (this.personal != null) {
            output.writeFieldBegin("personal", thrift.Thrift.Type.BOOL, 10);
            output.writeBool(this.personal);
            output.writeFieldEnd();
        }
        if (this.availableUserCount != null) {
            output.writeFieldBegin("availableUserCount", thrift.Thrift.Type.I32, 11);
            output.writeI32(this.availableUserCount);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): License {
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
                    if (fieldType === thrift.Thrift.Type.I64) {
                        const value_1: Int64 = input.readI64();
                        _args.validFrom = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.I64) {
                        const value_2: Int64 = input.readI64();
                        _args.validTo = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.key = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_4: __ROOT_NAMESPACE__.AccountGroup = __ROOT_NAMESPACE__.AccountGroup.read(input);
                        _args.accountGroup = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_5: __ROOT_NAMESPACE__.Account = __ROOT_NAMESPACE__.Account.read(input);
                        _args.account = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_6: __ROOT_NAMESPACE__.UserOrGroup = __ROOT_NAMESPACE__.UserOrGroup.read(input);
                        _args.user = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_7: boolean = input.readBool();
                        _args.autoAssignment = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_8: number = input.readI32();
                        _args.autoAssignmentOrder = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_9: number = input.readI32();
                        _args.userCount = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_10: boolean = input.readBool();
                        _args.personal = value_10;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 11:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_11: number = input.readI32();
                        _args.availableUserCount = value_11;
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
        return new License(_args);
    }
}
