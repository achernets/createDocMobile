/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as __ROOT_NAMESPACE__ from "./";
export interface IUserAccArgs {
    userOrGroup?: __ROOT_NAMESPACE__.UserOrGroup;
    acounts?: Array<__ROOT_NAMESPACE__.Account>;
}
export class UserAcc {
    public userOrGroup?: __ROOT_NAMESPACE__.UserOrGroup;
    public acounts?: Array<__ROOT_NAMESPACE__.Account>;
    constructor(args?: IUserAccArgs) {
        if (args != null && args.userOrGroup != null) {
            this.userOrGroup = args.userOrGroup;
        }
        if (args != null && args.acounts != null) {
            this.acounts = args.acounts;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("UserAcc");
        if (this.userOrGroup != null) {
            output.writeFieldBegin("userOrGroup", thrift.Thrift.Type.STRUCT, 1);
            this.userOrGroup.write(output);
            output.writeFieldEnd();
        }
        if (this.acounts != null) {
            output.writeFieldBegin("acounts", thrift.Thrift.Type.LIST, 2);
            output.writeListBegin(thrift.Thrift.Type.STRUCT, this.acounts.length);
            this.acounts.forEach((value_1: __ROOT_NAMESPACE__.Account): void => {
                value_1.write(output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): UserAcc {
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
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_3: Array<__ROOT_NAMESPACE__.Account> = new Array<__ROOT_NAMESPACE__.Account>();
                        const metadata_1: thrift.TList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_4: __ROOT_NAMESPACE__.Account = __ROOT_NAMESPACE__.Account.read(input);
                            value_3.push(value_4);
                        }
                        input.readListEnd();
                        _args.acounts = value_3;
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
        return new UserAcc(_args);
    }
}
