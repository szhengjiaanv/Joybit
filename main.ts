/**
 * Product Name: Joybit 
 * Copyright (c) Shenzhen Hengjiaan Technology Co., Ltd
 * 
 * Support email:  support@haljia.com
 */
//% color="#6167d5" weight=10 icon="\uf11b"
namespace Joybit {
    const ADDR = 0x11
    const CMD_ROCKER = 0x20
/**
 * TODO: Get Joystick XY value
 */


    export enum RockerXY {
        LeftRockerX = 0x1,
        LeftRockerY = 0x2,
        RightRockerX = 0x3,
        RightRockerY = 0x4
    }

    //% blockId=FunbitMotorStart block="Rocker |%index"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    export function JoybitRockerXY(index: RockerXY) :number {
        let v = 0
        let buf = pins.createBuffer(2);
        buf[0] = CMD_ROCKER;
        buf[1] = index;
        pins.i2cWriteBuffer(ADDR, buf);
        v = pins.i2cReadNumber(ADDR, NumberFormat.UInt8BE);
        return v;
    }
}