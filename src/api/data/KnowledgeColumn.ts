/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
export interface IKnowledgeColumnArgs {
    id?: string;
    field?: string;
    displayName?: string;
    displayNameLoc?: Map<string, string>;
    enableSorting?: boolean;
    visible?: boolean;
    width?: string;
    color?: string;
    columnOrder?: number;
    isDefault?: boolean;
}
export class KnowledgeColumn {
    public id?: string;
    public field?: string;
    public displayName?: string;
    public displayNameLoc?: Map<string, string>;
    public enableSorting?: boolean;
    public visible?: boolean;
    public width?: string;
    public color?: string;
    public columnOrder?: number;
    public isDefault?: boolean;
    constructor(args?: IKnowledgeColumnArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.field != null) {
            this.field = args.field;
        }
        if (args != null && args.displayName != null) {
            this.displayName = args.displayName;
        }
        if (args != null && args.displayNameLoc != null) {
            this.displayNameLoc = args.displayNameLoc;
        }
        if (args != null && args.enableSorting != null) {
            this.enableSorting = args.enableSorting;
        }
        if (args != null && args.visible != null) {
            this.visible = args.visible;
        }
        if (args != null && args.width != null) {
            this.width = args.width;
        }
        if (args != null && args.color != null) {
            this.color = args.color;
        }
        if (args != null && args.columnOrder != null) {
            this.columnOrder = args.columnOrder;
        }
        if (args != null && args.isDefault != null) {
            this.isDefault = args.isDefault;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("KnowledgeColumn");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.field != null) {
            output.writeFieldBegin("field", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.field);
            output.writeFieldEnd();
        }
        if (this.displayName != null) {
            output.writeFieldBegin("displayName", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.displayName);
            output.writeFieldEnd();
        }
        if (this.displayNameLoc != null) {
            output.writeFieldBegin("displayNameLoc", thrift.Thrift.Type.MAP, 4);
            output.writeMapBegin(thrift.Thrift.Type.STRING, thrift.Thrift.Type.STRING, this.displayNameLoc.size);
            this.displayNameLoc.forEach((value_1: string, key_1: string): void => {
                output.writeString(key_1);
                output.writeString(value_1);
            });
            output.writeMapEnd();
            output.writeFieldEnd();
        }
        if (this.enableSorting != null) {
            output.writeFieldBegin("enableSorting", thrift.Thrift.Type.BOOL, 5);
            output.writeBool(this.enableSorting);
            output.writeFieldEnd();
        }
        if (this.visible != null) {
            output.writeFieldBegin("visible", thrift.Thrift.Type.BOOL, 6);
            output.writeBool(this.visible);
            output.writeFieldEnd();
        }
        if (this.width != null) {
            output.writeFieldBegin("width", thrift.Thrift.Type.STRING, 7);
            output.writeString(this.width);
            output.writeFieldEnd();
        }
        if (this.color != null) {
            output.writeFieldBegin("color", thrift.Thrift.Type.STRING, 8);
            output.writeString(this.color);
            output.writeFieldEnd();
        }
        if (this.columnOrder != null) {
            output.writeFieldBegin("columnOrder", thrift.Thrift.Type.I32, 9);
            output.writeI32(this.columnOrder);
            output.writeFieldEnd();
        }
        if (this.isDefault != null) {
            output.writeFieldBegin("isDefault", thrift.Thrift.Type.BOOL, 10);
            output.writeBool(this.isDefault);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): KnowledgeColumn {
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
                        const value_2: string = input.readString();
                        _args.id = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.field = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_4: string = input.readString();
                        _args.displayName = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.MAP) {
                        const value_5: Map<string, string> = new Map<string, string>();
                        const metadata_1: thrift.TMap = input.readMapBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const key_2: string = input.readString();
                            const value_6: string = input.readString();
                            value_5.set(key_2, value_6);
                        }
                        input.readMapEnd();
                        _args.displayNameLoc = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_7: boolean = input.readBool();
                        _args.enableSorting = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_8: boolean = input.readBool();
                        _args.visible = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_9: string = input.readString();
                        _args.width = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_10: string = input.readString();
                        _args.color = value_10;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_11: number = input.readI32();
                        _args.columnOrder = value_11;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_12: boolean = input.readBool();
                        _args.isDefault = value_12;
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
        return new KnowledgeColumn(_args);
    }
}
