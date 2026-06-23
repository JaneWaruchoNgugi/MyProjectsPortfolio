import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { defaultContent } from './defaultContent'
import type { SiteContent } from './types'

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [loading, setLoading] = useState(true)
  useEffect(() => onSnapshot(doc(db, 'portfolio', 'site'), snapshot => {
    if (snapshot.exists()) setContent(snapshot.data() as SiteContent)
    setLoading(false)
  }, () => setLoading(false)), [])
  return { content, loading }
}
