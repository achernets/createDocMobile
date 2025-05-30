/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
export interface IBulkSignInfoArgs {
    id?: string;
    totalAtt?: number;
    totalDocs?: number;
    isNew?: boolean;
}
export class BulkSignInfo {
    public id?: string;
    public totalAtt?: number;
    public totalDocs?: number;
    public isNew?: boolean;
    constructor(args?: IBulkSignInfoArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.totalAtt != null) {
            this.totalAtt = args.totalAtt;
        }
        if (args != null && args.totalDocs != null) {
            this.totalDocs = args.totalDocs;
        }
        if (args != null && args.isNew != null) {
            this.isNew = args.isNew;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("BulkSignInfo");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.totalAtt != null) {
            output.writeFieldBegin("totalAtt", thrift.Thrift.Type.I32, 2);
            output.writeI32(this.totalAtt);
            output.writeFieldEnd();
        }
        if (this.totalDocs != null) {
            output.writeFieldBegin("totalDocs", thrift.Thrift.Type.I32, 3);
            output.writeI32(this.totalDocs);
            output.writeFieldEnd();
        }
        if (this.isNew != null) {
            output.writeFieldBegin("isNew", thrift.Thrift.Type.BOOL, 4);
            output.writeBool(this.isNew);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): BulkSignInfo {
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
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_2: number = input.readI32();
                        _args.totalAtt = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_3: number = input.readI32();
                        _args.totalDocs = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_4: boolean = input.readBool();
                        _args.isNew = value_4;
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
        return new BulkSignInfo(_args);
    }
}
