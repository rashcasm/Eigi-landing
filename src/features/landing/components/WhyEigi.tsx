import styles from './BaseCamp.module.css'

export function WhyEigi() {
  return <div className={styles.why}>
    <p className="eyebrow">The missing piece</p>
    <h2>Why we started Eigi</h2>
    <ol className={styles.beliefs}>
      <li><span>01</span><h3>AI is ready.</h3><p>It can already research, draft, reply and schedule.</p></li>
      <li><span>02</span><h3>Small businesses aren't using it.</h3><p>Fewer than 1 in 5 US businesses with 4 or fewer people use AI.</p><small>US Census Bureau, May 2026</small></li>
      <li><span>03</span><h3>Tools alone don't stick.</h3><p>95% of companies saw no measurable return from their AI pilots.</p><small>MIT NANDA, 2025</small></li>
      <li><span>04</span><h3>Help changes that.</h3><p>AI bought from specialist partners reaches production twice as often as AI built in-house: 67% vs 33%.</p><small>MIT NANDA, 2025</small></li>
    </ol>
    <p className={styles.beliefClosing}>Big companies hire forward-deployed engineers to make AI stick. We built Eigi so a team of two gets the same.</p>
    <div className={styles.sources}><span>Sources</span><a href="https://www.census.gov/library/stories/2026/05/ai-use-businesses.html">US Census Bureau ↗</a><a href="https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/">Fortune ↗</a><a href="https://aimagazine.com/news/mit-why-95-of-enterprise-ai-investments-fail-to-deliver">AI Magazine ↗</a></div>
  </div>
}
