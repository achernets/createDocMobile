/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as __ROOT_NAMESPACE__ from "./";
import * as HBSettings from "./HBSettings";
export interface IDiffStateArgs {
    user?: __ROOT_NAMESPACE__.UserOrGroup;
    group?: __ROOT_NAMESPACE__.UserOrGroup;
    availableStage?: __ROOT_NAMESPACE__.AvailablePatternStage;
    contentItem?: __ROOT_NAMESPACE__.ContentItem;
    nomenclatureNumber?: __ROOT_NAMESPACE__.NomenclatureNumber;
    hbSettings?: HBSettings.HBSettings;
}
export class DiffState {
    public user?: __ROOT_NAMESPACE__.UserOrGroup;
    public group?: __ROOT_NAMESPACE__.UserOrGroup;
    public availableStage?: __ROOT_NAMESPACE__.AvailablePatternStage;
    public contentItem?: __ROOT_NAMESPACE__.ContentItem;
    public nomenclatureNumber?: __ROOT_NAMESPACE__.NomenclatureNumber;
    public hbSettings?: HBSettings.HBSettings;
    constructor(args?: IDiffStateArgs) {
        if (args != null && args.user != null) {
            this.user = args.user;
        }
        if (args != null && args.group != null) {
            this.group = args.group;
        }
        if (args != null && args.availableStage != null) {
            this.availableStage = args.availableStage;
        }
        if (args != null && args.contentItem != null) {
            this.contentItem = args.contentItem;
        }
        if (args != null && args.nomenclatureNumber != null) {
            this.nomenclatureNumber = args.nomenclatureNumber;
        }
        if (args != null && args.hbSettings != null) {
            this.hbSettings = args.hbSettings;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("DiffState");
        if (this.user != null) {
            output.writeFieldBegin("user", thrift.Thrift.Type.STRUCT, 1);
            this.user.write(output);
            output.writeFieldEnd();
        }
        if (this.group != null) {
            output.writeFieldBegin("group", thrift.Thrift.Type.STRUCT, 2);
            this.group.write(output);
            output.writeFieldEnd();
        }
        if (this.availableStage != null) {
            output.writeFieldBegin("availableStage", thrift.Thrift.Type.STRUCT, 3);
            this.availableStage.write(output);
            output.writeFieldEnd();
        }
        if (this.contentItem != null) {
            output.writeFieldBegin("contentItem", thrift.Thrift.Type.STRUCT, 4);
            this.contentItem.write(output);
            output.writeFieldEnd();
        }
        if (this.nomenclatureNumber != null) {
            output.writeFieldBegin("nomenclatureNumber", thrift.Thrift.Type.STRUCT, 5);
            this.nomenclatureNumber.write(output);
            output.writeFieldEnd();
        }
        if (this.hbSettings != null) {
            output.writeFieldBegin("hbSettings", thrift.Thrift.Type.STRUCT, 6);
            this.hbSettings.write(output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): DiffState {
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
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_1: __ROOT_NAMESPACE__.UserOrGroup = __ROOT_NAMESPACE__.UserOrGroup.read(input);
                        _args.user = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_2: __ROOT_NAMESPACE__.UserOrGroup = __ROOT_NAMESPACE__.UserOrGroup.read(input);
                        _args.group = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_3: __ROOT_NAMESPACE__.AvailablePatternStage = __ROOT_NAMESPACE__.AvailablePatternStage.read(input);
                        _args.availableStage = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_4: __ROOT_NAMESPACE__.ContentItem = __ROOT_NAMESPACE__.ContentItem.read(input);
                        _args.contentItem = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_5: __ROOT_NAMESPACE__.NomenclatureNumber = __ROOT_NAMESPACE__.NomenclatureNumber.read(input);
                        _args.nomenclatureNumber = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.STRUCT) {
                        const value_6: HBSettings.HBSettings = HBSettings.HBSettings.read(input);
                        _args.hbSettings = value_6;
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
        return new DiffState(_args);
    }
}
