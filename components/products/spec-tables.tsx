import type { SpecGroup } from '@/lib/products'

export function SpecTables({ groups }: { groups: SpecGroup[] }) {
  return (
    <div className="grid gap-10">
      {groups.map((group) => (
        <section key={group.title} aria-label={group.title}>
          <h3 className="font-display text-lg font-semibold text-ink">{group.title}</h3>
          {group.kind === 'pairs' ? (
            <dl className="mt-4 grid border-t border-ink/20 sm:grid-cols-2 sm:gap-x-10">
              {group.rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3">
                  <dt className="text-sm text-muted-foreground">{row.label}</dt>
                  <dd className="text-right font-display font-semibold tabular-nums text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <>
              <div className="mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label={`${group.title}, scrollable table`}>
                <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                  <caption className="sr-only">{group.title}</caption>
                  <thead>
                    <tr className="border-y border-ink/30 bg-paper-deep">
                      <th scope="col" className="px-3 py-3 font-display font-semibold text-ink">
                        Item
                      </th>
                      {group.columns.map((column) => (
                        <th key={column} scope="col" className="px-3 py-3 text-right font-display font-semibold tabular-nums text-ink">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr key={row.label} className="border-b border-ink/10 transition-colors hover:bg-flour/30">
                        <th scope="row" className="px-3 py-3 font-normal text-muted-foreground">
                          {row.label}
                        </th>
                        {row.values.map((value, index) => (
                          <td key={`${row.label}-${index}`} className="px-3 py-3 text-right tabular-nums text-ink">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {group.shared?.length ? (
                <dl className="mt-4 grid border-t border-ink/20">
                  {group.shared.map((row) => (
                    <div key={row.label} className="grid gap-1 border-b border-ink/10 py-3 sm:grid-cols-[12rem_1fr] sm:gap-6">
                      <dt className="text-sm text-muted-foreground">{row.label}</dt>
                      <dd className="text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </>
          )}
          {group.note ? <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{group.note}</p> : null}
        </section>
      ))}
    </div>
  )
}
