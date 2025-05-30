/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as __ROOT_NAMESPACE__ from "./";
export interface IAttachmentVersionInfoArgs {
    id?: string;
    status?: __ROOT_NAMESPACE__.AttachmentStatus;
    precalculatedRank?: number;
    uploadStatus?: __ROOT_NAMESPACE__.AttachmentUploadStatus;
    processingStatus?: __ROOT_NAMESPACE__.AttachmentProcessingStatus;
}
export class AttachmentVersionInfo {
    public id?: string;
    public status?: __ROOT_NAMESPACE__.AttachmentStatus;
    public precalculatedRank?: number;
    public uploadStatus?: __ROOT_NAMESPACE__.AttachmentUploadStatus;
    public processingStatus?: __ROOT_NAMESPACE__.AttachmentProcessingStatus;
    constructor(args?: IAttachmentVersionInfoArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.status != null) {
            this.status = args.status;
        }
        if (args != null && args.precalculatedRank != null) {
            this.precalculatedRank = args.precalculatedRank;
        }
        if (args != null && args.uploadStatus != null) {
            this.uploadStatus = args.uploadStatus;
        }
        if (args != null && args.processingStatus != null) {
            this.processingStatus = args.processingStatus;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("AttachmentVersionInfo");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.status != null) {
            output.writeFieldBegin("status", thrift.Thrift.Type.I32, 2);
            output.writeI32(this.status);
            output.writeFieldEnd();
        }
        if (this.precalculatedRank != null) {
            output.writeFieldBegin("precalculatedRank", thrift.Thrift.Type.I32, 3);
            output.writeI32(this.precalculatedRank);
            output.writeFieldEnd();
        }
        if (this.uploadStatus != null) {
            output.writeFieldBegin("uploadStatus", thrift.Thrift.Type.I32, 4);
            output.writeI32(this.uploadStatus);
            output.writeFieldEnd();
        }
        if (this.processingStatus != null) {
            output.writeFieldBegin("processingStatus", thrift.Thrift.Type.I32, 5);
            output.writeI32(this.processingStatus);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): AttachmentVersionInfo {
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
                        const value_2: __ROOT_NAMESPACE__.AttachmentStatus = input.readI32();
                        _args.status = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_3: number = input.readI32();
                        _args.precalculatedRank = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_4: __ROOT_NAMESPACE__.AttachmentUploadStatus = input.readI32();
                        _args.uploadStatus = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_5: __ROOT_NAMESPACE__.AttachmentProcessingStatus = input.readI32();
                        _args.processingStatus = value_5;
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
        return new AttachmentVersionInfo(_args);
    }
}
