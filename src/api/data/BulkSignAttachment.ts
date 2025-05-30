/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as __ROOT_NAMESPACE__ from "./";
import * as BulkStatus from "./BulkStatus";
export interface IBulkSignAttachmentArgs {
    id?: string;
    attachmentId?: string;
    attachmentName?: string;
    attachmentExtStatus?: __ROOT_NAMESPACE__.AttachmentExtStatus;
    attachmentAuthor?: __ROOT_NAMESPACE__.UserOrGroup;
    bulkAttStatus?: BulkStatus.BulkStatus;
    bulkError?: string;
}
export class BulkSignAttachment {
    public id?: string;
    public attachmentId?: string;
    public attachmentName?: string;
    public attachmentExtStatus?: __ROOT_NAMESPACE__.AttachmentExtStatus;
    public attachmentAuthor?: __ROOT_NAMESPACE__.UserOrGroup;
    public bulkAttStatus?: BulkStatus.BulkStatus;
    public bulkError?: string;
    constructor(args?: IBulkSignAttachmentArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.attachmentId != null) {
            this.attachmentId = args.attachmentId;
        }
        if (args != null && args.attachmentName != null) {
            this.attachmentName = args.attachmentName;
        }
        if (args != null && args.attachmentExtStatus != null) {
            this.attachmentExtStatus = args.attachmentExtStatus;
        }
        if (args != null && args.attachmentAuthor != null) {
            this.attachmentAuthor = args.attachmentAuthor;
        }
        if (args != null && args.bulkAttStatus != null) {
            this.bulkAttStatus = args.bulkAttStatus;
        }
        if (args != null && args.bulkError != null) {
            this.bulkError = args.bulkError;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("BulkSignAttachment");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.attachmentId != null) {
            output.writeFieldBegin("attachmentId", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.attachmentId);
            output.writeFieldEnd();
        }
        if (this.attachmentName != null) {
            output.writeFieldBegin("attachmentName", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.attachmentName);
            output.writeFieldEnd();
        }
        if (this.attachmentExtStatus != null) {
            output.writeFieldBegin("attachmentExtStatus", thrift.Thrift.Type.I32, 4);
            output.writeI32(this.attachmentExtStatus);
            output.writeFieldEnd();
        }
        if (this.attachmentAuthor != null) {
            output.writeFieldBegin("attachmentAuthor", thrift.Thrift.Type.STRUCT, 5);
            this.attachmentAuthor.write(output);
            output.writeFieldEnd();
        }
        if (this.bulkAttStatus != null) {
            output.writeFieldBegin("bulkAttStatus", thrift.Thrift.Type.I32, 6);
            output.writeI32(this.bulkAttStatus);
            output.writeFieldEnd();
        }
        if (this.bulkError != null) {
            output.writeFieldBegin("bulkError", thrift.Thrift.Type.STRING, 7);
            output.writeString(this.bulkError);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): BulkSignAttachment {
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
                        _args.attachmentId = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.attachmentName = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_4: __ROOT_NAMESPACE__.AttachmentExtStatus = input.readI32();
                        _args.attachmentExtStatus = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_5: __ROOT_NAMESPACE__.UserOrGroup = __ROOT_NAMESPACE__.UserOrGroup.read(input);
                        _args.attachmentAuthor = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_6: BulkStatus.BulkStatus = input.readI32();
                        _args.bulkAttStatus = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_7: string = input.readString();
                        _args.bulkError = value_7;
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
        return new BulkSignAttachment(_args);
    }
}
