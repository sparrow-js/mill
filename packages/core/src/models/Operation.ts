import { Workspace } from './Workspace'
import { Engine } from './Engine'
import { Selection } from './Selection'
import { Hover } from './Hover'
import { Dragon } from './Dragon'
import {
  cancelIdle,
  each,
  ICustomEvent,
  IPoint,
  isFn,
  requestIdle,
} from '@mill-too/shared'

export interface IOperation {
  selected?: string[]
}

export class Operation {
  workspace: Workspace

  engine: Engine

  selection: Selection

  viewportDragon: Dragon

  outlineDragon: Dragon

  hover: Hover

  requests = {
    snapshot: null,
  }

  constructor(workspace: Workspace) {
    this.engine = workspace.engine
    this.workspace = workspace
    this.selection = new Selection({
      operation: this,
    })
    this.hover = new Hover({
      operation: this,
    })
    this.outlineDragon = new Dragon({
      operation: this,
      sensitive: false,
      forceBlock: true,
      viewport: this.workspace.outline,
    })
    this.viewportDragon = new Dragon({
      operation: this,
      viewport: this.workspace.viewport,
    })

    // this.selection.select(this.tree)
  }

  dispatch(event: ICustomEvent, callback?: () => void) {
    if (this.workspace.dispatch(event) === false) return
    if (isFn(callback)) return callback()
  }

//   getClosestNode() {
//     return this.viewportDragon.closestNode || this.outlineDragon.closestNode
//   }

  getClosestPosition() {
    return (
      this.viewportDragon.closestDirection ||
      this.outlineDragon.closestDirection
    )
  }

  dragClean() {
    this.outlineDragon.clear()
    this.viewportDragon.clear()
  }

//   getTouchNode() {
//     return this.outlineDragon.touchNode || this.viewportDragon.touchNode
//   }


//   getDropNode() {
//     return this.outlineDragon.dropNode || this.viewportDragon.dropNode
//   }

}
