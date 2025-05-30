/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import { Int64 } from "thrift";
import * as thrift from "thrift";
import * as __ROOT_NAMESPACE__ from "./";
export interface IUserExtArgs {
    userOrGroup?: __ROOT_NAMESPACE__.UserOrGroup;
    login?: string;
    hasPublicKey?: boolean;
    delegates?: Array<__ROOT_NAMESPACE__.UserOrGroup>;
    licenceEndDate?: number | Int64;
}
export class UserExt {
    public userOrGroup?: __ROOT_NAMESPACE__.UserOrGroup;
    public login?: string;
    public hasPublicKey?: boolean;
    public delegates?: Array<__ROOT_NAMESPACE__.UserOrGroup>;
    public licenceEndDate?: Int64;
    constructor(args?: IUserExtArgs) {
        if (args != null && args.userOrGroup != null) {
            this.userOrGroup = args.userOrGroup;
        }
        if (args != null && args.login != null) {
            this.login = args.login;
        }
        if (args != null && args.hasPublicKey != null) {
            this.hasPublicKey = args.hasPublicKey;
        }
        if (args != null && args.delegates != null) {
            this.delegates = args.delegates;
        }
        if (args != null && args.licenceEndDate != null) {
            if (typeof args.licenceEndDate === "number") {
                this.licenceEndDate = new Int64(args.licenceEndDate);
            }
            else {
                this.licenceEndDate = args.licenceEndDate;
            }
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("UserExt");
        if (this.userOrGroup != null) {
            output.writeFieldBegin("userOrGroup", thrift.Thrift.Type.STRUCT, 1);
            this.userOrGroup.write(output);
            output.writeFieldEnd();
        }
        if (this.login != null) {
            output.writeFieldBegin("login", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.login);
            output.writeFieldEnd();
        }
        if (this.hasPublicKey != null) {
            output.writeFieldBegin("hasPublicKey", thrift.Thrift.Type.BOOL, 3);
            output.writeBool(this.hasPublicKey);
            output.writeFieldEnd();
        }
        if (this.delegates != null) {
            output.writeFieldBegin("delegates", thrift.Thrift.Type.LIST, 4);
            output.writeListBegin(thrift.Thrift.Type.STRUCT, this.delegates.length);
            this.delegates.forEach((value_1: __ROOT_NAMESPACE__.UserOrGroup): void => {
                value_1.write(output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (this.licenceEndDate != null) {
            output.writeFieldBegin("licenceEndDate", thrift.Thrift.Type.I64, 5);
            output.writeI64(this.licenceEndDate);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): UserExt {
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
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_2: __ROOT_NAMESPACE__.UserOrGroup = __ROOT_NAMESPACE__.UserOrGroup.read(input);
                        _args.userOrGroup = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.login = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_4: boolean = input.readBool();
                        _args.hasPublicKey = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_5: Array<__ROOT_NAMESPACE__.UserOrGroup> = new Array<__ROOT_NAMESPACE__.UserOrGroup>();
                        const metadata_1: thrift.TList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_6: __ROOT_NAMESPACE__.UserOrGroup = __ROOT_NAMESPACE__.UserOrGroup.read(input);
                            value_5.push(value_6);
                        }
                        input.readListEnd();
                        _args.delegates = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.I64) {
                        const value_7: Int64 = input.readI64();
                        _args.licenceEndDate = value_7;
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
        return new UserExt(_args);
    }
}
