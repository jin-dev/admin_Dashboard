import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://www.linkedin.com/in/jin-woo-park-87583389/" target="_blank" rel="noopener noreferrer">Jin Woo Park</a>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://jin-dev-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer">Jin</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
