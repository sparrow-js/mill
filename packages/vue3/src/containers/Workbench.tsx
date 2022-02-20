export const Workbench = {
  name: 'Workbench',
  setup(props, ctx) {
    return () => (
      <div>
        Workbench
        {ctx.slots.default?.()}
      </div>
    )
  }
}
