/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import { Int64 } from "thrift";
import * as thrift from "thrift";
import * as AttachmentType from "./AttachmentType";
import * as __ROOT_NAMESPACE__ from "./";
import * as AttachmentPermissions from "./AttachmentPermissions";
import * as AttachmentAccessMode from "./AttachmentAccessMode";
import * as AttachmentVersionInfo from "./AttachmentVersionInfo";
export interface IAttachmentArgs {
    id?: string;
    documentId?: string;
    fileName?: string;
    createDate?: number | Int64;
    attHash?: string;
    preview?: Array<AttachmentType.AttachmentType>;
    creatorId?: string;
    creator?: __ROOT_NAMESPACE__.UserOrGroup;
    size?: number | Int64;
    status?: __ROOT_NAMESPACE__.AttachmentStatus;
    stageId?: string;
    hasDigitalSign?: boolean;
    docExecId?: string;
    autoReplacement?: boolean;
    originalUserId?: string;
    originalUser?: __ROOT_NAMESPACE__.UserOrGroup;
    forDraft?: boolean;
    waitForPublish?: boolean;
    fVersion?: number | Int64;
    iteration?: number;
    attachmentPermissions?: AttachmentPermissions.AttachmentPermissions;
    versionCount?: number;
    fType?: __ROOT_NAMESPACE__.FileType;
    accessMode?: AttachmentAccessMode.AttachmentAccessMode;
    editMode?: __ROOT_NAMESPACE__.AttachmentEditMode;
    externalId?: string;
    attachmentExtStatus?: __ROOT_NAMESPACE__.AttachmentExtStatus;
    versionInfo?: Array<AttachmentVersionInfo.AttachmentVersionInfo>;
    patternAttachmentTemplateId?: string;
    isHidden?: boolean;
    signCertKeys?: Set<string>;
    autoAdd?: boolean;
    order?: number;
    uploadStatus?: __ROOT_NAMESPACE__.AttachmentUploadStatus;
    processingStatus?: __ROOT_NAMESPACE__.AttachmentProcessingStatus;
}
export class Attachment {
    public id?: string;
    public documentId?: string;
    public fileName?: string;
    public createDate?: Int64;
    public attHash?: string;
    public preview?: Array<AttachmentType.AttachmentType>;
    public creatorId?: string;
    public creator?: __ROOT_NAMESPACE__.UserOrGroup;
    public size?: Int64;
    public status?: __ROOT_NAMESPACE__.AttachmentStatus;
    public stageId?: string;
    public hasDigitalSign?: boolean;
    public docExecId?: string;
    public autoReplacement?: boolean;
    public originalUserId?: string;
    public originalUser?: __ROOT_NAMESPACE__.UserOrGroup;
    public forDraft?: boolean;
    public waitForPublish?: boolean;
    public fVersion?: Int64;
    public iteration?: number;
    public attachmentPermissions?: AttachmentPermissions.AttachmentPermissions;
    public versionCount?: number;
    public fType?: __ROOT_NAMESPACE__.FileType;
    public accessMode?: AttachmentAccessMode.AttachmentAccessMode;
    public editMode?: __ROOT_NAMESPACE__.AttachmentEditMode;
    public externalId?: string;
    public attachmentExtStatus?: __ROOT_NAMESPACE__.AttachmentExtStatus;
    public versionInfo?: Array<AttachmentVersionInfo.AttachmentVersionInfo>;
    public patternAttachmentTemplateId?: string;
    public isHidden?: boolean;
    public signCertKeys?: Set<string>;
    public autoAdd?: boolean;
    public order?: number;
    public uploadStatus?: __ROOT_NAMESPACE__.AttachmentUploadStatus;
    public processingStatus?: __ROOT_NAMESPACE__.AttachmentProcessingStatus;
    constructor(args?: IAttachmentArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.documentId != null) {
            this.documentId = args.documentId;
        }
        if (args != null && args.fileName != null) {
            this.fileName = args.fileName;
        }
        if (args != null && args.createDate != null) {
            if (typeof args.createDate === "number") {
                this.createDate = new Int64(args.createDate);
            }
            else {
                this.createDate = args.createDate;
            }
        }
        if (args != null && args.attHash != null) {
            this.attHash = args.attHash;
        }
        if (args != null && args.preview != null) {
            this.preview = args.preview;
        }
        if (args != null && args.creatorId != null) {
            this.creatorId = args.creatorId;
        }
        if (args != null && args.creator != null) {
            this.creator = args.creator;
        }
        if (args != null && args.size != null) {
            if (typeof args.size === "number") {
                this.size = new Int64(args.size);
            }
            else {
                this.size = args.size;
            }
        }
        if (args != null && args.status != null) {
            this.status = args.status;
        }
        if (args != null && args.stageId != null) {
            this.stageId = args.stageId;
        }
        if (args != null && args.hasDigitalSign != null) {
            this.hasDigitalSign = args.hasDigitalSign;
        }
        if (args != null && args.docExecId != null) {
            this.docExecId = args.docExecId;
        }
        if (args != null && args.autoReplacement != null) {
            this.autoReplacement = args.autoReplacement;
        }
        if (args != null && args.originalUserId != null) {
            this.originalUserId = args.originalUserId;
        }
        if (args != null && args.originalUser != null) {
            this.originalUser = args.originalUser;
        }
        if (args != null && args.forDraft != null) {
            this.forDraft = args.forDraft;
        }
        if (args != null && args.waitForPublish != null) {
            this.waitForPublish = args.waitForPublish;
        }
        if (args != null && args.fVersion != null) {
            if (typeof args.fVersion === "number") {
                this.fVersion = new Int64(args.fVersion);
            }
            else {
                this.fVersion = args.fVersion;
            }
        }
        if (args != null && args.iteration != null) {
            this.iteration = args.iteration;
        }
        if (args != null && args.attachmentPermissions != null) {
            this.attachmentPermissions = args.attachmentPermissions;
        }
        if (args != null && args.versionCount != null) {
            this.versionCount = args.versionCount;
        }
        if (args != null && args.fType != null) {
            this.fType = args.fType;
        }
        if (args != null && args.accessMode != null) {
            this.accessMode = args.accessMode;
        }
        if (args != null && args.editMode != null) {
            this.editMode = args.editMode;
        }
        if (args != null && args.externalId != null) {
            this.externalId = args.externalId;
        }
        if (args != null && args.attachmentExtStatus != null) {
            this.attachmentExtStatus = args.attachmentExtStatus;
        }
        if (args != null && args.versionInfo != null) {
            this.versionInfo = args.versionInfo;
        }
        if (args != null && args.patternAttachmentTemplateId != null) {
            this.patternAttachmentTemplateId = args.patternAttachmentTemplateId;
        }
        if (args != null && args.isHidden != null) {
            this.isHidden = args.isHidden;
        }
        if (args != null && args.signCertKeys != null) {
            this.signCertKeys = args.signCertKeys;
        }
        if (args != null && args.autoAdd != null) {
            this.autoAdd = args.autoAdd;
        }
        if (args != null && args.order != null) {
            this.order = args.order;
        }
        if (args != null && args.uploadStatus != null) {
            this.uploadStatus = args.uploadStatus;
        }
        if (args != null && args.processingStatus != null) {
            this.processingStatus = args.processingStatus;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("Attachment");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.documentId != null) {
            output.writeFieldBegin("documentId", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.documentId);
            output.writeFieldEnd();
        }
        if (this.fileName != null) {
            output.writeFieldBegin("fileName", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.fileName);
            output.writeFieldEnd();
        }
        if (this.createDate != null) {
            output.writeFieldBegin("createDate", thrift.Thrift.Type.I64, 4);
            output.writeI64(this.createDate);
            output.writeFieldEnd();
        }
        if (this.attHash != null) {
            output.writeFieldBegin("attHash", thrift.Thrift.Type.STRING, 5);
            output.writeString(this.attHash);
            output.writeFieldEnd();
        }
        if (this.preview != null) {
            output.writeFieldBegin("preview", thrift.Thrift.Type.LIST, 6);
            output.writeListBegin(thrift.Thrift.Type.I32, this.preview.length);
            this.preview.forEach((value_1: AttachmentType.AttachmentType): void => {
                output.writeI32(value_1);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (this.creatorId != null) {
            output.writeFieldBegin("creatorId", thrift.Thrift.Type.STRING, 7);
            output.writeString(this.creatorId);
            output.writeFieldEnd();
        }
        if (this.creator != null) {
            output.writeFieldBegin("creator", thrift.Thrift.Type.STRUCT, 8);
            this.creator.write(output);
            output.writeFieldEnd();
        }
        if (this.size != null) {
            output.writeFieldBegin("size", thrift.Thrift.Type.I64, 9);
            output.writeI64(this.size);
            output.writeFieldEnd();
        }
        if (this.status != null) {
            output.writeFieldBegin("status", thrift.Thrift.Type.I32, 10);
            output.writeI32(this.status);
            output.writeFieldEnd();
        }
        if (this.stageId != null) {
            output.writeFieldBegin("stageId", thrift.Thrift.Type.STRING, 11);
            output.writeString(this.stageId);
            output.writeFieldEnd();
        }
        if (this.hasDigitalSign != null) {
            output.writeFieldBegin("hasDigitalSign", thrift.Thrift.Type.BOOL, 12);
            output.writeBool(this.hasDigitalSign);
            output.writeFieldEnd();
        }
        if (this.docExecId != null) {
            output.writeFieldBegin("docExecId", thrift.Thrift.Type.STRING, 13);
            output.writeString(this.docExecId);
            output.writeFieldEnd();
        }
        if (this.autoReplacement != null) {
            output.writeFieldBegin("autoReplacement", thrift.Thrift.Type.BOOL, 14);
            output.writeBool(this.autoReplacement);
            output.writeFieldEnd();
        }
        if (this.originalUserId != null) {
            output.writeFieldBegin("originalUserId", thrift.Thrift.Type.STRING, 15);
            output.writeString(this.originalUserId);
            output.writeFieldEnd();
        }
        if (this.originalUser != null) {
            output.writeFieldBegin("originalUser", thrift.Thrift.Type.STRUCT, 16);
            this.originalUser.write(output);
            output.writeFieldEnd();
        }
        if (this.forDraft != null) {
            output.writeFieldBegin("forDraft", thrift.Thrift.Type.BOOL, 17);
            output.writeBool(this.forDraft);
            output.writeFieldEnd();
        }
        if (this.waitForPublish != null) {
            output.writeFieldBegin("waitForPublish", thrift.Thrift.Type.BOOL, 18);
            output.writeBool(this.waitForPublish);
            output.writeFieldEnd();
        }
        if (this.fVersion != null) {
            output.writeFieldBegin("fVersion", thrift.Thrift.Type.I64, 19);
            output.writeI64(this.fVersion);
            output.writeFieldEnd();
        }
        if (this.iteration != null) {
            output.writeFieldBegin("iteration", thrift.Thrift.Type.I32, 20);
            output.writeI32(this.iteration);
            output.writeFieldEnd();
        }
        if (this.attachmentPermissions != null) {
            output.writeFieldBegin("attachmentPermissions", thrift.Thrift.Type.STRUCT, 21);
            this.attachmentPermissions.write(output);
            output.writeFieldEnd();
        }
        if (this.versionCount != null) {
            output.writeFieldBegin("versionCount", thrift.Thrift.Type.I32, 22);
            output.writeI32(this.versionCount);
            output.writeFieldEnd();
        }
        if (this.fType != null) {
            output.writeFieldBegin("fType", thrift.Thrift.Type.I32, 23);
            output.writeI32(this.fType);
            output.writeFieldEnd();
        }
        if (this.accessMode != null) {
            output.writeFieldBegin("accessMode", thrift.Thrift.Type.I32, 24);
            output.writeI32(this.accessMode);
            output.writeFieldEnd();
        }
        if (this.editMode != null) {
            output.writeFieldBegin("editMode", thrift.Thrift.Type.I32, 25);
            output.writeI32(this.editMode);
            output.writeFieldEnd();
        }
        if (this.externalId != null) {
            output.writeFieldBegin("externalId", thrift.Thrift.Type.STRING, 26);
            output.writeString(this.externalId);
            output.writeFieldEnd();
        }
        if (this.attachmentExtStatus != null) {
            output.writeFieldBegin("attachmentExtStatus", thrift.Thrift.Type.I32, 28);
            output.writeI32(this.attachmentExtStatus);
            output.writeFieldEnd();
        }
        if (this.versionInfo != null) {
            output.writeFieldBegin("versionInfo", thrift.Thrift.Type.LIST, 29);
            output.writeListBegin(thrift.Thrift.Type.STRUCT, this.versionInfo.length);
            this.versionInfo.forEach((value_2: AttachmentVersionInfo.AttachmentVersionInfo): void => {
                value_2.write(output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (this.patternAttachmentTemplateId != null) {
            output.writeFieldBegin("patternAttachmentTemplateId", thrift.Thrift.Type.STRING, 30);
            output.writeString(this.patternAttachmentTemplateId);
            output.writeFieldEnd();
        }
        if (this.isHidden != null) {
            output.writeFieldBegin("isHidden", thrift.Thrift.Type.BOOL, 31);
            output.writeBool(this.isHidden);
            output.writeFieldEnd();
        }
        if (this.signCertKeys != null) {
            output.writeFieldBegin("signCertKeys", thrift.Thrift.Type.SET, 32);
            output.writeSetBegin(thrift.Thrift.Type.STRING, this.signCertKeys.size);
            this.signCertKeys.forEach((value_3: string): void => {
                output.writeString(value_3);
            });
            output.writeSetEnd();
            output.writeFieldEnd();
        }
        if (this.autoAdd != null) {
            output.writeFieldBegin("autoAdd", thrift.Thrift.Type.BOOL, 33);
            output.writeBool(this.autoAdd);
            output.writeFieldEnd();
        }
        if (this.order != null) {
            output.writeFieldBegin("order", thrift.Thrift.Type.I32, 34);
            output.writeI32(this.order);
            output.writeFieldEnd();
        }
        if (this.uploadStatus != null) {
            output.writeFieldBegin("uploadStatus", thrift.Thrift.Type.I32, 35);
            output.writeI32(this.uploadStatus);
            output.writeFieldEnd();
        }
        if (this.processingStatus != null) {
            output.writeFieldBegin("processingStatus", thrift.Thrift.Type.I32, 36);
            output.writeI32(this.processingStatus);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): Attachment {
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
                        const value_4: string = input.readString();
                        _args.id = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_5: string = input.readString();
                        _args.documentId = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_6: string = input.readString();
                        _args.fileName = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.I64) {
                        const value_7: Int64 = input.readI64();
                        _args.createDate = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_8: string = input.readString();
                        _args.attHash = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_9: Array<AttachmentType.AttachmentType> = new Array<AttachmentType.AttachmentType>();
                        const metadata_1: thrift.TList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_10: AttachmentType.AttachmentType = input.readI32();
                            value_9.push(value_10);
                        }
                        input.readListEnd();
                        _args.preview = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_11: string = input.readString();
                        _args.creatorId = value_11;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_12: __ROOT_NAMESPACE__.UserOrGroup = __ROOT_NAMESPACE__.UserOrGroup.read(input);
                        _args.creator = value_12;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.Thrift.Type.I64) {
                        const value_13: Int64 = input.readI64();
                        _args.size = value_13;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_14: __ROOT_NAMESPACE__.AttachmentStatus = input.readI32();
                        _args.status = value_14;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 11:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_15: string = input.readString();
                        _args.stageId = value_15;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 12:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_16: boolean = input.readBool();
                        _args.hasDigitalSign = value_16;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 13:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_17: string = input.readString();
                        _args.docExecId = value_17;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 14:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_18: boolean = input.readBool();
                        _args.autoReplacement = value_18;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 15:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_19: string = input.readString();
                        _args.originalUserId = value_19;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 16:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_20: __ROOT_NAMESPACE__.UserOrGroup = __ROOT_NAMESPACE__.UserOrGroup.read(input);
                        _args.originalUser = value_20;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 17:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_21: boolean = input.readBool();
                        _args.forDraft = value_21;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 18:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_22: boolean = input.readBool();
                        _args.waitForPublish = value_22;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 19:
                    if (fieldType === thrift.Thrift.Type.I64) {
                        const value_23: Int64 = input.readI64();
                        _args.fVersion = value_23;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 20:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_24: number = input.readI32();
                        _args.iteration = value_24;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 21:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_25: AttachmentPermissions.AttachmentPermissions = AttachmentPermissions.AttachmentPermissions.read(input);
                        _args.attachmentPermissions = value_25;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 22:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_26: number = input.readI32();
                        _args.versionCount = value_26;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 23:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_27: __ROOT_NAMESPACE__.FileType = input.readI32();
                        _args.fType = value_27;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 24:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_28: AttachmentAccessMode.AttachmentAccessMode = input.readI32();
                        _args.accessMode = value_28;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 25:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_29: __ROOT_NAMESPACE__.AttachmentEditMode = input.readI32();
                        _args.editMode = value_29;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 26:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_30: string = input.readString();
                        _args.externalId = value_30;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 28:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_31: __ROOT_NAMESPACE__.AttachmentExtStatus = input.readI32();
                        _args.attachmentExtStatus = value_31;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 29:
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_32: Array<AttachmentVersionInfo.AttachmentVersionInfo> = new Array<AttachmentVersionInfo.AttachmentVersionInfo>();
                        const metadata_2: thrift.TList = input.readListBegin();
                        const size_2: number = metadata_2.size;
                        for (let i_2: number = 0; i_2 < size_2; i_2++) {
                            const value_33: AttachmentVersionInfo.AttachmentVersionInfo = AttachmentVersionInfo.AttachmentVersionInfo.read(input);
                            value_32.push(value_33);
                        }
                        input.readListEnd();
                        _args.versionInfo = value_32;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 30:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_34: string = input.readString();
                        _args.patternAttachmentTemplateId = value_34;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 31:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_35: boolean = input.readBool();
                        _args.isHidden = value_35;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 32:
                    if (fieldType === thrift.Thrift.Type.SET) {
                        const value_36: Set<string> = new Set<string>();
                        const metadata_3: thrift.TSet = input.readSetBegin();
                        const size_3: number = metadata_3.size;
                        for (let i_3: number = 0; i_3 < size_3; i_3++) {
                            const value_37: string = input.readString();
                            value_36.add(value_37);
                        }
                        input.readSetEnd();
                        _args.signCertKeys = value_36;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 33:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_38: boolean = input.readBool();
                        _args.autoAdd = value_38;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 34:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_39: number = input.readI32();
                        _args.order = value_39;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 35:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_40: __ROOT_NAMESPACE__.AttachmentUploadStatus = input.readI32();
                        _args.uploadStatus = value_40;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 36:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_41: __ROOT_NAMESPACE__.AttachmentProcessingStatus = input.readI32();
                        _args.processingStatus = value_41;
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
        return new Attachment(_args);
    }
}
