/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as AccessRule from "./AccessRule";
import * as ContentHolder from "./ContentHolder";
export interface IContentHolderShowPlaceArgs {
    id?: string;
    stageId?: string;
    seqNum?: number;
    accessRule?: AccessRule.AccessRule;
    contentHolder?: ContentHolder.ContentHolder;
    allowEdit?: boolean;
    linkId?: string;
}
export class ContentHolderShowPlace {
    public id?: string;
    public stageId?: string;
    public seqNum?: number;
    public accessRule?: AccessRule.AccessRule;
    public contentHolder?: ContentHolder.ContentHolder;
    public allowEdit?: boolean;
    public linkId?: string;
    constructor(args?: IContentHolderShowPlaceArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.stageId != null) {
            this.stageId = args.stageId;
        }
        if (args != null && args.seqNum != null) {
            this.seqNum = args.seqNum;
        }
        if (args != null && args.accessRule != null) {
            this.accessRule = args.accessRule;
        }
        if (args != null && args.contentHolder != null) {
            this.contentHolder = args.contentHolder;
        }
        if (args != null && args.allowEdit != null) {
            this.allowEdit = args.allowEdit;
        }
        if (args != null && args.linkId != null) {
            this.linkId = args.linkId;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("ContentHolderShowPlace");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.stageId != null) {
            output.writeFieldBegin("stageId", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.stageId);
            output.writeFieldEnd();
        }
        if (this.seqNum != null) {
            output.writeFieldBegin("seqNum", thrift.Thrift.Type.I32, 3);
            output.writeI32(this.seqNum);
            output.writeFieldEnd();
        }
        if (this.accessRule != null) {
            output.writeFieldBegin("accessRule", thrift.Thrift.Type.STRUCT, 4);
            this.accessRule.write(output);
            output.writeFieldEnd();
        }
        if (this.contentHolder != null) {
            output.writeFieldBegin("contentHolder", thrift.Thrift.Type.STRUCT, 5);
            this.contentHolder.write(output);
            output.writeFieldEnd();
        }
        if (this.allowEdit != null) {
            output.writeFieldBegin("allowEdit", thrift.Thrift.Type.BOOL, 6);
            output.writeBool(this.allowEdit);
            output.writeFieldEnd();
        }
        if (this.linkId != null) {
            output.writeFieldBegin("linkId", thrift.Thrift.Type.STRING, 7);
            output.writeString(this.linkId);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): ContentHolderShowPlace {
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
                        _args.stageId = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_3: number = input.readI32();
                        _args.seqNum = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_4: AccessRule.AccessRule = AccessRule.AccessRule.read(input);
                        _args.accessRule = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_5: ContentHolder.ContentHolder = ContentHolder.ContentHolder.read(input);
                        _args.contentHolder = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_6: boolean = input.readBool();
                        _args.allowEdit = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_7: string = input.readString();
                        _args.linkId = value_7;
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
        return new ContentHolderShowPlace(_args);
    }
}
