import {IEventProps} from '@mill-too/shared'
import {
    Engine,
    ScreenType,
    Shortcut,
    Viewport,
    Workbench,
    Workspace,
} from './models'
export type  IEngineProps<T = Event>  = IEventProps<T> & {
    shortcuts?: Shortcut[]
    sourceIdAttrName?: string //拖拽源Id的dom属性名
    nodeIdAttrName?: string //节点Id的dom属性名
    contentEditableAttrName?: string //原地编辑属性名
    contentEditableNodeIdAttrName?: string //原地编辑指定Node Id属性名
    clickStopPropagationAttrName?: string //点击阻止冒泡属性
    outlineNodeIdAttrName?: string //大纲树节点ID的dom属性名
    nodeSelectionIdAttrName?: string //节点工具栏属性名
    nodeDragHandlerAttrName?: string //节点拖拽手柄属性名
    nodeResizeHandlerAttrName?: string //节点尺寸拖拽手柄属性名
    nodeTranslateAttrName?: string // 节点自由布局的属性名
    defaultScreenType?: ScreenType
    rootComponentName?: string
}

export type WorkbenchTypes =
  | 'DESIGNABLE'
  | 'PREVIEW'
  | 'JSONTREE'
  | 'MARKUP'
  | (string & {})

export type IEngineContext = {
    workspace: Workspace
    workbench: Workbench
    engine: Engine
    viewport: Viewport
  }
  