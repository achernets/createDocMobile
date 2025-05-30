/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
export interface IMailDocPatGroupArgs {
    id?: string;
    groupId?: string;
    patternId?: string;
    accountName?: string;
    groupName?: string;
    patternName?: string;
}
export class MailDocPatGroup {
    public id?: string;
    public groupId?: string;
    public patternId?: string;
    public accountName?: string;
    public groupName?: string;
    public patternName?: string;
    constructor(args?: IMailDocPatGroupArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.groupId != null) {
            this.groupId = args.groupId;
        }
        if (args != null && args.patternId != null) {
            this.patternId = args.patternId;
        }
        if (args != null && args.accountName != null) {
            this.accountName = args.accountName;
        }
        if (args != null && args.groupName != null) {
            this.groupName = args.groupName;
        }
        if (args != null && args.patternName != null) {
            this.patternName = args.patternName;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("MailDocPatGroup");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.groupId != null) {
            output.writeFieldBegin("groupId", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.groupId);
            output.writeFieldEnd();
        }
        if (this.patternId != null) {
            output.writeFieldBegin("patternId", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.patternId);
            output.writeFieldEnd();
        }
        if (this.accountName != null) {
            output.writeFieldBegin("accountName", thrift.Thrift.Type.STRING, 4);
            output.writeString(this.accountName);
            output.writeFieldEnd();
        }
        if (this.groupName != null) {
            output.writeFieldBegin("groupName", thrift.Thrift.Type.STRING, 5);
            output.writeString(this.groupName);
            output.writeFieldEnd();
        }
        if (this.patternName != null) {
            output.writeFieldBegin("patternName", thrift.Thrift.Type.STRING, 6);
            output.writeString(this.patternName);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): MailDocPatGroup {
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
                        const value_1: string = input.readString();
                        _args.id = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_2: string = input.readString();
                        _args.groupId = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.patternId = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_4: string = input.readString();
                        _args.accountName = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_5: string = input.readString();
                        _args.groupName = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_6: string = input.readString();
                        _args.patternName = value_6;
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
        return new MailDocPatGroup(_args);
    }
}
