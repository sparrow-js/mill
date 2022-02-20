import { useDesigner } from '../hooks'

export const Workspace = {
    name: 'Workspace',
    setup (props) {
        const designer = useDesigner();
        const workspace = {
            id: props.id || 'index',
            title:'',
            description: '',
        }
        designer.workbench.value.ensureWorkspace(workspace)
        return () => (
            <div>
                Workspace
                <slot></slot>
            </div>
        )
    }
}