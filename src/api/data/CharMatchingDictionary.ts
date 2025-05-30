/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
export interface ICharMatchingDictionaryArgs {
    id?: string;
    charSource?: string;
    charReplace?: string;
}
export class CharMatchingDictionary {
    public id?: string;
    public charSource?: string;
    public charReplace?: string;
    constructor(args?: ICharMatchingDictionaryArgs) {
        if (args != null && args.id != null) {
            this.id = args.id;
        }
        if (args != null && args.charSource != null) {
            this.charSource = args.charSource;
        }
        if (args != null && args.charReplace != null) {
            this.charReplace = args.charReplace;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("CharMatchingDictionary");
        if (this.id != null) {
            output.writeFieldBegin("id", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.id);
            output.writeFieldEnd();
        }
        if (this.charSource != null) {
            output.writeFieldBegin("charSource", thrift.Thrift.Type.STRING, 2);
            output.writeString(this.charSource);
            output.writeFieldEnd();
        }
        if (this.charReplace != null) {
            output.writeFieldBegin("charReplace", thrift.Thrift.Type.STRING, 3);
            output.writeString(this.charReplace);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): CharMatchingDictionary {
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
                        _args.charSource = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        const value_3: string = input.readString();
                        _args.charReplace = value_3;
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
        return new CharMatchingDictionary(_args);
    }
}
