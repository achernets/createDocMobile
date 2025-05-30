/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "thrift";
import * as FilterItem from "./FilterItem";
export interface IKazFilterArgs {
    position?: number;
    countFilter?: number;
    items?: Array<FilterItem.FilterItem>;
    orders?: Array<string>;
    supportedLang?: Array<string>;
}
export class KazFilter {
    public position?: number;
    public countFilter?: number;
    public items?: Array<FilterItem.FilterItem>;
    public orders?: Array<string>;
    public supportedLang?: Array<string>;
    constructor(args?: IKazFilterArgs) {
        if (args != null && args.position != null) {
            this.position = args.position;
        }
        if (args != null && args.countFilter != null) {
            this.countFilter = args.countFilter;
        }
        if (args != null && args.items != null) {
            this.items = args.items;
        }
        if (args != null && args.orders != null) {
            this.orders = args.orders;
        }
        if (args != null && args.supportedLang != null) {
            this.supportedLang = args.supportedLang;
        }
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("KazFilter");
        if (this.position != null) {
            output.writeFieldBegin("position", thrift.Thrift.Type.I32, 1);
            output.writeI32(this.position);
            output.writeFieldEnd();
        }
        if (this.countFilter != null) {
            output.writeFieldBegin("countFilter", thrift.Thrift.Type.I32, 2);
            output.writeI32(this.countFilter);
            output.writeFieldEnd();
        }
        if (this.items != null) {
            output.writeFieldBegin("items", thrift.Thrift.Type.LIST, 3);
            output.writeListBegin(thrift.Thrift.Type.STRUCT, this.items.length);
            this.items.forEach((value_1: FilterItem.FilterItem): void => {
                value_1.write(output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (this.orders != null) {
            output.writeFieldBegin("orders", thrift.Thrift.Type.LIST, 4);
            output.writeListBegin(thrift.Thrift.Type.STRING, this.orders.length);
            this.orders.forEach((value_2: string): void => {
                output.writeString(value_2);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (this.supportedLang != null) {
            output.writeFieldBegin("supportedLang", thrift.Thrift.Type.LIST, 5);
            output.writeListBegin(thrift.Thrift.Type.STRING, this.supportedLang.length);
            this.supportedLang.forEach((value_3: string): void => {
                output.writeString(value_3);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): KazFilter {
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
                        const value_4: number = input.readI32();
                        _args.position = value_4;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        const value_5: number = input.readI32();
                        _args.countFilter = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_6: Array<FilterItem.FilterItem> = new Array<FilterItem.FilterItem>();
                        const metadata_1: thrift.TList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_7: FilterItem.FilterItem = FilterItem.FilterItem.read(input);
                            value_6.push(value_7);
                        }
                        input.readListEnd();
                        _args.items = value_6;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_8: Array<string> = new Array<string>();
                        const metadata_2: thrift.TList = input.readListBegin();
                        const size_2: number = metadata_2.size;
                        for (let i_2: number = 0; i_2 < size_2; i_2++) {
                            const value_9: string = input.readString();
                            value_8.push(value_9);
                        }
                        input.readListEnd();
                        _args.orders = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.Thrift.Type.LIST) {
                        const value_10: Array<string> = new Array<string>();
                        const metadata_3: thrift.TList = input.readListBegin();
                        const size_3: number = metadata_3.size;
                        for (let i_3: number = 0; i_3 < size_3; i_3++) {
                            const value_11: string = input.readString();
                            value_10.push(value_11);
                        }
                        input.readListEnd();
                        _args.supportedLang = value_10;
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
        return new KazFilter(_args);
    }
}
