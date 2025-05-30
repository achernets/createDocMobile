/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
export interface ISecurityClassificationArgs {
    id?: string;
    gname?: string;
    scDescription?: string;
    group?: string;
    share?: boolean;
    scMask?: string;
}
export class SecurityClassification {
    public id?: string;
    public gname?: string;
    public scDescription?: string;
    public group?: string;
    public share?: boolean;
    public scMask?: string;
    constructor(args?: ISecurityClassificationArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.gname != null) {
            this.gname = args.gname;
        }
        if (args != null && args.scDescription != null) {
            this.scDescription = args.scDescription;
        }
        if (args != null && args.group != null) {
            this.group = args.group;
        }
        if (args != null && args.share != null) {
            this.share = args.share;
        }
        if (args != null && args.scMask != null) {
            this.scMask = args.scMask;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("SecurityClassification");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.gname != null) {
            output.writeFieldBegin("gname", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.gname);
            output.writeFieldEnd();
        }
        if (this.scDescription != null) {
            output.writeFieldBegin("scDescription", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.scDescription);
            output.writeFieldEnd();
        }
        if (this.group != null) {
            output.writeFieldBegin("group", thrift.Thrift.Type.STRING, 4);
            output.writeString(this.group);
            output.writeFieldEnd();
        }
        if (this.share != null) {
            output.writeFieldBegin("share", thrift.Thrift.Type.BOOL, 5);
            output.writeBool(this.share);
            output.writeFieldEnd();
        }
        if (this.scMask != null) {
            output.writeFieldBegin("scMask", thrift.Thrift.Type.STRING, 6);
            output.writeString(this.scMask);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): SecurityClassification {
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
                        _args.gname = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.scDescription = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_4: string = input.readString();
                        _args.group = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_5: boolean = input.readBool();
                        _args.share = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_6: string = input.readString();
                        _args.scMask = value_6;
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
        return new SecurityClassification(_args);
    }
}
