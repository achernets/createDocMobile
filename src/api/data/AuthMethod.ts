/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as AuthType from "./AuthType";
export interface IAuthMethodArgs {
    type?: AuthType.AuthType;
    authServiceKey?: string;
    authServiceName?: string;
    authServiceNameLoc?: Map<string, string>;
    url?: string;
    subUrl?: string;
    bodyParams?: Map<string, string>;
    useByDefault?: boolean;
    usePasswordOperations?: boolean;
    logOutUrl?: string;
}
export class AuthMethod {
    public type?: AuthType.AuthType;
    public authServiceKey?: string;
    public authServiceName?: string;
    public authServiceNameLoc?: Map<string, string>;
    public url?: string;
    public subUrl?: string;
    public bodyParams?: Map<string, string>;
    public useByDefault?: boolean;
    public usePasswordOperations?: boolean;
    public logOutUrl?: string;
    constructor(args?: IAuthMethodArgs) {
        if (args != null && args.type != null) {
            this.type = args.type;
        }
        if (args != null && args.authServiceKey != null) {
            this.authServiceKey = args.authServiceKey;
        }
        if (args != null && args.authServiceName != null) {
            this.authServiceName = args.authServiceName;
        }
        if (args != null && args.authServiceNameLoc != null) {
            this.authServiceNameLoc = args.authServiceNameLoc;
        }
        if (args != null && args.url != null) {
            this.url = args.url;
        }
        if (args != null && args.subUrl != null) {
            this.subUrl = args.subUrl;
        }
        if (args != null && args.bodyParams != null) {
            this.bodyParams = args.bodyParams;
        }
        if (args != null && args.useByDefault != null) {
            this.useByDefault = args.useByDefault;
        }
        if (args != null && args.usePasswordOperations != null) {
            this.usePasswordOperations = args.usePasswordOperations;
        }
        if (args != null && args.logOutUrl != null) {
            this.logOutUrl = args.logOutUrl;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("AuthMethod");
        if (this.type != null) {
            output.writeFieldBegin("type", thrift.Thrift.Type.I32, 1);
            output.writeI32(this.type);
            output.writeFieldEnd();
        }
        if (this.authServiceKey != null) {
            output.writeFieldBegin("authServiceKey", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.authServiceKey);
            output.writeFieldEnd();
        }
        if (this.authServiceName != null) {
            output.writeFieldBegin("authServiceName", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.authServiceName);
            output.writeFieldEnd();
        }
        if (this.authServiceNameLoc != null) {
            output.writeFieldBegin("authServiceNameLoc", thrift.Thrift.Type.MAP, 4);
            output.writeMapBegin(thrift.Thrift.Type.STRING, thrift.Thrift.Type.STRING, this.authServiceNameLoc.size);
            this.authServiceNameLoc.forEach((value_1: string, key_1: string): void => {
                output.writeString(key_1);
                output.writeString(value_1);
            });
            output.writeMapEnd();
            output.writeFieldEnd();
        }
        if (this.url != null) {
            output.writeFieldBegin("url", thrift.Thrift.Type.STRING, 5);
            output.writeString(this.url);
            output.writeFieldEnd();
        }
        if (this.subUrl != null) {
            output.writeFieldBegin("subUrl", thrift.Thrift.Type.STRING, 6);
            output.writeString(this.subUrl);
            output.writeFieldEnd();
        }
        if (this.bodyParams != null) {
            output.writeFieldBegin("bodyParams", thrift.Thrift.Type.MAP, 7);
            output.writeMapBegin(thrift.Thrift.Type.STRING, thrift.Thrift.Type.STRING, this.bodyParams.size);
            this.bodyParams.forEach((value_2: string, key_2: string): void => {
                output.writeString(key_2);
                output.writeString(value_2);
            });
            output.writeMapEnd();
            output.writeFieldEnd();
        }
        if (this.useByDefault != null) {
            output.writeFieldBegin("useByDefault", thrift.Thrift.Type.BOOL, 8);
            output.writeBool(this.useByDefault);
            output.writeFieldEnd();
        }
        if (this.usePasswordOperations != null) {
            output.writeFieldBegin("usePasswordOperations", thrift.Thrift.Type.BOOL, 9);
            output.writeBool(this.usePasswordOperations);
            output.writeFieldEnd();
        }
        if (this.logOutUrl != null) {
            output.writeFieldBegin("logOutUrl", thrift.Thrift.Type.STRING, 10);
            output.writeString(this.logOutUrl);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): AuthMethod {
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
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_3: AuthType.AuthType = input.readI32();
                        _args.type = value_3;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_4: string = input.readString();
                        _args.authServiceKey = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_5: string = input.readString();
                        _args.authServiceName = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.MAP) {
                        const value_6: Map<string, string> = new Map<string, string>();
                        const metadata_1: thrift.TMap = input.readMapBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const key_3: string = input.readString();
                            const value_7: string = input.readString();
                            value_6.set(key_3, value_7);
                        }
                        input.readMapEnd();
                        _args.authServiceNameLoc = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_8: string = input.readString();
                        _args.url = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_9: string = input.readString();
                        _args.subUrl = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.Thrift.Type.MAP) {
                        const value_10: Map<string, string> = new Map<string, string>();
                        const metadata_2: thrift.TMap = input.readMapBegin();
                        const size_2: number = metadata_2.size;
                        for (let i_2: number = 0; i_2 < size_2; i_2++) {
                            const key_4: string = input.readString();
                            const value_11: string = input.readString();
                            value_10.set(key_4, value_11);
                        }
                        input.readMapEnd();
                        _args.bodyParams = value_10;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_12: boolean = input.readBool();
                        _args.useByDefault = value_12;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.Thrift.Type.BOOL) {
                        const value_13: boolean = input.readBool();
                        _args.usePasswordOperations = value_13;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_14: string = input.readString();
                        _args.logOutUrl = value_14;
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
        return new AuthMethod(_args);
    }
}
