/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as ExtSignServerDevice from "./ExtSignServerDevice";
export interface IExtSignServerArgs {
    serviceKey?: string;
    serviceDescription?: string;
    applicationKey?: string;
    applicationDescription?: string;
    maxOnceSign?: number;
    devices?: Array<ExtSignServerDevice.ExtSignServerDevice>;
}
export class ExtSignServer {
    public serviceKey?: string;
    public serviceDescription?: string;
    public applicationKey?: string;
    public applicationDescription?: string;
    public maxOnceSign?: number;
    public devices?: Array<ExtSignServerDevice.ExtSignServerDevice>;
    constructor(args?: IExtSignServerArgs) {
        if (args != null && args.serviceKey != null) {
            this.serviceKey = args.serviceKey;
        }
        if (args != null && args.serviceDescription != null) {
            this.serviceDescription = args.serviceDescription;
        }
        if (args != null && args.applicationKey != null) {
            this.applicationKey = args.applicationKey;
        }
        if (args != null && args.applicationDescription != null) {
            this.applicationDescription = args.applicationDescription;
        }
        if (args != null && args.maxOnceSign != null) {
            this.maxOnceSign = args.maxOnceSign;
        }
        if (args != null && args.devices != null) {
            this.devices = args.devices;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("ExtSignServer");
        if (this.serviceKey != null) {
            output.writeFieldBegin("serviceKey", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.serviceKey);
            output.writeFieldEnd();
        }
        if (this.serviceDescription != null) {
            output.writeFieldBegin("serviceDescription", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.serviceDescription);
            output.writeFieldEnd();
        }
        if (this.applicationKey != null) {
            output.writeFieldBegin("applicationKey", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.applicationKey);
            output.writeFieldEnd();
        }
        if (this.applicationDescription != null) {
            output.writeFieldBegin("applicationDescription", thrift.Thrift.Type.STRING, 4);
            output.writeString(this.applicationDescription);
            output.writeFieldEnd();
        }
        if (this.maxOnceSign != null) {
            output.writeFieldBegin("maxOnceSign", thrift.Thrift.Type.I32, 5);
            output.writeI32(this.maxOnceSign);
            output.writeFieldEnd();
        }
        if (this.devices != null) {
            output.writeFieldBegin("devices", thrift.Thrift.Type.LIST, 6);
            output.writeListBegin(thrift.Thrift.Type.STRUCT, this.devices.length);
            this.devices.forEach((value_1: ExtSignServerDevice.ExtSignServerDevice): void => {
                value_1.write(output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): ExtSignServer {
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
                        _args.serviceKey = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.serviceDescription = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_4: string = input.readString();
                        _args.applicationKey = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_5: string = input.readString();
                        _args.applicationDescription = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_6: number = input.readI32();
                        _args.maxOnceSign = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_7: Array<ExtSignServerDevice.ExtSignServerDevice> = new Array<ExtSignServerDevice.ExtSignServerDevice>();
                        const metadata_1: thrift.TList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_8: ExtSignServerDevice.ExtSignServerDevice = ExtSignServerDevice.ExtSignServerDevice.read(input);
                            value_7.push(value_8);
                        }
                        input.readListEnd();
                        _args.devices = value_7;
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
        return new ExtSignServer(_args);
    }
}
