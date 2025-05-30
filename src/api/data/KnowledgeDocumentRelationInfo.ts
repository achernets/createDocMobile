/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as KnowledgeDocumentStatus from "./KnowledgeDocumentStatus";
export interface IKnowledgeDocumentRelationInfoArgs {
    id?: string;
    name?: string;
    status?: KnowledgeDocumentStatus.KnowledgeDocumentStatus;
}
export class KnowledgeDocumentRelationInfo {
    public id?: string;
    public name?: string;
    public status?: KnowledgeDocumentStatus.KnowledgeDocumentStatus;
    constructor(args?: IKnowledgeDocumentRelationInfoArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.name != null) {
            this.name = args.name;
        }
        if (args != null && args.status != null) {
            this.status = args.status;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("KnowledgeDocumentRelationInfo");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.name != null) {
            output.writeFieldBegin("name", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.name);
            output.writeFieldEnd();
        }
        if (this.status != null) {
            output.writeFieldBegin("status", thrift.Thrift.Type.I32, 3);
            output.writeI32(this.status);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): KnowledgeDocumentRelationInfo {
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
                        _args.name = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_3: KnowledgeDocumentStatus.KnowledgeDocumentStatus = input.readI32();
                        _args.status = value_3;
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
        return new KnowledgeDocumentRelationInfo(_args);
    }
}
