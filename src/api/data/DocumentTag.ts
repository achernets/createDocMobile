/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as DocumentTagType from "./DocumentTagType";
export interface IDocumentTagArgs {
    id?: string;
    userId?: string;
    tagName?: string;
    tagKey?: string;
    tagOrder?: number;
    tagType?: DocumentTagType.DocumentTagType;
    tagColor?: string;
}
export class DocumentTag {
    public id?: string;
    public userId?: string;
    public tagName?: string;
    public tagKey?: string;
    public tagOrder?: number;
    public tagType?: DocumentTagType.DocumentTagType;
    public tagColor?: string;
    constructor(args?: IDocumentTagArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.userId != null) {
            this.userId = args.userId;
        }
        if (args != null && args.tagName != null) {
            this.tagName = args.tagName;
        }
        if (args != null && args.tagKey != null) {
            this.tagKey = args.tagKey;
        }
        if (args != null && args.tagOrder != null) {
            this.tagOrder = args.tagOrder;
        }
        if (args != null && args.tagType != null) {
            this.tagType = args.tagType;
        }
        if (args != null && args.tagColor != null) {
            this.tagColor = args.tagColor;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("DocumentTag");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.userId != null) {
            output.writeFieldBegin("userId", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.userId);
            output.writeFieldEnd();
        }
        if (this.tagName != null) {
            output.writeFieldBegin("tagName", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.tagName);
            output.writeFieldEnd();
        }
        if (this.tagKey != null) {
            output.writeFieldBegin("tagKey", thrift.Thrift.Type.STRING, 4);
            output.writeString(this.tagKey);
            output.writeFieldEnd();
        }
        if (this.tagOrder != null) {
            output.writeFieldBegin("tagOrder", thrift.Thrift.Type.I32, 5);
            output.writeI32(this.tagOrder);
            output.writeFieldEnd();
        }
        if (this.tagType != null) {
            output.writeFieldBegin("tagType", thrift.Thrift.Type.I32, 6);
            output.writeI32(this.tagType);
            output.writeFieldEnd();
        }
        if (this.tagColor != null) {
            output.writeFieldBegin("tagColor", thrift.Thrift.Type.STRING, 7);
            output.writeString(this.tagColor);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): DocumentTag {
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
                        _args.userId = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.tagName = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_4: string = input.readString();
                        _args.tagKey = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_5: number = input.readI32();
                        _args.tagOrder = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_6: DocumentTagType.DocumentTagType = input.readI32();
                        _args.tagType = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_7: string = input.readString();
                        _args.tagColor = value_7;
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
        return new DocumentTag(_args);
    }
}
