import React from 'react'

export const BackToTop = () => {
  return (
    <div>
        <a
      href="#"
      className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
    >
      <i className="bi bi-arrow-up"  style={{position:"absolute",right:"13px"}}/>
    </a>
    </div>
  )
}
