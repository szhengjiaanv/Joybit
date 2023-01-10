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

    export enum Buttons {
        //%block="C"
        P12 = DAL.MICROBIT_ID_IO_P12,
        //%block="D"
        P13 = DAL.MICROBIT_ID_IO_P13,
        //%block="Left Rocker Button"
        P14 = DAL.MICROBIT_ID_IO_P14,
        //%block="Right Rocker Button"
        P15 = DAL.MICROBIT_ID_IO_P15
    }

    export enum ButtonAction {
        //%block="Down"
        Down = PulseValue.High,
        //%block="Up"
        Up = PulseValue.Low
    }

    //% weight=90
    //% blockId=JoybitInitial block="Joystick Initialization"
    export function JoybitInitial(): void {
        pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
    }

    //% weight=89
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

    //% weight=87
    //% blockId=onButtonEvent block="on button %button|is %event"
    export function onButtonEvent(button: Buttons, event: ButtonAction, handler: Action): void {
        pins.onPulsed(<number>button, <number>event, handler);
    }

    //% weight=86
    //% blockId=getButton block="button %button is pressed"
    export function getButton(button: Buttons): boolean {
        let ret = false
        if (pins.digitalReadPin(<number>button) == 0)
        {
            ret = true
        }
        else
        {
            ret = false
        }
        return ret
    }

    //% weight=85
    //% blockId=Vibration block="Motor Vibration for %time second(s)"
    //% ms.min=0 ms.max=255 ms.defl=2
    export function Vibration(ms: number): void {
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(ms / 1000)
        pins.digitalWritePin(DigitalPin.P16, 1)
    }
}
