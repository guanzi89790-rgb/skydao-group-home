import {
  FeatureSection,
  Footer,
  Hero,
  OfficialFooter,
  featureSections,
} from '../site/SkydaoSite.jsx'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        {featureSections.map((item) => <FeatureSection key={item.id} item={item} />)}
      </main>
      <Footer />
      <OfficialFooter />
    </>
  )
}
