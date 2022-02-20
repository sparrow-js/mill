export const Designer = {
    name: 'Designer',
    setup (props, ctx) {
        return () => (
            <div>
                Designer
                {ctx.slots.default?.()}
            </div>
        )
    }
}