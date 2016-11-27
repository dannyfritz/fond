let gamepads: Gamepad[] = []
const controllerCache: Controller[] = []

export const Controllers =
{
  update () : void
  {
    gamepads = navigator.getGamepads() || []
    controllerCache
      .forEach((controller, index) => controller.gamepad = gamepads[index])
  },
  numberOfControllers () : number
  {
    return Array.from(gamepads)
      .reduce((sum: number, gp: Gamepad) => sum + (!!gp ? 1 : 0), 0)
  },
  ConnectedIndexes () : number[]
  {
    return Array.from(gamepads)
      .filter((gp) => gp)
      .map((gp) => gp.index)
  },
  getGamepad (gamepadIndex: number) : Gamepad
  {
    return gamepads[gamepadIndex]
  },
  getController (controllerIndex: number) : Controller
  {
    let controller = controllerCache[controllerIndex]
    if (controller)
    {
      return controller
    }
    const gamepad = Controllers.getGamepad(controllerIndex)
    controller = new Controller()
    controller.gamepad = gamepad
    controllerCache[controllerIndex] = controller
    return controller
  }
}

export enum ControllerButton {
  A, B, X, Y,
  LeftBumper, RightBumper,
  LeftTrigger, RightTrigger,
  Back, Start,
  LeftStick, RightStick,
  Up, Left, Right, Down,
}

export enum ControllerAxis {
  LeftX, LeftY,
  RightX, RightY
}

export class Controller
{
  public gamepad: Gamepad
  public getIndex () : number
  {
    return this.gamepad.index
  }
  public isConnected () : boolean
  {
    return !!this.gamepad ? this.gamepad.connected : false
  }
  public getAxis (axis: ControllerAxis) : number
  {
    if (!this.isConnected())
    {
      return
    }
    return this.gamepad.axes[axis]
  }
  public getButton (button: ControllerButton) : GamepadButton
  {
    if (!this.isConnected())
    {
      return
    }
    return this.gamepad.buttons[button]
  }
}
