/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import { Int64 } from "thrift";
import * as thrift from "thrift";
import * as LicenseModule from "./LicenseModule";
export interface ILicenseModulePageArgs {
    licenseList?: Array<LicenseModule.LicenseModule>;
    totalCount?: number | Int64;
}
export class LicenseModulePage {
    public licenseList?: Array<LicenseModule.LicenseModule>;
    public totalCount?: Int64;
    constructor(args?: ILicenseModulePageArgs) {
        if (args != null && args.licenseList != null) {
            this.licenseList = args.licenseList;
        }
        if (args != null && args.totalCount != null) {
            if (typeof args.totalCount === "number") {
                this.totalCount = new Int64(args.totalCount);
            }
            else {
                this.totalCount = args.totalCount;
            }
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("LicenseModulePage");
        if (this.licenseList != null) {
            output.writeFieldBegin("licenseList", thrift.Thrift.Type.LIST, 1);
            output.writeListBegin(thrift.Thrift.Type.STRUCT, this.licenseList.length);
            this.licenseList.forEach((value_1: LicenseModule.LicenseModule): void => {
                value_1.write(output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (this.totalCount != null) {
            output.writeFieldBegin("totalCount", thrift.Thrift.Type.I64, 2);
            output.writeI64(this.totalCount);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): LicenseModulePage {
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
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_2: Array<LicenseModule.LicenseModule> = new Array<LicenseModule.LicenseModule>();
                        const metadata_1: thrift.TList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_3: LicenseModule.LicenseModule = LicenseModule.LicenseModule.read(input);
                            value_2.push(value_3);
                        }
                        input.readListEnd();
                        _args.licenseList = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.I64) {
                        const value_4: Int64 = input.readI64();
                        _args.totalCount = value_4;
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
        return new LicenseModulePage(_args);
    }
}
