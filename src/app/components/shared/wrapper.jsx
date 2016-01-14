import React from 'react'

const Wrapper = (props) => {
  const { children } = props

  return(
  <div>
    <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">Min vackra väderapplikation</a>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
          </ul>
        </div>
      </div>
    </div>
    <div className="container body-content">
      <div className="jumbotron">
        <h1>Vad blir det för väder?</h1>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="col-md-12">
            {children}
          </div>
        </div>
      </div>
      <div className="col-md-offset-6 col-md-6"></div>
      <div className="clearfix col-md-6"></div>
    </div>

    <footer>
      <p>© 2016 - Klintans Fulhack AB</p>
    </footer>
  </div>
  )
}

export default Wrapper
