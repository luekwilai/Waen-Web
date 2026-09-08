import { ArrowUpRight } from 'lucide-react'
import { articles } from './studio-content'

export function EditorialArticles() {
  return <section className="studio-section editorial-section" id="articles" data-particle-label="บทความ">
    <div className="editorial-heading"><div><span className="eyebrow muted">FROM THE STUDIO</span><h2>บทความสำหรับ<span>คนทำธุรกิจ.</span></h2></div><div className="editorial-heading-copy"><p>มุมมองและเครื่องมือสำหรับคนทำธุรกิจที่อยากให้เว็บไซต์ทำงานได้จริง</p><a href="/blog" className="articles-all-link">คลังบทความทั้งหมด <ArrowUpRight size={15} aria-hidden="true" /></a></div></div>
    <div className="editorial-layout">
      <article className="editorial-lead-card"><a href={articles[0].href.replace('https://waenweb.com','')} className="editorial-image-link" aria-label={articles[0].title}><img src={articles[0].image} alt="" loading="lazy" /></a><div className="editorial-card-copy"><span className="editorial-kicker">{articles[0].category} <span> / {articles[0].readTime}</span></span><h3><a href={articles[0].href.replace('https://waenweb.com','')}>{articles[0].title}</a></h3><p>{articles[0].summary}</p><a className="editorial-read" href={articles[0].href.replace('https://waenweb.com','')}>อ่านบทความ <ArrowUpRight size={16} aria-hidden="true" /></a></div></article>
      <div className="editorial-side-list">{articles.slice(1).map((article) => <article className="editorial-side-card" key={article.href}><a href={article.href.replace('https://waenweb.com','')} className="editorial-image-link" aria-label={article.title}><img src={article.image} alt="" loading="lazy" /></a><div className="editorial-card-copy"><span className="editorial-kicker">{article.category} <span> / {article.readTime}</span></span><h3><a href={article.href.replace('https://waenweb.com','')}>{article.title}</a></h3><p>{article.summary}</p><a className="editorial-read" href={article.href.replace('https://waenweb.com','')}>อ่านต่อ <ArrowUpRight size={15} aria-hidden="true" /></a></div></article>)}</div>
    </div>
  </section>
}
