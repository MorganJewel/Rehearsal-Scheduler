// AEA (Actors' Equity Association) standard rehearsal rules.
// All checks are advisory — nothing is prevented, only flagged.

export function checkUnionRules(blocks) {
  const sorted = [...blocks].sort((a, b) => a.order_index - b.order_index)
  const violations = []
  const warnings = []

  const total = sorted.reduce((s, b) => s + (b.duration_minutes || 0), 0)

  // ── Rule 1: 8-hour session maximum ────────────────────────────────
  if (total > 480) {
    violations.push({
      rule: '8-Hour Rule',
      detail: `Session is ${total} min (${(total / 60).toFixed(1)} hrs) — AEA maximum is 8 hours (480 min).`
    })
  } else if (total > 420) {
    warnings.push({
      rule: '8-Hour Rule',
      detail: `Session is ${total} min — within 1 hour of the 8-hour limit. Plan accordingly.`
    })
  }

  // ── Rule 2: 5-minute break required every 55 minutes ──────────────
  // Breaks of ≥5 min reset the continuous-work clock.
  let continuous = 0
  for (const block of sorted) {
    const dur = block.duration_minutes || 0
    if (block.block_type === 'break') {
      if (dur >= 5) continuous = 0
      // Breaks under 5 min don't satisfy the rule
    } else {
      continuous += dur
      if (continuous > 55) {
        violations.push({
          rule: '55-Minute Rule',
          detail: `${continuous} min of continuous work without a break. AEA requires a 5-min break at least every 55 minutes.`
        })
        continuous = 0 // reset to avoid duplicate flags on the same stretch
      }
    }
  }

  // ── Rule 3: 1-hour meal break required after 5 hours ──────────────
  if (total > 300) {
    const hasMealBreak = sorted.some(
      b => b.block_type === 'break' && (b.duration_minutes || 0) >= 60
    )
    if (!hasMealBreak) {
      violations.push({
        rule: 'Meal Break',
        detail: `Session is over 5 hours (${total} min) — a minimum 1-hour meal break is required. Add a "break" block of ≥60 min.`
      })
    }
  }

  // ── Rule 4: Hard cap at 10 hours (even 10-out-of-12 has a ceiling) ─
  if (total > 600) {
    violations.push({
      rule: '10-Hour Hard Cap',
      detail: `Session exceeds 10 hours (${total} min). Even the tech-week 10-out-of-12 rule has a 10-hour work ceiling.`
    })
  }

  return { violations, warnings, total }
}
